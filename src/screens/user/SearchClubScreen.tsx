// src/screens/user/SearchClubScreen.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout, Text, Input, List, ListItem, Icon, Spinner } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { searchClubs } from '../../api/apiService';
import { UserStackParamList } from '../../navigation/types';
import { IChampionship } from '../../types/models';

type SearchClubScreenProps = NativeStackScreenProps<UserStackParamList, 'SearchClub'>;

const SearchClubScreen: React.FC<SearchClubScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<IChampionship[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setLoading(true);
      try {
        const clubs = await searchClubs(query);
        setResults(clubs);
      } catch (error) {
        console.error('Erro ao buscar clubes:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const handleSelectClub = (clubId: string) => {
    navigation.navigate('ClubHome', { clubId });
  };

  const renderItem = ({ item }: { item: IChampionship }) => (
    <ListItem
      title={item.title}
      description="Clube Social - São Paulo/SP (Simulado)"
      accessoryRight={(props) => <Icon {...props} name="arrow-ios-forward-outline" />}
      onPress={() => handleSelectClub(item.id)}
    />
  );

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>
        Buscar Clube
      </Text>
      <Input
        placeholder="Digite o nome do clube..."
        value={searchQuery}
        onChangeText={handleSearch}
        accessoryLeft={(props) => <Icon {...props} name="search-outline" />}
        style={styles.input}
      />

      {loading && (
        <Layout style={styles.loadingContainer}>
          <Spinner size="large" />
          <Text category="s1" style={{ marginTop: 10 }}>
            Buscando...
          </Text>
        </Layout>
      )}

      {!loading && results.length > 0 && (
        <List style={styles.list} data={results} renderItem={renderItem} />
      )}

      {!loading && searchQuery.length > 2 && results.length === 0 && (
        <Text style={styles.noResults}>Nenhum clube encontrado com o nome "{searchQuery}".</Text>
      )}

      {!loading && searchQuery.length <= 2 && (
        <Text style={styles.noResults}>Digite pelo menos 3 caracteres para buscar.</Text>
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
  input: {
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

export default SearchClubScreen;
