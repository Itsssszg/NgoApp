import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { TabParamList } from '../types/Navigation';
import HomeScreen from '../screens/HomeScreen';
import DonorScreen from '../screens/DonorScreen';
import NGOScreen from '../screens/NGOScreen';
import VolunteerScreen from '../screens/VolunteerScreen';
import AddRequestScreen from '../screens/AddRequestScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Donor" component={DonorScreen} />
      <Tab.Screen name="NGO" component={NGOScreen} />
      <Tab.Screen name="Volunteer" component={VolunteerScreen} />
      <Tab.Screen name="AddRequest" component={AddRequestScreen} />

    </Tab.Navigator>
  );
};

export default TabNavigator;
