// src/navigation/AuthNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Telas (serão criadas na próxima fase)
import LoginScreen from '../screens/auth/LoginScreen';
import RecoveryScreen from '../screens/auth/RecoveryScreen';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Recovery" component={RecoveryScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
