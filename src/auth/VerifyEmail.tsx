import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Password from '@mui/icons-material/Password';
import { useMutation } from '@tanstack/react-query';
import { Form } from 'react-bootstrap';
import { Navigate, useNavigate, useSearchParams } from 'react-router';
import styled from 'styled-components';
import UserAPIClient from 'user/UserAPIClient';
import { useAppSelector } from 'common/redux/hooks';
import { selectToken } from './authSlice';

const ResetPasswordPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const VerifyEmailForm = styled(Form)`
  max-width: 500px;
  width: 500px;
  padding: 20px;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function VerifyEmail() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(searchParams.get('token'));
  const authToken = useAppSelector(selectToken)!;
  const navigate = useNavigate();

  const userApiClient = new UserAPIClient();
  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (props: { token: string }) => {
      return userApiClient.verify(props.token);
    }
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate('/');
    }
  }, [mutation.isSuccess, navigate]);

  useEffect(() => {
    if (mutation.isError) {
      setAlertType('error');
      setAlertMessage(mutation.error.message);
      setIsAlertOpen(true);
    }
  }, [mutation.error, mutation.isError]);

  if (!authToken) {
    return (
      <Navigate
        to={`/auth/signin?callbackUrl=${encodeURIComponent(location.pathname + location.search)}`}
        replace
      />
    );
  }

  const onResetPassword = () => {
    mutation.mutate({ token: token! });
  };

  const verifyEmailForm = (
    <VerifyEmailForm>
      <Password sx={{ fontSize: 50, color: 'primary.main' }} />
      <Typography variant="h5" gutterBottom>
        Verify Email
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
      <Button
        variant="contained"
        onClick={onResetPassword}
        disabled={!token}
        fullWidth
        loading={mutation.isPending}
      >
        Verify
      </Button>
    </VerifyEmailForm>
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
      {verifyEmailForm}
      {snackbar}
    </ResetPasswordPage>
  );
}
