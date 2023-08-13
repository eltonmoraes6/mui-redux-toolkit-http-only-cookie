import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/acpsLogo.png';
import '../../styles/styles.css';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Header = (props) => {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(`${url}`);
  };

  const links = [
    {
      id: 1,
      route: 'Sobre',
      url: '/about',
    },
    { id: 2, route: 'Fazer Login', url: '/login' },
    { id: 3, route: 'Criar Conta', url: '/signup' },
  ];

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {links.map((link) => (
          <ListItem
            button
            key={link.id}
            onClick={() => handleNavigate(link.url)}
          >
            <ListItemText primary={link.route} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ marginBottom: '70px' }}>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar className='toolBar'>
            <NavLink style={{ textDecoration: 'none' }} to='/main'>
              <div className='logo' onClick={() => handleNavigate('/')}>
                <img src={logo} alt={'logo'} />
              </div>
            </NavLink>

            {matches ? (
              <Box>
                <IconButton
                  size='large'
                  edge='end'
                  color='inherit'
                  aria-label='menu'
                  onClick={toggleDrawer('right', true)}
                >
                  <MenuIcon className='menuIcon' fontSize='' />
                </IconButton>

                <Drawer
                  anchor='right'
                  open={state['right']}
                  onClose={toggleDrawer('right', false)}
                >
                  {list('right')}
                </Drawer>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexGrow: '0.1',
                }}
              >
                {links.map((link) => (
                  <NavLink
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: '#7600dc',
                            textDecoration: 'none',
                          }
                        : {
                            color: '#545e6f',
                            textDecoration: 'none',
                          }
                    }
                    to={link.url}
                    key={link.id}
                  >
                    <Typography className='link}'>{link.route}</Typography>
                  </NavLink>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};

export default Header;
