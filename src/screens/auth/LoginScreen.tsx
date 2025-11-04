// src/screens/auth/LoginScreen.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Layout, Input, Button, Text, Card, Spinner } from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { RootStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, clearError } from '../../store/slices/authSlice';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'AuthStack'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { status, error, user } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('admin@copa.com');
  const [password, setPassword] = useState('123456');

  const isLoading = status === 'loading';

  useEffect(() => {
    // Se o login for bem-sucedido e o usuário for admin, navega para a tela de admin
    if (status === 'succeeded' && user && user.isAdmin) {
      // O AppNavigator já lida com a navegação para AdminTabs, mas podemos forçar aqui
      // para garantir que o fluxo de navegação seja limpo.
      navigation.replace('AdminTabs');
    }
  }, [status, user, navigation]);

  const handleLogin = () => {
    dispatch(clearError());
    dispatch(login({ email, password }));
  };

  const handleRecovery = () => {
    // Navega para a tela de recuperação de senha (US001 - Critério de Aceitação)
    navigation.navigate('Recovery');
  };

  return (
    <Layout style={styles.container}>
      <Card
        style={styles.card}
        header={() => (
          <Text category="h4" style={styles.header}>
            Login do Administrador
          </Text>
        )}
      >
        <Input
          label="E-mail"
          placeholder="admin@clube.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <Input
          label="Senha"
          placeholder="******"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {error && (
          <Text style={styles.errorText} status="danger">
            {error}
          </Text>
        )}

        <Button
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
          accessoryLeft={isLoading ? () => <Spinner size="small" status="basic" /> : undefined}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>

        <Button
          style={styles.recoveryButton}
          appearance="ghost"
          onPress={handleRecovery}
          disabled={isLoading}
        >
          Recuperar senha
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
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  recoveryButton: {
    marginTop: 10,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default LoginScreen;
