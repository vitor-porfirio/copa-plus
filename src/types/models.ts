// src/types/models.ts

/**
 * Tipos de Entidades
 */

// Usuário Administrador (US001)
export interface IUser {
  id: string;
  email: string;
  name: string;
  token: string; // Para simular a autenticação
  isAdmin: boolean;
}

// Categoria do Campeonato (US003)
export type CategoryType = 'Pontos Corridos' | 'Grupos' | 'Mata-Mata';
export type CategoryGender = 'Masculino' | 'Feminino' | 'Misto';

export interface ICategory {
  id: string;
  name: string;
  type: CategoryType;
  gender: CategoryGender;
  format: 'Liga' | 'Copa'; // Exemplo: Liga (Pontos Corridos), Copa (Mata-Mata)
  numTeams: number;
  numGroups?: number; // Visível e obrigatório se type for 'Grupos'
  knockoutStart: 'Oitavas' | 'Quartas' | 'Semi' | 'Final'; // Início do Mata-Mata
}

// Time (US004)
export interface ITeam {
  id: string;
  name: string;
  initials: string; // Sigla
  logoUrl: string; // Opcional
  categoryIds: string[]; // Categorias em que o time está inscrito
}

// Jogador (US005)
export interface IPlayer {
  id: string;
  name: string;
  jerseyNumber: number;
  teamId: string;
  categoryId: string; // Categoria específica em que o jogador está inscrito
}

// Vídeo (US008)
export interface IVideo {
  id: string;
  gameId: string;
  title: string; // Ex: "Gol de Fulano"
  url: string; // URL simulada do vídeo
  uploadDate: string;
}

// Partida (US006, US007, US008)
export interface IGame {
  id: string;
  categoryId: string;
  round: number;
  homeTeamId: string;
  awayTeamId: string;
  date: string; // Data da partida
  time: string; // Hora da partida
  field: string; // Campo
  referee: string; // Árbitro
  status: 'scheduled' | 'finished';
  // Resultados (apenas se status === 'finished')
  homeScore?: number;
  awayScore?: number;
  goalScorers?: {
    playerId: string;
    teamId: string;
    time: string; // Ex: '15' (minuto)
  }[];
  videos: IVideo[]; // Vídeos de gols/jogadas (US008)
}

// Campeonato (US002)
export interface IChampionship {
  id: string;
  title: string;
  startDate: string;
  hasCategories: boolean;
  logoUrl?: string; // Opcional
  categories: ICategory[];
  teams: ITeam[];
  games: IGame[];
}

// Simulação de Classificação (US014)
export interface IClassificationRow {
  position: number;
  teamId: string;
  points: number; // P
  gamesPlayed: number; // J
  wins: number; // V
  draws: number; // E
  losses: number; // D
  goalDifference: number; // SG
}

// Tipos de Estado
export interface IAuthState {
  user: IUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface IChampionshipState {
  championships: IChampionship[];
  currentChampionship: IChampionship | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface IDataState {
  teams: ITeam[];
  players: IPlayer[];
  games: IGame[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
