// src/store/slices/dataSlice.ts
import { createSlice } from '@reduxjs/toolkit';

import { IDataState } from '../../types/models';

// Estado inicial
const initialState: IDataState = {
  teams: [],
  players: [],
  games: [],
  status: 'idle',
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Reducers síncronos para manipulação de dados (se necessário)
  },
  extraReducers: (builder) => {
    // Adicionar extraReducers para thunks de times, jogadores e jogos nas próximas fases
  },
});

// export const { } = dataSlice.actions;

export default dataSlice.reducer;
