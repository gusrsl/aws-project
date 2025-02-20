import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { store } from './store/store';
import { theme } from './theme/theme';
import { useAppSelector } from './store/store';
import { AppRoutes } from './routes/AppRoutes';
import { LoadingSpinner } from './components/common/LoadingSpinner';

const ThemedApp = () => {
  const { themeMode, isLoading } = useAppSelector((state) => state.ui);
  const currentTheme = theme(themeMode);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <BrowserRouter>
        {isLoading && <LoadingSpinner />}
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={3000}
      >
        <ThemedApp />
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
