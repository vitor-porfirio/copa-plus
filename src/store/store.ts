// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import championshipReducer from './slices/championshipSlice';
import dataReducer from './slices/dataSlice';

// Configuração da store do Redux
export const store = configureStore({
  reducer: {
    auth: authReducer,
    championship: championshipReducer,
    data: dataReducer,
    // Outros reducers serão adicionados aqui
  },
  // Middleware padrão do Redux Toolkit já inclui o redux-thunk
  // e é configurado para ser mais eficiente.
});

// Tipagem da RootState e AppDispatch para uso com TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
