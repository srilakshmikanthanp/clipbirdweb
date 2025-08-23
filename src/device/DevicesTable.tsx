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

import DeviceResponse from 'device/DeviceResponseDto';

interface DevicesTableProps {
  onDelete: (device: DeviceResponse) => void;
  devices: DeviceResponse[];
}

export default function DevicesTable(props: DevicesTableProps) {
  const DeviceRow = ({ device }: { device: DeviceResponse }) => {
    const actions = (
      <div>
        <Tooltip title="Delete" arrow>
          <IconButton onClick={() => props.onDelete(device)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </div>
    );

    return (
      <TableRow>
        <TableCell align="left">{device.name}</TableCell>
        <TableCell align="left">{device.type}</TableCell>
        <TableCell align="left">{device.isOnline ? 'Yes' : 'No'}</TableCell>
        <TableCell align="left">{formatTime(device.createdAt)}</TableCell>
        <TableCell align="left">{formatTime(device.updatedAt)}</TableCell>
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
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Online</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Updated At</TableCell>
              <TableCell align="right" size='small' />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.devices.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" className="m-2">
                  No Devices found
                </TableCell>
              </TableRow>
            )}
            {props.devices.map((row) => {
              return <DeviceRow device={row} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
