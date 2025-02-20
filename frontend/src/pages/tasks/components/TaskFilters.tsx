import {
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  SelectChangeEvent,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { setFilter, setSortBy, setSortOrder } from '../../../store/tasks/tasksSlice';
import type { TasksState } from '../../../store/tasks/tasksSlice';

export const TaskFilters = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const { filter, sortBy, sortOrder } = useAppSelector((state) => state.tasks);

  const handleFilterChange = (_: React.MouseEvent<HTMLElement>, newFilter: TasksState['filter'] | null) => {
    if (newFilter !== null) {
      dispatch(setFilter(newFilter));
    }
  };

  const handleSortByChange = (event: SelectChangeEvent) => {
    dispatch(setSortBy(event.target.value as TasksState['sortBy']));
  };

  const handleSortOrderChange = (event: SelectChangeEvent) => {
    dispatch(setSortOrder(event.target.value as TasksState['sortOrder']));
  };

  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 2, sm: 3 }}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      justifyContent="space-between"
    >
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        aria-label="task filter"
        size={isMobile ? 'medium' : 'small'}
        fullWidth={isMobile}
        sx={{
          display: 'flex',
          '& .MuiToggleButton-root': {
            flex: isMobile ? 1 : 'initial',
            borderRadius: 1,
            px: { xs: 2, sm: 3 },
            py: { xs: 1.5, sm: 1 },
            typography: theme.typography.button,
            fontWeight: 500,
            '&.Mui-selected': {
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontWeight: 600,
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
            },
            '&:hover': {
              bgcolor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.05)',
            },
          },
        }}
      >
        <ToggleButton value="all">Todas</ToggleButton>
        <ToggleButton value="completed">Completadas</ToggleButton>
        <ToggleButton value="pending">Pendientes</ToggleButton>
      </ToggleButtonGroup>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ 
          minWidth: { sm: '260px' },
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        <FormControl 
          size="small" 
          fullWidth={isMobile}
          sx={{ 
            minWidth: isMobile ? '100%' : 120,
            '& .MuiOutlinedInput-root': {
              bgcolor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.02)',
            },
          }}
        >
          <InputLabel>Ordenar por</InputLabel>
          <Select
            value={sortBy}
            label="Ordenar por"
            onChange={handleSortByChange}
          >
            <MenuItem value="date">Fecha</MenuItem>
            <MenuItem value="title">Título</MenuItem>
          </Select>
        </FormControl>

        <FormControl 
          size="small" 
          fullWidth={isMobile}
          sx={{ 
            minWidth: isMobile ? '100%' : 120,
            '& .MuiOutlinedInput-root': {
              bgcolor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.02)',
            },
          }}
        >
          <InputLabel>Orden</InputLabel>
          <Select
            value={sortOrder}
            label="Orden"
            onChange={handleSortOrderChange}
          >
            <MenuItem value="asc">Ascendente</MenuItem>
            <MenuItem value="desc">Descendente</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}; 