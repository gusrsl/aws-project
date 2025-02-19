export interface Task {
    id?: string;
    title: string;
    description: string;
    done: boolean;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
  }