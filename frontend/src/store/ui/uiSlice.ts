import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  themeMode: 'light' | 'dark';
  isLoading: boolean;
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  };
}

const initialState: UiState = {
  themeMode: 'light',
  isLoading: false,
  snackbar: {
    open: false,
    message: '',
    severity: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    showSnackbar: (state, action: PayloadAction<{ message: string; severity: UiState['snackbar']['severity'] }>) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
});

export const { toggleTheme, setLoading, showSnackbar, hideSnackbar } = uiSlice.actions;
export default uiSlice.reducer; 