import { apiClient } from './apiClient';
import { Todo, CreateTodoRequest, UpdateTodoRequest, TodoFilters, TodoStats } from '../types';

export const todoService = {
  async getTodos(filters?: TodoFilters): Promise<Todo[]> {
    const response = await apiClient.get<Todo[]>('/todos', filters);
    return response.data;
  },

  async getTodoById(id: number): Promise<Todo> {
    const response = await apiClient.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  async createTodo(todo: CreateTodoRequest): Promise<Todo> {
    const response = await apiClient.post<Todo>('/todos', todo);
    return response.data;
  },

  async updateTodo(id: number, todo: UpdateTodoRequest): Promise<Todo> {
    const response = await apiClient.put<Todo>(`/todos/${id}`, todo);
    return response.data;
  },

  async toggleTodo(id: number): Promise<Todo> {
    const response = await apiClient.patch<Todo>(`/todos/${id}/toggle`);
    return response.data;
  },

  async deleteTodo(id: number): Promise<void> {
    await apiClient.delete(`/todos/${id}`);
  },

  async searchTodos(query: string): Promise<Todo[]> {
    const response = await apiClient.get<Todo[]>('/todos/search', { q: query });
    return response.data;
  },

  async getStats(): Promise<TodoStats> {
    const response = await apiClient.get<TodoStats>('/todos/stats');
    return response.data;
  },

  async getTodoStats(): Promise<TodoStats> {
    const response = await apiClient.get<TodoStats>('/todos/stats');
    return response.data;
  },

  async getTodosDueToday(): Promise<Todo[]> {
    const response = await apiClient.get<Todo[]>('/todos/due-today');
    return response.data;
  },

  async getOverdueTodos(): Promise<Todo[]> {
    const response = await apiClient.get<Todo[]>('/todos/overdue');
    return response.data;
  },
};
