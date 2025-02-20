import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../../store/store';
import { taskService } from '../../../services/tasks.service';
import { showSnackbar } from '../../../store/ui/uiSlice';
import { AnimatedButton } from '../../../components/common/AnimatedButton';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  task?: {
    taskId: string;
    title: string;
    description: string;
  };
}

interface TaskForm {
  title: string;
  description: string;
}

export const TaskDialog = ({ open, onClose, onSuccess, task }: TaskDialogProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isEditing = !!task;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskForm>({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
    },
  });

  const onSubmit = async (data: TaskForm) => {
    try {
      if (isEditing && task) {
        await taskService.updateTask(task.taskId, data);
        dispatch(showSnackbar({
          message: 'Tarea actualizada correctamente',
          severity: 'success',
        }));
      } else {
        await taskService.createTask(data);
        dispatch(showSnackbar({
          message: 'Tarea creada correctamente',
          severity: 'success',
        }));
      }
      onSuccess();
      handleClose();
    } catch (error) {
      dispatch(showSnackbar({
        message: `Error al ${isEditing ? 'actualizar' : 'crear'} la tarea`,
        severity: 'error',
      }));
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          transition: { duration: 0.2 },
        }
      }}
      maxWidth="sm"
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
        {isEditing ? 'Editar Tarea' : 'Nueva Tarea'}
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
        <form id="task-form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            margin="normal"
            label="Título"
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register('title', {
              required: 'El título es requerido',
              minLength: {
                value: 3,
                message: 'El título debe tener al menos 3 caracteres',
              },
            })}
          />
          <TextField
            margin="normal"
            label="Descripción"
            fullWidth
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description', {
              required: 'La descripción es requerida',
              minLength: {
                value: 10,
                message: 'La descripción debe tener al menos 10 caracteres',
              },
            })}
          />
        </form>
      </DialogContent>

      <DialogActions 
        sx={{ 
          px: 3, 
          py: 2,
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'none',
        }}
      >
        <AnimatedButton
          onClick={handleClose}
          variant="outlined"
          color="primary"
        >
          Cancelar
        </AnimatedButton>
        <AnimatedButton
          type="submit"
          form="task-form"
          variant="contained"
          color="primary"
        >
          {isEditing ? 'Actualizar' : 'Crear'}
        </AnimatedButton>
      </DialogActions>
    </Dialog>
  );
}; 