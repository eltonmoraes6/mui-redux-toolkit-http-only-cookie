import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const primary = purple[500]; // #f44336

const GenericNotFound = () => {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(`${url}`);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: primary,
        }}
      >
        <Typography variant='h1' style={{ color: 'white' }}>
          404
        </Typography>
        <Typography variant='h6' style={{ color: 'white' }}>
          The page you’re looking for doesn’t exist.
        </Typography>
        <Button variant='contained' onClick={() => handleNavigate('/')}>
          Back Home
        </Button>
      </Box>
    </>
  );
};

export default GenericNotFound;
