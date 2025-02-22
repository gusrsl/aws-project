import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  useTheme,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  List as ListIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { logout } from '../../store/auth/authSlice';

export const NavMenu = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/login');
  };

  const handleTasks = () => {
    navigate('/tasks');
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleMenu}
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        sx={{
          p: 0.5,
          border: `2px solid ${theme.palette.primary.main}`,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Avatar
          sx={{
            width: 35,
            height: 35,
            bgcolor: theme.palette.primary.main,
            fontSize: '1.2rem',
            fontWeight: 600,
          }}
        >
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </Avatar>
      </IconButton>
      <AnimatePresence>
        {Boolean(anchorEl) && (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              component: motion.div,
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 },
              style: {
                transformOrigin: 'top right',
                minWidth: '250px',
                borderRadius: '12px',
                marginTop: '8px',
                overflow: 'visible',
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(30, 41, 59, 0.95)'
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {user?.name || 'Usuario'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem 
              onClick={handleTasks}
              sx={{ 
                py: 1.5,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              <ListItemIcon>
                <ListIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Mis Tareas" />
            </MenuItem>
            <MenuItem 
              onClick={handleClose}
              sx={{ 
                py: 1.5,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Configuración" />
            </MenuItem>
            <Divider />
            <MenuItem 
              onClick={handleLogout}
              sx={{ 
                py: 1.5,
                color: theme.palette.error.main,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </MenuItem>
          </Menu>
        )}
      </AnimatePresence>
    </>
  );
}; 