// src/HomePage.jsx
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to bottom, #9ce0dd, #b7f28a)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Rajdhani, sans-serif",
        textAlign: "center",
        padding: "2rem",
        color: "#222",
      }}
    >
      <Typography variant="h2" sx={{ marginBottom: "1rem" }}>
        🕒 Fitness Timer
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: "2rem", maxWidth: "600px" }}>
        A customizable interval timer for your workouts. Set your rounds,
        exercises, and rest periods with ease.
      </Typography>

      <Link to="/timer">
        <Button
          variant="contained"
          sx={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            backgroundColor: "#3D4C53",
            borderRadius: "30px",
            "&:hover": { backgroundColor: "#222" },
          }}
        >
          Start Workout
        </Button>
      </Link>
    </Box>
  );
}
