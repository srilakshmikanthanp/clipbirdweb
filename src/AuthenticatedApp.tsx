import { selectToken, selectUser, setUser } from 'auth/authSlice';
import { useAppDispatch, useAppSelector } from 'common/redux/hooks';

import { Alert, Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import SessionedApp from 'SessionedApp';
import React from 'react';
import { Navigate } from 'react-router';
import UserAPIClient from 'user/UserAPIClient';

export default function AuthenticatedApp() {
  const userAPIClient = new UserAPIClient();
  const token = useAppSelector(selectToken)!;
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const response = useQuery({
    queryKey: ['users', 'me'],
    queryFn: userAPIClient.get,
    enabled: !!token,
  });

  React.useEffect(() => {
    if (response.data) {
      dispatch(setUser(response.data));
    }
  }, [response.data, dispatch]);

  if (!token) {
    return (
      <Navigate
        to={`/auth/signin?callbackUrl=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  if (response.isLoading || !response.data || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (response.isError) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Alert severity="error">
        {response.error.message}
      </Alert>
    </Box>
  }

  return (
    <SessionedApp />
  );
}
