// src/screens/admin/AdminHomeScreen.tsx
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Layout, Text, Button } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

import { AdminTabParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';

type AdminHomeScreenProps = BottomTabScreenProps<AdminTabParamList, 'AdminHome'>;

const AdminHomeScreen: React.FC<AdminHomeScreenProps> = ({ navigation }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { currentChampionship } = useAppSelector((state) => state.championship);

  const handleNavigateToManagement = () => {
    navigation.navigate('ChampionshipManagement');
  };

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        Bem-vindo, {user?.name.split(' ')[0]}!
      </Text>

      {currentChampionship ? (
        <Layout style={styles.championshipContainer}>
          <Text category="h5">Campeonato Ativo:</Text>
          <Text category="h3" status="primary">
            {currentChampionship.title}
          </Text>
          <Text appearance="hint">Início: {currentChampionship.startDate}</Text>

          <Button style={styles.button} onPress={handleNavigateToManagement}>
            <Text>Gerenciar Campeonato</Text>
          </Button>
          <Button
            style={styles.button}
            appearance="outline"
            onPress={() => navigation.navigate('GameManagement')}
          >
            <Text>Gerenciar Jogos e Resultados</Text>
          </Button>
        </Layout>
      ) : (
        <Layout style={styles.noChampionshipContainer}>
          <Text category="h5" style={styles.subtitle}>
            Nenhum campeonato ativo.
          </Text>
          <Text appearance="hint" style={styles.infoText}>
            Crie o primeiro campeonato para começar a gerenciar.
          </Text>
          <Button style={styles.button} onPress={handleNavigateToManagement}>
            <Text>Criar Novo Campeonato (US002)</Text>
          </Button>
        </Layout>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    marginBottom: 30,
  },
  subtitle: {
    marginBottom: 10,
  },
  infoText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  championshipContainer: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#f7f9fc', // Cor de fundo leve para destaque
    alignItems: 'center',
  },
  noChampionshipContainer: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    marginTop: 15,
    width: '100%',
    maxWidth: 300,
  },
});

export default AdminHomeScreen;
