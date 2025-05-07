// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './context/UserContext';
import AuthStack from './navigation/AuthStack';

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </UserProvider>
  );
}
