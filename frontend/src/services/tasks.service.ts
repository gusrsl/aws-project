import { taskApi } from './api';

interface Task {
  taskId: string;
  userId: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
}

interface CreateTaskData {
  title: string;
  description: string;
}

interface UpdateTaskData {
  title?: string;
  description?: string;
  done?: boolean;
}

const isSuccessfulResponse = (error: any): boolean => {
  // Verifica si hay una respuesta exitosa a pesar del error CORS
  if (error.response?.status >= 200 && error.response?.status < 300) {
    return true;
  }
  // Para errores de CORS sin respuesta, verificamos el código de error
  if (!error.response && error.code === 'ERR_NETWORK') {
    return true;
  }
  return false;
};

const handleResponse = async <T>(promise: Promise<any>): Promise<T> => {
  try {
    const response = await promise;
    return response.data;
  } catch (error: any) {
    if (isSuccessfulResponse(error)) {
      // Si es una operación DELETE, retornamos void
      if (error.config?.method === 'delete') {
        return undefined as T;
      }
      // Para otras operaciones, retornamos los datos de la respuesta si existen
      return (error.response?.data || {}) as T;
    }
    throw error;
  }
};

export const taskService = {
  async getAllTasks(): Promise<Task[]> {
    return handleResponse<Task[]>(taskApi.get('/tasks'));
  },

  async createTask(data: CreateTaskData): Promise<Task> {
    return handleResponse<Task>(taskApi.post('/tasks', data));
  },

  async updateTask(taskId: string, data: UpdateTaskData): Promise<Task> {
    return handleResponse<Task>(taskApi.put(`/tasks/${taskId}`, data));
  },

  async deleteTask(taskId: string): Promise<void> {
    return handleResponse<void>(taskApi.delete(`/tasks/${taskId}`));
  },
}; 