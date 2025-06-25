import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  Fab,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Add, Search, FilterList } from '@mui/icons-material';
import { Todo } from '../../types/todo';
import { todoService } from '../../services/todoService';
import { useAsync } from '../../hooks/useAsync';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { getPriorityColor, getPriorityLabel } from '../../utils/priorityUtils';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const { 
    execute: fetchTodos, 
    loading: fetchingTodos, 
    error: fetchError 
  } = useAsync(async () => {
    let params: any = {};
    
    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }
    
    if (filterStatus !== 'all') {
      params.completed = filterStatus === 'completed';
    }

    const data = await todoService.getTodos(params);
    setTodos(data);
  });

  const { execute: deleteTodo } = useAsync(async (id: number) => {
    await todoService.deleteTodo(id);
    setTodos(prev => prev.filter(todo => todo.id !== id));
  });

  const { execute: toggleTodo } = useAsync(async (id: number) => {
    const updatedTodo = await todoService.toggleTodo(id);
    setTodos(prev => prev.map(todo => 
      todo.id === id ? updatedTodo : todo
    ));
  });

  useEffect(() => {
    fetchTodos();
  }, [searchQuery, filterStatus]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: SelectChangeEvent<string>) => {
    setFilterStatus(e.target.value as 'all' | 'pending' | 'completed');
  };

  const handleAddTodo = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleDeleteTodo = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await deleteTodo(id);
    }
  };

  const handleToggleTodo = async (id: number) => {
    await toggleTodo(id);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  const handleFormSuccess = (todo: Todo) => {
    if (editingTodo) {
      // Update existing todo
      setTodos(prev => prev.map(t => t.id === todo.id ? todo : t));
    } else {
      // Add new todo
      setTodos(prev => [todo, ...prev]);
    }
    handleFormClose();
  };

  const getFilteredTodos = () => {
    return todos;
  };

  const pendingCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <Box>
      {/* Header */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Todos
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip 
            label={`Total: ${todos.length}`} 
            color="default" 
            variant="outlined" 
          />
          <Chip 
            label={`Pending: ${pendingCount}`} 
            color="warning" 
            variant="outlined" 
          />
          <Chip 
            label={`Completed: ${completedCount}`} 
            color="success" 
            variant="outlined" 
          />
        </Box>

        {/* Search and Filter */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search todos..."
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={filterStatus}
              onChange={handleFilterChange}
              startAdornment={
                <InputAdornment position="start">
                  <FilterList />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Error Alert */}
      {fetchError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load todos: {fetchError}
        </Alert>
      )}

      {/* Loading */}
      {fetchingTodos && (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      )}

      {/* Todo List */}
      {!fetchingTodos && (
        <Paper elevation={1}>
          {getFilteredTodos().length === 0 ? (
            <Box p={4} textAlign="center">
              <Typography variant="h6" color="text.secondary">
                {searchQuery || filterStatus !== 'all' 
                  ? 'No todos match your search criteria'
                  : 'No todos yet. Create your first todo!'
                }
              </Typography>
            </Box>
          ) : (
            <List>
              {getFilteredTodos().map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onEdit={handleEditTodo}
                  onDelete={handleDeleteTodo}
                  onToggle={handleToggleTodo}
                  showDivider={index < getFilteredTodos().length - 1}
                />
              ))}
            </List>
          )}
        </Paper>
      )}

      {/* Add Todo FAB */}
      <Fab
        color="primary"
        aria-label="add todo"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={handleAddTodo}
      >
        <Add />
      </Fab>

      {/* Todo Form Dialog */}
      {isFormOpen && (
        <TodoForm
          open={isFormOpen}
          todo={editingTodo}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </Box>
  );
};

export default TodoList;
