import { Box, Container, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../common/ThemeToggle';
import { CONTAINER } from '../../theme/constants';

export const AuthLayout = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : theme.palette.grey[50],
        overflow: 'hidden',
      }}
    >
      {/* Fondo decorativo */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.4,
          zIndex: 0,
          background: theme.palette.mode === 'dark'
            ? `radial-gradient(circle at 50% 50%, 
                ${theme.palette.primary.dark}20 0%, 
                ${theme.palette.background.default}20 100%
              )`
            : `radial-gradient(circle at 50% 50%, 
                ${theme.palette.primary.light}10 0%, 
                ${theme.palette.background.default}10 100%
              )`,
          pointerEvents: 'none',
        }}
      />

      {/* Theme Toggle */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        sx={{
          position: 'absolute',
          top: { xs: 12, sm: 16, md: 24 },
          right: { xs: 12, sm: 16, md: 24 },
          zIndex: 2,
        }}
      >
        <ThemeToggle />
      </Box>

      {/* Main Content */}
      <Container
        component="main"
        maxWidth={false}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 4 },
          minHeight: '100vh',
          maxWidth: {
            sm: CONTAINER.sm,
            md: CONTAINER.md,
            lg: CONTAINER.lg,
          },
          mx: 'auto',
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            width: '100%',
            maxWidth: '480px',
            mx: 'auto',
            backdropFilter: 'blur(8px)',
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgba(30, 41, 59, 0.8)'
              : 'rgba(255, 255, 255, 0.8)',
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Outlet />
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component={motion.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        sx={{
          py: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
          textAlign: 'center',
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(30, 41, 59, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          position: 'relative',
          zIndex: 1,
          mt: 'auto',
        }}
      >
        <Container 
          maxWidth={false}
          sx={{
            maxWidth: {
              sm: CONTAINER.sm,
              md: CONTAINER.md,
              lg: CONTAINER.lg,
            },
            mx: 'auto',
          }}
        >
          <Box
            component="p"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              m: 0,
            }}
          >
            © {new Date().getFullYear()} Task Manager. Todos los derechos reservados.
          </Box>
        </Container>
      </Box>
    </Box>
  );
}; 