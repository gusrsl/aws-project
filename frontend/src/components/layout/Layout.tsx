import { Box, Container, AppBar, Toolbar, Typography, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../common/ThemeToggle';
import { useAppSelector } from '../../store/store';
import { NavMenu } from './NavMenu';

export const Layout = () => {
  const theme = useTheme();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundColor: theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : theme.palette.grey[50],
      }}
    >
      <AppBar 
        position="fixed"
        component={motion.header}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        elevation={0}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(18, 18, 18, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            sx={{ 
              justifyContent: 'space-between',
              minHeight: { xs: '64px', sm: '70px' },
              px: { xs: 2, sm: 3 },
            }}
          >
            <Typography
              variant="h6"
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              sx={{ 
                color: theme.palette.text.primary,
                fontWeight: 700,
                letterSpacing: 1,
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
              }}
            >
              Task Manager
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <NavMenu />
              <ThemeToggle />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          pt: { xs: '64px', sm: '70px' }, // Altura del AppBar
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Outlet />
        </Box>
      </Box>

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
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Task Manager. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}; 