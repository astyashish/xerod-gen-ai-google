import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  Badge,
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  LocalShipping,
  CheckCircle,
  Cancel,
  Pending,
  Inventory2,
  Print,
  Message,
  Phone,
  Email,
} from '@mui/icons-material';
import { sampleOrders } from '../data/sampleData';

const OrderTracking = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const orderStatuses = [
    { label: 'All', count: sampleOrders.length },
    { label: 'Pending', count: sampleOrders.filter(o => o.status === 'pending').length },
    { label: 'Processing', count: sampleOrders.filter(o => o.status === 'processing').length },
    { label: 'Shipped', count: sampleOrders.filter(o => o.status === 'shipped').length },
    { label: 'Delivered', count: sampleOrders.filter(o => o.status === 'delivered').length },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Pending />;
      case 'processing': return <Inventory2 />;
      case 'shipped': return <LocalShipping />;
      case 'delivered': return <CheckCircle />;
      case 'cancelled': return <Cancel />;
      default: return <Pending />;
    }
  };

  const filteredOrders = sampleOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedTab === 0) return matchesSearch; // All
    return matchesSearch && order.status === orderStatuses[selectedTab].label.toLowerCase();
  });

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const OrderDetailsDialog = () => (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Order Details - {selectedOrder?.id}</Typography>
          <Chip
            label={selectedOrder?.status.toUpperCase()}
            color={getStatusColor(selectedOrder?.status)}
            icon={getStatusIcon(selectedOrder?.status)}
          />
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {selectedOrder && (
          <Grid container spacing={3}>
            {/* Customer Information */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom fontWeight="600">
                    Customer Information
                  </Typography>
                  <Typography variant="body2"><strong>Name:</strong> {selectedOrder.customerName}</Typography>
                  <Typography variant="body2"><strong>Email:</strong> {selectedOrder.customerEmail}</Typography>
                  <Typography variant="body2"><strong>Phone:</strong> {selectedOrder.customerPhone}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Shipping Address:</strong><br />
                    {selectedOrder.shippingAddress}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<Email />}>Email</Button>
                    <Button size="small" startIcon={<Phone />}>Call</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom fontWeight="600">
                    Order Summary
                  </Typography>
                  <Typography variant="body2"><strong>Order Date:</strong> {selectedOrder.orderDate}</Typography>
                  <Typography variant="body2"><strong>Payment:</strong> {selectedOrder.paymentMethod}</Typography>
                  <Typography variant="body2"><strong>Marketplace:</strong> {selectedOrder.marketplace}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6" color="primary">
                    Total: ₹{selectedOrder.total.toLocaleString()}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<Print />}>Print Label</Button>
                    <Button size="small" startIcon={<Message />}>Message</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Products */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom fontWeight="600">
                Products Ordered
              </Typography>
              {selectedOrder.products.map((product, index) => (
                <Card key={index} sx={{ mb: 1 }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{ width: 60, height: 60 }}
                      src={product.image}
                      variant="rounded"
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2">{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {product.quantity} × ₹{product.price}
                      </Typography>
                    </Box>
                    <Typography variant="h6" color="primary">
                      ₹{(product.quantity * product.price).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>

            {/* Order Timeline */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom fontWeight="600">
                Order Timeline
              </Typography>
              <Stepper orientation="vertical">
                <Step completed>
                  <StepLabel>Order Placed</StepLabel>
                  <StepContent>
                    <Typography variant="body2">Order confirmed and payment received</Typography>
                    <Typography variant="caption" color="text.secondary">{selectedOrder.orderDate}</Typography>
                  </StepContent>
                </Step>
                <Step completed={selectedOrder.status !== 'pending'}>
                  <StepLabel>Processing</StepLabel>
                  <StepContent>
                    <Typography variant="body2">Preparing your handmade item</Typography>
                  </StepContent>
                </Step>
                <Step completed={['shipped', 'delivered'].includes(selectedOrder.status)}>
                  <StepLabel>Shipped</StepLabel>
                  <StepContent>
                    <Typography variant="body2">Package in transit</Typography>
                    {selectedOrder.trackingNumber && (
                      <Typography variant="caption">
                        Tracking: {selectedOrder.trackingNumber}
                      </Typography>
                    )}
                  </StepContent>
                </Step>
                <Step completed={selectedOrder.status === 'delivered'}>
                  <StepLabel>Delivered</StepLabel>
                  <StepContent>
                    <Typography variant="body2">Order successfully delivered</Typography>
                  </StepContent>
                </Step>
              </Stepper>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Close</Button>
        <Button variant="contained" startIcon={<Print />}>
          Print Order
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="600">
        Order Management
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track and manage all your orders from different marketplaces in one place.
      </Typography>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by order ID, customer name, or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button startIcon={<FilterList />} variant="outlined">
                  Filters
                </Button>
                <Button startIcon={<Print />} variant="outlined">
                  Export
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(e, v) => setSelectedTab(v)}>
          {orderStatuses.map((status, index) => (
            <Tab
              key={status.label}
              label={
                <Badge badgeContent={status.count} color="primary">
                  {status.label}
                </Badge>
              }
            />
          ))}
        </Tabs>
      </Box>

      {/* Orders List */}
      <Grid container spacing={3}>
        {filteredOrders.map((order) => (
          <Grid item xs={12} key={order.id}>
            <Card sx={{ cursor: 'pointer' }} onClick={() => handleOrderClick(order)}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle1" fontWeight="600">
                      {order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.orderDate}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle2">
                      {order.customerName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.products.length} item(s)
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={2}>
                    <Typography variant="h6" color="primary">
                      ₹{order.total.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.marketplace}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={2}>
                    <Chip
                      label={order.status.toUpperCase()}
                      color={getStatusColor(order.status)}
                      icon={getStatusIcon(order.status)}
                      size="small"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={2}>
                    <IconButton>
                      <Visibility />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Inventory2 sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No orders found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchQuery ? 'Try adjusting your search terms' : 'Orders will appear here once customers start purchasing your products'}
            </Typography>
          </CardContent>
        </Card>
      )}

      <OrderDetailsDialog />
    </Box>
  );
};

export default OrderTracking;