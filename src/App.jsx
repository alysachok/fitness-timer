import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import CircularTimer from "./components/CircularTimer";
import TimerSettings from "./components/TimerSettings";
import ExercisesAdjuster from "./components/adjusters/ExercisesAdjuster";
import RestTimeAdjuster from "./components/adjusters/RestTimeAdjuster";
import RoundResetTimeAdjuster from "./components/adjusters/RoundResetTimeAdjuster";
import RoundsAdjuster from "./components/adjusters/RoundsAdjuster";
import WorkTimeAdjuster from "./components/adjusters/WorkTimeAdjuster";
import { getBackgroundColor } from "./utils/backgroundColor";
import { formatPhaseName } from "./utils/formatPhaseName";
import { getTotalWorkoutTime } from "./utils/totalWorkoutTime";

const styles = {
  container: (phase) => ({
    width: "100vw",
    minHeight: "100vh",
    background: getBackgroundColor(phase),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    overflow: "hidden",
    margin: 0,
    fontFamily: "Rajdhani, sans-serif",
    transition: "background 0.5s ease",
  }),
  button: {
    background: "radial-gradient(circle, #3D4C53, #333)",
    borderRadius: "50%",
    width: 60,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
    "&:hover": {
      background: "radial-gradient(circle, #3D4C53, #000)",
    },
  },
  titleText: {
    fontFamily: "Rajdhani, sans-serif",
    fontSize: "3rem",
  },
};

export default function App() {
  // Timer Config
  const [workTime, setWorkTime] = useState(45);
  const [restTime, setRestTime] = useState(30);
  const [roundResetTime, setRoundResetTime] = useState(60);
  const [exercises, setExercises] = useState(7);
  const [rounds, setRounds] = useState(3);

  // Timer State
  const [time, setTime] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("work");
  const [exerciseCount, setExerciseCount] = useState(1);
  const [roundCount, setRoundCount] = useState(1);

  // Modal Controls
  const [openWorkModal, setOpenWorkModal] = useState(false);
  const [openRestModal, setOpenRestModal] = useState(false);
  const [openRoundResetModal, setOpenRoundResetModal] = useState(false);
  const [openExercisesAdjusterModal, setOpenExercisesAdjusterModal] =
    useState(false);
  const [openRoundsAdjusterModal, setOpenRoundsAdjusterModal] = useState(false);
  const handleOpenWorkModal = () => setOpenWorkModal(true);
  const handleCloseWorkModal = () => setOpenWorkModal(false);
  const handleOpenRestModal = () => setOpenRestModal(true);
  const handleCloseRestModal = () => setOpenRestModal(false);
  const handleOpenRoundResetModal = () => setOpenRoundResetModal(true);
  const handleCloseRoundResetModal = () => setOpenRoundResetModal(false);
  const handleOpenExercisesAdjusterModal = () =>
    setOpenExercisesAdjusterModal(true);
  const handleCloseExercisesAdjusterModal = () =>
    setOpenExercisesAdjusterModal(false);
  const handleOpenRoundsAdjusterModal = () => setOpenRoundsAdjusterModal(true);
  const handleCloseRoundsAdjusterModal = () =>
    setOpenRoundsAdjusterModal(false);

  // Toggle Start/Pause
  const toggleTimer = () => setIsRunning(!isRunning);

  // Reset timer to work time if not running
  useEffect(() => {
    if (!isRunning) {
      setTime(workTime);
    }
  }, [workTime, isRunning]);

  // Main Timer Logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          if (phase === "work") {
            if (exerciseCount < exercises) {
              setPhase("rest");
              return restTime;
            } else {
              setPhase("roundReset");
              return roundResetTime;
            }
          } else if (phase === "rest") {
            setPhase("work");
            setExerciseCount(exerciseCount + 1);
            return workTime;
          } else if (phase === "roundReset") {
            if (roundCount < rounds) {
              setRoundCount(roundCount + 1);
              setExerciseCount(1);
              setPhase("work");
              return workTime;
            } else {
              setIsRunning(false);
              setExerciseCount(1);
              setRoundCount(1);
              setPhase("work");
              return workTime;
            }
          }
        }

        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isRunning,
    time,
    phase,
    exerciseCount,
    roundCount,
    workTime,
    restTime,
    roundResetTime,
    exercises,
    rounds,
  ]);

  return (
    <Box sx={styles.container(phase)}>
      {isRunning && (
        <Typography sx={styles.titleText}>
          Exercise {exerciseCount} of {exercises}
        </Typography>
      )}
      <CircularTimer
        duration={
          phase === "work"
            ? workTime
            : phase === "rest"
            ? restTime
            : roundResetTime
        }
        timeLeft={time}
        phase={phase}
        label={formatPhaseName(phase)}
      />

      <Button sx={styles.button} onClick={toggleTimer}>
        {isRunning ? (
          <PauseIcon sx={{ color: "#fff", fontSize: 50 }} />
        ) : (
          <PlayArrowIcon sx={{ color: "#fff", fontSize: 50 }} />
        )}
      </Button>

      {/* {isRunning && (
      
          <Typography sx={styles.titleText}>
            Exercise {exerciseCount} of {exercises}
          </Typography>
          <Typography sx={styles.titleText}>
            Round {roundCount} of {rounds}
          </Typography>
       
      )} */}
      {isRunning && (
        <Typography sx={styles.titleText}>
          Round {roundCount} of {rounds}
        </Typography>
      )}

      {!isRunning && (
        <>
          <Typography sx={styles.titleText}>
            Total Workout Time:{" "}
            {getTotalWorkoutTime({
              workTime,
              restTime,
              roundResetTime,
              exercises,
              rounds,
            })}
          </Typography>
          <TimerSettings
            workTime={workTime}
            restTime={restTime}
            roundResetTime={roundResetTime}
            rounds={rounds}
            onWorkClick={handleOpenWorkModal}
            onRestClick={handleOpenRestModal}
            onRoundResetClick={handleOpenRoundResetModal}
            exercises={exercises}
            onExercisesClick={handleOpenExercisesAdjusterModal}
            onRoundsClick={handleOpenRoundsAdjusterModal}
          />
        </>
      )}

      {/* Modals */}
      <Modal open={openWorkModal} onClose={handleCloseWorkModal}>
        <WorkTimeAdjuster
          time={workTime}
          setTime={setWorkTime}
          onClose={handleCloseWorkModal}
        />
      </Modal>
      <Modal open={openRestModal} onClose={handleCloseRestModal}>
        <RestTimeAdjuster
          time={restTime}
          setTime={setRestTime}
          onClose={handleCloseRestModal}
        />
      </Modal>
      <Modal open={openRoundResetModal} onClose={handleCloseRoundResetModal}>
        <RoundResetTimeAdjuster
          time={roundResetTime}
          setTime={setRoundResetTime}
          onClose={handleCloseRoundResetModal}
        />
      </Modal>
      <Modal
        open={openRoundsAdjusterModal}
        onClose={handleCloseRoundsAdjusterModal}
      >
        <RoundsAdjuster
          rounds={rounds}
          setRounds={setRounds}
          onClose={handleCloseRoundsAdjusterModal}
        />
      </Modal>
      <Modal
        open={openExercisesAdjusterModal}
        onClose={handleCloseExercisesAdjusterModal}
      >
        <ExercisesAdjuster
          exercises={exercises}
          setExercises={setExercises}
          onClose={handleCloseExercisesAdjusterModal}
        />
      </Modal>
    </Box>
  );
}
