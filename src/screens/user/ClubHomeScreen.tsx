// src/screens/user/ClubHomeScreen.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout, Text, List, ListItem, Icon, Spinner } from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { getActiveChampionships } from '../../api/apiService';
import { UserStackParamList } from '../../navigation/types';
import { IChampionship } from '../../types/models';

type ClubHomeScreenProps = NativeStackScreenProps<UserStackParamList, 'ClubHome'>;

const ClubHomeScreen: React.FC<ClubHomeScreenProps> = ({ route, navigation }) => {
  const { clubId } = route.params;
  const [championships, setChampionships] = useState<IChampionship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChampionships = async () => {
      try {
        const activeChampionships = await getActiveChampionships(clubId);
        setChampionships(activeChampionships);
      } catch (error) {
        console.error('Erro ao buscar campeonatos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChampionships();
  }, [clubId]);

  const handleSelectChampionship = (championshipId: string) => {
    navigation.navigate('ChampionshipCategories', { championshipId });
  };

  const renderItem = ({ item }: { item: IChampionship }) => (
    <ListItem
      title={item.title}
      description={`Início: ${item.startDate}`}
      accessoryRight={(props) => <Icon {...props} name="arrow-ios-forward-outline" />}
      onPress={() => handleSelectChampionship(item.id)}
    />
  );

  if (loading) {
    return (
      <Layout style={styles.loadingContainer}>
        <Spinner size="large" />
        <Text category="s1" style={{ marginTop: 10 }}>
          Carregando Campeonatos...
        </Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        Campeonatos Ativos
      </Text>

      {championships.length > 0 ? (
        <List style={styles.list} data={championships} renderItem={renderItem} />
      ) : (
        <Text style={styles.noResults}>Nenhum campeonato ativo neste clube.</Text>
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
    marginBottom: 20,
  },
  list: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    color: '#8F9BB3',
  },
});

export default ClubHomeScreen;
