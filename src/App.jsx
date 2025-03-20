import MenuIcon from "@mui/icons-material/Menu";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RestTimeAdjuster from "./RestTimeAdjuster";
import RoundResetTimeAdjuster from "./RoundResetTimeAdjuster";
import TimerSettings from "./TimerSettings";
import WorkTimeAdjuster from "./WorkTimeAdjuster";

export default function App() {
  const [workTime, setWorkTime] = useState(45); // Default Work Time in seconds
  const [restTime, setRestTime] = useState(30); // Default Rest Time in seconds
  const [roundResetTime, setRoundResetTime] = useState(60); // Round reset time in seconds
  const [exercises, setExercises] = useState(7); // Number of exercises
  const [rounds, setRounds] = useState(3); // Number of rounds
  const [time, setTime] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("work"); // work, rest, roundReset
  const [exerciseCount, setExerciseCount] = useState(1);
  const [roundCount, setRoundCount] = useState(1);
  const [openWorkModal, setOpenWorkModal] = useState(false);
  const [openRestModal, setOpenRestModal] = useState(false);
  const [openRoundResetModal, setOpenRoundResetModal] = useState(false);

  const toggleTimer = () => setIsRunning(!isRunning);
  const handleOpenWorkModal = () => setOpenWorkModal(true);
  const handleCloseWorkModal = () => setOpenWorkModal(false);
  const handleOpenRestModal = () => setOpenRestModal(true);
  const handleCloseRestModal = () => setOpenRestModal(false);
  const handleOpenRoundResetModal = () => setOpenRoundResetModal(true);
  const handleCloseRoundResetModal = () => setOpenRoundResetModal(false);

  // Reset timer when workTime changes (only when not running)
  useEffect(() => {
    if (!isRunning) {
      setTime(workTime);
    }
  }, [workTime, isRunning]);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    if (time === 0) {
      if (phase === "work") {
        if (exerciseCount < exercises) {
          setPhase("rest");
          setTime(restTime);
        } else {
          if (roundCount < rounds) {
            setPhase("roundReset"); // 🔥 Fixed Typo (was "roundRoundReset")
            setTime(roundResetTime);
            setExerciseCount(1);
            setRoundCount((prev) => prev + 1);
          } else {
            setIsRunning(false);
            return;
          }
        }
      } else if (phase === "rest") {
        setPhase("work");
        setTime(workTime);
        setExerciseCount((prev) => prev + 1);
      } else if (phase === "roundReset") {
        setPhase("work");
        setTime(workTime);
      }
      return;
    }

    const interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning, time, phase, exerciseCount, roundCount]);

  // Background color logic
  const getBackgroundColor = () => {
    switch (phase) {
      case "work":
        return "#4CAF50"; // Green for work
      case "rest":
        return "#C62828"; // Red for rest
      case "roundReset":
        return "#FFB300"; // Yellow for reset
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
      {/* Menu Icon */}
      <Box sx={{ position: "absolute", top: 20, left: 20 }}>
        <MenuIcon sx={{ fontSize: 30 }} />
      </Box>

      {/* Timer Display */}
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
      </Typography>

      {/* Play Button */}
      <Button
        sx={{
          mt: 2,
          background: "#000",
          borderRadius: "50%",
          width: 70,
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={toggleTimer}
      >
        {isRunning ? (
          <PauseIcon sx={{ color: "#fff", fontSize: 40 }} />
        ) : (
          <PlayArrowIcon sx={{ color: "#fff", fontSize: 40 }} />
        )}
      </Button>

      {/* Timer Settings */}
      <TimerSettings
        workTime={workTime}
        restTime={restTime}
        roundResetTime={roundResetTime}
        onWorkClick={handleOpenWorkModal}
        onRestClick={handleOpenRestModal}
        onRoundResetClick={handleOpenRoundResetModal}
      />

      {/* Modal for Adjusting Work Time */}
      <Modal open={openWorkModal} onClose={handleCloseWorkModal}>
        <WorkTimeAdjuster
          time={workTime}
          setTime={setWorkTime}
          onClose={handleCloseWorkModal}
        />
      </Modal>

      {/* Modal for Adjusting Rest Time */}
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
    </Box>
  );
}
