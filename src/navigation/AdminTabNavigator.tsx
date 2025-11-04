// src/navigation/AdminTabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import React from 'react';

// Telas (serão criadas nas próximas fases)
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import ChampionshipManagementScreen from '../screens/admin/ChampionshipManagementScreen';
import GameManagementScreen from '../screens/admin/GameManagementScreen';
import SettingsScreen from '../screens/admin/SettingsScreen';

import { AdminTabParamList } from './types';

const Tab = createBottomTabNavigator<AdminTabParamList>();

// Componente de navegação inferior customizado com UI Kitten
const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Início" icon={(props) => <Icon {...props} name="home-outline" />} />
    <BottomNavigationTab
      title="Campeonato"
      icon={(props) => <Icon {...props} name="settings-2-outline" />}
    />
    <BottomNavigationTab
      title="Jogos"
      icon={(props) => <Icon {...props} name="calendar-outline" />}
    />
    <BottomNavigationTab
      title="Config."
      icon={(props) => <Icon {...props} name="options-2-outline" />}
    />
  </BottomNavigation>
);

const AdminTabNavigator = () => (
  <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Tab.Screen name="AdminHome" component={AdminHomeScreen} options={{ headerShown: false }} />
    <Tab.Screen
      name="ChampionshipManagement"
      component={ChampionshipManagementScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="GameManagement"
      component={GameManagementScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default AdminTabNavigator;
