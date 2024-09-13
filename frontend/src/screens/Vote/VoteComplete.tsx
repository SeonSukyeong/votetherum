import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VoteComplete = () => {
  const navigation = useNavigation();

  const handleSupportPress = () => {
    // '응원 보내러 가기' 버튼 클릭 시 처리할 내용
    console.log('응원 보내러 가기 버튼 클릭됨');
    // 여기에 다른 화면으로 이동할 수 있도록 navigation 추가
    // 예시: navigation.navigate('SupportCandidate');
  };

  return (
    <View style={styles.container}>
      {/* 상단 문구 */}
      <Text style={styles.title}>투표를 완료하였습니다!</Text>

      {/* 완료 이미지 */}
      <Image
        source={require('../../assets/Vote/vote_finish.png')} // 이미지 경로는 프로젝트 구조에 맞게 수정
        style={styles.image}
        resizeMode="contain"
      />

      {/* 응원 메시지 */}
      <Text style={styles.supportText}>
        후보자 응원하기를 통해 지지하는 후보에게 응원을 보내보세요!
      </Text>

      {/* 응원 보내기 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleSupportPress}>
        <Text style={styles.buttonText}>응원 보내러 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  supportText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#9B9AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default VoteComplete;
