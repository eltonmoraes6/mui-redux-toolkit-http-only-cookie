import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/footer.css';

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <Box sx={{ flexGrow: 1 }} className='footer footerContainer'>
      <Typography className='footerText'>
        desenvolvido por{' '}
        <Link to='/' style={{ textDecoration: 'none' }}>
          ACPS
        </Link>
      </Typography>
      <Typography className='footerDate'>
        {date} Associação Comunitária do Povoado Salomezinho
      </Typography>
      <Typography className='footerDate'>CNPJ: 04.971.774/0001-10</Typography>
    </Box>
  );
};

export default Footer;
