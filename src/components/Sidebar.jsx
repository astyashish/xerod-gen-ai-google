import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home,
  Store,
  Analytics,
  Person,
  ShoppingCart,
  AccountBalance,
  Campaign,
  Help,
  Add,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { sampleProfile } from '../data/sampleData';

const drawerWidth = 280;

const Sidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <Home />, path: '/' },
    { text: 'Add Product', icon: <Add />, path: '/add-product' },
    { text: 'Products', icon: <Store />, path: '/products' },
    { text: 'Orders', icon: <ShoppingCart />, path: '/orders' },
    { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
    { text: 'Earnings', icon: <AccountBalance />, path: '/earnings' },
    { text: 'Marketing', icon: <Campaign />, path: '/marketing' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
    { text: 'Help', icon: <Help />, path: '/help' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ArtisanAI Connect
        </Typography>
      </Box>

      {/* Profile Section */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>
            {sampleProfile.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="600">
              {sampleProfile.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sampleProfile.craftType}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ flex: 1, px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: location.pathname === item.path ? 'inherit' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          borderRight: 1,
          borderColor: 'divider',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;