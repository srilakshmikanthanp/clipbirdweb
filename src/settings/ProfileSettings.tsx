import {
  Alert,
  Avatar,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
} from '@mui/material';
import { Col, Container, Row } from 'react-bootstrap';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import ImageAPIClient from 'image/ImageAPIClient';
import UserAPIClient from 'user/UserAPIClient';
import UserRequestDto from 'user/UserRequestDto';
import useImage from 'common/image/useImage';

export default function ProfileSettings() {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const [editMode, setEditMode] = useState(false);

  const imageAPIClient = new ImageAPIClient();
  const userAPIClient = new UserAPIClient();
  const queryClient = useQueryClient();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('error');
  const [alertMessage, setAlertMessage] = useState('');

  const image = useImage({ url: avatar });

  const userResponse = useQuery({
    queryKey: ['users'],
    queryFn: userAPIClient.get,
  });

  const userMutation = useMutation({
    mutationFn: userAPIClient.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'me'] });
    },
  });

  const uploadMutation = useMutation({
    mutationFn: imageAPIClient.createPublicImage,
  });

  useEffect(() => {
    if (userMutation.isSuccess) {
      setEditMode(false);
    }
  }, [userMutation.isSuccess]);

  useEffect(() => {
    if (userMutation.isError) {
      setAlertType('error');
      setAlertMessage(userMutation.error.message);
      setIsAlertOpen(true);
    }
  }, [userMutation.isError, userMutation.error]);

  useEffect(() => {
    if (userResponse.isSuccess) {
      setFirstName(userResponse.data.firstName);
      setLastName(userResponse.data.lastName);
      setUserName(userResponse.data.userName);
      setAvatar(userResponse.data.avatar);
    }
  }, [userResponse.isSuccess, userResponse.data]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const data = await uploadMutation.mutateAsync(e.target.files[0]);
    setAvatar(data.url);
  };

  const handleModeChange = () => {
    setFirstName(userResponse.data?.firstName || null);
    setLastName(userResponse.data?.lastName || null);
    setUserName(userResponse.data?.userName || null);
    setAvatar(userResponse.data?.avatar || null);
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    const request: UserRequestDto = {
      firstName: firstName!,
      lastName: lastName!,
      userName: userName!,
      avatar: avatar,
      isActive: true,
    };

    userMutation.mutate(request);
  };

  if (userResponse.isPending) {
    return <CircularProgress />;
  }

  if (userResponse.isError) {
    return <Alert severity="error">{userResponse.error.message}</Alert>;
  }

  return (
    <Container fluid>
      <Row className="mb-2">
        <Col className="d-flex justify-content-end gap-3">
          <Button onClick={handleModeChange}>
            {editMode ? 'Cancel' : 'Edit'}
          </Button>
          <Button
            variant="contained"
            sx={{ display: editMode ? 'block' : 'none' }}
            onClick={handleSave}
            disabled={userMutation.isPending}
            loading={userMutation.isPending}
          >
            Save
          </Button>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col className='d-flex justify-content-center'>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <Avatar
              alt={`${firstName} ${lastName}`}
              src={image.url}
              sx={{ width: 150, height: 150 }}
            >
              {firstName?.charAt(0)}
            </Avatar>
            <div
              className="gap-1"
              style={{
                position: 'absolute',
                bottom: 0,
                display: editMode ? 'flex' : 'none',
              }}
            >
              <Button
                component="label"
                role={undefined}
                variant="contained"
                size="small"
                tabIndex={-1}
                loading={uploadMutation.isPending}
                disabled={uploadMutation.isPending}
                startIcon={<EditRounded />}
              >
                Edit
                <input
                  onChange={handleUpload}
                  disabled={uploadMutation.isPending}
                  type="file"
                  hidden
                  accept="image/*"
                />
              </Button>
              <Button
                onClick={() => setAvatar(null)}
                variant="contained"
                size="small"
                color="error"
                startIcon={<DeleteRounded />}
              >
                Delete
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <TextField
            fullWidth
            label="First Name"
            value={firstName || ''}
            onChange={(e) => setFirstName(e.target.value)}
            slotProps={{
              input: {
                readOnly: !editMode,
              },
            }}
          />
        </Col>
        <Col>
          <TextField
            fullWidth
            label="Last Name"
            value={lastName || ''}
            onChange={(e) => setLastName(e.target.value)}
            slotProps={{
              input: {
                readOnly: !editMode,
              },
            }}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <TextField
            fullWidth
            label="UserName"
            value={userName || ''}
            onChange={(e) => setUserName(e.target.value)}
            slotProps={{
              input: {
                readOnly: !editMode,
              },
            }}
          />
        </Col>
      </Row>
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
    </Container>
  );
}
