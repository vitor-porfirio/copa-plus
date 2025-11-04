// src/screens/user/TeamsScreen.tsx
import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

const TeamsScreen: React.FC = () => {
  return (
    <Layout style={styles.container}>
      <Text category="h2">Times Participantes</Text>
      <Text category="p">Aqui será implementada a lista de times (US015).</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default TeamsScreen;
