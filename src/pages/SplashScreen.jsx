import React from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Fade,
} from '@mui/material';
import { Palette } from '@mui/icons-material';

const SplashScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Fade in timeout={1000}>
        <Box>
          <Box
            sx={{
              mb: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Palette sx={{ fontSize: 60 }} />
          </Box>

          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            ArtisanAI Connect
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: 400,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Empowering artisans with AI-driven marketplace solutions
          </Typography>

          <CircularProgress
            size={40}
            thickness={4}
            sx={{
              color: 'white',
              opacity: 0.8,
            }}
          />
        </Box>
      </Fade>
    </Box>
  );
};

export default SplashScreen;