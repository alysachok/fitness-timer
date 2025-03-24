import MenuIcon from "@mui/icons-material/Menu";
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

export default function App() {
  const [workTime, setWorkTime] = useState(45);
  const [restTime, setRestTime] = useState(30);
  const [roundResetTime, setRoundResetTime] = useState(60);
  const [exercises, setExercises] = useState(7);
  const [rounds, setRounds] = useState(3);
  const [time, setTime] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("work");
  const [exerciseCount, setExerciseCount] = useState(1);
  const [roundCount, setRoundCount] = useState(1);
  const [openWorkModal, setOpenWorkModal] = useState(false);
  const [openRestModal, setOpenRestModal] = useState(false);
  const [openRoundResetModal, setOpenRoundResetModal] = useState(false);
  const [openExercisesAdjusterModal, setOpenExercisesAdjusterModal] =
    useState(false);
  const [openRoundsAdjusterModal, setOpenRoundsAdjusterModal] = useState(false);

  const toggleTimer = () => setIsRunning(!isRunning);
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

  useEffect(() => {
    if (!isRunning) {
      setTime(workTime);
    }
  }, [workTime, isRunning]);

  // useEffect(() => {
  //   if (!isRunning) return;

  //   const interval = setInterval(() => {
  //     setTime((prevTime) => {
  //       if (prevTime === 1) {
  //         if (phase === "work") {
  //           if (exerciseCount < exercises) {
  //             // Transition to Rest Phase
  //             setPhase("rest");
  //             return restTime;
  //           } else {
  //             if (roundCount < rounds) {
  //               // All exercises completed in this round → Start Round Reset Timer
  //               setPhase("roundReset");
  //               setExerciseCount(1);
  //               setRoundCount((prev) => prev + 1);
  //               return roundResetTime;
  //             } else {
  //               // All rounds completed → Stop Timer
  //               setIsRunning(false);
  //               return 0;
  //             }
  //           }
  //         } else if (phase === "rest") {
  //           // Transition back to Work Phase
  //           setPhase("work");
  //           setExerciseCount((prev) => prev + 1);
  //           return workTime;
  //         } else if (phase === "roundReset") {
  //           // Start next round's Work Timer
  //           setPhase("work");
  //           return workTime;
  //         }
  //       }
  //       return prevTime - 1; // Countdown
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [
  //   isRunning,
  //   time,
  //   phase,
  //   exerciseCount,
  //   roundCount,
  //   workTime,
  //   restTime,
  //   roundResetTime,
  //   exercises,
  //   rounds,
  // ]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          if (phase === "work") {
            if (exerciseCount < exercises) {
              // 🔹 Transition to Rest Phase
              setPhase("rest");
              return restTime;
            } else {
              if (roundCount < rounds) {
                // 🔹 All exercises in round completed → Start Round Reset Timer
                setPhase("roundReset");
                return roundResetTime;
              } else {
                // 🔹 All rounds completed → Stop Timer
                setIsRunning(false);
                return 0;
              }
            }
          } else if (phase === "rest") {
            if (exerciseCount < exercises) {
              // 🔹 Transition back to Work Phase, increase exercise count
              setPhase("work");
              setExerciseCount((prev) => prev + 1);
              return workTime;
            }
          } else if (phase === "roundReset") {
            if (roundCount < rounds) {
              // 🔹 Start new round, reset exercise count
              setPhase("work");
              setExerciseCount(1);
              setRoundCount((prev) => prev + 1);
              return workTime;
            } else {
              // 🔹 All rounds completed → Stop Timer
              setIsRunning(false);
              return 0;
            }
          }
        }
        return prevTime - 1; // 🔹 Countdown continues
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

  const getBackgroundColor = () => {
    switch (phase) {
      case "work":
        return "linear-gradient(to right, #70B7BA, #A9CF54)";
      case "rest":
        return "linear-gradient(to right,   #f795ab, #F1433F)";
      case "roundReset":
        return "linear-gradient(to right, #F6FF92, #FFCC00)";
      default:
        return "linear-gradient(to bottom, #ff5f6d, #ff7a5a)";
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: getBackgroundColor(),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.5s ease",
      }}
    >
      <Box sx={{ position: "absolute", top: 20, left: 20 }}>
        <MenuIcon sx={{ fontSize: 30 }} />
      </Box>

      <Typography
        // variant="h1"
        sx={{
          fontWeight: "bold",
          fontSize: "10rem",
          textShadow: "2px 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <CircularTimer duration={workTime} timeLeft={time} phase={phase} />

        {/* {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")} */}
      </Typography>

      <Button
        sx={{
          mt: 2,
          background: "radial-gradient(circle, #3D4C53, #333)",
          borderRadius: "50%",
          width: 80,
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)", // Soft glow
          "&:hover": {
            background: "radial-gradient(circle, #3D4C53, #000)",
          },
        }}
        onClick={toggleTimer}
      >
        {isRunning ? (
          <PauseIcon sx={{ color: "#fff", fontSize: 50 }} />
        ) : (
          <PlayArrowIcon sx={{ color: "#fff", fontSize: 50 }} />
        )}
      </Button>

      {!isRunning && (
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
      )}

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
