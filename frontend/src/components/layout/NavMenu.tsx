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
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Person as PersonIcon,
  List as ListIcon,
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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            width: 35,
            height: 35,
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
                borderRadius: 8,
                marginTop: 8,
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={user?.name || 'Usuario'} />
            </MenuItem>
            <MenuItem onClick={handleTasks}>
              <ListItemIcon>
                <ListIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Mis Tareas" />
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </MenuItem>
          </Menu>
        )}
      </AnimatePresence>
    </>
  );
}; 