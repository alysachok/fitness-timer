import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
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
            icon: <PlayCircleOutlineIcon />,
            label: "Work",
            value: formatTime(workTime),
            color: "linear-gradient(to right,#27AE60,  #A9CF54)",
            // color: "#27AE60",
            onClick: onWorkClick,
          },
          {
            icon: <PauseCircleIcon />,
            label: "Rest",
            value: formatTime(restTime),
            // color: "#E74C3C",
            color: "linear-gradient(to right, #F1433F,  #f795ab)",
            onClick: onRestClick,
          },
          {
            icon: <FitnessCenterIcon />,
            label: "Exercises",
            value: exercises,
            // color: "#757575",
            color: "linear-gradient(to right, #757575,  #C1BFB5)",
            onClick: onExercisesClick,
          },
          {
            icon: <ReplayCircleFilledIcon />,
            label: "Rounds",
            value: rounds,
            color: "linear-gradient(to right, #70B7BA,  #ADC7D7)",
            // color: "#70B7BA",
            onClick: onRoundsClick,
          },
          {
            icon: <AccessTimeIcon />,
            label: "Round Reset",
            value: formatTime(roundResetTime),
            color: "linear-gradient(to right, #FFB300,  #EBD773)",
            // color: "#FFB300",
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
            <Stack direction="row" alignItems="center" spacing={1}>
              {item.icon}
              <Typography>{item.label}</Typography>
            </Stack>

            <Typography>{item.value}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
