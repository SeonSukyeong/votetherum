// src/screens/Create/create_1.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 임의 데이터 생성
const sampleData = {
  '지정투표': [
    { id: '1', title: '지정 선거 1', endTime: '8/31 24:00' },
    { id: '2', title: '지정 선거 2', endTime: '9/01 18:00' },
  ],
  '공개투표': [
    { id: '3', title: '공개 선거 1', endTime: '9/05 13:00' },
    { id: '4', title: '공개 선거 2', endTime: '9/10 17:30' },
  ],
};

const VoteList_post = () => {
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState('지정투표'); // 초기 탭 설정
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

    const interval = setInterval(fetchUserName, 1000); // 1초마다 업데이트 체크

    return () => clearInterval(interval);
  }, []);

  // 투표 항목 클릭 시 처리 함수 (임의 화면 이동)
  const handleVotePress = (voteId) => {
    // 임의로 설정된 투표 화면으로 이동
    //navigation.navigate('VoteScreen', { voteId });
  };

  // 렌더링할 투표 항목
  const renderItem = ({ item }) => (
    <View style={styles.voteItem}>
      <View style={styles.voteImage} />
      <View style={styles.voteInfo}>
        <Text style={styles.voteTitle}>{item.title}</Text>
        <Text style={styles.voteEndTime}>{item.endTime}</Text>
      </View>
      <TouchableOpacity onPress={() => handleVotePress(item.id)}>
        <Image source={require('../../assets/ArrowRight.png')} style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>{`${userName}님이 투표 가능한 선거 목록입니다!`}</Text>

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

      {/* 선택된 탭에 따른 투표 목록 */}
      <FlatList
        data={sampleData[selectedTab]}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
