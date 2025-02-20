import { Box, Container, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../common/ThemeToggle';

export const AuthLayout = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : theme.palette.grey[50],
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1,
        }}
      >
        <ThemeToggle />
      </Box>

      <Container
        component="main"
        maxWidth={false}
        disableGutters
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 4 },
        }}
      >
        <Outlet />
      </Container>

      <Box
        component={motion.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        sx={{
          py: 2,
          textAlign: 'center',
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="xl">
          <Box
            component="p"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.875rem',
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