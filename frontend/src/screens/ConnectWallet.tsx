import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Web3 from 'web3';
import { NGROK_URL } from '@env'; // 환경변수 사용

const metamaskDeepLink = `metamask://dapp/${NGROK_URL}`;

const ConnectWallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletAddress = async () => {
      const address = await AsyncStorage.getItem('walletAddress');
      if (address) {
        setWalletAddress(address);
      }
    };
    fetchWalletAddress();
  }, []);

  const connectMetaMask = async () => {
    try {
      await Linking.openURL(metamaskDeepLink);
      
      // MetaMask에서 지갑 주소 가져오기
      const web3 = new Web3(Web3.givenProvider || `http://${NGROK_URL}`);
      const accounts = await web3.eth.getAccounts();
      
      if (accounts.length > 0) {
        const walletAddress = accounts[0];
        await AsyncStorage.setItem('walletAddress', walletAddress);
        Alert.alert('지갑 연결 성공', `지갑 주소: ${walletAddress}`);
        setWalletAddress(walletAddress);
      } else {
        Alert.alert('지갑 연결 실패', '지갑 주소를 가져올 수 없습니다.');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('MetaMask 연결 오류', error.message);
      } else {
        Alert.alert('MetaMask 연결 오류', '알 수 없는 오류가 발생했습니다.');
      }
      console.error("MetaMask 연결 오류:", error);
    }
  };
  return (
    <View style={styles.container}>
      {walletAddress ? (
        <View>
          <Text style={styles.connectedText}>지갑 연결됨: {walletAddress}</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={connectMetaMask}>
          <Text style={styles.buttonText}>MetaMask 지갑 연결하기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#9B9AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  connectedText: {
    fontSize: 18,
    color: '#000',
  },
});

export default ConnectWallet;
