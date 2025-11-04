// src/App.tsx
import * as eva from '@eva-design/eva';
import { Assets as NavigationAssets } from '@react-navigation/elements';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Asset } from 'expo-asset';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator'; // Componente de navegação principal
import { store } from './store/store';
import { default as customTheme } from './styles/custom-theme.json'; // Tema customizado (será criado)

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL('/');

// Função para mapear o tema do sistema para o tema do UI Kitten e React Navigation
const getTheme = (colorScheme: 'light' | 'dark' | null | undefined) => {
  const isDark = colorScheme === 'dark';

  // 1. Tema UI Kitten (Eva + Custom)
  const uiKittenTheme = isDark ? { ...eva.dark, ...customTheme } : { ...eva.light, ...customTheme };

  // 2. Tema React Navigation (para cores de fundo e texto nativas)
  const reactNavigationTheme = isDark ? DarkTheme : DefaultTheme;

  return { uiKittenTheme, reactNavigationTheme };
};

export function App() {
  const colorScheme = useColorScheme();
  const { uiKittenTheme, reactNavigationTheme } = getTheme(colorScheme);

  return (
    <>
      {/* 1. Icon Registry para o UI Kitten */}
      <IconRegistry icons={EvaIconsPack} />

      {/* 2. Redux Provider */}
      <Provider store={store}>
        {/* 3. UI Kitten Application Provider */}
        <ApplicationProvider {...eva} theme={uiKittenTheme}>
          {/* 4. Componente de Navegação Principal (usa o tema do React Navigation) */}
          <AppNavigator
            theme={reactNavigationTheme}
            linking={{
              enabled: 'auto',
              prefixes: [prefix],
            }}
            onReady={() => {
              SplashScreen.hideAsync();
            }}
          />
        </ApplicationProvider>
      </Provider>
    </>
  );
}

export default App;
