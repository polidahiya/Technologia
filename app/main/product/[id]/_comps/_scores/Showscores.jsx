export default function ScoreOverview({ scores }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
      {/* Overall */}
      <div className="flex items-center justify-center rounded-2xl bg-white p-6 shadow">
        <ScoreCircle score={scores?.totalscore} title="Overall" size="lg" />
      </div>

      {/* Breakdown */}
      <div className="md:col-span-3 rounded-2xl bg-white p-6 shadow">
        <ScoreBreakdown scores={scores} />
      </div>
    </div>
  );
}

function ScoreBreakdown({ scores }) {
  const items = [
    ["Display", scores?.displayscore],
    ["Performance", scores?.performancescore],
    ["Camera", scores?.camerascore],
    ["Battery", scores?.batteryscore],
    ["Connectivity", scores?.connectionscore],
    ["Design", scores?.designscore],
  ];

  return (
    <div className="h-full w-full grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
      {items.map(([label, value]) => (
        <ScoreCircle key={label} title={label} score={value} />
      ))}
    </div>
  );
}

export function getScoreColor(score) {
  if (score >= 90) return "#16a34a"; // emerald green
  if (score >= 80) return "#22c55e"; // green
  if (score >= 70) return "#eab308"; // amber
  if (score >= 60) return "#f59e0b"; // orange
  if (score >= 50) return "#fb7185"; // soft coral
  return "#fda4af"; // muted rose
}

export function ScoreCircle({ score = 50, title = "", size = "md" }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const stroke = getScoreColor(score);

  const sizeConfig = {
    sm: {
      wrapper: "h-16 w-16",
      text: "text-sm",
      strokeWidth: 8,
      title: "text-xs",
    },
    md: {
      wrapper: "h-24 w-24",
      text: "text-2xl",
      strokeWidth: 10,
      title: "text-sm",
    },
    lg: {
      wrapper: "h-36 w-36",
      text: "text-4xl",
      strokeWidth: 12,
      title: "text-base",
    },
  };

  const cfg = sizeConfig[size] ?? sizeConfig.md;

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className={`relative ${cfg.wrapper}`}>
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={cfg.strokeWidth}
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={stroke}
            strokeWidth={cfg.strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (score / 100) * circumference}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div
          className={`absolute inset-0 flex items-center justify-center font-bold ${cfg.text}`}
        >
          {score}
        </div>
      </div>

      {title && (
        <p className={`font-medium text-gray-600 ${cfg.title}`}>
          {title}
        </p>
      )}
    </div>
  );
}
