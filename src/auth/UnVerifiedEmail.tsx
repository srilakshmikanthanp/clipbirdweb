import { Alert, Button, Typography } from '@mui/material';

import { useMutation } from '@tanstack/react-query';
import UserAPIClient from '../user/UserAPIClient';

export default function UnVerifiedEmail() {
  const userAPIClient = new UserAPIClient();

  const resend = useMutation({
    mutationFn: () => userAPIClient.resendVerificationMail(),
  })

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '100vh' }}>
      <Typography variant="h2" className="text-center mb-3">
        Your email is not verified
      </Typography>
      <Typography variant="body1" className="mb-3" style={{ maxWidth: '700px' }}>
        Your account has not been verified. Please check your email to verify
        your account. you can click the button below to resend the verification email.
      </Typography>
      {resend.isSuccess ? (
        <Alert
          severity="success"
        >
          Verification email sent successfully. Please check your inbox.
        </Alert>
      ) : (
        <Button
          onClick={() => resend.mutate()}
          variant="contained"
          color="primary"
          loading={resend.isPending}
        >
          Resend
        </Button>
      )
      }
    </div >
  );
}
