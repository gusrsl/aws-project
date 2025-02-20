import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  useTheme,
  CircularProgress,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  loading = false,
}: ConfirmDialogProps) => {
  const theme = useTheme();

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          PaperProps={{
            component: motion.div,
            style: {
              borderRadius: 12,
              backgroundColor: theme.palette.background.paper,
              backgroundImage: 'none',
            },
            sx: {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 },
            }
          }}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle 
            sx={{ 
              m: 0, 
              p: 2, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                color: theme.palette.grey[500],
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent 
            dividers
            sx={{
              backgroundColor: theme.palette.background.paper,
              backgroundImage: 'none',
            }}
          >
            <Typography>{message}</Typography>
          </DialogContent>
          <DialogActions 
            sx={{ 
              px: 3, 
              py: 2,
              backgroundColor: theme.palette.background.paper,
              backgroundImage: 'none',
            }}
          >
            <Button
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              variant="outlined"
              color="primary"
              disabled={loading}
            >
              {cancelText}
            </Button>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onConfirm}
              variant="contained"
              color="error"
              disabled={loading}
              sx={{ position: 'relative' }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    color: theme.palette.error.contrastText,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              ) : (
                confirmText
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
}; 