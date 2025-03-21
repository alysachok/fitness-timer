import { Box, Button, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function RoundsAdjuster({ rounds, setRounds, onClose }) {
  const [tempRounds, setTempRounds] = useState(rounds);

  // Sync `tempRounds` when modal opens
  useEffect(() => {
    if (typeof rounds === "number" && !isNaN(rounds)) {
      setTempRounds(rounds);
    }
  }, [rounds]);

  const handleSave = () => {
    setRounds(tempRounds); // ✅ Save new rounds count
    onClose(); // ✅ Close modal
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#1565C0", // Blue for rounds
        padding: "20px",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
        Adjust Rounds Count
      </Typography>

      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}
      >
        {tempRounds}
      </Typography>

      <Slider
        value={tempRounds}
        onChange={(e, newValue) => setTempRounds(newValue)}
        min={1}
        max={10}
        step={1}
        valueLabelDisplay="auto"
        sx={{
          color: "#fff",
          "& .MuiSlider-thumb": { background: "#000" },
          "& .MuiSlider-rail": { background: "#ccc" },
        }}
      />

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          sx={{ flex: 1, background: "#000", color: "#fff" }}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          sx={{ flex: 1, background: "#ccc", color: "#000" }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
