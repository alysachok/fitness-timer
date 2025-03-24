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
        background: "rgba(34, 34, 34, 0.6)",
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
            color: "#27AE60",
            onClick: onWorkClick,
          },
          {
            label: "Rest",
            value: formatTime(restTime),
            color: "#E74C3C",
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
            color: "#70B7BA",
            onClick: onRoundsClick,
          },
          {
            label: "Round Reset",
            value: formatTime(roundResetTime),
            color: "#FF9900",
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
