export interface Category {
  id: number;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
  };
  todoCount?: number;
}

export interface CreateCategoryRequest {
  name: string;
  color?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  color?: string;
}
