import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home,
  Store,
  Analytics,
  Person,
  ShoppingCart,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const getValueFromPath = (pathname) => {
    if (pathname === '/') return 0;
    if (pathname.startsWith('/products')) return 1;
    if (pathname.startsWith('/orders')) return 2;
    if (pathname.startsWith('/analytics')) return 3;
    if (pathname.startsWith('/profile')) return 4;
    return 0;
  };

  const handleChange = (event, newValue) => {
    const routes = ['/', '/products', '/orders', '/analytics', '/profile'];
    navigate(routes[newValue]);
  };

  if (!isMobile) return null;

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: 1,
        borderColor: 'divider',
      }}
      elevation={3}
    >
      <BottomNavigation
        value={getValueFromPath(location.pathname)}
        onChange={handleChange}
        showLabels
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Products" icon={<Store />} />
        <BottomNavigationAction label="Orders" icon={<ShoppingCart />} />
        <BottomNavigationAction label="Analytics" icon={<Analytics />} />
        <BottomNavigationAction label="Profile" icon={<Person />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;