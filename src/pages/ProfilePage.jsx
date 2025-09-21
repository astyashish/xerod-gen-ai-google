import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  Grid,
  LinearProgress,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Edit,
  PhotoCamera,
  Save,
  Cancel,
  CheckCircle,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { sampleProfile } from '../data/sampleData';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(sampleProfile);
  const [tempProfile, setTempProfile] = useState(sampleProfile);

  const craftTypes = [
    'Handmade Jewelry',
    'Textiles & Fabrics',
    'Pottery & Ceramics',
    'Wood Crafts',
    'Metal Work',
    'Leather Goods',
    'Art & Paintings',
    'Home Decor',
    'Other',
  ];

  const languages = [
    'Hindi',
    'English',
    'Bengali',
    'Telugu',
    'Marathi',
    'Tamil',
    'Gujarati',
    'Urdu',
    'Kannada',
    'Malayalam',
    'Other',
  ];

  const profileSections = [
    { label: 'Basic Information', completed: !!profile.name && !!profile.craftType },
    { label: 'Location', completed: !!profile.location },
    { label: 'Profile Photo', completed: false }, // Always false for demo
    { label: 'Craft Story', completed: profile.story.length > 50 },
    { label: 'Language Preference', completed: !!profile.language },
  ];

  const completedSections = profileSections.filter(section => section.completed).length;
  const progressPercentage = (completedSections / profileSections.length) * 100;

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile({ ...profile });
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };

  const handlePhotoUpload = () => {
    // Photo upload placeholder
    console.log('Photo upload clicked - would open file picker');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="600">
        My Profile
      </Typography>

      {/* Profile Completion Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ flex: 1 }}>
              Profile Completion
            </Typography>
            <Chip
              label={`${Math.round(progressPercentage)}% Complete`}
              color={progressPercentage === 100 ? 'success' : 'primary'}
              variant="outlined"
            />
          </Box>
          
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{ mb: 2, height: 8, borderRadius: 4 }}
          />
          
          <Grid container spacing={1}>
            {profileSections.map((section, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {section.completed ? (
                    <CheckCircle color="success" sx={{ fontSize: 16 }} />
                  ) : (
                    <RadioButtonUnchecked color="disabled" sx={{ fontSize: 16 }} />
                  )}
                  <Typography
                    variant="body2"
                    color={section.completed ? 'success.main' : 'text.secondary'}
                  >
                    {section.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="600">
            Profile Information
          </Typography>
          {!isEditing ? (
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                size="small"
              >
                Save
              </Button>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
                size="small"
              >
                Cancel
              </Button>
            </Box>
          )}
        </Box>

        <Grid container spacing={3}>
          {/* Profile Photo Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                    fontWeight: 600,
                  }}
                >
                  {profile.name.charAt(0)}
                </Avatar>
                {isEditing && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' },
                    }}
                    size="small"
                    onClick={handlePhotoUpload}
                  >
                    <PhotoCamera />
                  </IconButton>
                )}
              </Box>
              <Typography variant="body2" color="text.secondary">
                {isEditing ? 'Click camera to upload photo' : 'Profile Photo'}
              </Typography>
            </Box>
          </Grid>

          {/* Profile Details */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={isEditing ? tempProfile.name : profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  variant={isEditing ? 'outlined' : 'filled'}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {isEditing ? (
                  <FormControl fullWidth>
                    <InputLabel>Craft Type</InputLabel>
                    <Select
                      value={tempProfile.craftType}
                      label="Craft Type"
                      onChange={(e) => handleInputChange('craftType', e.target.value)}
                    >
                      {craftTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    label="Craft Type"
                    value={profile.craftType}
                    disabled
                    variant="filled"
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={isEditing ? tempProfile.location : profile.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                  variant={isEditing ? 'outlined' : 'filled'}
                  placeholder="City, State, Country"
                />
              </Grid>

              <Grid item xs={12}>
                {isEditing ? (
                  <FormControl fullWidth>
                    <InputLabel>Preferred Language</InputLabel>
                    <Select
                      value={tempProfile.language}
                      label="Preferred Language"
                      onChange={(e) => handleInputChange('language', e.target.value)}
                    >
                      {languages.map((lang) => (
                        <MenuItem key={lang} value={lang}>
                          {lang}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    label="Preferred Language"
                    value={profile.language}
                    disabled
                    variant="filled"
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={isEditing ? 6 : 4}
                  label="Your Craft Story"
                  value={isEditing ? tempProfile.story : profile.story}
                  onChange={(e) => handleInputChange('story', e.target.value)}
                  disabled={!isEditing}
                  variant={isEditing ? 'outlined' : 'filled'}
                  placeholder="Tell your craft story, inspiration, and what makes your work unique..."
                  helperText={isEditing ? `${tempProfile.story.length} characters` : ''}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Additional Options */}
        {!isEditing && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="outlined" size="small">
                  Download Profile Data
                </Button>
                <Button variant="outlined" size="small" color="error">
                  Delete Account
                </Button>
                <Button variant="outlined" size="small">
                  Privacy Settings
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ProfilePage;