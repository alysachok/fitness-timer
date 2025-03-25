export const formatPhaseName = (phase) => {
  switch (phase) {
    case "work":
      return "Work";
    case "rest":
      return "Rest";
    case "roundReset":
      return "Round Reset";
    default:
      return "Unknown";
  }
};
