// src/screens/user/ClassificationScreen.tsx
import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

const ClassificationScreen: React.FC = () => {
  return (
    <Layout style={styles.container}>
      <Text category="h2">Tabela de Classificação</Text>
      <Text category="p">Aqui será implementada a tabela de classificação (US014).</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default ClassificationScreen;
