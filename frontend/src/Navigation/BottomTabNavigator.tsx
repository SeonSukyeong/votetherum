import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/homescreen';
import Search from '../screens/Search/SearchScreen';
import My from '../screens/MY/myscreen';
import VoteScreen from '../screens/Vote/VoteScreen'; 
import VoteList_pre from '../screens/Vote/VoteList_pre';

const homeIcon = require('../assets/home.png');
const searchIcon = require('../assets/search.png');
const myIcon = require('../assets/my.png');
const voteIcon = require('../assets/vote.png');
const logoTitle = require('../assets/logoTitle.png'); // 로고 이미지

const Tab = createBottomTabNavigator();
const VoteStack = createNativeStackNavigator(); // 스택 네비게이터 생성

// Vote 스택 네비게이터 정의
const VoteStackNavigator = () => {
  return (
    <VoteStack.Navigator>
      <VoteStack.Screen
        name="VoteScreen"
        component={VoteScreen}
        options={{
          headerTitle: () => (
            <Image
              source={logoTitle} // 상단 로고 설정
              style={{ width: 150, height: 50 }}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center', // 로고를 가운데 정렬
        }}
      />
      <VoteStack.Screen
        name="VoteList_pre"
        component={VoteList_pre}
        options={{
          headerTitle: () => (
            <Image
              source={logoTitle} // 상단 로고 설정
              style={{ width: 150, height: 50 }}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center', // 로고를 가운데 정렬
        }}
      />
    </VoteStack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = homeIcon;
          } else if (route.name === 'Search') {
            iconSource = searchIcon;
          } else if (route.name === 'My') {
            iconSource = myIcon;
          } else if (route.name === 'Vote') {
            iconSource = voteIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{ width: size, height: size, tintColor: color }}
            />
          );
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        // Home, Search, My 탭에서는 로고를 헤더에 표시
        headerTitle: route.name !== 'Vote' ? () => (
          <Image
            source={logoTitle} // 상단 로고 설정
            style={{ width: 150, height: 50 }}
            resizeMode="contain"
          />
        ) : undefined, // Vote 탭에서는 헤더를 숨김 (스택 네비게이터 내에서 처리)
        headerTitleAlign: 'center', // 로고를 가운데 정렬
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="Vote"
        component={VoteStackNavigator}
        options={{ headerShown: false }} // Vote 탭에서는 헤더를 숨김
      />
      <Tab.Screen name="My" component={My} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
