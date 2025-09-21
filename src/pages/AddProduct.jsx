import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Alert,
  LinearProgress,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CloudUpload,
  PhotoCamera,
  ThreeDRotation,
  Inventory,
  Preview,
  Check,
  ArrowBack,
  ArrowForward,
  Save,
  Publish,
  AddPhotoAlternate,
  Tag,
  Description,
  AttachMoney,
  Category,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [productData, setProductData] = useState({
    images: [],
    title: '',
    description: '',
    story: '',
    category: '',
    subcategory: '',
    price: '',
    comparePrice: '',
    sku: '',
    inventory: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    materials: [],
    colors: [],
    tags: [],
    marketplaces: [],
    isHandmade: true,
    customizable: false,
    processingTime: '1-2 weeks',
  });

  const steps = [
    'Upload Images',
    '3D Preview',
    'Product Details',
    'Story & Materials',
    'Review & Publish'
  ];

  const categories = [
    'Jewelry & Accessories',
    'Home & Living',
    'Art & Collectibles',
    'Clothing & Shoes',
    'Toys & Entertainment',
    'Craft Supplies & Tools',
    'Vintage',
    'Wedding & Party',
  ];

  const marketplaces = [
    { id: 'amazon', name: 'Amazon Handmade', icon: '🛒', color: 'warning' },
    { id: 'flipkart', name: 'Flipkart Samarth', icon: '🛍️', color: 'info' },
    { id: 'etsy', name: 'Etsy', icon: '🎨', color: 'success' },
    { id: 'meesho', name: 'Meesho', icon: '📱', color: 'secondary' },
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadProgress(0);
        // Add uploaded files to productData
        setProductData(prev => ({
          ...prev,
          images: [...prev.images, ...files.map(file => URL.createObjectURL(file))]
        }));
      }
    }, 200);
  };

  const handleMarketplaceToggle = (marketplace) => {
    setProductData(prev => ({
      ...prev,
      marketplaces: prev.marketplaces.includes(marketplace)
        ? prev.marketplaces.filter(m => m !== marketplace)
        : [...prev.marketplaces, marketplace]
    }));
  };

  const handlePublish = () => {
    // Simulate publishing process
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      navigate('/products');
    }, 2000);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0: // Upload Images
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Upload Product Images
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Upload high-quality images of your product. You can upload up to 10 images.
            </Typography>

            {/* Image Upload Area */}
            <Card
              sx={{
                mb: 3,
                border: '2px dashed',
                borderColor: 'primary.light',
                textAlign: 'center',
                py: 4,
                cursor: 'pointer',
                '&:hover': { borderColor: 'primary.main' }
              }}
              component="label"
            >
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
              <CloudUpload sx={{ fontSize: 48, color: 'primary.light', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Click to upload images
              </Typography>
              <Typography variant="body2" color="text.secondary">
                or drag and drop your images here
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }} startIcon={<AddPhotoAlternate />}>
                Choose Files
              </Button>
            </Card>

            {isUploading && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Uploading images...
                </Typography>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
            )}

            {/* Uploaded Images Preview */}
            {productData.images.length > 0 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Uploaded Images ({productData.images.length})
                </Typography>
                <Grid container spacing={2}>
                  {productData.images.map((image, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Card>
                        <Box
                          sx={{
                            aspectRatio: '1',
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative'
                          }}
                        >
                          {index === 0 && (
                            <Chip
                              label="Main"
                              color="primary"
                              size="small"
                              sx={{ position: 'absolute', top: 8, left: 8 }}
                            />
                          )}
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* AI Enhancement Options */}
            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                AI Enhancement Available
              </Typography>
              <Typography variant="body2">
                Our AI can automatically enhance your images, remove backgrounds, and generate additional product angles.
              </Typography>
              <Button size="small" sx={{ mt: 1 }}>
                Enhance Images
              </Button>
            </Alert>
          </Box>
        );

      case 1: // 3D Preview
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              3D Product Preview
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Generate a 3D preview of your product to give customers an immersive experience.
            </Typography>

            {/* 3D Preview Placeholder */}
            <Card sx={{ mb: 3, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <ThreeDRotation sx={{ fontSize: 80, color: 'primary.light', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  3D Preview Generation
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  AI-powered 3D model generation from your uploaded images
                </Typography>
                <Button variant="contained" startIcon={<ThreeDRotation />}>
                  Generate 3D Model
                </Button>
              </Box>
            </Card>

            {/* 3D Options */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      360° View
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Allow customers to rotate and view your product from all angles
                    </Typography>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Enable 360° rotation"
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      AR Preview
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Let customers see how your product looks in their space using AR
                    </Typography>
                    <FormControlLabel
                      control={<Switch />}
                      label="Enable AR preview"
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );

      case 2: // Product Details
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Product Information
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Provide detailed information about your product to help customers make informed decisions.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Title"
                  value={productData.title}
                  onChange={(e) => setProductData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Handcrafted Silver Necklace with Traditional Designs"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={productData.category}
                    onChange={(e) => setProductData(prev => ({ ...prev, category: e.target.value }))}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SKU"
                  value={productData.sku}
                  onChange={(e) => setProductData(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="Product identifier"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price (₹)"
                  type="number"
                  value={productData.price}
                  onChange={(e) => setProductData(prev => ({ ...prev, price: e.target.value }))}
                  InputProps={{
                    startAdornment: <AttachMoney />
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Compare Price (₹)"
                  type="number"
                  value={productData.comparePrice}
                  onChange={(e) => setProductData(prev => ({ ...prev, comparePrice: e.target.value }))}
                  helperText="Original price for showing discounts"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Inventory Quantity"
                  type="number"
                  value={productData.inventory}
                  onChange={(e) => setProductData(prev => ({ ...prev, inventory: e.target.value }))}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Weight (grams)"
                  type="number"
                  value={productData.weight}
                  onChange={(e) => setProductData(prev => ({ ...prev, weight: e.target.value }))}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Product Description"
                  value={productData.description}
                  onChange={(e) => setProductData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your product in detail..."
                />
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={productData.isHandmade}
                        onChange={(e) => setProductData(prev => ({ ...prev, isHandmade: e.target.checked }))}
                      />
                    }
                    label="This is a handmade item"
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={productData.customizable}
                        onChange={(e) => setProductData(prev => ({ ...prev, customizable: e.target.checked }))}
                      />
                    }
                    label="Accept custom orders"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        );

      case 3: // Story & Materials
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Your Craft Story
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Share the story behind your creation and the materials you use.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Craft Story"
                  value={productData.story}
                  onChange={(e) => setProductData(prev => ({ ...prev, story: e.target.value }))}
                  placeholder="Tell customers about the inspiration, process, and tradition behind this piece..."
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Materials Used"
                  placeholder="e.g., Sterling Silver, Natural Pearls"
                  helperText="Separate materials with commas"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Processing Time"
                  value={productData.processingTime}
                  onChange={(e) => setProductData(prev => ({ ...prev, processingTime: e.target.value }))}
                  placeholder="e.g., 1-2 weeks"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tags"
                  placeholder="e.g., traditional, handmade, silver, jewelry"
                  helperText="Add tags to help customers find your product"
                />
              </Grid>

              <Grid item xs={12}>
                <Alert severity="info">
                  <Typography variant="subtitle2" gutterBottom>
                    AI Story Enhancement
                  </Typography>
                  <Typography variant="body2">
                    Let our AI help enhance your craft story to better connect with customers and highlight the unique aspects of your creation.
                  </Typography>
                  <Button size="small" sx={{ mt: 1 }}>
                    Enhance Story
                  </Button>
                </Alert>
              </Grid>
            </Grid>
          </Box>
        );

      case 4: // Review & Publish
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review & Publish
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Review your product details and choose which marketplaces to publish to.
            </Typography>

            {/* Product Preview */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Product Preview
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        aspectRatio: '1',
                        bgcolor: 'grey.100',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <PhotoCamera sx={{ fontSize: 40, color: 'grey.400' }} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" gutterBottom>
                      {productData.title || 'Product Title'}
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom>
                      ₹{productData.price || '0'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {productData.description || 'Product description...'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Marketplace Selection */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Choose Marketplaces
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Select which marketplaces you want to publish this product to:
                </Typography>
                
                <Grid container spacing={2}>
                  {marketplaces.map((marketplace) => (
                    <Grid item xs={12} sm={6} key={marketplace.id}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          border: productData.marketplaces.includes(marketplace.id) ? 2 : 1,
                          borderColor: productData.marketplaces.includes(marketplace.id) 
                            ? 'primary.main' 
                            : 'divider',
                        }}
                        onClick={() => handleMarketplaceToggle(marketplace.id)}
                      >
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="h4">{marketplace.icon}</Typography>
                          <Box>
                            <Typography variant="subtitle2">
                              {marketplace.name}
                            </Typography>
                            <Chip 
                              label={productData.marketplaces.includes(marketplace.id) ? 'Selected' : 'Select'}
                              color={marketplace.color}
                              size="small"
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Publishing Options */}
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Publishing Options
                </Typography>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Publish immediately"
                />
                <br />
                <FormControlLabel
                  control={<Switch />}
                  label="Schedule for later"
                />
                <br />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable automatic inventory sync"
                />
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <IconButton onClick={() => navigate('/products')}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" fontWeight="600">
          Add New Product
        </Typography>
      </Box>

      {/* Stepper */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent>
          {renderStepContent(activeStep)}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
          startIcon={<ArrowBack />}
        >
          Back
        </Button>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Save />}
          >
            Save Draft
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handlePublish}
              startIcon={<Publish />}
              disabled={isUploading}
            >
              {isUploading ? 'Publishing...' : 'Publish Product'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForward />}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>

      {isUploading && activeStep === steps.length - 1 && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress />
          <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
            Publishing to selected marketplaces...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AddProduct;