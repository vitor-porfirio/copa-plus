// src/screens/user/ChampionshipCategoriesScreen.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

import { UserStackParamList } from '../../navigation/types';

type ChampionshipCategoriesScreenProps = NativeStackScreenProps<
  UserStackParamList,
  'ChampionshipCategories'
>;

const ChampionshipCategoriesScreen: React.FC<ChampionshipCategoriesScreenProps> = ({ route }) => {
  const { championshipId } = route.params;

  // Lógica para buscar as categorias do campeonato (será implementada na próxima fase)

  return (
    <Layout style={styles.container}>
      <Text category="h1">Categorias do Campeonato</Text>
      <Text category="p">ID do Campeonato: {championshipId}</Text>
      <Text category="p">Aqui será implementada a lista de categorias (US011).</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
});

export default ChampionshipCategoriesScreen;
