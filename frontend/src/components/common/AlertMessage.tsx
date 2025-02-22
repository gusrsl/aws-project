import { Alert, AlertTitle, Box, Collapse } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Z_INDEX } from '../../theme/constants';

interface AlertMessageProps {
  message: string;
  title?: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  onClose?: () => void;
  autoHideDuration?: number;
}

export const AlertMessage = ({
  message,
  title,
  severity,
  onClose,
  autoHideDuration = 6000,
}: AlertMessageProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (autoHideDuration && onClose) {
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 24 },
            zIndex: Z_INDEX.snackbar,
            width: { xs: 'calc(100% - 32px)', sm: '400px' },
            maxWidth: '100%',
            pointerEvents: 'all',
          }}
        >
          <Collapse in={show}>
            <Alert
              severity={severity}
              onClose={() => setShow(false)}
              sx={{
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 8px 16px -4px rgba(0, 0, 0, 0.3)'
                    : '0 8px 16px -4px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
                backdropFilter: 'blur(8px)',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(30, 41, 59, 0.95)'
                    : 'rgba(255, 255, 255, 0.95)',
                border: '1px solid',
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                '& .MuiAlert-icon': {
                  fontSize: '24px',
                },
                '& .MuiAlert-message': {
                  width: '100%',
                },
                '& .MuiAlert-action': {
                  paddingTop: 0,
                },
              }}
            >
              {title && (
                <AlertTitle sx={{ fontWeight: 600, mb: 0.5 }}>
                  {title}
                </AlertTitle>
              )}
              {message}
            </Alert>
          </Collapse>
        </Box>
      )}
    </AnimatePresence>
  );
}; 