import React, { useReducer, useState } from 'react';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import SpinnerButton from '../../Components/Button';
import { ACTIONS, signupReducer } from '../../Reducers/signupReducer';
import { signUpUser } from '../../Services/auth';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Header from '../../Components/Starter/Header';

import '../../styles/login.css';

import { Alert, TextField } from '@mui/material';
import loginImg from '../../assets/images/login.png';
import userIcon from '../../assets/images/user.png';
import { phoneMask } from '../../utils/phoneMask';
import {
  genderFormat,
  mailformat,
  nameFormat,
  passFormat,
  phoneFormat,
} from '../../utils/signupRegexFormat';

const initialState = {
  userDetails: '',
  loading: false,
  error: null,
};

export const Signup = () => {
  const [state, dispatcher] = useReducer(signupReducer, initialState);
  const { loading } = state;

  const [passwordShown, setPasswordShown] = useState(false);
  const [matchPasswordShown, setMatchPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  // MatchPassword toggle handler
  const togglematchPassword = () => {
    // When the handler is invoked
    // inverse the boolean state of matchPasswordShown
    setMatchPasswordShown(!matchPasswordShown);
  };

  const navigate = useNavigate();
  const alert = useAlert();

  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
    matchPassword: null,
    name: null,
    familyName: null,
    gender: null,
    phone: null,
  });

  const handleCredentials = (e) => {
    const { value, name } = e.target;
    if (name === 'email') {
      setCredentials((prevState) => {
        return { ...prevState, email: value };
      });
    } else if (name === 'password') {
      setCredentials((prevState) => {
        return { ...prevState, password: value };
      });
    } else if (name === 'matchPassword') {
      setCredentials((prevState) => {
        return { ...prevState, matchPassword: value };
      });
    } else if (name === 'name') {
      setCredentials((prevState) => {
        return { ...prevState, name: value };
      });
    } else if (name === 'familyName') {
      setCredentials((prevState) => {
        return { ...prevState, familyName: value };
      });
    } else if (name === 'gender') {
      setCredentials((prevState) => {
        return { ...prevState, gender: value };
      });
    } else if (name === 'phone') {
      setCredentials((prevState) => {
        return { ...prevState, phone: value };
      });
    }
  };

  const signUp = async () => {
    console.log(credentials);
    try {
      dispatcher({
        type: ACTIONS.CALL_API,
      });
      const { data } = await signUpUser(credentials);
      dispatcher({
        type: ACTIONS.SUCCESS,
        data: data,
      });
      navigate('/login');
    } catch (err) {
      dispatcher({
        type: ACTIONS.ERROR,
        data: err,
      });
      err?.response?.data?.errors?.forEach((errObj) => {
        alert.error(errObj.message);
      });
    }
  };

  const handleSignUp = () => {
    if (!credentials.email) {
      return alert.error('Please enter an Email !');
    }
    if (!credentials.password) {
      return alert.error('Please enter a Password!');
    }
    if (!credentials.name) {
      return alert.error('Please enter a Name!');
    }

    signUp();
  };

  return (
    <>
      <Header />
      <section className='login'>
        <div className='login__container'>
          <div className='login__img'>
            <img src={loginImg} alt='login' />
          </div>

          <div className='login__form'>
            <div className='user'>
              <img src={userIcon} alt='user icon' />
            </div>
            <h1>Criar conta</h1>

            {/* Name */}
            <TextField
              fullWidth
              label='Nome'
              margin='normal'
              name='name'
              id='name'
              size='small'
              type='text'
              variant='outlined'
              onChange={handleCredentials}
              error={
                credentials.name &&
                credentials.name !== '' &&
                !credentials.name.match(nameFormat)
              }
              helperText={
                credentials.name &&
                credentials.name !== '' &&
                !credentials.name.match(nameFormat) && (
                  <Alert severity='error'>Name is required</Alert>
                )
              }
            />

            {/* User Family Name */}
            <TextField
              fullWidth
              label='Sobrenome'
              margin='normal'
              name='familyName'
              id='familyName'
              size='small'
              type='text'
              variant='outlined'
              onChange={handleCredentials}
              error={
                credentials.familyName &&
                credentials.familyName !== '' &&
                !credentials.familyName.match(nameFormat)
              }
              helperText={
                credentials.familyName &&
                credentials.familyName !== '' &&
                !credentials.familyName.match(nameFormat) && (
                  <Alert severity='error'>Family Name is required</Alert>
                )
              }
            />

            {/* User Gender */}
            <TextField
              fullWidth
              label='Sexo'
              margin='normal'
              name='gender'
              id='gender'
              size='small'
              type='text'
              variant='outlined'
              select
              SelectProps={{ native: true }}
              onChange={handleCredentials}
              error={
                credentials.gender &&
                credentials.gender !== '' &&
                !credentials.gender.match(genderFormat)
              }
              helperText={
                credentials.gender &&
                credentials.gender !== '' &&
                !credentials.gender.match(genderFormat) && (
                  <Alert severity='error'>Gender is required</Alert>
                )
              }
            >
              {[
                { id: 1, value: '', label: '' },
                { id: 2, value: 'M', label: 'M' },
                { id: 3, value: 'F', label: 'F' },
              ].map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>

            {/* User Gender */}
            <TextField
              fullWidth
              label='Telefone'
              margin='normal'
              name='phone'
              id='phone'
              size='small'
              type='text'
              variant='outlined'
              onChange={handleCredentials}
              value={phoneMask(credentials.phone && credentials.phone)}
              error={
                credentials.phone &&
                credentials.phone !== '' &&
                !credentials.phone.match(phoneFormat)
              }
              helperText={
                credentials.phone &&
                credentials.phone !== '' &&
                !credentials.phone.match(phoneFormat) && (
                  <Alert severity='error'>Phone is required</Alert>
                )
              }
            />

            {/* Email */}
            <TextField
              fullWidth
              label='Endereço de E-mail'
              margin='normal'
              name='email'
              id='email'
              size='small'
              type='email'
              variant='outlined'
              onChange={handleCredentials}
              error={
                credentials.email &&
                credentials.email !== '' &&
                !credentials.email.match(mailformat)
              }
              helperText={
                credentials.email &&
                credentials.email !== '' &&
                !credentials.email.match(mailformat) && (
                  <Alert severity='error'>
                    Email Address must be a valid email
                  </Alert>
                )
              }
            />

            {/* User Password */}
            <TextField
              fullWidth
              label='Senha'
              margin='normal'
              id='password'
              name='password'
              onChange={handleCredentials}
              size='small'
              type={passwordShown ? 'text' : 'password'}
              variant='outlined'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={togglePassword}>
                      {passwordShown ? (
                        <Visibility style={{ fill: '#0072ea' }} />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={
                credentials.password &&
                credentials.password !== '' &&
                !credentials.password.match(passFormat)
              }
              helperText={
                credentials.password &&
                credentials.password !== '' &&
                !credentials.password.match(passFormat) && (
                  <Alert severity='error'>
                    Minimum eight and maximum 10 characters, at least one
                    uppercase letter, one lowercase letter, one number and one
                    special character
                  </Alert>
                )
              }
            />

            {/* User Confirm Password */}
            <TextField
              fullWidth
              label='Confirmar Senha'
              margin='normal'
              id='matchPassword'
              name='matchPassword'
              onChange={handleCredentials}
              size='small'
              type={matchPasswordShown ? 'text' : 'password'}
              variant='outlined'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={togglematchPassword}>
                      {matchPasswordShown ? (
                        <Visibility style={{ fill: '#0072ea' }} />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={
                credentials.matchPassword &&
                credentials.matchPassword !== '' &&
                credentials.matchPassword !== credentials.password
              }
              helperText={
                credentials.matchPassword &&
                credentials.matchPassword !== '' &&
                credentials.matchPassword !== credentials.password && (
                  <Alert severity='error'>Passwords must be equal</Alert>
                )
              }
            />

            <SpinnerButton
              handleClick={handleSignUp}
              label={'Criar Conta'}
              isLoading={loading}
              disabled={credentials === ''}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            />
            <div>
              Já tem uma conta? <Link to='/login'>Faça Login aqui!</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
