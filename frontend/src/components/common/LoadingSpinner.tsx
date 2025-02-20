import { Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999,
      }}
    >
      <Box
        component={motion.div}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <CircularProgress />
      </Box>
    </Box>
  );
}; 