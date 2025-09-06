import {
  Alert,
  Snackbar
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { PageContainer } from '@toolpad/core/PageContainer';
import SkeletonTable from 'common/components/SkeletonTable';
import { Container } from 'react-bootstrap';
import SessionAPIClient from 'session/SessionAPIClient';
import SessionResponse from 'session/SessionResponseDto';
import SessionsTable from 'session/SessionsTable';
import SessionsToolbar from 'session/SessionsToolbar';

export default function Sessions() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const queryClient = useQueryClient();
  const sessionAPIClient = new SessionAPIClient();

  const deleteSessionMutation = useMutation({
    mutationFn: sessionAPIClient.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  const response = useQuery({
    queryKey: ['sessions'],
    queryFn: () => sessionAPIClient.getAll(),
  });

  useEffect(() => {
    if (deleteSessionMutation.isError) {
      setAlertMessage(deleteSessionMutation.error.message);
      setIsAlertOpen(true);
      setAlertType('error');
    }
  }, [deleteSessionMutation.error, deleteSessionMutation.isError]);

  useEffect(() => {
    if (deleteSessionMutation.isSuccess) {
      setAlertMessage("Session deleted successfully");
      setIsAlertOpen(true);
      setAlertType('success');
    }
  }, [deleteSessionMutation.data, deleteSessionMutation.isSuccess]);

  const handleSessionDelete = (session: SessionResponse) => {
    if (window.confirm(`Are you sure you want to delete from ${session.ipAddress}?`)) {
      deleteSessionMutation.mutate(session.id);
    }
  };

  const CustomToolBar = () => {
    return <SessionsToolbar />;
  };

  if (response.isPending) {
    return (
      <PageContainer maxWidth={false} slots={{ header: CustomToolBar }}>
        <Container fluid>
          <SkeletonTable
            columns={6}
            rows={5}
            className='my-5'
          />
        </Container>
      </PageContainer>
    );
  }

  if (response.isError) {
    return (
      <PageContainer maxWidth={false} slots={{ header: CustomToolBar }}>
        <Container fluid>
          <div className="d-flex justify-content-center my-5">
            <Alert className="my-5" severity="error">
              There was an error while loading Sessions
            </Alert>
          </div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth={false} slots={{ header: CustomToolBar }}>
      <Container fluid>
        <SessionsTable
          sessions={response.data}
          onDelete={handleSessionDelete}
        />
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
    </PageContainer>
  );
}
