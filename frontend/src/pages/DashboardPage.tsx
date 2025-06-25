import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Logout,
  Settings,
  Dashboard as DashboardIcon,
  Assignment,
  Category as CategoryIcon,
  TrendingUp,
  Today,
  Warning,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/todos/TodoList';
import { useAsync } from '../hooks/useAsync';
import { todoService } from '../services/todoService';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  const { execute: loadStats } = useAsync(async () => {
    const data = await todoService.getStats();
    setStats(data);
  });

  React.useEffect(() => {
    loadStats();
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App Dashboard
          </Typography>
          
          <IconButton
            size="large"
            edge="end"
            aria-label="account menu"
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
              {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </Avatar>
          </IconButton>
          
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleProfile}>
              <Avatar>
                <AccountCircle />
              </Avatar>
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Avatar>
                <Settings />
              </Avatar>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <Avatar>
                <Logout />
              </Avatar>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="h6">
                      Total Tasks
                    </Typography>
                    <Typography variant="h4">
                      {stats.total}
                    </Typography>
                  </Box>
                  <Assignment color="primary" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="h6">
                      Completed
                    </Typography>
                    <Typography variant="h4" color="success.main">
                      {stats.completed}
                    </Typography>
                  </Box>
                  <TrendingUp color="success" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="h6">
                      Pending
                    </Typography>
                    <Typography variant="h4" color="warning.main">
                      {stats.pending}
                    </Typography>
                  </Box>
                  <Today color="warning" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="h6">
                      Completion Rate
                    </Typography>
                    <Typography variant="h4" color="info.main">
                      {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                    </Typography>
                  </Box>
                  <Badge 
                    badgeContent={stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}
                    color="info"
                    max={100}
                  >
                    <CategoryIcon color="info" sx={{ fontSize: 40 }} />
                  </Badge>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Welcome Message */}
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Welcome back, {user.firstName || user.username}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You have {stats.pending} pending tasks to complete. 
            {stats.pending > 0 ? ' Let\'s get them done!' : ' Great job on staying organized!'}
          </Typography>
        </Paper>

        {/* Todo List */}
        <TodoList />
      </Container>
    </Box>
  );
};

export default DashboardPage;
