// src/screens/user/GameDetailsScreen.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

import { UserStackParamList } from '../../navigation/types';

type GameDetailsScreenProps = NativeStackScreenProps<UserStackParamList, 'GameDetails'>;

const GameDetailsScreen: React.FC<GameDetailsScreenProps> = ({ route }) => {
  const { gameId } = route.params;

  return (
    <Layout style={styles.container}>
      <Text category="h1">Detalhes da Partida</Text>
      <Text category="p">ID da Partida: {gameId}</Text>
      <Text category="p">Aqui será implementada a visualização dos detalhes e vídeos (US016).</Text>
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

export default GameDetailsScreen;
