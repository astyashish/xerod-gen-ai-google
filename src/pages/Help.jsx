import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Button,
  Grid,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material';
import {
  ExpandMore,
  Search,
  Help as HelpIcon,
  Phone,
  Email,
  Chat,
  VideoCall,
  School,
  Article,
  ContactSupport,
  QuestionAnswer,
  LiveHelp,
} from '@mui/icons-material';
import { sampleFAQ } from '../data/sampleData';

const Help = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(false);

  const filteredFAQ = sampleFAQ.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: <School />,
      articles: [
        'How to set up your artisan profile',
        'Creating your first product listing',
        'Understanding marketplace requirements',
        'Setting up payment methods',
      ],
    },
    {
      title: 'Product Management',
      icon: <Article />,
      articles: [
        'Best practices for product photography',
        'Writing compelling product descriptions',
        'Managing inventory across marketplaces',
        'Pricing strategies for handmade items',
      ],
    },
    {
      title: 'Orders & Shipping',
      icon: <ContactSupport />,
      articles: [
        'Processing and fulfilling orders',
        'Shipping guidelines and requirements',
        'Handling returns and exchanges',
        'Customer communication best practices',
      ],
    },
    {
      title: 'Marketing & Growth',
      icon: <QuestionAnswer />,
      articles: [
        'Social media marketing strategies',
        'Using AI-generated content effectively',
        'Building customer relationships',
        'Seasonal sales and promotions',
      ],
    },
  ];

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: <Chat />,
      color: 'primary',
      available: true,
    },
    {
      title: 'Video Call',
      description: 'Schedule a one-on-one session',
      icon: <VideoCall />,
      color: 'secondary',
      available: true,
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with an expert',
      icon: <Phone />,
      color: 'success',
      available: false,
    },
    {
      title: 'Email Support',
      description: 'Get detailed written assistance',
      icon: <Email />,
      color: 'info',
      available: true,
    },
  ];

  const mentorProgram = [
    {
      name: 'Rajesh Kumar',
      expertise: 'Traditional Jewelry Making',
      rating: 4.9,
      sessions: 127,
      description: 'Expert in Kundan and Meenakari techniques with 20+ years of experience',
    },
    {
      name: 'Meera Patel',
      expertise: 'Digital Marketing for Artisans',
      rating: 4.8,
      sessions: 89,
      description: 'Helps artisans build their online presence and increase sales',
    },
    {
      name: 'Arjun Singh',
      expertise: 'Business Development',
      rating: 4.7,
      sessions: 156,
      description: 'Guides artisans in scaling their craft business sustainably',
    },
  ];

  const handleFAQChange = (panel) => (event, isExpanded) => {
    setExpandedFAQ(isExpanded ? panel : false);
  };

  const renderTabContent = (tabIndex) => {
    switch (tabIndex) {
      case 0: // FAQ
        return (
          <Box>
            <TextField
              fullWidth
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            {filteredFAQ.length > 0 ? (
              filteredFAQ.map((faq, index) => (
                <Accordion
                  key={index}
                  expanded={expandedFAQ === `panel${index}`}
                  onChange={handleFAQChange(`panel${index}`)}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle1" fontWeight="600">
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <HelpIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No results found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your search terms or browse help articles
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        );

      case 1: // Help Articles
        return (
          <Grid container spacing={3}>
            {helpCategories.map((category, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                        {category.icon}
                      </Avatar>
                      <Typography variant="h6" fontWeight="600">
                        {category.title}
                      </Typography>
                    </Box>

                    <List dense>
                      {category.articles.map((article, articleIndex) => (
                        <ListItem key={articleIndex} disablePadding>
                          <ListItemButton>
                            <ListItemText
                              primary={article}
                              primaryTypographyProps={{
                                variant: 'body2',
                                color: 'primary.main',
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );

      case 2: // Contact Support
        return (
          <Grid container spacing={3}>
            {supportOptions.map((option, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    opacity: option.available ? 1 : 0.6,
                    cursor: option.available ? 'pointer' : 'not-allowed',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Avatar
                      sx={{
                        mx: 'auto',
                        mb: 2,
                        bgcolor: `${option.color}.light`,
                        color: `${option.color}.main`,
                        width: 56,
                        height: 56,
                      }}
                    >
                      {option.icon}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {option.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {option.description}
                    </Typography>
                    {option.available ? (
                      <Chip label="Available" color="success" size="small" />
                    ) : (
                      <Chip label="Coming Soon" color="default" size="small" />
                    )}
                    <Button
                      variant={option.available ? 'contained' : 'outlined'}
                      fullWidth
                      sx={{ mt: 2 }}
                      disabled={!option.available}
                      color={option.color}
                    >
                      {option.available ? 'Start' : 'Notify Me'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quick Contact Form
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Name" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Email" type="email" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Subject" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Message"
                        placeholder="Describe your issue or question..."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" startIcon={<Email />}>
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 3: // Mentor Program
        return (
          <Box>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Connect with Expert Mentors
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Get personalized guidance from experienced artisans and business experts to grow your craft business.
                </Typography>
                <Button variant="outlined" startIcon={<School />}>
                  Learn More About Mentorship
                </Button>
              </CardContent>
            </Card>

            <Grid container spacing={3}>
              {mentorProgram.map((mentor, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48 }}>
                          {mentor.name.split(' ').map(n => n.charAt(0)).join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="600">
                            {mentor.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {mentor.expertise}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {mentor.description}
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Chip
                          label={`⭐ ${mentor.rating}`}
                          size="small"
                          color="warning"
                          variant="outlined"
                        />
                        <Typography variant="caption" color="text.secondary">
                          {mentor.sessions} sessions completed
                        </Typography>
                      </Box>

                      <Button variant="contained" fullWidth startIcon={<VideoCall />}>
                        Book Session
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="600">
        Help & Support
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Find answers, get support, and connect with mentors to grow your artisan business.
      </Typography>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Chat />}
            sx={{ py: 1.5 }}
          >
            Live Chat
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<VideoCall />}
            sx={{ py: 1.5 }}
          >
            Video Call
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<School />}
            sx={{ py: 1.5 }}
          >
            Find Mentor
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Article />}
            sx={{ py: 1.5 }}
          >
            Browse Articles
          </Button>
        </Grid>
      </Grid>

      {/* Help Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="FAQ" icon={<QuestionAnswer />} iconPosition="start" />
          <Tab label="Help Articles" icon={<Article />} iconPosition="start" />
          <Tab label="Contact Support" icon={<ContactSupport />} iconPosition="start" />
          <Tab label="Find a Mentor" icon={<School />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {renderTabContent(tabValue)}
    </Box>
  );
};

export default Help;