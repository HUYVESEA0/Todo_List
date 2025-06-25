export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: { [key: string]: string[] };
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface ApiEndpoints {
  auth: {
    login: string;
    register: string;
    refresh: string;
    logout: string;
  };
  todos: {
    base: string;
    byId: (id: number) => string;
    toggle: (id: number) => string;
    search: string;
    stats: string;
  };
  categories: {
    base: string;
    byId: (id: number) => string;
  };
  users: {
    profile: string;
    updateProfile: string;
  };
}
