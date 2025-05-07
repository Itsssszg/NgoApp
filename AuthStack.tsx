// navigation/AuthStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/Navigation';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MainScreen from '../screens/HomeScreen'; // or your correct path
import HomeNGOScreen from '../screens/NGOScreen'; // import HomeNGOScreen
import HomeVolunteerScreen from '../screens/VolunteerScreen'; // import HomeVolunteerScreen
import SplashScreen from '../screens/SplashScreen';
import EditRequestScreen from '../screens/EditRequestScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="HomeNGO" component={HomeNGOScreen} />
      <Stack.Screen name="Dashboard" component={HomeNGOScreen} />
      <Stack.Screen name="AddRequest" component={require('../screens/AddRequestScreen').default} />
      <Stack.Screen name="HomeVolunteer" component={HomeVolunteerScreen} />
      <Stack.Screen name="EditRequest" component={EditRequestScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
