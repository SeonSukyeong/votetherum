// src/screens/Create/create_1.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { checkVoterEligibility, getCreatedElections } from '../../services/interact'; // 스마트 계약 함수 호출

// RootStackParamList 정의
export type RootStackParamList = {
  VoteList_post: undefined; // 이 화면은 파라미터를 받지 않음
  VoteCandidate: { voteId: string }; // 이 화면은 voteId를 받음
  // 다른 화면의 타입도 추가할 수 있습니다.
};

const VoteList_post = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedTab, setSelectedTab] = useState('지정투표');
  const [userName, setUserName] = useState('눈송이');
  const [elections, setElections] = useState<{ id: number; name: string; endTime: number }[]>([]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserNameAndWallet = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userNickname');
        const storedWalletAddress = await AsyncStorage.getItem('walletAddress');
        if (storedUserName) {
          setUserName(storedUserName);
        }
        if (storedWalletAddress) {
          setWalletAddress(storedWalletAddress);
        }
      } catch (error) {
        console.error('Failed to fetch user name or wallet address.', error);
      }
    };

    fetchUserNameAndWallet();
  }, []);

  useEffect(() => {
    if (walletAddress) {
      fetchElections();
    }
  }, [walletAddress]);

  const fetchElections = async () => {
    try {
      // 블록체인에서 생성된 선거 리스트 가져오기
      const createdElections = await getCreatedElections();

      if (walletAddress) { // walletAddress가 null이 아닌 경우에만 실행
        const eligibleElections = await Promise.all(
          createdElections.map(async (election) => {
            const eligible = await checkVoterEligibility(election.id, walletAddress);
            return eligible ? election : null;
          })
        );

        // null이 아닌 선거들만 필터링하여 설정
        setElections(eligibleElections.filter((election) => election !== null) as { id: number; name: string; endTime: number }[]);
      } else {
        console.error('지갑 주소가 설정되지 않았습니다.');
      }
    } catch (error) {
      console.error('Error fetching elections:', error);
    }
  };

  const handleVotePress = (voteId: string) => {
    navigation.navigate('VoteCandidate', { voteId });
  };

  const renderItem = ({ item }: { item: { id: number; name: string; endTime: number } }) => (
    <View style={styles.voteItem}>
      <View style={styles.voteImage} />
      <View style={styles.voteInfo}>
        <Text style={styles.voteTitle}>{item.name}</Text>
        <Text style={styles.voteEndTime}>{new Date(item.endTime * 1000).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity onPress={() => handleVotePress(item.id.toString())}>
        <Image source={require('../../assets/ArrowRight.png')} style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>{`${userName}님이 투표 가능한 선거 목록입니다!`}</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === '지정투표' && styles.activeTabButton]}
          onPress={() => setSelectedTab('지정투표')}
        >
          <Text style={[styles.tabButtonText, selectedTab === '지정투표' && styles.activeTabText]}>지정투표</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={elections}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.voteList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  topText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activeTabButton: {
    borderBottomColor: '#9B9AFF',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  activeTabText: {
    color: '#9B9AFF',
    fontWeight: 'bold',
  },
  voteList: {
    flexGrow: 1,
  },
  voteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    marginBottom: 10,
  },
  voteImage: {
    width: 50,
    height: 50,
    backgroundColor: '#9B9AFF',
    borderRadius: 8,
    marginRight: 10,
  },
  voteInfo: {
    flex: 1,
  },
  voteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  voteEndTime: {
    fontSize: 14,
    color: '#555555',
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
});

export default VoteList_post;