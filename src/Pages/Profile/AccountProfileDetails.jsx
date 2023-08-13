import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

import CircularIndeterminate from '../../Components/CircularIndeterminate';

const states = [
  {
    value: 'alabama',
    label: 'Alabama',
  },
  {
    value: 'new-york',
    label: 'New York',
  },
  {
    value: 'san-francisco',
    label: 'San Francisco',
  },
];

const AccountProfileDetails = (props) => {
  const loading = false;

  const [values, setValues] = useState({
    firstName: 'Katarina',
    familyName: 'Smith',
    email: 'demo@devias.io',
    phone: '(82) 90000-0000',
    state: 'Alabama',
    country: 'USA',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete='off' noValidate {...props}>
      {loading && <CircularIndeterminate />}
      <Card>
        <CardHeader
          subheader='As informações podem ser editadas'
          title='Perfil'
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText='Please specify the first name'
                label='Nome'
                name='name'
                onChange={handleChange}
                required
                size='small'
                value={props.user.name}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Sobrenome'
                name='familyName'
                onChange={handleChange}
                required
                size='small'
                value={props.user.familyName}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Endereço de Email'
                name='email'
                onChange={handleChange}
                required
                size='small'
                value={props.user.email}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Número de telefone'
                name='phone'
                onChange={handleChange}
                size='small'
                type='text'
                value={props.user.phone}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='País'
                name='country'
                onChange={handleChange}
                required
                size='small'
                value={values.country}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Selecione o Estado'
                name='state'
                onChange={handleChange}
                required
                size='small'
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant='outlined'
              >
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button color='primary' variant='contained'>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
