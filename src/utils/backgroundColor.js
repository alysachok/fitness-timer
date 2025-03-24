export const getBackgroundColor = (phase) => {
  switch (phase) {
    case "work":
      return "linear-gradient(to right, #70B7BA, #A9CF54)";
    case "rest":
      return "linear-gradient(to right, #f795ab, #F1433F)";
    case "roundReset":
      return "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
    default:
      return "linear-gradient(to bottom, #bdc3c7, #2c3e50)";
  }
};
