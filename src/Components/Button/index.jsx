import { Button } from '@mui/material';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const SpinnerButton = ({ label, isLoading, handleClick, className }) => {
  return (
    <Button
      color='primary'
      fullWidth
      size='small'
      type='submit'
      variant='contained'
      onClick={handleClick}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <ClipLoader size={20} color={'#ffffff'} loading={isLoading} />
      ) : (
        label
      )}
    </Button>
  );
};

export default SpinnerButton;
