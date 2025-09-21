import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  TextField,
  Switch,
  FormControlLabel,
  Chip,
  Avatar,
  Divider,
  Slider,
  Alert,
} from '@mui/material';
import {
  Campaign,
  PlayArrow,
  Edit,
  Share,
  Schedule,
  Visibility,
  ThumbUp,
  Comment,
  AutoAwesome,
} from '@mui/icons-material';

const Marketing = () => {
  const [postCaption, setPostCaption] = useState(
    "✨ Handcrafted with love! Check out my latest silver earrings featuring traditional Kundan work. Each piece tells a story of heritage and artistry. 💎 #HandmadeJewelry #ArtisanMade #TraditionalCrafts"
  );
  const [autoPost, setAutoPost] = useState(true);
  const [postFrequency, setPostFrequency] = useState(3);

  const marketingCampaigns = [
    {
      id: 1,
      title: 'Holiday Collection Launch',
      type: 'Product Campaign',
      status: 'Active',
      reach: '12,500',
      engagement: '8.5%',
      budget: '₹2,500',
      platform: 'Instagram + Facebook',
    },
    {
      id: 2,
      title: 'Behind the Scenes',
      type: 'Story Campaign',
      status: 'Scheduled',
      reach: '8,200',
      engagement: '12.3%',
      budget: '₹1,800',
      platform: 'Instagram Stories',
    },
    {
      id: 3,
      title: 'Customer Reviews',
      type: 'Social Proof',
      status: 'Completed',
      reach: '15,800',
      engagement: '15.7%',
      budget: '₹3,200',
      platform: 'All Platforms',
    },
  ];

  const socialMediaPosts = [
    {
      id: 1,
      content: 'New handcrafted silver collection is live!',
      image: 'product-showcase.jpg',
      likes: 245,
      comments: 18,
      shares: 12,
      platform: 'Instagram',
      scheduled: false,
    },
    {
      id: 2,
      content: 'Watch me create magic with traditional techniques',
      image: 'craftsman-video.mp4',
      likes: 189,
      comments: 32,
      shares: 8,
      platform: 'Facebook',
      scheduled: true,
    },
  ];

  const handleGenerateContent = () => {
    const templates = [
      "🎨 Every piece tells a story of tradition and craftsmanship. Discover the artistry behind my latest creation! ✨ #HandmadeWithLove #ArtisanCrafts",
      "✋ Handcrafted. 💝 Heartfelt. 🌟 Unique. Each creation is a labor of love that brings joy to your world! #ArtisanMade #HandcraftedJewelry",
      "🔥 New arrival alert! This stunning piece combines traditional techniques with contemporary design. What do you think? 💎 #NewCollection #TraditionalCrafts",
    ];
    
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    setPostCaption(randomTemplate);
  };

  const handleSchedulePost = () => {
    console.log('Scheduling post with caption:', postCaption);
    alert('Post scheduled successfully!');
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="600">
        Marketing Tools
      </Typography>

      <Grid container spacing={3}>
        {/* Auto-Generated Marketing Preview */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Marketing Content Preview
              </Typography>
              
              {/* Video/Image Preview */}
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  mb: 3,
                  textAlign: 'center',
                  bgcolor: 'grey.50',
                  minHeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <PlayArrow sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Auto-Generated Product Video
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  AI-generated marketing video featuring your latest product
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label="1080p HD" size="small" />
                  <Chip label="30 seconds" size="small" />
                  <Chip label="With voiceover" size="small" />
                </Box>
                
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  sx={{ position: 'absolute', top: 16, right: 16 }}
                >
                  Edit Video
                </Button>
              </Paper>

              {/* Caption Editor */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="600">
                    Post Caption
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AutoAwesome />}
                    onClick={handleGenerateContent}
                  >
                    Generate New
                  </Button>
                </Box>
                
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={postCaption}
                  onChange={(e) => setPostCaption(e.target.value)}
                  placeholder="Write your post caption..."
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    {postCaption.length} characters
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" size="small">
                      Save Draft
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Schedule />}
                      onClick={handleSchedulePost}
                    >
                      Schedule Post
                    </Button>
                  </Box>
                </Box>
              </Box>

              {/* Platform Selection */}
              <Box>
                <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                  Share to Platforms
                </Typography>
                <Grid container spacing={1}>
                  {['Instagram', 'Facebook', 'Twitter', 'Pinterest', 'WhatsApp'].map((platform) => (
                    <Grid item key={platform}>
                      <Chip
                        label={platform}
                        clickable
                        color="primary"
                        variant="outlined"
                        icon={<Share />}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Marketing Settings */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Auto-Marketing Settings
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoPost}
                      onChange={(e) => setAutoPost(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Enable Auto-Posting"
                />
                <Typography variant="body2" color="text.secondary">
                  Automatically create and schedule posts for your new products
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Posting Frequency (per week)
                </Typography>
                <Slider
                  value={postFrequency}
                  onChange={(e, value) => setPostFrequency(value)}
                  min={1}
                  max={7}
                  marks
                  valueLabelDisplay="auto"
                  color="primary"
                />
              </Box>

              <Alert severity="info" sx={{ mb: 2 }}>
                AI will optimize posting times based on your audience engagement patterns
              </Alert>

              <Button variant="outlined" fullWidth>
                Advanced Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Insights
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  This Week's Performance
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" fontWeight="600" color="primary">
                        2.8K
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Reach
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" fontWeight="600" color="success.main">
                        12.5%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Engagement
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Top Performing Content
              </Typography>
              <Typography variant="body2" fontWeight="600">
                "Behind the scenes crafting video"
              </Typography>
              <Typography variant="caption" color="text.secondary">
                245 likes • 18 comments • 12 shares
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Campaigns */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Marketing Campaigns
              </Typography>
              
              <Grid container spacing={2}>
                {marketingCampaigns.map((campaign) => (
                  <Grid item xs={12} md={4} key={campaign.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="subtitle1" fontWeight="600">
                            {campaign.title}
                          </Typography>
                          <Chip
                            label={campaign.status}
                            size="small"
                            color={
                              campaign.status === 'Active' ? 'success' :
                              campaign.status === 'Scheduled' ? 'warning' : 'default'
                            }
                            variant="outlined"
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {campaign.type} • {campaign.platform}
                        </Typography>
                        
                        <Grid container spacing={1} sx={{ mt: 1 }}>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">
                              Reach
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                              {campaign.reach}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">
                              Engagement
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                              {campaign.engagement}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="caption" color="text.secondary">
                              Budget
                            </Typography>
                            <Typography variant="body2" fontWeight="600">
                              {campaign.budget}
                            </Typography>
                          </Grid>
                        </Grid>
                        
                        <Button variant="outlined" size="small" fullWidth sx={{ mt: 2 }}>
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Posts */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Social Media Posts
              </Typography>
              
              {socialMediaPosts.map((post) => (
                <Box key={post.id} sx={{ mb: 3, pb: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {post.platform.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight="600">
                          {post.platform} Post
                        </Typography>
                        <Chip
                          label={post.scheduled ? 'Scheduled' : 'Published'}
                          size="small"
                          color={post.scheduled ? 'warning' : 'success'}
                          variant="outlined"
                        />
                      </Box>
                      
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {post.content}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <ThumbUp sx={{ fontSize: 16 }} />
                          <Typography variant="caption">{post.likes}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Comment sx={{ fontSize: 16 }} />
                          <Typography variant="caption">{post.comments}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Share sx={{ fontSize: 16 }} />
                          <Typography variant="caption">{post.shares}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Marketing;