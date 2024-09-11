import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getElection, setVoterEligibility } from '../../services/interact'; // 스마트 계약 함수 호출
import { NGROK_URL } from '@env';  // 환경변수에서 URL 가져오기

type RootStackParamList = {
  VoteScreen: undefined;
  VoteList_pre: undefined;
  VoteList_post: undefined; // 추가 경로
};

const imageSource = require('../../assets/Vote/wallet.png');

const VoteList_pre = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [buttonColor, setButtonColor] = useState('#9B9AFF');
  const [selectedTab, setSelectedTab] = useState('지정투표');
  const [userName, setUserName] = useState('눈송이');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userNickname');
        if (storedUserName) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error('유저 이름을 가져오는 데 실패했습니다.', error);
      }
    };

    fetchUserName();
    const interval = setInterval(fetchUserName, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePress = async () => {
    try {
      const metamaskDeepLink = `metamask://dapp/${NGROK_URL}`;  // 환경변수 사용

      // MetaMask 딥링크로 리디렉션
      const supported = await Linking.canOpenURL(metamaskDeepLink);
      if (supported) {
        await Linking.openURL(metamaskDeepLink);
        // 지갑 연결을 시뮬레이션하고 지갑 주소를 가져옴
        const address = '0xYourWalletAddress'; // MetaMask에서 지갑 연결 후 지갑 주소 가져오기
        setWalletAddress(address);
        // 투표 자격 확인
        const eligible = await checkVoterEligibility(address);
        if (eligible) {
          Alert.alert('투표 자격이 확인되었습니다!');
          navigation.navigate('VoteList_post'); // 다음 페이지로 이동
        } else {
          Alert.alert('투표 자격이 없습니다.');
        }
      } else {
        Alert.alert('MetaMask 연결에 실패했습니다.');
      }
    } catch (error) {
      console.error('지갑 연결 오류:', error);
      Alert.alert('지갑 연결 중 오류가 발생했습니다.');
    }
  };

  const checkVoterEligibility = async (address: string) => {
    try {
      const electionId = 1; // 예시 선거 ID
      const election = await getElection(electionId);
      console.log(`선거 정보: ${election.name}, 종료 시간: ${election.endTime}`);
      await setVoterEligibility(electionId, address); // 투표 자격 설정
      return true;
    } catch (error) {
      console.error('투표 자격 확인 오류:', error);
      return false;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.centeredContent}>
        <Text style={styles.topText}>{`${userName}님이 투표 가능한\n투표 목록입니다!`}</Text>

        {/* 탭 버튼 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === '지정투표' && styles.activeTabButton]}
            onPress={() => setSelectedTab('지정투표')}
          >
            <Text style={[styles.tabButtonText, selectedTab === '지정투표' && styles.activeTabText]}>지정투표</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === '공개투표' && styles.activeTabButton]}
            onPress={() => setSelectedTab('공개투표')}
          >
            <Text style={[styles.tabButtonText, selectedTab === '공개투표' && styles.activeTabText]}>공개투표</Text>
          </TouchableOpacity>
        </View>

        <Image source={imageSource} style={styles.image} />
        <Text style={styles.bottomText}>{'투표를 진행하려면\n지갑을 연결하세요✅'}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>지갑 연결하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 40,
    color: '#000000',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
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
  bottomText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000000',
  },
  image: {
    width: 300,
    height: 300,
    margin: 35,
  },
  button: {
    height: 60,
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#9B9AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VoteList_pre;
