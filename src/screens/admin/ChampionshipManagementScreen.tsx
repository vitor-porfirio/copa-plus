// src/screens/admin/ChampionshipManagementScreen.tsx
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Layout, Text, Button, Card, Icon } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { AdminTabParamList } from '../../navigation/types';
import { useAppSelector } from '../../store/hooks';

import ChampionshipForm from './ChampionshipForm';

type ChampionshipManagementScreenProps = BottomTabScreenProps<
  AdminTabParamList,
  'ChampionshipManagement'
>;

const ChampionshipManagementScreen: React.FC<ChampionshipManagementScreenProps> = () => {
  const { currentChampionship } = useAppSelector((state) => state.championship);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreationSuccess = () => {
    setIsCreating(false);
  };

  if (isCreating) {
    return (
      <Layout style={styles.container}>
        <ScrollView>
          <Button
            appearance="ghost"
            accessoryLeft={(props) => <Icon {...props} name="arrow-back-outline" />}
            onPress={() => setIsCreating(false)}
            style={styles.backButton}
          >
            Voltar
          </Button>
          <ChampionshipForm onSuccess={handleCreationSuccess} />
        </ScrollView>
      </Layout>
    );
  }

  if (!currentChampionship) {
    return (
      <Layout style={styles.container}>
        <Text category="h1" style={styles.title}>
          Gerenciamento de Campeonato
        </Text>
        <Card style={styles.card}>
          <Text category="h5" style={styles.subtitle}>
            Nenhum campeonato ativo.
          </Text>
          <Text appearance="hint" style={styles.infoText}>
            Clique abaixo para criar o primeiro campeonato.
          </Text>
          <Button onPress={() => setIsCreating(true)}>Criar Novo Campeonato (US002)</Button>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        Gerenciar: {currentChampionship.title}
      </Text>

      <Card style={styles.card}>
        <Text category="h5" style={styles.subtitle}>
          Estrutura
        </Text>
        <Button appearance="outline" style={styles.button}>
          Gerenciar Categorias (US003)
        </Button>
        <Button appearance="outline" style={styles.button}>
          Gerenciar Times (US004)
        </Button>
        <Button appearance="outline" style={styles.button}>
          Gerenciar Jogadores (US005)
        </Button>
      </Card>
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
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  subtitle: {
    marginBottom: 10,
  },
  infoText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});

export default ChampionshipManagementScreen;
