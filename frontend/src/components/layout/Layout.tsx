import { Box, Container, AppBar, Toolbar, Typography, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../common/ThemeToggle';
import { useAppSelector } from '../../store/store';
import { NavMenu } from './NavMenu';
import { CONTAINER, HEIGHTS } from '../../theme/constants';

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
        width: '100%',
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
            ? 'rgba(15, 23, 42, 0.8)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Container 
          maxWidth={false}
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
            mx: 'auto',
            width: '100%',
            maxWidth: {
              sm: CONTAINER.sm,
              md: CONTAINER.md,
              lg: CONTAINER.lg,
            },
          }}
        >
          <Toolbar 
            sx={{ 
              justifyContent: 'space-between',
              minHeight: {
                xs: `${HEIGHTS.navbar.xs}px`,
                sm: `${HEIGHTS.navbar.sm}px`,
              },
              p: '0 !important',
              width: '100%',
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
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              Task Manager
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 1, sm: 2 } 
              }}
            >
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
          pt: {
            xs: `${HEIGHTS.navbar.xs}px`,
            sm: `${HEIGHTS.navbar.sm}px`,
          },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 3, sm: 4, md: 5 },
            width: '100%',
            maxWidth: {
              sm: CONTAINER.sm,
              md: CONTAINER.md,
              lg: CONTAINER.lg,
            },
            mx: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Outlet />
        </Container>
      </Box>

      <Box
        component={motion.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        sx={{
          py: { xs: 2, sm: 3 },
          width: '100%',
          mt: 'auto',
          textAlign: 'center',
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container 
          maxWidth={false}
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
            maxWidth: {
              sm: CONTAINER.sm,
              md: CONTAINER.md,
              lg: CONTAINER.lg,
            },
            mx: 'auto',
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            }}
          >
            © {new Date().getFullYear()} Task Manager. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}; 