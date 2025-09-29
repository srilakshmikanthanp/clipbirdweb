import { Button } from '@mui/material';
import { PageHeader } from '@toolpad/core';

export interface SessionsToolbarProps {
  onDeleteAllOtherSessions: () => void;
}

export default function SessionsToolbar(props: SessionsToolbarProps) {
  const toolbar = () => (
    <Button
      variant="contained"
      onClick={() => props.onDeleteAllOtherSessions()}
    >
      Delete All Others
    </Button>
  );

  return <PageHeader title="Sessions" slots={{ toolbar }}/>;
}
