import React, { useState } from 'react';
import { Box, Container, Paper, Tabs, Tab } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const AuthPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const switchToLogin = () => {
    setTabValue(0);
  };

  const switchToRegister = () => {
    setTabValue(1);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper elevation={3} sx={{ overflow: 'hidden' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Sign In" id="auth-tab-0" aria-controls="auth-tabpanel-0" />
            <Tab label="Sign Up" id="auth-tab-1" aria-controls="auth-tabpanel-1" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            <TabPanel value={tabValue} index={0}>
              <LoginForm onSwitchToRegister={switchToRegister} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <RegisterForm onSwitchToLogin={switchToLogin} />
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthPage;
