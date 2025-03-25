export default function CircularTimer({ duration, timeLeft, label }) {
  const radius = 50;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / duration) * circumference;

  return (
    <svg width="20rem" height="20rem" viewBox="0 0 120 120">
      {/* Background Circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#ddd"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Progress Circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke={
          label.toLowerCase().includes("work")
            ? "#27AE60" // Green
            : label.toLowerCase().includes("rest") &&
              !label.toLowerCase().includes("round")
            ? "#E74C3C" // Red
            : "#FFA000"
          // : "#FF9900" // Yellow/Orange for Round Reset
        }
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
      />

      {/* Time */}
      <text x="60" y="55" fontSize="24" textAnchor="middle" fill="#fff">
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </text>

      {/* Label (Phase) */}
      <text
        x="60"
        y="75"
        fontSize="12"
        textAnchor="middle"
        fill="#fff"
        fontWeight="bold"
      >
        {label}
      </text>
    </svg>
  );
}
