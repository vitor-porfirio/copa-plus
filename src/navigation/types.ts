// src/navigation/types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

// Tipagem para as rotas do Admin (Bottom Tabs)
export type AdminTabParamList = {
  AdminHome: undefined;
  ChampionshipManagement: undefined;
  GameManagement: undefined;
  Settings: undefined;
};

// Tipagem para as rotas do Usuário (Stack)
export type UserStackParamList = {
  SearchClub: undefined;
  ClubHome: { clubId: string };
  ChampionshipCategories: { championshipId: string };
  CategoryTabs: { categoryId: string };
  GameDetails: { gameId: string };
  TeamDetails: { teamId: string };
};

// Tipagem para as rotas principais (Root Stack)
export type RootStackParamList = {
  AuthStack: undefined;
  AdminTabs: NavigatorScreenParams<AdminTabParamList>;
  UserStack: NavigatorScreenParams<UserStackParamList>;
};

// Tipagem para o componente de navegação principal
// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
