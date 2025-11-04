// src/screens/user/GamesAndResultsScreen.tsx
import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

const GamesAndResultsScreen: React.FC = () => {
  return (
    <Layout style={styles.container}>
      <Text category="h2">Jogos e Resultados</Text>
      <Text category="p">Aqui será implementada a linha do tempo de partidas (US013).</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default GamesAndResultsScreen;
