import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import AuthAPIClient from 'auth/AuthAPIClient';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Password from '@mui/icons-material/Password';

const ForgotPasswordPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ForgotPasswordForm = styled(Form)`
  max-width: 500px;
  width: 500px;
  padding: 20px;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function ForgotPassword() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [userName, setUserName] = useState<string | null>(null);

  const navigate = useNavigate();

  const authApiClient = new AuthAPIClient();
  const mutation = useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: authApiClient.forgotPassword,
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      setAlertType('success');
      setAlertMessage('Password reset link sent to your email');
      setIsAlertOpen(true);
    }
  }, [mutation.isSuccess, mutation.data, navigate]);

  useEffect(() => {
    if (mutation.isError) {
      setAlertType('error');
      setAlertMessage(mutation.error.message);
      setIsAlertOpen(true);
    }
  }, [mutation.error, mutation.isError]);

  const onSignin = () => {
    mutation.mutate(userName!);
  };

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

  const forgotPasswordForm = (
    <ForgotPasswordForm>
      <Password sx={{ fontSize: 50, color: 'primary.main' }} />
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center">
        Enter your username or email address.
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
      <Button
        variant="contained"
        onClick={onSignin}
        fullWidth
        loading={mutation.isPending}
      >
        Send Password Reset Link
      </Button>
      <Button
        variant="text"
        onClick={() => navigate('/auth/signin')}
        fullWidth
        disabled={mutation.isPending}
      >
        Go to Signin
      </Button>
    </ForgotPasswordForm>
  );

  return (
    <ForgotPasswordPage>
      {forgotPasswordForm}
      {snackbar}
    </ForgotPasswordPage>
  );
}
