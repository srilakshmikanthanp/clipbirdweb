import { Box, Typography } from "@mui/material";

export default function Unauthorized() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h1" className="text-center mt-5">
        Unauthorized
      </Typography>
      <Typography variant="h5" className="text-center mt-3">
        You do not have permission to access this page. Please contact your administrator if you need access.
      </Typography>
      <Typography variant="caption" className="text-center mt-3">
        If you believe this is an error, please contact support.
      </Typography>
    </Box>
  );
}
