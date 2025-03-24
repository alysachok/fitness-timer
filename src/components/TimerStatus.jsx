import { Typography } from "@mui/material";

export default function TimerStatus({
  exerciseCount,
  exercises,
  roundCount,
  rounds,
}) {
  return (
    <>
      <Typography sx={{ fontSize: "2rem", fontWeight: "bold", mt: 1 }}>
        Exercise {exerciseCount} of {exercises}
      </Typography>
      <Typography sx={{ fontSize: "2rem", fontWeight: "bold", mt: 1 }}>
        Round {roundCount} of {rounds}
      </Typography>
    </>
  );
}
