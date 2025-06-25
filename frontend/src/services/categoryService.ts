import { apiClient } from './apiClient';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../types';

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get<Category[]>('/categories');
    return response.data;
  },

  async getCategoryById(id: number): Promise<Category> {
    const response = await apiClient.get<Category>(`/categories/${id}`);
    return response.data;
  },

  async createCategory(category: CreateCategoryRequest): Promise<Category> {
    const response = await apiClient.post<Category>('/categories', category);
    return response.data;
  },

  async updateCategory(id: number, category: UpdateCategoryRequest): Promise<Category> {
    const response = await apiClient.put<Category>(`/categories/${id}`, category);
    return response.data;
  },

  async deleteCategory(id: number): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  },

  async getCategoriesWithTodos(): Promise<Category[]> {
    const response = await apiClient.get<Category[]>('/categories/with-todos');
    return response.data;
  },
};
