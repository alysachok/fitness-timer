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
import useWakeLock from "./hooks/useWakeLock";
import { getBackgroundColor } from "./utils/backgroundColor";
import { formatPhaseName } from "./utils/formatPhaseName";
import { getTotalWorkoutTime } from "./utils/totalWorkoutTime";
import workoutConfig from "./workoutConfig.json";
const beep = new Audio(`${import.meta.env.BASE_URL}beep.wav`);

const styles = {
  container: (phase) => ({
    width: "100vw",
    minHeight: "100vh",
    background: getBackgroundColor(phase),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
    textAlign: "center",
    fontSize: {
      xs: "1.6rem", // extra-small screens (phones)
      sm: "2.4rem", // small screens (tablets)
      md: "3rem", // medium and up (desktops)
    },
  },
};

export default function App() {
  // Timer Config
  // const [workTime, setWorkTime] = useState(45);
  // const [restTime, setRestTime] = useState(30);
  // const [roundResetTime, setRoundResetTime] = useState(60);
  // const [exercises, setExercises] = useState(7);
  // const [rounds, setRounds] = useState(3);
  const [workTime, setWorkTime] = useState(workoutConfig.workTime);
  const [restTime, setRestTime] = useState(workoutConfig.restTime);
  const [roundResetTime, setRoundResetTime] = useState(
    workoutConfig.roundResetTime
  );
  const [exercises, setExercises] = useState(workoutConfig.exercises);
  const [rounds, setRounds] = useState(workoutConfig.rounds);
  const exerciseList = workoutConfig.exerciseList;
  const [currentExercise, setCurrentExercise] = useState(exerciseList[0]);

  // Timer State
  const [time, setTime] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("work");
  const [exerciseCount, setExerciseCount] = useState(1);
  const [roundCount, setRoundCount] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  useWakeLock(isRunning);

  // Reset timer to work time if not running
  useEffect(() => {
    if (!isRunning) {
      setTime(workTime);
    }
  }, [workTime, isRunning]);

  useEffect(() => {
    if (phase === "work") {
      setCurrentExercise(exerciseList[currentIndex]);
    }
  }, [phase, currentIndex, exerciseList]);

  useEffect(() => {
    if (phase === "rest") {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % exerciseList.length;
        setCurrentExercise(exerciseList[nextIndex]);
        return nextIndex;
      });
    }

    if (phase === "roundReset") {
      setCurrentIndex(0);
      setCurrentExercise(exerciseList[0]);
    }
  }, [phase, exerciseList]);

  // Main Timer Logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        // Play sound in the last 4 seconds
        if (prevTime <= 4 && prevTime > 1) {
          beep.play().catch((e) => {
            // Handle autoplay policy restrictions if any
            console.warn("Audio play failed:", e);
          });
        }
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
      <header>header</header>
      {isRunning && (
        <Typography sx={styles.titleText}>
          <h2 style={{ visibility: phase === "work" ? "hidden" : "visible" }}>
            Next
          </h2>
          <h1>{currentExercise}</h1>
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

      {isRunning && (
        <Typography sx={styles.titleText}>
          Round {roundCount} of {rounds}
        </Typography>
      )}

      {!isRunning && (
        <>
          <Typography sx={styles.titleText}>
            Workout Time:{" "}
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
      <p>Footer</p>
    </Box>
  );
}
