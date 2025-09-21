import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Fab,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  Analytics,
  Visibility,
  Store,
  Search,
  FilterList,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { sampleProducts, marketplaces } from '../data/sampleData';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(sampleProducts);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tabValue, setTabValue] = useState(0);

  const handleMenuOpen = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    setProducts(products.filter(p => p.id !== selectedProduct.id));
    setDeleteDialogOpen(false);
    handleMenuClose();
  };

  const handleEditProduct = () => {
    // Navigate to edit product page (would be similar to add product)
    console.log('Edit product:', selectedProduct.id);
    handleMenuClose();
  };

  const handleViewAnalytics = () => {
    // Navigate to product analytics
    console.log('View analytics for product:', selectedProduct.id);
    handleMenuClose();
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status.toLowerCase() === statusFilter;
    
    let matchesTab = true;
    if (tabValue === 1) matchesTab = product.status === 'Published';
    if (tabValue === 2) matchesTab = product.status === 'Draft';
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  const getMarketplaceNames = (marketplaceIds) => {
    return marketplaceIds.map(id => {
      const marketplace = marketplaces.find(m => m.id === id);
      return marketplace ? marketplace.name : id;
    }).join(', ');
  };

  const ProductCard = ({ product }) => (
    <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          height: 200,
          bgcolor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Store sx={{ fontSize: 48, color: 'grey.400' }} />
        <Chip
          label={product.status}
          size="small"
          color={product.status === 'Published' ? 'success' : 'warning'}
          sx={{ position: 'absolute', top: 8, left: 8 }}
        />
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={(e) => handleMenuOpen(e, product)}
        >
          <MoreVert />
        </IconButton>
      </Box>

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom noWrap>
          {product.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 40, overflow: 'hidden' }}>
          {product.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" color="primary" fontWeight="600">
            ₹{product.price.toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" display="block">
            {product.views} views • {product.sales} sales
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {getMarketplaceNames(product.marketplaces)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {product.tags.slice(0, 3).map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
          {product.tags.length > 3 && (
            <Chip label={`+${product.tags.length - 3}`} size="small" variant="outlined" />
          )}
        </Box>
      </CardContent>

      <CardActions>
        <Button size="small" startIcon={<Edit />} onClick={handleEditProduct}>
          Edit
        </Button>
        <Button size="small" startIcon={<Analytics />} onClick={handleViewAnalytics}>
          Analytics
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="600">
          My Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/add-product')}
        >
          Add Product
        </Button>
      </Box>

      {/* Filters and Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search products..."
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
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status Filter</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status Filter"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
              >
                More Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label={`All Products (${products.length})`} />
          <Tab label={`Published (${products.filter(p => p.status === 'Published').length})`} />
          <Tab label={`Drafts (${products.filter(p => p.status === 'Draft').length})`} />
        </Tabs>
      </Box>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card sx={{ textAlign: 'center', py: 8 }}>
          <CardContent>
            <Store sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Start by adding your first product'}
            </Typography>
            {!searchQuery && statusFilter === 'all' && (
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/add-product')}
              >
                Add Your First Product
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: { xs: 80, md: 16 }, right: 16 }}
        onClick={() => navigate('/add-product')}
      >
        <Add />
      </Fab>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditProduct}>
          <Edit sx={{ mr: 1 }} />
          Edit Product
        </MenuItem>
        <MenuItem onClick={handleViewAnalytics}>
          <Analytics sx={{ mr: 1 }} />
          View Analytics
        </MenuItem>
        <MenuItem onClick={() => console.log('Duplicate product')}>
          <Store sx={{ mr: 1 }} />
          Duplicate
        </MenuItem>
        <MenuItem onClick={() => setDeleteDialogOpen(true)} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedProduct?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteProduct} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;