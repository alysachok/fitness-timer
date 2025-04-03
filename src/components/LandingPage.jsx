import { Button } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function PromoPage() {
  return (
    <div
      style={{
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
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", marginBottom: "1rem" }}>
        🕒 Fitness Timer
      </h1>

      <p
        style={{
          fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
          maxWidth: "600px",
          marginBottom: "2rem",
        }}
      >
        Your perfect workout companion — smart, simple, and stylish. Set your
        custom work/rest rounds, track progress, and stay focused without
        distractions.
      </p>

      <img
        src={`${import.meta.env.BASE_URL}screenshot.png`} // or use public URL
        alt="app preview"
        style={{
          width: "100%",
          maxWidth: "800px",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
          marginBottom: "2rem",
        }}
      />

      <Link to="/timer">
        <Button
          variant="contained"
          startIcon={<PlayArrow />}
          sx={{
            backgroundColor: "#3D4C53",
            padding: "0.8rem 2rem",
            fontSize: "1.2rem",
            borderRadius: "50px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "#222",
            },
          }}
        >
          Start Workout
        </Button>
      </Link>
    </div>
  );
}
