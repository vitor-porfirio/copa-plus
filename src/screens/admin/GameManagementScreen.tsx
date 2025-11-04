// src/screens/admin/GameManagementScreen.tsx
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

import { AdminTabParamList } from '../../navigation/types';

type GameManagementScreenProps = BottomTabScreenProps<AdminTabParamList, 'GameManagement'>;

const GameManagementScreen: React.FC<GameManagementScreenProps> = () => {
  return (
    <Layout style={styles.container}>
      <Text category="h1">Gerenciamento de Jogos</Text>
      <Text category="p">
        Aqui será implementado o fluxo de geração de tabela, edição de detalhes e registro de
        resultados/vídeos (US006 - US008).
      </Text>
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

export default GameManagementScreen;
