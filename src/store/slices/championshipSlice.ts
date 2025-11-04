// src/store/slices/championshipSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { createChampionship } from '../../api/apiService';
import { IChampionshipState, IChampionship } from '../../types/models';

// Estado inicial
const initialState: IChampionshipState = {
  championships: [],
  currentChampionship: null,
  status: 'idle',
  error: null,
};

// Thunk para criar um novo campeonato (US002)
export const createNewChampionship = createAsyncThunk(
  'championship/create',
  async (
    championshipData: Omit<IChampionship, 'id' | 'teams' | 'games' | 'categories'>,
    { rejectWithValue },
  ) => {
    try {
      const newChampionship = await createChampionship(championshipData);
      return newChampionship;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erro desconhecido ao criar campeonato';
      return rejectWithValue(errorMessage);
    }
  },
);

const championshipSlice = createSlice({
  name: 'championship',
  initialState,
  reducers: {
    // Reducer síncrono para definir o campeonato atual
    setCurrentChampionship: (state, action: PayloadAction<IChampionship | null>) => {
      state.currentChampionship = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Criar Campeonato ---
      .addCase(createNewChampionship.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createNewChampionship.fulfilled, (state, action: PayloadAction<IChampionship>) => {
        state.status = 'succeeded';
        state.championships.push(action.payload);
        state.currentChampionship = action.payload; // Define o recém-criado como atual
        state.error = null;
      })
      .addCase(createNewChampionship.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentChampionship } = championshipSlice.actions;

export default championshipSlice.reducer;
