import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from '@mui/material';

export interface SkeletonTableProps extends React.HTMLProps<HTMLDivElement> {
  columns?: number;
  rows?: number;
}

const SkeletonTable = (props: SkeletonTableProps) => {
  const { columns = 5, rows = 5, ...rest } = props;
  return (
    <Paper variant='outlined' {...rest}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton variant="text" width={100} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SkeletonTable;
