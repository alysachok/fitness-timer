export default function CircularTimer({ duration, timeLeft, phase }) {
  const radius = 50; // Circle radius
  const strokeWidth = 6; // Border thickness
  const circumference = 2 * Math.PI * radius; // Full circle length
  const progress = (timeLeft / duration) * circumference; // Dynamic progress

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

      {/* Dynamic Progress Circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke={
          phase === "work"
            ? "#27AE60" // Green for Work
            : phase === "rest"
            ? "#E74C3C" // Red for Rest
            : "#FF9900" // Orange for Round Reset
        }
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress} // Progress effect
        strokeLinecap="round"
        transform="rotate(-90 60 60)" // Start from top
      />

      {/* Timer Text */}
      <text x="60" y="55" fontSize="24" textAnchor="middle" fill="#fff">
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </text>

      {/* Phase Text */}
      <text x="60" y="75" fontSize="12" textAnchor="middle" fill="#fff">
        {phase.toUpperCase()}
      </text>
    </svg>
  );
}
