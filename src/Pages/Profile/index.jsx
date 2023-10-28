import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';

import PageTitle from '../../Components/PageTitle';
import { useGetUserQuery } from '../../Store/Slices/usersSlice';
import AccountProfile from './AccountProfile';
import AccountProfileDetails from './AccountProfileDetails';

const Account = () => {
  const {
    data: user,
    isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetUserQuery();

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
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <AccountProfile user={user.user} />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <AccountProfileDetails user={user.user} />
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Account;
