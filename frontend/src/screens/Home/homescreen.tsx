import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/Home/homescreenStyles';

const Home = () => {
  const [userName, setUserName] = useState('눈송이'); // 기본값 설정
  const navigation = useNavigation();
  const vote_rate = [
    '선거1',
    '선거2',
    '선거3',
    '선거4',
    '선거5',
    '선거6',
    '선거7',
    '선거8',
    '선거9',
    '선거10',
  ];

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userNickname');
        if (storedUserName) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error('Failed to fetch user nickname from AsyncStorage', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Image
          source={require('../../assets/AugustBanner.png')}
          style={styles.bannerImage}
        />
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>실시간 투표율</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genreScroll}>
          {vote_rate.map((genre, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.genreItem,
                index === vote_rate.length - 1 && { marginRight: 16 },
              ]}
              onPress={() => navigation.navigate('Genre', { vote_rate })}
            >
              <Text style={styles.genreText}>{genre}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{userName}님, 투표 마감 기한을 알려드려요!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RecentViewed')}>
            <Image
              source={require('../../assets/ArrowRight.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.contentScroll}>
          {[
            require('../../assets/book1.png'),
            require('../../assets/book2.png'),
            require('../../assets/book3.png'),
            require('../../assets/book4.png'),
          ].map((image, index) => (
            <TouchableOpacity key={index} style={styles.contentItem}>
              <Image source={image} style={styles.contentThumbnail} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            후보를 응원해주세요!
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Recommended')}>
            <Image
              source={require('../../assets/ArrowRight.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.contentScroll}>
          {[
            require('../../assets/book5.png'),
            require('../../assets/book6.png'),
            require('../../assets/book7.png'),
            require('../../assets/book8.png'),
          ].map((image, index) => (
            <TouchableOpacity key={index} style={styles.contentItem}>
              <Image source={image} style={styles.contentThumbnail} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 여기에 빈 View를 추가하여 하단 여유 공간 확보 */}
      <View style={{ height: 16 }} />
    </ScrollView>
  );
};

export default Home;