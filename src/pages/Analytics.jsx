import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  Tab,
  Tabs,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Visibility,
  FavoriteRounded,
  Star,
  LocalShipping,
  AttachMoney,
  People,
  Inventory,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { sampleAnalytics } from '../data/sampleData';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedTab, setSelectedTab] = useState(0);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

  const periods = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: '365', label: 'Last year' },
  ];

  const metrics = [
    {
      title: 'Total Revenue',
      value: `₹${sampleAnalytics.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: <AttachMoney />,
      color: 'success',
    },
    {
      title: 'Total Orders',
      value: sampleAnalytics.totalOrders.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: <ShoppingCart />,
      color: 'primary',
    },
    {
      title: 'Product Views',
      value: sampleAnalytics.totalViews.toLocaleString(),
      change: '+15.3%',
      trend: 'up',
      icon: <Visibility />,
      color: 'info',
    },
    {
      title: 'Conversion Rate',
      value: `${sampleAnalytics.conversionRate}%`,
      change: '-2.1%',
      trend: 'down',
      icon: <TrendingUp />,
      color: 'warning',
    },
  ];

  const topProducts = [
    { name: 'Handcrafted Silver Necklace', sales: 45, revenue: 67500, image: '/api/placeholder/60/60' },
    { name: 'Traditional Wooden Bowl Set', sales: 32, revenue: 48000, image: '/api/placeholder/60/60' },
    { name: 'Embroidered Silk Scarf', sales: 28, revenue: 35000, image: '/api/placeholder/60/60' },
    { name: 'Ceramic Tea Cup Collection', sales: 24, revenue: 28800, image: '/api/placeholder/60/60' },
    { name: 'Handwoven Cotton Rug', sales: 18, revenue: 45000, image: '/api/placeholder/60/60' },
  ];

  const marketplaceData = [
    { name: 'Amazon', value: 45, color: '#FF9500' },
    { name: 'Flipkart', value: 30, color: '#047BD0' },
    { name: 'Etsy', value: 20, color: '#F16521' },
    { name: 'Direct', value: 5, color: '#4CAF50' },
  ];

  const renderOverviewTab = () => (
    <Box>
      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" fontWeight="600" gutterBottom>
                      {metric.value}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {metric.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      {metric.trend === 'up' ? (
                        <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                      ) : (
                        <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />
                      )}
                      <Typography
                        variant="caption"
                        color={metric.trend === 'up' ? 'success.main' : 'error.main'}
                      >
                        {metric.change}
                      </Typography>
                    </Box>
                  </Box>
                  <Avatar sx={{ bgcolor: `${metric.color}.light`, color: `${metric.color}.main` }}>
                    {metric.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Revenue Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={sampleAnalytics.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales by Marketplace
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={marketplaceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {marketplaceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Orders Chart */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Orders Overview
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleAnalytics.ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );

  const renderProductsTab = () => (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Performing Products
              </Typography>
              <List>
                {topProducts.map((product, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          src={product.image}
                          variant="rounded"
                          sx={{ width: 60, height: 60 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.name}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {product.sales} sales • ₹{product.revenue.toLocaleString()} revenue
                            </Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" color="primary">
                          #{index + 1}
                        </Typography>
                        <Chip
                          label={`${((product.sales / topProducts[0].sales) * 100).toFixed(0)}%`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    </ListItem>
                    {index < topProducts.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product Insights
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Star sx={{ color: 'warning.main' }} />
                <Box>
                  <Typography variant="h5" fontWeight="600">
                    4.8
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average Rating
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <FavoriteRounded sx={{ color: 'error.main' }} />
                <Box>
                  <Typography variant="h5" fontWeight="600">
                    1,234
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Favorites
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Inventory sx={{ color: 'info.main' }} />
                <Box>
                  <Typography variant="h5" fontWeight="600">
                    45
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Products
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Category Performance
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sampleAnalytics.categoryData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderCustomersTab = () => (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customer Demographics
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sampleAnalytics.customerDemographics}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {sampleAnalytics.customerDemographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customer Acquisition
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sampleAnalytics.customerAcquisition}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="newCustomers" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="returningCustomers" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Customers
              </Typography>
              <List>
                {sampleAnalytics.topCustomers.map((customer, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>{customer.name.charAt(0)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={customer.name}
                        secondary={`${customer.orders} orders • Joined ${customer.joinDate}`}
                      />
                      <Typography variant="h6" color="primary">
                        ₹{customer.totalSpent.toLocaleString()}
                      </Typography>
                    </ListItem>
                    {index < sampleAnalytics.topCustomers.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0: return renderOverviewTab();
      case 1: return renderProductsTab();
      case 2: return renderCustomersTab();
      default: return renderOverviewTab();
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="600">
            Analytics Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your business performance and gain insights into your sales.
          </Typography>
        </Box>
        
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Time Period</InputLabel>
          <Select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            label="Time Period"
          >
            {periods.map((period) => (
              <MenuItem key={period.value} value={period.value}>
                {period.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Analytics Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(e, v) => setSelectedTab(v)}>
          <Tab label="Overview" icon={<TrendingUp />} iconPosition="start" />
          <Tab label="Products" icon={<Inventory />} iconPosition="start" />
          <Tab label="Customers" icon={<People />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {renderTabContent()}
    </Box>
  );
};

export default Analytics;