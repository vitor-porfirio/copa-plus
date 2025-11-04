// src/screens/admin/SettingsScreen.tsx
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Layout, Text, Button } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

import { AdminTabParamList } from '../../navigation/types';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';

type SettingsScreenProps = BottomTabScreenProps<AdminTabParamList, 'Settings'>;

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout style={styles.container}>
      <Text category="h1">Configurações</Text>
      <Text category="p">Opções de configuração do aplicativo e do administrador.</Text>

      <Button style={styles.button} status="danger" onPress={handleLogout}>
        Sair (Logout)
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  button: {
    marginTop: 30,
  },
});

export default SettingsScreen;
