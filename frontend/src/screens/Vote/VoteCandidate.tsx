import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native'; // NavigationProp 추가
import CheckBox from '@react-native-community/checkbox';
import Web3 from 'web3';
import { getCandidatesForElection } from '../../services/interact'; 
import contractABI from './contractABI.json'; 

export type RootStackParamList = {
  VoteList_post: undefined;
  VoteCandidate: { voteId: string };
  VoteComplete: undefined; // 'VoteComplete'로 수정
};

type VoteCandidateRouteProp = RouteProp<RootStackParamList, 'VoteCandidate'>;

const VoteCandidate = () => {
  const route = useRoute<VoteCandidateRouteProp>();
  const { voteId } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();  // Navigation 타입을 명시적으로 지정

  const [candidates, setCandidates] = useState<{ id: number, name: string }[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const candidatesList: string[] = await getCandidatesForElection(parseInt(voteId, 10));
        const formattedCandidates = candidatesList.map((name, index) => ({
          id: index + 1,
          name,
        }));
        setCandidates(formattedCandidates);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, [voteId]);

  const handleCheckboxChange = (candidateId: number) => {
    setSelectedCandidateId(candidateId);
  };

  const sendTransaction = async () => {
    try {
      if (selectedCandidateId === null) {
        Alert.alert('후보자를 선택하세요.');
        return;
      }

      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      const contractAddress = '0xAbF128e05Ddb5f29B53E472c8D2be36aF31672AE';
      const contract = new web3.eth.Contract(contractABI as any, contractAddress);

      const transactionParameters = {
        to: contractAddress,
        from: userAddress,
        gas: '0x5208',
        data: contract.methods.vote(parseInt(voteId, 10), selectedCandidateId).encodeABI()
      };

      const url = `https://metamask.app.link/v1/send?to=${contractAddress}&value=0&data=${transactionParameters.data}`;
      await Linking.openURL(url);

      // 트랜잭션 완료 후 VoteComplete 화면으로 이동
      navigation.navigate('VoteComplete');

    } catch (error) {
      console.error('트랜잭션 오류:', error);
      Alert.alert('트랜잭션 오류', '트랜잭션 처리 중 오류가 발생했습니다.');
    }
  };

  const handleVote = () => {
    sendTransaction();
  };

  const renderItem = ({ item }: { item: { id: number; name: string } }) => (
    <View style={styles.candidateItem}>
      <Text style={styles.candidateName}>{item.name}</Text>
      <CheckBox
        value={selectedCandidateId === item.id}
        onValueChange={() => handleCheckboxChange(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>후보자 목록</Text>
      <ScrollView style={styles.candidateList}>
        <FlatList
          data={candidates}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
      <TouchableOpacity
        style={[styles.voteButton, { backgroundColor: selectedCandidateId ? '#9B9AFF' : '#CCCCCC' }]}
        onPress={handleVote}
        disabled={!selectedCandidateId}
      >
        <Text style={styles.voteButtonText}>투표하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  candidateList: {
    flexGrow: 1,
  },
  candidateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  candidateName: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  voteButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  voteButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default VoteCandidate;
