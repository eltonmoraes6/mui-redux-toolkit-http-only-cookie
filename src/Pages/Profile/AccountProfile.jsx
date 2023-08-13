import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import userImg from '../../assets/images/user.png';
import { nameToUpperCase } from '../../utils/nameToUpperCase';

const user = {
  avatar: userImg,
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7',
};

const AccountProfile = (props) => {
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 100,
              width: 100,
            }}
          />
          <Typography color='textPrimary' gutterBottom variant='h3'>
            {nameToUpperCase(props.user.name)}
          </Typography>
          <Typography color='textSecondary' variant='body1'>
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography color='textSecondary' variant='body1'>
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color='primary' fullWidth size='small' variant='text'>
          Editar Imagem
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
