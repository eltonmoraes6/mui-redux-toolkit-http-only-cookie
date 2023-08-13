import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import myteam from '../../assets/images/myteam.jpg';
import '../../styles/styles.css';

const Hero = () => {
  return (
    <Box className='heroBox'>
      <Grid container spacing={6} className='gridContainer'>
        <Grid item xs={12} md={7}>
          <Typography variant='h3' fontWeight={700} className='title'>
            Let's scale your business
          </Typography>
          <Typography variant='h6' className='subtitle'>
            Hire professionals who will help your business make 10X your
            previous income. With over 5years experience in Marketing & Business
            strategy, we are your best client.
          </Typography>
          <Button
            variant='contained'
            color='primary'
            sx={{ width: '200px', fontSize: '16px' }}
          >
            HIRE US
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={myteam} alt='My Team' className='largeImage' />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
