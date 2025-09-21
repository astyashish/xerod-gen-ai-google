import React, { useState, useEffect } from 'react';
import {
  Fab,
  Dialog,
  DialogContent,
  Box,
  Typography,
  Avatar,
  IconButton,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  Assistant,
  Mic,
  MicOff,
  VolumeUp,
  VolumeOff,
  Close,
  PlayArrow,
  Pause,
  Refresh,
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const VoiceAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();

  // Page-specific guidance content
  const pageGuidance = {
    '/dashboard': {
      welcome: 'नमस्ते! मैं आपका AI सहायक हूँ। यह आपका मुख्य डैशबोर्ड है। यहाँ आप अपने व्यापार की स्थिति देख सकते हैं।',
      guidance: [
        'आप यहाँ अपनी कुल कमाई देख सकते हैं',
        'नए ऑर्डर्स की जानकारी यहाँ मिलेगी',
        'अपने उत्पादों की बिक्री का विवरण देखें',
        'नया उत्पाद जोड़ने के लिए "Add Product" बटन दबाएं'
      ],
      quickActions: ['View Orders', 'Add Product', 'Check Analytics', 'Update Profile']
    },
    '/products': {
      welcome: 'यह आपका उत्पाद प्रबंधन पेज है। यहाँ आप अपने सभी उत्पाद देख और प्रबंधित कर सकते हैं।',
      guidance: [
        'नया उत्पाद जोड़ने के लिए "+" बटन दबाएं',
        'उत्पाद की तस्वीर अपलोड करना जरूरी है',
        'अच्छा विवरण लिखें ताकि ग्राहक समझ सकें',
        'कीमत उचित रखें और बाजार से तुलना करें'
      ],
      quickActions: ['Add New Product', 'Edit Product', 'View Sales', 'Update Inventory']
    },
    '/add-product': {
      welcome: 'नया उत्पाद जोड़ने के लिए इन चरणों का पालन करें। मैं आपकी हर कदम पर मदद करूंगा।',
      guidance: [
        'पहले अपने उत्पाद की अच्छी तस्वीरें लें',
        'साफ रोशनी में फोटो खींचें',
        'उत्पाद का नाम, कीमत और विवरण भरें',
        'सभी ऑनलाइन दुकानों को चुनें जहाँ बेचना है'
      ],
      quickActions: ['Upload Photos', 'Add Description', 'Set Price', 'Choose Marketplaces']
    },
    '/orders': {
      welcome: 'यहाँ आपके सभी ऑर्डर्स हैं। आप ग्राहकों के ऑर्डर देख और प्रबंधित कर सकते हैं।',
      guidance: [
        'नए ऑर्डर्स सबसे ऊपर दिखेंगे',
        'ऑर्डर पैक करने के बाद "Shipped" करें',
        'ग्राहक का पता और फोन नंबर देखें',
        'डिलीवरी ट्रैकिंग नंबर जोड़ें'
      ],
      quickActions: ['Process Orders', 'Print Labels', 'Update Status', 'Contact Customer']
    },
    '/analytics': {
      welcome: 'यह आपकी बिक्री रिपोर्ट है। यहाँ आप समझ सकते हैं कि आपका व्यापार कैसा चल रहा है।',
      guidance: [
        'महीने की कुल कमाई देखें',
        'कौन सा उत्पाद ज्यादा बिक रहा है',
        'किस दिन ज्यादा ऑर्डर आते हैं',
        'ग्राहकों की पसंद समझें'
      ],
      quickActions: ['View Revenue', 'Top Products', 'Customer Insights', 'Sales Trends']
    },
    '/profile': {
      welcome: 'यह आपकी प्रोफाइल है। अपनी जानकारी अपडेट करें ताकि ग्राहक आप पर भरोसा करें।',
      guidance: [
        'अपनी अच्छी फोटो लगाएं',
        'अपने काम की कहानी लिखें',
        'अपना पता और फोन नंबर सही भरें',
        'अपने हुनर के बारे में बताएं'
      ],
      quickActions: ['Update Photo', 'Edit Story', 'Add Skills', 'Update Contact']
    },
    '/help': {
      welcome: 'यदि आपको कोई समस्या है या सवाल है तो यहाँ मदद मिलेगी।',
      guidance: [
        'आम सवालों के जवाब यहाँ हैं',
        'Live Chat से तुरंत मदद लें',
        'Video Call बुक करके सीखें',
        'अनुभवी कारीगरों से सलाह लें'
      ],
      quickActions: ['Browse FAQ', 'Start Live Chat', 'Book Video Call', 'Find Mentor']
    }
  };

  const getCurrentPageGuidance = () => {
    return pageGuidance[location.pathname] || pageGuidance['/dashboard'];
  };

  const startListening = () => {
    setIsListening(true);
    setCurrentMessage('आप बोलें... मैं सुन रहा हूँ');
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      handleVoiceCommand('मुझे इस पेज के बारे में बताओ');
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    setCurrentMessage('');
  };

  const speakMessage = (message) => {
    setIsSpeaking(true);
    setCurrentMessage(`🔊 ${message}`);
    // Simulate speech synthesis
    setTimeout(() => {
      setIsSpeaking(false);
    }, 3000);
  };

  const handleVoiceCommand = (command) => {
    setIsProcessing(true);
    const guidance = getCurrentPageGuidance();
    
    // Add user message to conversation
    setConversation(prev => [...prev, { type: 'user', message: command }]);
    
    // Simulate AI processing
    setTimeout(() => {
      let response = '';
      
      if (command.includes('बताओ') || command.includes('help') || command.includes('guide')) {
        response = guidance.welcome;
      } else if (command.includes('कैसे') || command.includes('how')) {
        response = guidance.guidance[Math.floor(Math.random() * guidance.guidance.length)];
      } else if (command.includes('शुरू') || command.includes('start')) {
        response = 'मैं आपकी मदद करूंगा। पहले ' + guidance.quickActions[0] + ' करते हैं।';
      } else {
        response = 'मैं आपकी बात समझ गया। ' + guidance.welcome;
      }
      
      setConversation(prev => [...prev, { type: 'ai', message: response }]);
      speakMessage(response);
      setIsProcessing(false);
    }, 2000);
  };

  const getPageSpecificTips = () => {
    const guidance = getCurrentPageGuidance();
    return guidance.guidance;
  };

  const getQuickActions = () => {
    const guidance = getCurrentPageGuidance();
    return guidance.quickActions;
  };

  useEffect(() => {
    // Auto-greet when page changes
    const guidance = getCurrentPageGuidance();
    setTimeout(() => {
      setConversation([{ type: 'ai', message: guidance.welcome }]);
    }, 1000);
  }, [location.pathname]);

  useEffect(() => {
    // Listen for external events to open AI assistant
    const handleOpenAssistant = () => {
      setIsOpen(true);
      startListening();
    };
    
    window.addEventListener('openAIAssistant', handleOpenAssistant);
    return () => window.removeEventListener('openAIAssistant', handleOpenAssistant);
  }, []);

  return (
    <>
      {/* Floating AI Assistant Button */}
      <Fab
        color="primary"
        onClick={() => setIsOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(76, 205, 196, 0.7)' },
            '70%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(76, 205, 196, 0)' },
            '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(76, 205, 196, 0)' },
          },
        }}
      >
        <Assistant sx={{ fontSize: 28 }} />
      </Fab>

      {/* AI Assistant Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ position: 'relative' }}>
            {/* Header */}
            <Box sx={{ p: 3, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                    <Assistant />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="600">
                      AI सहायक (Voice Assistant)
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      आपका व्यक्तिगत गाइड
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                  <Close />
                </IconButton>
              </Box>
            </Box>

            {/* Current Status */}
            {(isListening || isSpeaking || isProcessing) && (
              <Box sx={{ p: 2, background: 'rgba(255,255,255,0.1)' }}>
                {isProcessing && <LinearProgress sx={{ mb: 1 }} />}
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {isListening && '🎤 सुन रहा हूँ...'}
                  {isSpeaking && '🔊 बोल रहा हूँ...'}
                  {isProcessing && '🤔 सोच रहा हूँ...'}
                </Typography>
                {currentMessage && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {currentMessage}
                  </Typography>
                )}
              </Box>
            )}

            {/* Conversation */}
            <Box sx={{ maxHeight: 300, overflow: 'auto', p: 2 }}>
              {conversation.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    display: 'flex',
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <Card
                    sx={{
                      maxWidth: '80%',
                      backgroundColor: msg.type === 'user' 
                        ? 'rgba(255,255,255,0.2)' 
                        : 'rgba(255,255,255,0.9)',
                      color: msg.type === 'user' ? 'white' : 'black'
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Typography variant="body2">
                        {msg.message}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>

            {/* Page-specific Tips */}
            <Box sx={{ p: 2, background: 'rgba(255,255,255,0.05)' }}>
              <Typography variant="subtitle2" gutterBottom sx={{ opacity: 0.8 }}>
                इस पेज की मुख्य बातें:
              </Typography>
              {getPageSpecificTips().map((tip, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                  • {tip}
                </Typography>
              ))}
            </Box>

            {/* Quick Actions */}
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ opacity: 0.8 }}>
                त्वरित कार्य:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {getQuickActions().map((action, index) => (
                  <Chip
                    key={index}
                    label={action}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                    }}
                    onClick={() => handleVoiceCommand(`${action} के बारे में बताओ`)}
                  />
                ))}
              </Box>
            </Box>

            {/* Voice Controls */}
            <Box sx={{ p: 3, background: 'rgba(255,255,255,0.1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={isListening ? <MicOff /> : <Mic />}
                  onClick={isListening ? stopListening : startListening}
                  sx={{
                    backgroundColor: isListening ? 'error.main' : 'success.main',
                    '&:hover': {
                      backgroundColor: isListening ? 'error.dark' : 'success.dark'
                    }
                  }}
                >
                  {isListening ? 'बंद करें' : 'आवाज़ से पूछें'}
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<VolumeUp />}
                  onClick={() => speakMessage(getCurrentPageGuidance().welcome)}
                  sx={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }}
                >
                  दोबारा सुनें
                </Button>
              </Box>

              <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2, opacity: 0.7 }}>
                आप हिंदी या अंग्रेजी में बात कर सकते हैं
              </Typography>
            </Box>

            {/* Sample Voice Commands */}
            <Box sx={{ p: 2, background: 'rgba(255,255,255,0.05)' }}>
              <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 1 }}>
                कुछ इस तरह पूछ सकते हैं:
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                "मुझे इस पेज के बारे में बताओ" • "कैसे शुरू करूं?" • "नया उत्पाद कैसे जोड़ूं?"
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VoiceAIAssistant;