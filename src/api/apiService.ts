// src/api/apiService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IUser, IChampionship, ITeam, IPlayer, IGame, IClassificationRow } from '../types/models';

// --- SIMULAÇÃO DE DADOS INICIAIS ---
const MOCK_ADMIN: IUser = {
  id: 'admin-123',
  email: 'admin@copa.com',
  name: 'Admin Copa+',
  token: 'mock-jwt-token',
  isAdmin: true,
};

// Dados iniciais para simulação (serão armazenados no AsyncStorage)
const initialMockData = {
  user: MOCK_ADMIN,
  championships: [] as IChampionship[],
  teams: [] as ITeam[],
  players: [] as IPlayer[],
  games: [] as IGame[],
};

// Função utilitária para simular latência de rede
const simulateLatency = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

// Função para obter o estado atual do mock (simulando um banco de dados)
const getMockState = async () => {
  const storedData = await AsyncStorage.getItem('mockData');
  if (storedData) {
    return JSON.parse(storedData);
  }
  await AsyncStorage.setItem('mockData', JSON.stringify(initialMockData));
  return initialMockData;
};

// Função para salvar o estado atual do mock
const saveMockState = async (state: typeof initialMockData) => {
  await AsyncStorage.setItem('mockData', JSON.stringify(state));
};

// --- SERVIÇOS DE API SIMULADOS ---

// US001: Login
export const loginAdmin = async (email: string, password: string): Promise<IUser> => {
  await simulateLatency();
  if (email === MOCK_ADMIN.email && password === '123456') {
    return MOCK_ADMIN;
  } else {
    throw new Error('Usuário ou senha inválido');
  }
};

// US002: Criar Campeonato
export const createChampionship = async (
  championshipData: Omit<IChampionship, 'id' | 'teams' | 'games' | 'categories'>,
): Promise<IChampionship> => {
  await simulateLatency();
  const state = await getMockState();
  const newChampionship: IChampionship = {
    ...championshipData,
    id: `champ-${Date.now()}`,
    teams: [],
    games: [],
    categories: [],
  };
  state.championships.push(newChampionship);
  await saveMockState(state);
  return newChampionship;
};

// US009: Buscar Clubes (Simulação de busca por clube)
export const searchClubs = async (query: string): Promise<IChampionship[]> => {
  await simulateLatency(500);
  const state = await getMockState();

  // Simula que cada campeonato é um "clube" para o MVP
  const filtered = state.championships.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()),
  );

  // Adiciona um mock de clube se a lista estiver vazia para testes
  if (state.championships.length === 0) {
    return [
      {
        id: 'mock-club-1',
        title: 'Clube Social do Dev',
        startDate: '2025-12-01',
        hasCategories: true,
        logoUrl: undefined,
        categories: [],
        teams: [],
        games: [],
      },
    ];
  }

  return filtered;
};

// US010: Listar Campeonatos Ativos de um Clube
export const getActiveChampionships = async (clubId: string): Promise<IChampionship[]> => {
  await simulateLatency(500);
  const state = await getMockState();
  // No MVP, o "clube" é o campeonato. Apenas retorna a lista de campeonatos.
  return state.championships.filter((c) => c.id === clubId);
};

// Funções de API para as próximas fases (apenas stubs)
export const addCategoryToChampionship = async (
  champId: string,
  category: Omit<ICategory, 'id'>,
): Promise<ICategory> => {
  await simulateLatency();
  const newCategory: ICategory = { ...category, id: `cat-${Date.now()}` };
  // Lógica de atualização do estado
  return newCategory;
};

export const createTeam = async (teamData: Omit<ITeam, 'id'>): Promise<ITeam> => {
  await simulateLatency();
  const newTeam: ITeam = { ...teamData, id: `team-${Date.now()}` };
  // Lógica de atualização do estado
  return newTeam;
};

export const createPlayer = async (playerData: Omit<IPlayer, 'id'>): Promise<IPlayer> => {
  await simulateLatency();
  const newPlayer: IPlayer = { ...playerData, id: `player-${Date.now()}` };
  // Lógica de atualização do estado
  return newPlayer;
};

export const generateGameTable = async (categoryId: string): Promise<IGame[]> => {
  await simulateLatency();
  // Lógica de geração de jogos (a ser implementada)
  return [];
};

export const updateGameDetails = async (
  gameId: string,
  details: Partial<IGame>,
): Promise<IGame> => {
  await simulateLatency();
  // Lógica de atualização de detalhes do jogo
  return {} as IGame;
};

export const updateGameResultAndUploadVideo = async (
  gameId: string,
  result: { homeScore: number; awayScore: number; goalScorers: any[]; videoFile: any },
): Promise<IGame> => {
  await simulateLatency();
  // Lógica de atualização de resultado e upload de vídeo
  return {} as IGame;
};

export const getClassification = async (categoryId: string): Promise<IClassificationRow[]> => {
  await simulateLatency();
  // Lógica de cálculo de classificação
  return [];
};

export const getTeamDetails = async (
  teamId: string,
): Promise<{ team: ITeam; players: IPlayer[] }> => {
  await simulateLatency();
  // Lógica de obtenção de detalhes do time
  return { team: {} as ITeam, players: [] };
};
