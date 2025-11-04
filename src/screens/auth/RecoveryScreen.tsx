// src/screens/auth/RecoveryScreen.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout, Input, Button, Text, Card } from '@ui-kitten/components';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { RootStackParamList } from '../../navigation/types';

type RecoveryScreenProps = NativeStackScreenProps<RootStackParamList, 'AuthStack'>;

const RecoveryScreen: React.FC<RecoveryScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRecovery = () => {
    // Simulação de envio de e-mail de recuperação
    if (email.includes('@')) {
      setMessage(`Um link de recuperação foi enviado para ${email}.`);
    } else {
      setMessage('Por favor, insira um e-mail válido.');
    }
  };

  return (
    <Layout style={styles.container}>
      <Card
        style={styles.card}
        header={() => (
          <Text category="h4" style={styles.header}>
            Recuperar Senha
          </Text>
        )}
      >
        <Text style={styles.infoText}>
          Insira seu e-mail para receber um link de recuperação de senha.
        </Text>
        <Input
          label="E-mail"
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        {message ? (
          <Text
            style={styles.messageText}
            status={message.includes('enviado') ? 'success' : 'danger'}
          >
            {message}
          </Text>
        ) : null}

        <Button style={styles.button} onPress={handleRecovery} disabled={!email}>
          Enviar Link
        </Button>

        <Button style={styles.backButton} appearance="ghost" onPress={() => navigation.goBack()}>
          Voltar para o Login
        </Button>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  header: {
    padding: 16,
    textAlign: 'center',
  },
  infoText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  backButton: {
    marginTop: 10,
  },
  messageText: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default RecoveryScreen;
