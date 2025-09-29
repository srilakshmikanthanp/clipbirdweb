import { Button } from '@mui/material';
import { PageHeader } from '@toolpad/core';

export interface DevicesToolbarProps {
  onDeleteAllDevicess: () => void;
}

export default function DevicesToolbar(props: DevicesToolbarProps) {
  const toolbar = () => (
    <Button
      variant="contained"
      onClick={() => props.onDeleteAllDevicess()}
    >
      Delete All
    </Button>
  );

  return <PageHeader title="Devices" slots={{ toolbar }} />;
}
