import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface AnimatedButtonProps extends ButtonProps {
  whileHoverScale?: number;
  whileTapScale?: number;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ whileHoverScale = 1.05, whileTapScale = 0.95, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        component={motion.button}
        whileHover={{ 
          scale: whileHoverScale,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
        whileTap={{ 
          scale: whileTapScale,
        }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 10
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
); 