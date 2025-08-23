import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { AccountCircleRounded } from '@mui/icons-material';
import UserAPIClient from 'user/UserAPIClient';
import UserRequestDto from 'user/UserRequestDto';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';

const SignupPage = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignupForm = styled.div`
  max-width: 500px;
  width: 500px;
  padding: 20px;
`;

export default function NewUser() {
  const params = useParams();

  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(params.email || null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [isActive] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const userAPIClient = new UserAPIClient();
  const mutation = useMutation({
    mutationKey: ['users'],
    mutationFn: userAPIClient.create,
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setIsOpen(true);
      setMessage('Please fill all the fields.');
    }

    if (password !== confirmPassword) {
      setIsOpen(true);
      setMessage('Passwords do not match.');
    }

    const request: UserRequestDto = {
      firstName: firstName!,
      lastName: lastName!,
      userName: userName!,
      avatar: null,
      email: email!,
      password: password!,
      isActive: isActive,
    };

    mutation.mutate(request);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate('/users/new/success');
    }
  }, [mutation.isSuccess, navigate]);

  useEffect(() => {
    if (mutation.isError) {
      setIsOpen(true);
      setMessage(mutation.error.message);
    }
  }, [mutation.isError, mutation.error]);

  const form = (
    <SignupForm>
      <Row className="g-3 mb-3">
        <Col className="text-center">
          <AccountCircleRounded sx={{ fontSize: 100, color: 'primary.main' }} />
        </Col>
      </Row>
      <Row className="g-3 mb-3">
        <Col className="text-center">
          <Typography variant="h5" gutterBottom>
            Create your account
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Typography variant="body1" color="textSecondary" align="center">
            Please fill the details to create your account.
          </Typography>
        </Col>
      </Row>
      <Row className="g-3 mt-3 mb-3">
        <Col>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setFirstName(e.target.value || null)}
          />
        </Col>
        <Col>
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setLastName(e.target.value || null)}
          />
        </Col>
      </Row>
      <Row className="g-3 mb-3">
        <Col>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setUserName(e.target.value || null)}
          />
        </Col>
      </Row>
      <Row className="g-3 mb-3">
        <Col>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value || null)}
          />
        </Col>
      </Row>
      <Row className="g-3 mb-3">
        <Col>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            type="password"
            onChange={(e) => setPassword(e.target.value || null)}
          />
        </Col>
        <Col>
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            required
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value || null)}
          />
        </Col>
      </Row>
      <Row className="g-3 mb-3">
        <Col>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            loading={mutation.isPending}
          >
            Create Account
          </Button>
        </Col>
      </Row>
      <Row className="g-3 mb-3">
        <Col>
          <Button
            variant="text"
            fullWidth
            onClick={() => navigate('/auth/signin')}
          >
            Already have an account? Sign in
          </Button>
        </Col>
      </Row>
    </SignupForm>
  );

  const snackbar = (
    <Snackbar onClose={() => {}} open={isOpen} autoHideDuration={1000}>
      <Alert
        onClose={() => setIsOpen(false)}
        severity="error"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return (
    <SignupPage>
      {form}
      {snackbar}
    </SignupPage>
  );
}
