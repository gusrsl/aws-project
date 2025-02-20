import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Checkbox,
  useTheme,
  Tooltip,
  CardActionArea,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../../store/store';
import { taskService } from '../../../services/tasks.service';
import { showSnackbar } from '../../../store/ui/uiSlice';
import { ConfirmDialog } from '../../../components/common/ConfirmDialog';
import { TaskDialog } from './TaskDialog';
import { Task } from '../../../types/task';

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
  onDelete: (taskId: string) => Promise<void>;
}

export const TaskCard = ({ task, onUpdate, onDelete }: TaskCardProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleDone = async () => {
    try {
      setIsUpdating(true);
      await taskService.updateTask(task.taskId, { done: !task.done });
      onUpdate();
      dispatch(showSnackbar({
        message: `Tarea marcada como ${task.done ? 'pendiente' : 'completada'}`,
        severity: 'success',
      }));
    } catch (error) {
      dispatch(showSnackbar({
        message: 'Error al actualizar la tarea',
        severity: 'error',
      }));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(task.taskId);
      setOpenDeleteDialog(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenEditDialog = () => setOpenEditDialog(true);
  const handleCloseEditDialog = () => setOpenEditDialog(false);
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  return (
    <>
      <Card
        component={motion.div}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: 2,
          overflow: 'visible',
          backgroundColor: theme.palette.background.paper,
          transition: theme.transitions.create(['box-shadow', 'transform']),
          '&:hover': {
            boxShadow: theme.shadows[8],
          },
        }}
      >
        <CardActionArea 
          onClick={handleToggleDone}
          disabled={isUpdating}
          sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            p: 0,
          }}
        >
          <CardContent
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              p: 2.5,
              '&:last-child': { pb: 2.5 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ flex: 1, mr: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    textDecoration: task.done ? 'line-through' : 'none',
                    color: task.done ? 'text.secondary' : 'text.primary',
                    transition: theme.transitions.create(['color', 'text-decoration']),
                  }}
                >
                  {task.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textDecoration: task.done ? 'line-through' : 'none',
                    opacity: task.done ? 0.7 : 1,
                    transition: theme.transitions.create(['opacity', 'text-decoration']),
                  }}
                >
                  {task.description}
                </Typography>
              </Box>
              <Checkbox
                checked={task.done}
                disabled={isUpdating}
                sx={{ 
                  mt: -0.5, 
                  mr: -1,
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.3rem',
                  },
                }}
              />
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 'auto', pt: 1 }}
            >
              {new Date(task.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </CardActionArea>

        <Box
          sx={{
            position: 'absolute',
            right: -8,
            top: -8,
            display: 'flex',
            gap: 0.5,
            opacity: 0,
            transform: 'scale(0.8)',
            transition: theme.transitions.create(['opacity', 'transform']),
            '.MuiCard-root:hover &': {
              opacity: 1,
              transform: 'scale(1)',
            },
          }}
        >
          <Tooltip title="Editar tarea">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenEditDialog();
              }}
              sx={{
                bgcolor: 'background.paper',
                boxShadow: theme.shadows[2],
                '&:hover': {
                  bgcolor: 'background.paper',
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar tarea">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDeleteDialog();
              }}
              sx={{
                bgcolor: 'background.paper',
                boxShadow: theme.shadows[2],
                '&:hover': {
                  bgcolor: 'background.paper',
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>

      <TaskDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        onSuccess={onUpdate}
        task={task}
      />

      <ConfirmDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        title="Eliminar tarea"
        message="¿Estás seguro de que deseas eliminar esta tarea?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        loading={isDeleting}
      />
    </>
  );
}; 