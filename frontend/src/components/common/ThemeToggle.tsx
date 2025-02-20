import { IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../store/store';
import { toggleTheme } from '../../store/ui/uiSlice';

export const ThemeToggle = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <motion.div
      initial={false}
      animate={{ rotate: theme.palette.mode === 'dark' ? 180 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <IconButton
        onClick={handleToggle}
        color="inherit"
        sx={{
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {theme.palette.mode === 'dark' ? (
          <Brightness7 sx={{ transition: 'all 0.3s ease' }} />
        ) : (
          <Brightness4 sx={{ transition: 'all 0.3s ease' }} />
        )}
      </IconButton>
    </motion.div>
  );
}; 