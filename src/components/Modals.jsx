import { Modal } from "@mui/material";
import WorkTimeAdjuster from "./adjusters/WorkTimeAdjuster";
import RestTimeAdjuster from "./adjusters/RestTimeAdjuster";
import RoundResetTimeAdjuster from "./adjusters/RoundResetTimeAdjuster";
import RoundsAdjuster from "./adjusters/RoundsAdjuster";
import ExercisesAdjuster from "./adjusters/ExercisesAdjuster";

export default function Modals({
  openWorkModal,
  openRestModal,
  openRoundResetModal,
  openRoundsAdjusterModal,
  openExercisesAdjusterModal,
  handleCloseWorkModal,
  handleCloseRestModal,
  handleCloseRoundResetModal,
  handleCloseRoundsAdjusterModal,
  handleCloseExercisesAdjusterModal,
  workTime,
  restTime,
  roundResetTime,
  exercises,
  rounds,
  setWorkTime,
  setRestTime,
  setRoundResetTime,
  setExercises,
  setRounds,
}) {
  return (
    <>
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
    </>
  );
}
