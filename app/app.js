import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, SwitchNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements'

import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import SplashScreen from './screens/splash';
import FeedScreen from './screens/feed';
import UploadScreen from './screens/upload';
import ProfileScreen from './screens/profile';
import PasswordScreen from './screens/password';
import ResetScreen from './screens/reset';
import PrivacyScreen from './screens/privacy';
import TermsScreen from './screens/terms';

const AuthStack = StackNavigator(
  { 
      Login: LoginScreen, 
      Register: RegisterScreen,
      Password: PasswordScreen,
      Reset: ResetScreen,
      Privacy: PrivacyScreen,
      Terms: TermsScreen
  }
);

const ProfileStack = StackNavigator(
    {
        Profile: ProfileScreen,
        Posts: FeedScreen,
        Likes: FeedScreen,        
        Settings: RegisterScreen
    }
)

const UploadStack = StackNavigator(
    {
        Upload: UploadScreen,
        Terms: TermsScreen
    }
)

console.disableYellowBox = true;

const MenuStack = TabNavigator(
  {
      Feed: FeedScreen,
      Upload: UploadStack,
      Profile: ProfileStack,
  },
  {
      navigationOptions: ({ navigation }) => ({            
          tabBarIcon: ({ focused, tintColor }) => {
              const { routeName } = navigation.state;
              let iconName;
              if (routeName === 'Feed') {
                  iconName = 'whatshot'          
              } else if (routeName === 'Upload') {
                  iconName = 'add'
              } else if (routeName === 'Profile') {
                  iconName = 'person'
              }
              return <Icon name={iconName} size={25} color={tintColor} />;
          },
      }),
      tabBarOptions: {
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      },
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      animationEnabled: true,
      swipeEnabled: true,
      style: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
      }
})

export default SwitchNavigator(
  {
    AuthLoading: SplashScreen,
    App: MenuStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
