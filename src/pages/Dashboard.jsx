import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  Add,
  Store,
  ShoppingCart,
  Analytics,
  AccountBalance,
  Campaign,
  Help,
  TrendingUp,
  Visibility,
  Person,
  ArrowForward,
  Assistant,
  Mic,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { sampleProfile, sampleAnalytics, sampleProducts, sampleOrders } from '../data/sampleData';

const Dashboard = () => {
  const navigate = useNavigate();

  const quickStats = [
    {
      title: 'Total Earnings',
      value: `₹${sampleAnalytics.totalEarnings.toLocaleString()}`,
      subtitle: `+₹${sampleAnalytics.monthlyEarnings.toLocaleString()} this month`,
      icon: <AccountBalance />,
      color: 'success',
    },
    {
      title: 'Products Listed',
      value: sampleAnalytics.totalProducts,
      subtitle: `${sampleAnalytics.activeProducts} active`,
      icon: <Store />,
      color: 'primary',
    },
    {
      title: 'Total Orders',
      value: sampleAnalytics.totalOrders,
      subtitle: `${sampleAnalytics.monthlyOrders} this month`,
      icon: <ShoppingCart />,
      color: 'secondary',
    },
    {
      title: 'Profile Views',
      value: sampleAnalytics.engagementStats.productViews,
      subtitle: 'Last 30 days',
      icon: <Visibility />,
      color: 'info',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'Upload and list a new product',
      icon: <Add />,
      color: 'primary',
      path: '/add-product',
    },
    {
      title: 'View Products',
      description: 'Manage your product listings',
      icon: <Store />,
      color: 'secondary',
      path: '/products',
    },
    {
      title: 'Track Orders',
      description: 'Monitor order status and delivery',
      icon: <ShoppingCart />,
      color: 'success',
      path: '/orders',
    },
    {
      title: 'View Analytics',
      description: 'Check your sales performance',
      icon: <Analytics />,
      color: 'info',
      path: '/analytics',
    },
    {
      title: 'Marketing Tools',
      description: 'Promote your products',
      icon: <Campaign />,
      color: 'warning',
      path: '/marketing',
    },
    {
      title: 'Get Help',
      description: 'FAQs and support',
      icon: <Help />,
      color: 'error',
      path: '/help',
    },
  ];

  const recentOrders = sampleOrders.slice(0, 3);
  const featuredProducts = sampleProducts.slice(0, 2);

  return (
    <Box sx={{ py: 3 }}>
      {/* Welcome Section */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              sx={{
                width: 60,
                height: 60,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                fontSize: '1.5rem',
              }}
            >
              {sampleProfile.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                Welcome back, {sampleProfile.name}!
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {sampleProfile.craftType} • {sampleProfile.location}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
              Profile Completion: {sampleProfile.profileComplete}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={sampleProfile.profileComplete}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'white',
                },
              }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Voice AI Assistant Banner */}
      <Paper
        elevation={2}
        sx={{
          p: 3,
          mb: 4,
          background: 'linear-gradient(135deg, #4ECDC4 0%, #FF6B6B 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)' },
              },
            }}
          >
            <Assistant sx={{ fontSize: 30 }} />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              🎤 आवाज़ से काम करें - Voice Control Available
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
              पहली बार ऑनलाइन बिजनेस कर रहे हैं? चिंता न करें! नीचे दाएं कोने में AI Assistant से बात करें।
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              "मुझे ऑर्डर कैसे देखना है?" • "नया प्रोडक्ट कैसे जोड़ूं?" • "पैसे कब मिलेंगे?"
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Mic />}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
            }}
            onClick={() => {
              // This will be handled by the floating AI assistant
              window.dispatchEvent(new Event('openAIAssistant'));
            }}
          >
            आवाज़ से पूछें
          </Button>
        </Box>
      </Paper>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: `${stat.color}.main`,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="600">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {stat.title}
                    </Typography>
                    <Typography variant="caption" color={`${stat.color}.main`}>
                      {stat.subtitle}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} lg={8}>
          <Typography variant="h6" gutterBottom fontWeight="600">
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={1}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      elevation: 3,
                      transform: 'translateY(-2px)',
                    },
                  }}
                  onClick={() => navigate(action.path)}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: `${action.color}.light`,
                        color: `${action.color}.main`,
                        mb: 2,
                      }}
                    >
                      {action.icon}
                    </Box>
                    <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="600">
                Recent Orders
              </Typography>
              <Button
                size="small"
                endIcon={<ArrowForward />}
                onClick={() => navigate('/orders')}
              >
                View All
              </Button>
            </Box>
            
            <Card elevation={1}>
              <CardContent sx={{ p: 2 }}>
                {recentOrders.map((order, index) => (
                  <Box key={order.id}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body2" fontWeight="600">
                          {order.productTitle}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.customerName} • {order.orderDate}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" fontWeight="600">
                          ₹{order.amount}
                        </Typography>
                        <Chip
                          label={order.status}
                          size="small"
                          color={
                            order.status === 'Delivered' ? 'success' :
                            order.status === 'Shipped' ? 'info' : 'warning'
                          }
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                    {index < recentOrders.length - 1 && (
                      <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 1.5 }} />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>

          {/* Featured Products */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="600">
                Top Products
              </Typography>
              <Button
                size="small"
                endIcon={<ArrowForward />}
                onClick={() => navigate('/products')}
              >
                View All
              </Button>
            </Box>
            
            <Card elevation={1}>
              <CardContent sx={{ p: 2 }}>
                {featuredProducts.map((product, index) => (
                  <Box key={product.id}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          bgcolor: 'grey.200',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Store color="action" />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight="600">
                          {product.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          {product.views} views • {product.sales} sales
                        </Typography>
                        <Typography variant="body2" color="primary" fontWeight="600">
                          ₹{product.price}
                        </Typography>
                      </Box>
                      <Chip
                        label={product.status}
                        size="small"
                        color={product.status === 'Published' ? 'success' : 'warning'}
                        variant="outlined"
                      />
                    </Box>
                    {index < featuredProducts.length - 1 && (
                      <Box sx={{ borderBottom: 1, borderColor: 'divider', my: 1.5 }} />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;