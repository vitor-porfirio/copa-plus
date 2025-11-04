// src/navigation/UserStackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Telas (serão criadas nas próximas fases)
import ChampionshipCategoriesScreen from '../screens/user/ChampionshipCategoriesScreen';
import ClubHomeScreen from '../screens/user/ClubHomeScreen';
import GameDetailsScreen from '../screens/user/GameDetailsScreen';
import SearchClubScreen from '../screens/user/SearchClubScreen';
import TeamDetailsScreen from '../screens/user/TeamDetailsScreen';

import CategoryTabNavigator from './CategoryTabNavigator';
import { UserStackParamList } from './types';

const Stack = createNativeStackNavigator<UserStackParamList>();

const UserStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchClub" component={SearchClubScreen} />
    <Stack.Screen name="ClubHome" component={ClubHomeScreen} />
    <Stack.Screen name="ChampionshipCategories" component={ChampionshipCategoriesScreen} />
    <Stack.Screen name="CategoryTabs" component={CategoryTabNavigator} />
    <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
    <Stack.Screen name="TeamDetails" component={TeamDetailsScreen} />
  </Stack.Navigator>
);

export default UserStackNavigator;
