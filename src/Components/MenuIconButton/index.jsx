import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const settings = [
  { id: 2, path: '/profile', title: 'Perfil' },
  { id: 3, path: '/settings', title: 'Configurações' },
];

function MenuIconButton({ handlelogOut }) {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(`${url}`);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title='Open settings'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id='menu-appbar'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              key={setting.id}
              onClick={() => {
                handleCloseUserMenu();
                handleNavigate(setting.path);
              }}
            >
              <Typography textAlign='center'>{setting.title}</Typography>
            </MenuItem>
          ))}

          <MenuItem onClick={handlelogOut}>
            <Typography textAlign='center'>Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
export default MenuIconButton;
