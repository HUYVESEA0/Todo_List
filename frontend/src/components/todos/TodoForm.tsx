import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Todo, TodoRequest, Priority } from '../../types/todo';
import { Category } from '../../types/category';
import { todoService } from '../../services/todoService';
import { categoryService } from '../../services/categoryService';
import { useAsync } from '../../hooks/useAsync';

interface TodoFormProps {
  open: boolean;
  todo?: Todo | null;
  onClose: () => void;
  onSuccess: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ open, todo, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<TodoRequest>({
    title: '',
    description: '',
    priority: Priority.MEDIUM,
    dueDate: null,
    categoryId: null,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>('');

  const { execute: loadCategories } = useAsync(async () => {
    const data = await categoryService.getCategories();
    setCategories(data);
  });

  const { execute: saveTodo, loading: saving } = useAsync(async (data: TodoRequest) => {
    let savedTodo: Todo;
    if (todo?.id) {
      savedTodo = await todoService.updateTodo(todo.id, data);
    } else {
      savedTodo = await todoService.createTodo(data);
    }
    onSuccess(savedTodo);
  });

  useEffect(() => {
    if (open) {
      loadCategories();
      
      if (todo) {
        setFormData({
          title: todo.title,
          description: todo.description || '',
          priority: todo.priority,
          dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
          categoryId: todo.category?.id || null,
        });
      } else {
        setFormData({
          title: '',
          description: '',
          priority: Priority.MEDIUM,
          dueDate: null,
          categoryId: null,
        });
      }
      setError('');
    }
  }, [open, todo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      dueDate: date,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await saveTodo(formData);
    } catch (err: any) {
      setError(err.message || 'Failed to save todo');
    }
  };

  const handleClose = () => {
    if (!saving) {
      onClose();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {todo ? 'Edit Todo' : 'Create New Todo'}
        </DialogTitle>
        
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleInputChange}
              margin="normal"
              required
              autoFocus
              disabled={saving}
            />

            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={3}
              disabled={saving}
            />

            <FormControl fullWidth margin="normal" disabled={saving}>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                value={formData.priority}
                label="Priority"
                onChange={(e) => handleSelectChange('priority', e.target.value)}
              >
                <MenuItem value={Priority.LOW}>Low</MenuItem>
                <MenuItem value={Priority.MEDIUM}>Medium</MenuItem>
                <MenuItem value={Priority.HIGH}>High</MenuItem>
                <MenuItem value={Priority.URGENT}>Urgent</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" disabled={saving}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="categoryId"
                value={formData.categoryId || ''}
                label="Category"
                onChange={(e) => handleSelectChange('categoryId', e.target.value || null)}
              >
                <MenuItem value="">
                  <em>No Category</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <DateTimePicker
                label="Due Date"
                value={formData.dueDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" disabled={saving} />
                )}
                disabled={saving}
              />
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={saving || !formData.title.trim()}
            startIcon={saving && <CircularProgress size={20} />}
          >
            {saving ? 'Saving...' : (todo ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default TodoForm;
