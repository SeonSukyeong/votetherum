import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkVoterEligibility } from '../../services/interact'; // 스마트 계약 함수 호출
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

  // MetaMask에서 돌아올 때 딥링크 응답 처리
  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      const url = event.url;
      console.log('딥링크 URL 받음:', url);
      
      const address = extractWalletAddressFromUrl(url);
      console.log('추출된 지갑 주소:', address); // 추가된 로그
      if (address) {
        setWalletAddress(address);
        await AsyncStorage.setItem('walletAddress', address);
        const eligible = await checkVoterEligibilityForAllElections(address);
        if (eligible) {
          Alert.alert('투표 자격이 확인되었습니다!');
          navigation.navigate('VoteList_post');
        } else {
          Alert.alert('투표 자격이 없습니다.');
        }
      } else {
        console.log('지갑 주소 추출 실패'); // 주소 추출 실패 시 로그
      }
   };
   
  
    const handleInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        handleDeepLink({ url });
      }
    };

    // 초기 실행 시 현재 URL 확인 (백그라운드에서 돌아왔을 때 처리)
    handleInitialURL();

    // 리스너 등록
    const subscription = Linking.addEventListener('url', handleDeepLink);
  
    // 클린업 함수
    return () => {
      subscription.remove(); // 리스너 제거
    };
  }, [navigation]);

  // 지갑 연결 (MetaMask 딥링크 호출)
  const handlePress = async () => {
    try {
      const metamaskDeepLink = `metamask://dapp/${NGROK_URL}`;
      const supported = await Linking.canOpenURL(metamaskDeepLink);
      if (supported) {
        await Linking.openURL(metamaskDeepLink); // MetaMask로 리디렉션
      } else {
        Alert.alert('MetaMask 연결에 실패했습니다.');
      }
    } catch (error) {
      console.error('지갑 연결 오류:', error);
      Alert.alert('지갑 연결 중 오류가 발생했습니다.');
    }
  };

  // 딥링크 URL에서 지갑 주소 추출
  const extractWalletAddressFromUrl = (url: string): string | null => {
    const regex = /walletAddress=([^&]+)/; // URL에서 지갑 주소 추출
    const match = url.match(regex);
    return match ? decodeURIComponent(match[1]) : null;
  };

  // 여러 선거에 대해 투표 자격 확인
  const checkVoterEligibilityForAllElections = async (address: string) => {
    try {
      const electionIds = [1, 2, 3]; // 여기에 실제 컨트랙트에서 가져올 선거 ID 목록 사용
      for (const electionId of electionIds) {
        const eligible = await checkVoterEligibility(electionId, address); // 블록체인에서 유권자 자격 확인
        if (eligible) {
          console.log(`선거 ID ${electionId}에 대해 ${address}가 유권자입니다.`);
          return true;
        }
      }
      return false; // 모든 선거에 대해 유권자 자격이 없는 경우
    } catch (error) {
      console.error('투표 자격 확인 오류:', error);
      return false;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.centeredContent}>
        <Text style={styles.topText}>{`${userName}님이 투표 가능한\n투표 목록입니다!`}</Text>

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
