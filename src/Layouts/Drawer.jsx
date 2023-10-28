import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';

import BarChartIcon from '@mui/icons-material/BarChart';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupIcon from '@mui/icons-material/Group';
import Home from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

import { ListSubheader } from '@mui/material';
import { useAlert } from 'react-alert';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import MenuIconButton from '../Components/MenuIconButton';
import { logOut } from '../Services/auth';
import { persistor } from '../Store/store';

import { useGetUserQuery } from '../Store/Slices/usersSlice';
import logo from '../assets/images/acpsLogo.png';
import '../styles/styles.css';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({ children }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetUserQuery();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigate = (url) => {
    navigate(`${url}`);
  };

  const alert = useAlert();

  const handlelogOut = async () => {
    try {
      await logOut();
      localStorage.clear();
      await persistor.purge();
      navigate('/login');
    } catch (error) {
      error?.response?.data?.errors.forEach((errObj) => {
        alert.error(errObj.message);
      });
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <NavLink style={{ textDecoration: 'none' }} to='/main'>
            <div className='logo' onClick={() => handleNavigate('/')}>
              <img src={logo} alt={'logo'} />
            </div>
          </NavLink>

          <MenuIconButton handlelogOut={handlelogOut} />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ListSubheader inset>Início</ListSubheader>
        <List>
          {[
            {
              id: 1,
              title: 'Home',
              icon: <Home />,
              path: '/',
            },
            {
              id: 2,
              title: 'Relatórios',
              icon: <BarChartIcon />,
              path: '/reports',
            },
            {
              id: 3,
              title: 'Usuários',
              icon: <GroupIcon />,
              path: '/users',
            },
            {
              id: 4,
              title: 'Notas',
              icon: <ChecklistIcon />,
              path: '/notes',
            },
          ].map((item) => (
            <ListItem
              key={item.id}
              disablePadding
              component={Link}
              to={item.path}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {!isLoading && user && (
          <>
            <Divider />
            <ListSubheader inset>Usuário</ListSubheader>
            <List>
              {[
                {
                  id: 1,
                  title: 'Perfil',
                  icon: <PersonIcon />,
                  path: '/profile',
                },
                {
                  id: 2,
                  title: 'Sair',
                  icon: <ExitToAppIcon />,
                  path: '',
                  click: handlelogOut,
                },
              ].map((item) => (
                <ListItem
                  key={item.id}
                  disablePadding
                  component={Link}
                  to={item.path}
                  onClick={item.click}
                >
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <main>{children}</main>
      </Main>
    </Box>
  );
}
