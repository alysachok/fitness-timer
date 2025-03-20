import { Box, Button, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ExercisesAdjuster({
  exercises,
  setExercises,
  onClose,
}) {
  const [tempExercises, setTempExercises] = useState(exercises); // Local state for preview

  // Sync tempExercises when the modal opens
  useEffect(() => {
    if (typeof exercises === "number" && !isNaN(exercises)) {
      setTempExercises(exercises);
    }
  }, [exercises]);

  const handleSave = () => {
    setExercises(tempExercises); // Update exercises count
    onClose(); // Close modal after saving
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#757575", // Gray theme for exercises
        padding: "20px",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
        Adjust Exercises Count
      </Typography>

      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}
      >
        {tempExercises}
      </Typography>

      <Slider
        value={tempExercises}
        onChange={(e, newValue) => setTempExercises(newValue)}
        min={1}
        max={20}
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
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
