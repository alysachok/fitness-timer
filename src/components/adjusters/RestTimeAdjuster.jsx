import { Box, Button, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function RestTimeAdjuster({ time, setTime, onClose }) {
  const [tempTime, setTempTime] = useState(time || 30); // Ensure tempTime has a valid default

  // Sync tempTime with updated `time` when modal opens
  useEffect(() => {
    if (typeof time === "number" && !isNaN(time)) {
      setTempTime(time);
    }
  }, [time]);

  const handleSave = () => {
    setTime(tempTime); // Update rest timer with selected time
    onClose(); // Close modal after saving
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#E74C3C",
        padding: "20px",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
        Adjust Rest Time
      </Typography>

      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}
      >
        {Math.floor(tempTime / 60)}:{String(tempTime % 60).padStart(2, "0")}
      </Typography>

      <Slider
        value={tempTime}
        onChange={(e, newValue) => setTempTime(newValue)}
        min={5}
        max={180}
        step={5}
        valueLabelDisplay="auto"
        sx={{
          color: "#fff",
          "& .MuiSlider-thumb": { background: "#000" },
          "& .MuiSlider-rail": { background: "#ccc" },
        }}
      />

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          sx={{
            flex: 1,
            background: "#000",
            color: "#fff",
            "&:hover": { background: "#333" },
          }}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          sx={{
            flex: 1,
            background: "#ccc",
            color: "#000",
            "&:hover": { background: "#bbb" },
          }}
          onClick={onClose} // Discard changes and close modal
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
