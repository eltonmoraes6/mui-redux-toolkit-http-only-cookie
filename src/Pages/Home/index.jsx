import {
  Box,
  // Button,
  Card,
  // CardActions,
  CardContent,
  // CardMedia,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import StorefrontIcon from '@mui/icons-material/Storefront';

import { getCurrentUser, selectUser } from '../../Store/Slices/userSlice';

import BasicAccordion from '../../Components/BasicAccordion';
import '../../styles/home.css';

export const Home = () => {
  const dispatch = useDispatch();
  const apiRef = useRef(true);
  const userInfo = useSelector(selectUser);

  useEffect(() => {
    if (apiRef.current) {
      dispatch(getCurrentUser());
      apiRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className=''>
        <Box height={20}></Box>
        <Box sx={{ display: 'flex' }}>
          <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <Stack spacing={2} direction={'row'}>
                  <Card
                    sx={{ minWidth: 49 + '%', height: 150 }}
                    className='gradient'
                  >
                    {/* <CardMedia
                  sx={{ height: 140 }}
                  image='/static/images/cards/contemplative-reptile.jpg'
                  title='green iguana'
                /> */}
                    <CardContent>
                      <div className='icon__style'>
                        <CreditCardIcon />
                      </div>
                      <Typography
                        gutterBottom
                        variant='h5'
                        component='div'
                        sx={{ color: '#ffffff' }}
                      >
                        $500.00
                      </Typography>
                      <Typography
                        gutterBottom
                        variant='body'
                        component='div'
                        sx={{ color: '#ccd1d1' }}
                      >
                        Total Earnings
                      </Typography>
                    </CardContent>
                    {/* <CardActions>
                  <Button size='small'>Share</Button>
                  <Button size='small'>Learn More</Button>
                </CardActions> */}
                  </Card>

                  <Card
                    sx={{ minWidth: 49 + '%', height: 150 }}
                    className='gradient__light'
                  >
                    <CardContent>
                      <div className='icon__style'>
                        <ShoppingBagIcon />
                      </div>
                      <Typography
                        gutterBottom
                        variant='h5'
                        component='div'
                        sx={{ color: '#ffffff' }}
                      >
                        $900.00
                      </Typography>
                      <Typography
                        gutterBottom
                        variant='body'
                        component='div'
                        sx={{ color: '#ccd1d1' }}
                      >
                        Total Orders
                      </Typography>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack spacing={2}>
                  <Card sx={{ maxWidth: 600 }} className='gradient__light'>
                    <Stack spacing={2} direction={'row'}>
                      <div className='icon__style'>
                        <StorefrontIcon />
                      </div>
                      <div className='paddin__gall'>
                        <span className='price__title'>$203k</span>
                        <br />
                        <span className='price__sub-title'>Total Income</span>
                      </div>
                    </Stack>
                  </Card>
                  <Card sx={{ maxWidth: 600 }}>
                    <Stack spacing={2} direction={'row'}>
                      <div className='icon__style-black'>
                        <StorefrontIcon />
                      </div>
                      <div className='paddin__gall'>
                        <span className='price__title'>$203k</span>
                        <br />
                        <span className='price__sub-title'>Total Income</span>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={20}></Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <Card sx={{ height: 'auto' }}>
                  <CardContent>
                    <div className='flex justify-center items-center flex-col w-full gap-3'>
                      <h1 className='font-bold m-4'>
                        Please access your Dev Tools and navigate to both the
                        Network and Cookies tabs in order to observe the Refresh
                        Token Rotation and Automatic Retry Mechanism of Failed
                        APIs with Stale Access Tokens.
                      </h1>

                      <h1 className='font-bold'>
                        Access Token Expiry time is 900 seconds. Refresh Token
                        Expiry time is 1800 seconds.
                      </h1>

                      {userInfo ? (
                        <div className='flex justify-center items-center flex-col'>
                          <h1>Name: {userInfo.name}</h1>
                          <h1>Email: {userInfo.email}</h1>
                        </div>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ height: 60 + 'vh' }}>
                  <CardContent>
                    <div className='paddin__gall'>
                      <span className='price__title'>Popular Producs</span>
                      <br />
                    </div>

                    <BasicAccordion />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
};
