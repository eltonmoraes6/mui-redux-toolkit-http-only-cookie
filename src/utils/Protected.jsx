import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Drawer from '../Layouts/Drawer';
import { selectUserLoginState } from '../Store/Slices/userSlice';

function Protected() {
  const isSignedIn = useSelector(selectUserLoginState);

  if (!isSignedIn) {
    return <Navigate to='/login' replace />;
  }
  return (
    <Drawer>
      <Outlet />
    </Drawer>
  );
}
export default Protected;
