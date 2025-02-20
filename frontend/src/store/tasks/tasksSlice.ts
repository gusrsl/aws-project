import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  taskId: string;
  userId: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
}

export interface TasksState {
  tasks: Task[];
  selectedTask: Task | null;
  filter: 'all' | 'completed' | 'pending';
  sortBy: 'date' | 'title';
  sortOrder: 'asc' | 'desc';
}

const initialState: TasksState = {
  tasks: [],
  selectedTask: null,
  filter: 'all',
  sortBy: 'date',
  sortOrder: 'desc',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.taskId === action.payload.taskId);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.taskId !== action.payload);
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
    setFilter: (state, action: PayloadAction<TasksState['filter']>) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<TasksState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<TasksState['sortOrder']>) => {
      state.sortOrder = action.payload;
    },
    clearTasks: (state) => {
      state.tasks = [];
      state.selectedTask = null;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  setSelectedTask,
  setFilter,
  setSortBy,
  setSortOrder,
  clearTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer; 