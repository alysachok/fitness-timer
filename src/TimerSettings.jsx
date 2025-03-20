import { Box, Button, Stack, Typography } from "@mui/material";

export default function TimerSettings({ onWorkClick }) {
  return (
    <Box
      sx={{
        mt: 3,
        background: "#222",
        width: "90%",
        borderRadius: "15px",
        padding: "10px",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Button sx={{ width: "100%", color: "#fff", mb: 1 }}>
        Load Previous Workout
      </Button>

      <Stack spacing={1}>
        {[
          {
            label: "Work",
            value: "00:45",
            color: "#2E7D32",
            onClick: onWorkClick,
          },
          { label: "Rest", value: "00:30", color: "#C62828" },
          { label: "Exercises", value: "7", color: "#757575" },
          { label: "Rounds", value: "3X", color: "#1565C0" },
          { label: "Round Reset", value: "01:00", color: "#FFB300" },
        ].map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              background: item.color,
              padding: "10px",
              borderRadius: "5px",
              cursor: item.onClick ? "pointer" : "default",
            }}
            onClick={item.onClick || null}
          >
            <Typography>{item.label}</Typography>
            <Typography>{item.value}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
