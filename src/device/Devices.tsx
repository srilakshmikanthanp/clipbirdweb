import {
  Alert,
  Snackbar,
  TablePagination
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { PageContainer } from '@toolpad/core/PageContainer';
import SkeletonTable from 'common/components/SkeletonTable';
import { Sortable } from 'common/types/Pageable';
import React from 'react';
import { Container } from 'react-bootstrap';
import DeviceAPIClient from 'device/DeviceAPIClient';
import DeviceResponse from 'device/DeviceResponseDto';
import DevicesFilter from 'device/DevicesFilter';
import DevicesTable from 'device/DevicesTable';
import DevicesToolbar from 'device/DevicesToolbar';

export default function Devices() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const [search, setSearch] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sort] = useState<Sortable[]>([
    {
      property: 'createdAt',
      order: 'ASC',
    },
  ]);

  const queryClient = useQueryClient();
  const deviceAPIClient = new DeviceAPIClient();

  const deleteDeviceMutation = useMutation({
    mutationFn: deviceAPIClient.deleteDevice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
    },
  });

  const response = useQuery({
    queryKey: ['devices', page, rowsPerPage, sort, search],
    queryFn: () => deviceAPIClient.getAllDevices({ page, size: rowsPerPage, sort }, search),
  });

  useEffect(() => {
    if (deleteDeviceMutation.isError) {
      setAlertMessage(deleteDeviceMutation.error.message);
      setIsAlertOpen(true);
      setAlertType('error');
    }
  }, [deleteDeviceMutation.error, deleteDeviceMutation.isError]);

  useEffect(() => {
    if (deleteDeviceMutation.isSuccess) {
      setAlertMessage("Device deleted successfully");
      setIsAlertOpen(true);
      setAlertType('success');
    }
  }, [deleteDeviceMutation.data, deleteDeviceMutation.isSuccess]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeviceSearch = (v: string | null) => {
    setSearch(v);
    setPage(0);
  };

  const handleDeviceDelete = (device: DeviceResponse) => {
    if (window.confirm(`Are you sure you want to delete ${device.name}?`)) {
      deleteDeviceMutation.mutate(device.id);
    }
  };

  const CustomToolBar = () => {
    return <DevicesToolbar />;
  };

  if (response.isPending) {
    return (
      <PageContainer maxWidth={false} slots={{ header: CustomToolBar }}>
        <Container fluid>
          <DevicesFilter search={search} onSearch={handleDeviceSearch} />
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
              There was an error while loading Devices
            </Alert>
          </div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth={false} slots={{ header: CustomToolBar }}>
      <Container fluid>
        <DevicesFilter search={search} onSearch={handleDeviceSearch} />
        <DevicesTable
          devices={response.data.content}
          onDelete={handleDeviceDelete}
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={response.data.page.totalElements}
          rowsPerPage={response.data.page.size}
          page={response.data.page.number}
          onPageChange={(_, v) => setPage(v)}
          onRowsPerPageChange={handleChangeRowsPerPage}
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
