// src/screens/user/TeamDetailsScreen.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

import { UserStackParamList } from '../../navigation/types';

type TeamDetailsScreenProps = NativeStackScreenProps<UserStackParamList, 'TeamDetails'>;

const TeamDetailsScreen: React.FC<TeamDetailsScreenProps> = ({ route }) => {
  const { teamId } = route.params;

  return (
    <Layout style={styles.container}>
      <Text category="h1">Detalhes do Time</Text>
      <Text category="p">ID do Time: {teamId}</Text>
      <Text category="p">Aqui será implementada a lista de jogadores e estatísticas (US017).</Text>
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

export default TeamDetailsScreen;
