import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
      <Box mt={2}>Loading, please wait...</Box>
    </Box>
  );
};

export default Loader;
