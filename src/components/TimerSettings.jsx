import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import RunCircleOutlinedIcon from "@mui/icons-material/RunCircleOutlined";
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
      <Stack spacing={1} fontFamily="Rajdhani, sans-serif">
        {[
          {
            icon: <PlayCircleOutlineIcon />,
            label: "Work",
            value: formatTime(workTime),
            color: "linear-gradient(to right,#27AE60,  #A9CF54)",
            onClick: onWorkClick,
          },
          {
            icon: <PauseCircleOutlinedIcon />,
            label: "Rest",
            value: formatTime(restTime),
            color: "linear-gradient(to right, #F1433F,  #f795ab)",
            onClick: onRestClick,
          },
          {
            icon: <RunCircleOutlinedIcon />,
            label: "Exercises",
            value: exercises,
            color: "linear-gradient(to right, #757575,  #C1BFB5)",
            onClick: onExercisesClick,
          },
          {
            icon: <ReplayOutlinedIcon />,
            label: "Rounds",
            value: rounds,
            color: "linear-gradient(to right, #70B7BA,  #ADC7D7)",
            onClick: onRoundsClick,
          },
          {
            icon: <AccessTimeIcon />,
            label: "Round Reset",
            value: formatTime(roundResetTime),
            color: "linear-gradient(to right, #FFB300,  #EBD773)",
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
              <Typography
                sx={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontWeight: 600,
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
                }}
              >
                {item.label}
              </Typography>
            </Stack>

            <Typography
              color="#051937"
              fontWeight="bold"
              fontFamily="Rajdhani, sans-serif"
              sx={{
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
