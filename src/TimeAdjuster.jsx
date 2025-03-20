import { Box, Button, Slider, Typography } from "@mui/material";

export default function TimeAdjuster({ time, setTime, onClose }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#4CAF50",
        padding: "20px",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Adjust Work Time
      </Typography>

      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
        {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
      </Typography>

      <Slider
        value={time}
        onChange={(e, newValue) => setTime(newValue)}
        min={5}
        max={180}
        step={5}
        sx={{
          color: "#fff",
          "& .MuiSlider-thumb": { background: "#000" },
          "& .MuiSlider-rail": { background: "#ccc" },
        }}
      />

      <Button
        sx={{ mt: 2, background: "#000", color: "#fff", width: "100%" }}
        onClick={onClose}
      >
        Save
      </Button>
    </Box>
  );
}
