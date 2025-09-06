import { Delete } from '@mui/icons-material';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { formatTime } from 'common/utility/time';

import SessionResponse from 'session/SessionResponseDto';

interface SessionsTableProps {
  onDelete: (session: SessionResponse) => void;
  sessions: SessionResponse[];
}

export default function SessionsTable(props: SessionsTableProps) {
  const SessionRow = ({ session }: { session: SessionResponse }) => {
    const actions = (
      <div>
        <Tooltip title="Delete" arrow>
          <IconButton onClick={() => props.onDelete(session)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </div>
    );

    return (
      <TableRow>
        <TableCell align="left">{session.ipAddress}</TableCell>
        <TableCell align="left">{session.userAgent || 'N/A'}</TableCell>
        <TableCell align="left">{session.current ? 'Yes' : 'No'}</TableCell>
        <TableCell align="left">{formatTime(session.expiry)}</TableCell>
        <TableCell align="right" size='small'>{actions}</TableCell>
      </TableRow>
    );
  };

  return (
    <Paper className="p-3 my-5" variant="outlined">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">IP Address</TableCell>
              <TableCell align="left">User Agent</TableCell>
              <TableCell align="left">Current</TableCell>
              <TableCell align="left">Expiry</TableCell>
              <TableCell align="right" size='small' />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sessions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" className="m-2">
                  No Sessions found
                </TableCell>
              </TableRow>
            )}
            {props.sessions.map((row) => {
              return <SessionRow session={row} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
