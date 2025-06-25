import { Category } from './category';

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  user: {
    id: number;
    username: string;
  };
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: string;
  categoryId?: number;
}

export interface TodoRequest {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: Date | null;
  categoryId?: number | null;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  priority?: Priority;
  dueDate?: string;
  categoryId?: number;
  completed?: boolean;
}

export interface TodoFilters {
  completed?: boolean;
  priority?: Priority;
  categoryId?: number;
  search?: string;
  dueDate?: 'today' | 'week' | 'overdue';
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
}
