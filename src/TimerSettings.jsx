import { Box, Stack, Typography } from "@mui/material";

export default function TimerSettings({
  workTime,
  restTime,
  roundResetTime,
  exercises,
  rounds,
  onWorkClick,
  onRestClick,
  onRoundResetClick,
  onExercisesClick,
  onRoundsClick,
}) {
  // Convert seconds to MM:SS format
  const formatTime = (seconds) => {
    return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
      seconds % 60
    ).padStart(2, "0")}`;
  };

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
      <Stack spacing={1}>
        {[
          {
            label: "Work",
            value: formatTime(workTime),
            color: "#2E7D32",
            onClick: onWorkClick,
          },
          {
            label: "Rest",
            value: formatTime(restTime),
            color: "#C62828",
            onClick: onRestClick,
          },
          {
            label: "Exercises",
            value: exercises,
            color: "#757575",
            onClick: onExercisesClick,
          },
          {
            label: "Rounds",
            value: rounds,
            color: "#1565C0",
            onClick: onRoundsClick,
          },
          {
            label: "Round Reset",
            value: formatTime(roundResetTime),
            color: "#FFB300",
            onClick: onRoundResetClick,
          },
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
