// src/navigation/AppNavigator.tsx
import { NavigationContainer, DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useAppSelector } from '../store/hooks';

// Importa os navegadores (serão criados nas próximas fases)
import AdminTabNavigator from './AdminTabNavigator';
import AuthNavigator from './AuthNavigator';
import { RootStackParamList } from './types';
import UserStackNavigator from './UserStackNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  theme: Theme;
  linking: any;
  onReady: () => void;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ theme, linking, onReady }) => {
  // Obtém o estado de autenticação do Redux
  const { user } = useAppSelector((state) => state.auth);

  // Define o estado inicial da rota com base na autenticação
  const initialRouteName: keyof RootStackParamList = user
    ? user.isAdmin
      ? 'AdminTabs'
      : 'UserStack'
    : 'AuthStack';

  return (
    <NavigationContainer theme={theme} linking={linking} onReady={onReady}>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
        {/* Fluxo de Autenticação (Login) */}
        <Stack.Screen name="AuthStack" component={AuthNavigator} />

        {/* Fluxo do Administrador (Tabs) */}
        <Stack.Screen name="AdminTabs" component={AdminTabNavigator} />

        {/* Fluxo do Usuário (Stack) */}
        <Stack.Screen name="UserStack" component={UserStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
