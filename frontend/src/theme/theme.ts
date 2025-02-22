import { createTheme, alpha } from '@mui/material/styles';

export const theme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#2563eb' : '#60a5fa',
      light: mode === 'light' ? '#3b82f6' : '#93c5fd',
      dark: mode === 'light' ? '#1d4ed8' : '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: mode === 'light' ? '#7c3aed' : '#a78bfa',
      light: mode === 'light' ? '#8b5cf6' : '#c4b5fd',
      dark: mode === 'light' ? '#6d28d9' : '#7c3aed',
      contrastText: '#ffffff',
    },
    error: {
      main: mode === 'light' ? '#dc2626' : '#f87171',
      light: mode === 'light' ? '#ef4444' : '#fca5a5',
      dark: mode === 'light' ? '#b91c1c' : '#dc2626',
    },
    warning: {
      main: mode === 'light' ? '#d97706' : '#fbbf24',
      light: mode === 'light' ? '#f59e0b' : '#fcd34d',
      dark: mode === 'light' ? '#b45309' : '#d97706',
    },
    info: {
      main: mode === 'light' ? '#0891b2' : '#22d3ee',
      light: mode === 'light' ? '#06b6d4' : '#67e8f9',
      dark: mode === 'light' ? '#0e7490' : '#0891b2',
    },
    success: {
      main: mode === 'light' ? '#059669' : '#34d399',
      light: mode === 'light' ? '#10b981' : '#6ee7b7',
      dark: mode === 'light' ? '#047857' : '#059669',
    },
    background: {
      default: mode === 'light' ? '#f8fafc' : '#0f172a',
      paper: mode === 'light' ? '#ffffff' : '#1e293b',
    },
    text: {
      primary: mode === 'light' ? '#1e293b' : '#f8fafc',
      secondary: mode === 'light' ? '#64748b' : '#cbd5e1',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: mode === 'dark' ? '#374151 #111827' : '#cbd5e1 #f1f5f9',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: mode === 'dark' ? '#374151' : '#cbd5e1',
            border: '2px solid transparent',
            backgroundClip: 'content-box',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            backgroundColor: mode === 'dark' ? '#111827' : '#f1f5f9',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          boxShadow: mode === 'light'
            ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
            : '0 1px 3px 0 rgb(0 0 0 / 0.25), 0 1px 2px -1px rgb(0 0 0 / 0.25)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'light'
              ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
              : '0 10px 15px -3px rgb(0 0 0 / 0.25), 0 4px 6px -4px rgb(0 0 0 / 0.25)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              : '0 4px 6px -1px rgb(0 0 0 / 0.25), 0 2px 4px -2px rgb(0 0 0 / 0.25)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: mode === 'light' ? alpha('#2563eb', 0.5) : alpha('#60a5fa', 0.5),
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 2px ${mode === 'light' ? alpha('#2563eb', 0.2) : alpha('#60a5fa', 0.2)}`,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: mode === 'light'
            ? '0 25px 50px -12px rgb(0 0 0 / 0.25)'
            : '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
}); 