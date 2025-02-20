import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Fab,
  useTheme,
  Zoom,
  Paper,
  Stack,
  useMediaQuery,
  Container,
  Divider,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { taskService } from '../../services/tasks.service';
import { setTasks, deleteTask as deleteTaskAction } from '../../store/tasks/tasksSlice';
import { showSnackbar } from '../../store/ui/uiSlice';
import { TaskCard } from './components/TaskCard';
import { TaskDialog } from './components/TaskDialog';
import { TaskFilters } from './components/TaskFilters';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const TasksPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const { tasks, filter, sortBy, sortOrder } = useAppSelector((state) => state.tasks);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasksData = await taskService.getAllTasks();
      dispatch(setTasks(tasksData));
    } catch (error) {
      dispatch(showSnackbar({
        message: 'Error al cargar las tareas',
        severity: 'error',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
      dispatch(deleteTaskAction(taskId));
      dispatch(showSnackbar({
        message: 'Tarea eliminada correctamente',
        severity: 'success',
      }));
    } catch (error) {
      dispatch(showSnackbar({
        message: 'Error al eliminar la tarea',
        severity: 'error',
      }));
      // Recargar las tareas en caso de error para asegurar sincronización
      loadTasks();
    }
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const filteredAndSortedTasks = tasks
    .filter(task => {
      if (filter === 'completed') return task.done;
      if (filter === 'pending') return !task.done;
      return true;
    })
    .sort((a, b) => {
      const compareValue = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'date') {
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * compareValue;
      }
      return a.title.localeCompare(b.title) * compareValue;
    });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: '100%',
        backgroundColor: theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : theme.palette.grey[100],
        pt: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 8, sm: 10, md: 12 }, // Espacio extra para el FAB
      }}
    >
      <Container 
        maxWidth="xl"
        sx={{ 
          height: '100%',
          maxWidth: { xs: '100%', sm: '95%', md: '90%', lg: '1400px' },
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Stack 
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{ height: '100%' }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Stack spacing={2}>
              <Typography
                component={motion.h1}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                variant="h4"
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                Mis Tareas
              </Typography>
              
              <Divider sx={{ my: { xs: 1, sm: 2 } }} />
              
              <TaskFilters />
            </Stack>
          </Paper>

          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
              minHeight: `calc(100vh - ${isMobile ? '380px' : '420px'})`,
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, sm: 2.5, md: 3 }}
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              sx={{
                width: '100%',
                margin: 0,
                flexGrow: 1,
              }}
            >
              <AnimatePresence mode="popLayout">
                {filteredAndSortedTasks.map((task) => (
                  <Grid
                    item
                    xs={12}
                    sm={isTablet ? 12 : 6}
                    md={4}
                    lg={4}
                    xl={3}
                    key={task.taskId}
                    component={motion.div}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25,
                    }}
                    sx={{
                      padding: { xs: 1, sm: 1.5, md: 2 },
                      height: 'fit-content',
                    }}
                  >
                    <TaskCard 
                      task={task} 
                      onUpdate={loadTasks}
                      onDelete={handleDeleteTask}
                    />
                  </Grid>
                ))}
              </AnimatePresence>

              {filteredAndSortedTasks.length === 0 && (
                <Box
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: { xs: 4, sm: 6, md: 8 },
                    px: 2,
                  }}
                >
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    gutterBottom
                    align="center"
                    sx={{
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                      maxWidth: '600px',
                    }}
                  >
                    No hay tareas {filter !== 'all' ? `${filter === 'completed' ? 'completadas' : 'pendientes'}` : 'aún'}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    align="center"
                    sx={{
                      maxWidth: '500px',
                      mt: 1,
                    }}
                  >
                    {filter === 'all' ? 'Comienza creando una nueva tarea' : 'Ajusta los filtros para ver más tareas'}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Paper>
        </Stack>

        <Zoom in={true} style={{ transitionDelay: '500ms' }}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleOpenDialog}
            sx={{
              position: 'fixed',
              bottom: { xs: 16, sm: 24, md: 32 },
              right: { xs: 16, sm: 24, md: 32 },
              boxShadow: theme.shadows[4],
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>

        <TaskDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onSuccess={loadTasks}
        />
      </Container>
    </Box>
  );
}; 