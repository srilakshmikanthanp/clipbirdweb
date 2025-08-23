import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material';
import { selectToken, setToken } from 'auth/authSlice';
import { useAppDispatch, useAppSelector } from 'common/redux/hooks';
import { useEffect, useState } from 'react';

import AuthAPIClient from 'auth/AuthAPIClient';
import { Form } from 'react-bootstrap';
import LoginIcon from '@mui/icons-material/Login';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const SigninPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SigninForm = styled(Form)`
  max-width: 500px;
  width: 500px;
  padding: 20px;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function Signin() {
  const [userName, setUserName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authApiClient = new AuthAPIClient();
  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: authApiClient.signin,
  });

  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (mutation.isSuccess) {
      dispatch(setToken(mutation.data.token));
    }
  }, [mutation.isSuccess, dispatch, mutation.data]);

  useEffect(() => {
    if (mutation.isError) {
      setIsOpen(true);
    }
  }, [mutation.isError]);

  useEffect(() => {
    if (token != null) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const callbackUrl = urlSearchParams.get('callbackUrl');
      navigate(callbackUrl || '/');
    }
  }, [navigate, token]);

  const onSignin = () => {
    mutation.mutate({ userName: userName!, password: password! });
  };

  const signinForm = (
    <SigninForm>
      <LoginIcon sx={{ fontSize: 50, color: 'primary.main' }} />
      <Typography variant="h5" gutterBottom>
        Welcome Back!
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center">
        Please sign in to continue to your account.
      </Typography>
      <TextField
        disabled={mutation.isPending}
        required
        label="username or email"
        fullWidth
        variant="outlined"
        value={userName || ''}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        disabled={mutation.isPending}
        required
        label="password"
        type="password"
        fullWidth
        variant="outlined"
        value={password || ''}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="text"
        onClick={() => navigate('/auth/forgot-password')}
        sx={{ textAlign: 'right', alignSelf: 'flex-end' }}
      >
        Forgot password?
      </Button>
      <Button
        variant="contained"
        onClick={onSignin}
        fullWidth
        disabled={mutation.isPending || !userName || !password}
        loading={mutation.isPending}
      >
        Login
      </Button>
      <Button
        variant="text"
        onClick={() => navigate('/users/new')}
        fullWidth
        disabled={mutation.isPending}
      >
        Create an account
      </Button>
    </SigninForm>
  );

  const snackbar = (
    <Snackbar onClose={() => {}} open={isOpen} autoHideDuration={1000}>
      <Alert
        onClose={() => setIsOpen(false)}
        severity="error"
        sx={{ width: '100%' }}
      >
        Login Failed
      </Alert>
    </Snackbar>
  );

  return (
    <SigninPage>
      {signinForm}
      {snackbar}
    </SigninPage>
  );
}
