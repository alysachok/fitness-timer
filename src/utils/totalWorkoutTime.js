export const getTotalWorkoutTime = ({
  workTime,
  restTime,
  roundResetTime,
  exercises,
  rounds,
}) => {
  const timePerRound = exercises * workTime + (exercises - 1) * restTime;
  const totalRoundResetTime = (rounds - 1) * roundResetTime;
  const totalSeconds = rounds * timePerRound + totalRoundResetTime;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else {
    return `${minutes}m ${seconds}s`;
  }
};
