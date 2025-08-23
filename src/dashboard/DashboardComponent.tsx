import { Box, Button, Divider, Paper, Tooltip, Typography } from "@mui/material";

export interface DashboardItemProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  action?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function DashboardItem(props: DashboardItemProps) {
  return (
    <Paper elevation={3} sx={{ maxWidth: 600, minWidth: 300, borderRadius: 5, height: '100%', display: 'flex', flexDirection: 'column' }} >
      <Box display="flex" alignItems="center" justifyContent="space-between" padding={2}>
        <Box display="flex" alignItems="center">
          <Tooltip title={props.description} arrow>
            <Box
              justifyContent="center"
              display="flex"
              alignItems="center"
              width={40}
              height={40}
            >
              {props.icon}
            </Box>
          </Tooltip>
          <Typography
            sx={{ flexGrow: 1 }}
            variant="h6"
            component="div"
          >
            {props.name}
          </Typography>
        </Box>
        {props.action && props.onClick && (
          <Button
            variant="contained"
            color="primary"
            onClick={props.onClick}
          >
            {props.action}
          </Button>
        )}
      </Box>
      <Divider />
      <Box padding={2} flexGrow={1}>
        {props.children}
      </Box>
    </Paper>
  )
}
