import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Fade,
  Slide,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  SmartToy,
  Mic,
  MicOff,
  Send,
  ArrowForward,
  Palette,
} from '@mui/icons-material';

const OnboardingFlow = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    craftType: '',
    location: '',
    language: '',
    story: '',
  });
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "नमस्ते! मैं आपका ArtisanAI सहायक हूँ। मैं आपको ऑनलाइन व्यापार में मदद करूंगा। Welcome! I'm your ArtisanAI assistant.",
      sender: 'ai',
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "आप चाहें तो मुझसे हिंदी या अंग्रेजी में बात कर सकते हैं। You can speak to me in Hindi or English using your voice!",
      sender: 'ai',
      timestamp: new Date(),
    },
    {
      id: 3,
      text: "🎤 माइक बटन दबाकर बोलें या टाइप करें। Press the mic button to speak or type your answer. What's your name?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');

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

  const handleMicToggle = () => {
    setIsListening(!isListening);
    // Voice input placeholder - would integrate with speech recognition API
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        // Simulate voice input
        setCurrentInput('This is simulated voice input');
      }, 2000);
    }
  };

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: currentInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    // Simulate AI response based on current step
    setTimeout(() => {
      let aiResponse = '';
      let nextStep = step;

      switch (step) {
        case 0: // Name
          setFormData({ ...formData, name: currentInput });
          aiResponse = `Nice to meet you, ${currentInput}! What type of crafts do you create?`;
          nextStep = 1;
          break;
        case 1: // Craft type
          setFormData({ ...formData, craftType: currentInput });
          aiResponse = `${currentInput} sounds amazing! Where are you located?`;
          nextStep = 2;
          break;
        case 2: // Location
          setFormData({ ...formData, location: currentInput });
          aiResponse = `Great! What language would you prefer to use in the app?`;
          nextStep = 3;
          break;
        case 3: // Language
          setFormData({ ...formData, language: currentInput });
          aiResponse = `Perfect! Now, tell me a bit about your craft journey. What inspired you to start creating?`;
          nextStep = 4;
          break;
        case 4: // Story
          setFormData({ ...formData, story: currentInput });
          aiResponse = `Thank you for sharing your story! You're all set. Let's start building your artisan profile.`;
          nextStep = 5;
          break;
        default:
          break;
      }

      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setStep(nextStep);
    }, 1000);

    setCurrentInput('');
  };

  const handleSkipToProfile = () => {
    setStep(6); // Skip to profile form
  };

  const handleCompleteOnboarding = () => {
    onComplete();
  };

  if (step === 6) {
    // Show profile completion form
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 500,
            width: '100%',
            borderRadius: 3,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              sx={{
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
                width: 64,
                height: 64,
              }}
            >
              <Palette sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="h5" gutterBottom fontWeight="600">
              Complete Your Profile
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in the details to finish setting up your artisan profile
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              variant="outlined"
            />

            <FormControl fullWidth>
              <InputLabel>Craft Type</InputLabel>
              <Select
                value={formData.craftType}
                label="Craft Type"
                onChange={(e) => setFormData({ ...formData, craftType: e.target.value })}
              >
                {craftTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, State, Country"
            />

            <FormControl fullWidth>
              <InputLabel>Preferred Language</InputLabel>
              <Select
                value={formData.language}
                label="Preferred Language"
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Craft Story"
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              placeholder="Tell us about your craft journey, inspiration, and what makes your work unique..."
            />

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleCompleteOnboarding}
              sx={{ mt: 2, py: 1.5 }}
            >
              Complete Setup
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" fontWeight="600" gutterBottom>
          AI Assistant Onboarding
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Let's get you started on your artisan journey
        </Typography>
      </Box>

      {/* Chat Area */}
      <Box
        sx={{
          flex: 1,
          bgcolor: 'background.paper',
          m: 2,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {messages.map((message) => (
            <Fade key={message.id} in timeout={500}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'ai' ? 'flex-start' : 'flex-end',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    maxWidth: '80%',
                    flexDirection: message.sender === 'ai' ? 'row' : 'row-reverse',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: message.sender === 'ai' ? 'primary.main' : 'secondary.main',
                    }}
                  >
                    {message.sender === 'ai' ? <SmartToy /> : formData.name.charAt(0) || 'U'}
                  </Avatar>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      bgcolor: message.sender === 'ai' ? 'grey.100' : 'primary.main',
                      color: message.sender === 'ai' ? 'text.primary' : 'primary.contrastText',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body2">{message.text}</Typography>
                  </Paper>
                </Box>
              </Box>
            </Fade>
          ))}
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            gap: 1,
            alignItems: 'flex-end',
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="Speak or type your answer..."
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            sx={{ mr: 1 }}
          />
          
          <IconButton
            color={isListening ? 'secondary' : 'default'}
            onClick={handleMicToggle}
            sx={{
              bgcolor: isListening ? 'secondary.light' : 'grey.100',
              '&:hover': {
                bgcolor: isListening ? 'secondary.main' : 'grey.200',
              },
            }}
          >
            {isListening ? <MicOff /> : <Mic />}
          </IconButton>
          
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!currentInput.trim()}
          >
            <Send />
          </IconButton>
        </Box>

        {/* Skip Option */}
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Button
            variant="text"
            onClick={handleSkipToProfile}
            startIcon={<ArrowForward />}
            size="small"
          >
            Skip & Fill Profile Later
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OnboardingFlow;