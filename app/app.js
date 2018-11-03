import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator, SwitchNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Icon } from 'react-native-elements'

import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import SplashScreen from './screens/splash';
import FeedScreen from './screens/feed';
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
        Settings: RegisterScreen
    }
)

console.disableYellowBox = true;

const MenuStack = TabNavigator(
  {
      Feed: FeedScreen,
      Profile: ProfileStack,
  },
  {
      navigationOptions: ({ navigation }) => ({            
          tabBarIcon: ({ focused, tintColor }) => {
              const { routeName } = navigation.state;
              let iconName;
              if (routeName === 'Feed') {
                  iconName = 'search'  
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
