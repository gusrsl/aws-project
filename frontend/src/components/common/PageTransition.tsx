import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </Box>
  );
}; 