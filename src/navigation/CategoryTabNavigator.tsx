// src/navigation/CategoryTabNavigator.tsx
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';

// Telas (serão criadas nas próximas fases)
import ClassificationScreen from '../screens/user/ClassificationScreen';
import GamesAndResultsScreen from '../screens/user/GamesAndResultsScreen';
import TeamsScreen from '../screens/user/TeamsScreen';

import { UserStackParamList } from './types';

// O Material Top Tabs é ideal para navegação entre abas dentro de uma tela
const Tab = createMaterialTopTabNavigator();

const CategoryTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#0095ff',
      tabBarInactiveTintColor: '#8F9BB3',
      tabBarIndicatorStyle: { backgroundColor: '#0095ff' },
      tabBarStyle: { backgroundColor: '#FFFFFF' },
    }}
  >
    <Tab.Screen name="Jogos e Resultados" component={GamesAndResultsScreen} />
    <Tab.Screen name="Tabela" component={ClassificationScreen} />
    <Tab.Screen name="Times" component={TeamsScreen} />
  </Tab.Navigator>
);

export default CategoryTabNavigator;
