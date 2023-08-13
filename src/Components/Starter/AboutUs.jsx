import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import bestTeams from '../../assets/images/bestTeams.jpg';
import '../../styles/styles.css';

const AboutUs = ({ onClickHandler }) => {
  return (
    <Box className='aboutUsContainer}'>
      <Grid container spacing={6} className='gridContainer'>
        <Grid item xs={12} md={5}>
          <img src={bestTeams} alt='My Team' className='largeImage' />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant='h3' fontWeight={700} className='title'>
            We build, We revive
          </Typography>
          <Typography className='aboutUsSubtitle'>
            Your business needs to be in safe hands at all times. We ensure you
            never run out of customers and not run at loss. We are trusted by
            over 500+ companies to deliver quality marketing campaigns using
            Digital marketing & Offline marketing channels.
          </Typography>
          <Button
            onClick={onClickHandler}
            variant='contained'
            color='primary'
            sx={{ width: '200px', fontSize: '16px' }}
          >
            CONTACT US
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
