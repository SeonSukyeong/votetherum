// src/screens/Create/create_1.tsx

// VoteScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 여기에서 경로 타입을 정의
type RootStackParamList = {
  VoteScreen: undefined;
  VoteList_pre: undefined;
};

const VoteScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [buttonColor, setButtonColor] = useState('#9B9AFF');
  const [userName, setUserName] = useState('눈송이');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userNickname');
        if (storedUserName) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error('Failed to fetch user name.', error);
      }
    };

    fetchUserName();
    const interval = setInterval(fetchUserName, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePress = () => {
    setButtonColor('#000000');
    setTimeout(() => {
      setButtonColor('#9B9AFF');
      navigation.navigate('VoteList_pre'); // 이제 오류가 발생하지 않음
    }, 50);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Text style={styles.topText}>{`${userName}님,\n반가워요 🙌`}</Text>
        <Image source={require('../../assets/Vote/vote_start.png')} style={styles.image} />
        <Text style={styles.bottomText}>
          {'지금부터 보터리움과 함께\n소중한 한 표를 행사해볼까요?'}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>투표하러 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    bottom: 30,
    position: 'absolute',
    height: 60,
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#9B9AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VoteScreen;
