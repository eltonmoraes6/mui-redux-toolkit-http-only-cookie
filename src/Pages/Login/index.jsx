import React, { useReducer, useState } from 'react';

import { Checkbox, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import SpinnerButton from '../../Components/Button';
import { ACTIONS, loginReducer } from '../../Reducers/loginReducer';
import { logInUser } from '../../Services/auth';
import { setLogIn } from '../../Store/Slices/userSlice';

import Header from '../../Components/Starter/Header';

import '../../styles/login.css';

import loginImg from '../../assets/images/login.png';
import userIcon from '../../assets/images/user.png';

// var mailformat =
//   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// var passFormat =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

const initialState = {
  userDetails: '',
  loading: false,
  error: null,
};

const Login = (props) => {
  const [state, dispatcher] = useReducer(loginReducer, initialState);
  const { userDetails, loading } = state;
  const [check, toggleCheck] = useState(false);

  const handleToggleCheck = () => {
    toggleCheck(!check);
  };
  const [passwordShown, setPasswordShown] = useState(false);
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
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
    }
  };

  const login = async () => {
    try {
      dispatcher({
        type: ACTIONS.CALL_API,
      });
      const { data } = await logInUser(credentials);
      dispatcher({
        type: ACTIONS.SUCCESS,
        data: data,
      });
      localStorage.setItem('accessToken', userDetails.accessToken);
      dispatch(setLogIn(true));
      navigate('/');
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

  const handleLogin = () => {
    if (!credentials.email) {
      return alert.error('Please enter an Email !');
    }
    if (!credentials.password) {
      return alert.error('Please enter a Password!');
    }

    // make the login API call here
    login();
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
            <h1>Fazer login</h1>

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
              // error={
              //   credentials.email !== '' && !credentials.email.match(mailformat)
              // }
              // helperText={
              //   credentials.email !== '' && !credentials.email.match(mailformat)
              //     ? 'Email Address must be a valid email'
              //     : ' '
              // }
            />

            {/* Password */}
            <TextField
              fullWidth
              label='Senha'
              margin='normal'
              name='password'
              id='password'
              size='small'
              type={passwordShown ? 'text' : 'password'}
              onChange={handleCredentials}
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
              // error={
              //   credentials.password !== '' &&
              //   !credentials.password.match(passFormat)
              // }
              // helperText={
              //   credentials.password !== '' &&
              //   !credentials.password.match(passFormat)
              //     ? 'Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
              //     : ' '
              // }
            />

            <div className='persistCheck'>
              <Checkbox
                id='persist'
                onChange={handleToggleCheck}
                checked={check}
              />
              <label htmlFor='persist'>Continuar conectado</label>
            </div>

            <SpinnerButton
              handleClick={handleLogin}
              label={'Fazer Login'}
              isLoading={loading}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            />
            <div>
              Não tem uma conta ? <Link to='/signup'> Crie uma aqui!</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
