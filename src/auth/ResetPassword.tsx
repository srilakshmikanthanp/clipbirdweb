import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Password from '@mui/icons-material/Password';
import { useMutation } from '@tanstack/react-query';
import AuthAPIClient from 'auth/AuthAPIClient';
import { Form } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router';
import styled from 'styled-components';

const ResetPasswordPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ResetPasswordForm = styled(Form)`
  max-width: 500px;
  width: 500px;
  padding: 20px;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function ResetPassword() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(searchParams.get('token'));
  const [password, setPassword] = useState<string | null>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();

  const authApiClient = new AuthAPIClient();
  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (props: { token: string; password: string }) => {
      return authApiClient.resetPassword(props.token, props.password)
    }
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate('/auth/signin');
    }
  }, [mutation.isSuccess, mutation.data, navigate]);

  useEffect(() => {
    if (mutation.isError) {
      setAlertType('error');
      setAlertMessage(mutation.error.message);
      setIsAlertOpen(true);
    }
  }, [mutation.error, mutation.isError]);

  const onResetPassword = () => {
    mutation.mutate({ token: token!, password: password! });
  };

  const resetPasswordForm = (
    <ResetPasswordForm>
      <Password sx={{ fontSize: 50, color: 'primary.main' }} />
      <Typography variant="h5" gutterBottom>
        Reset Password
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center">
        Enter your new password and confirm it.
      </Typography>
      <TextField
        disabled={mutation.isPending}
        required
        label="Token"
        type="password"
        fullWidth
        variant="outlined"
        value={token || ''}
        onChange={(e) => setToken(e.target.value)}
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
      <TextField
        disabled={mutation.isPending}
        required
        label="password"
        type="password"
        fullWidth
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={onResetPassword}
        disabled={!token || password !== confirmPassword}
        fullWidth
        loading={mutation.isPending}
      >
        Reset Password
      </Button>
      <Button
        variant="text"
        onClick={() => navigate('/auth/signin')}
        fullWidth
        disabled={mutation.isPending}
      >
        Go to Signin
      </Button>
    </ResetPasswordForm>
  );

  const snackbar = (
    <Snackbar
      onClose={() => setIsAlertOpen(false)}
      open={isAlertOpen}
      autoHideDuration={3000}
    >
      <Alert
        onClose={() => setIsAlertOpen(false)}
        severity={alertType}
        sx={{ width: '100%' }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  )

  return (
    <ResetPasswordPage>
      {resetPasswordForm}
      {snackbar}
    </ResetPasswordPage>
  );
}
