import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router';

export default function AccountCreated() {
  const [redirectingIn, setRedirectingIn] = useState(5);
  const navigate = useNavigate();

  setTimeout(() => {
    if (redirectingIn > 0) {
      setRedirectingIn(redirectingIn - 1);
    }
  }, 1000);

  useEffect(() => {
    if (redirectingIn === 0) {
      navigate('/auth/signin');
    }
  }, [redirectingIn, navigate]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ height: '100vh' }}>
      <CheckCircleIcon style={{ fontSize: 100 }} color="success" />
      <Typography variant="h3" className="my-3">
        Account Created
      </Typography>
      <Typography variant="body1" className="mb-3">
        Your account has been successfully created. Please check your email to
        verify your account.
      </Typography>
      <Typography variant="body1" className="mb-3">
        Redirecting you to the login page in {redirectingIn} seconds.
      </Typography>
      <Button
        variant="text"
        color="primary"
        onClick={() => navigate('/auth/signin')}
        className="mb-3"
        endIcon={<ChevronRightIcon />}
      >
        Go to Login
      </Button>
    </div>
  );
}
