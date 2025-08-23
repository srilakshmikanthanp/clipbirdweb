import { Box, Paper, Typography } from "@mui/material";
import office from "static/images/dashboard.jpg";

export default function DashboardHeader() {
  return (
    <Paper
      sx={{
        minHeight: 300,
        borderRadius: 5,
        display: "flex",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}>
      <Box
        sx={{
          backgroundImage: `url(${office})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          borderRadius: 5,
        }}
      />
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
      />
      <Typography
        fontWeight={500}
        variant="h2"
        color="white"
        sx={{
          zIndex: 20,
        }}
      >
        Welcome
      </Typography>
    </Paper>
  )
}
