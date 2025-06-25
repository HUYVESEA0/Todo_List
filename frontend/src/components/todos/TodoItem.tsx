import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Box,
  Chip,
  Typography,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert,
  Edit,
  Delete,
  CalendarToday,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { Todo } from '../../types/todo';
import { getPriorityColor, getPriorityLabel } from '../../utils/priorityUtils';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  showDivider?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEdit,
  onDelete,
  onToggle,
  showDivider = false,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(todo);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(todo.id);
    handleMenuClose();
  };

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  };

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          opacity: todo.completed ? 0.7 : 1,
          backgroundColor: todo.completed ? 'action.hover' : 'inherit',
        }}
      >
        <ListItemButton onClick={handleToggle} sx={{ pr: 1 }}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.completed}
              tabIndex={-1}
              disableRipple
              color="primary"
            />
          </ListItemIcon>
          
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    fontWeight: todo.completed ? 'normal' : 'medium',
                  }}
                >
                  {todo.title}
                </Typography>
                
                <Chip
                  label={getPriorityLabel(todo.priority)}
                  size="small"
                  sx={{
                    backgroundColor: getPriorityColor(todo.priority),
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
                
                {todo.category && (
                  <Chip
                    icon={<CategoryIcon />}
                    label={todo.category.name}
                    size="small"
                    variant="outlined"
                    sx={{ color: todo.category.color || 'primary.main' }}
                  />
                )}
              </Box>
            }
            secondary={
              <Box sx={{ mt: 1 }}>
                {todo.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      mb: 1,
                    }}
                  >
                    {todo.description}
                  </Typography>
                )}
                
                {todo.dueDate && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarToday sx={{ fontSize: 16 }} />
                    <Typography
                      variant="caption"
                      color={isOverdue() ? 'error' : 'text.secondary'}
                      sx={{ fontWeight: isOverdue() ? 'bold' : 'normal' }}
                    >
                      Due: {formatDate(todo.dueDate)}
                      {isOverdue() && ' (Overdue)'}
                    </Typography>
                  </Box>
                )}
              </Box>
            }
          />
        </ListItemButton>
        
        <IconButton
          edge="end"
          aria-label="more options"
          onClick={handleMenuClick}
          sx={{ mr: 1 }}
        >
          <MoreVert />
        </IconButton>
      </ListItem>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1 }} fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} fontSize="small" />
          Delete
        </MenuItem>
      </Menu>

      {showDivider && <Divider />}
    </>
  );
};

export default TodoItem;
