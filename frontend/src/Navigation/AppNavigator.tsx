import React, {useState, createContext} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import your screens
import BottomTabNavigator from './BottomTabNavigator';
import LoginScreen from '../screens/Login/LoginScreen';
import Home from '../screens/Home/homescreen';
import Search from '../screens/Search/SearchScreen';
import My from '../screens/MY/myscreen';
import Vote from '../screens/Vote/VoteScreen';
import FindIDScreen from '../screens/Login/FindIDScreen';
import FindPasswordScreen from '../screens/Login/FindPasswordScreen';
import SignUpScreen from '../screens/Login/SignUpScreen';
import VoteList_pre from '../screens/Vote/VoteList_pre';
import VoteList_post from '../screens/Vote/VoteList_post';
//import ProfileScreen from '../screens/MY/profilescreen';

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Main"
                component={BottomTabNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="My" component={My} />
              <Stack.Screen name="Vote" component={Vote} />
              <Stack.Screen
                name="VoteList_pre"
                component={VoteList_pre}
                options={{ headerShown: false }} 
/>
              
            </>
          ) : (
            <>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen name="FindID" component={FindIDScreen} />
              <Stack.Screen
                name="FindPassword"
                component={FindPasswordScreen}
              />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export {AppNavigator, AuthContext};
export default AppNavigator;
