import { Box, Container, Grid } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, selectUser } from '../../Store/Slices/userSlice';

import PageTitle from '../../Components/PageTitle';
import AccountProfile from './AccountProfile';
import AccountProfileDetails from './AccountProfileDetails';

const Account = () => {
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
      <PageTitle title='Account' />
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile user={userInfo} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails user={userInfo} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
