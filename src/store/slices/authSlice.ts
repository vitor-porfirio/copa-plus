// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { loginAdmin } from '../../api/apiService';
import { IAuthState, IUser } from '../../types/models';

// Estado inicial
const initialState: IAuthState = {
  user: null,
  status: 'idle',
  error: null,
};

// Thunk para o login do administrador (US001)
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await loginAdmin(email, password);
      return user;
    } catch (error) {
      // O erro é um objeto Error, precisamos extrair a mensagem
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido no login';
      return rejectWithValue(errorMessage);
    }
  },
);

// Thunk para o logout
export const logout = createAsyncThunk('auth/logout', async () => {
  // Em um app real, faria a chamada de logout para a API
  // Aqui, apenas simulamos o sucesso
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer síncrono para limpar o erro
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Login ---
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        // O payload é a mensagem de erro que passamos no rejectWithValue
        state.error = action.payload as string;
        state.user = null;
      })
      // --- Logout ---
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
