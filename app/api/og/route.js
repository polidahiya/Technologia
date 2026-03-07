import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

function getScoreColor(score) {
  if (score >= 95) return "#6958ca";
  if (score >= 90) return "#16a34a"; // emerald green
  if (score >= 80) return "#22c55e"; // green
  if (score >= 70) return "#eab308"; // amber
  if (score >= 60) return "#f59e0b"; // orange
  if (score >= 50) return "#fb7185"; // soft coral
  return "#fda4af"; // muted rose
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const bgimage =
    "https://tecknologia.in/moreimages/pinterestbgimg.png"; // NEVER use localhost

  const title = searchParams.get("title");
  const brand = searchParams.get("brand");
  const image = searchParams.get("image");

  const chipset = searchParams.get("chipset");
  const battery = searchParams.get("battery");
  const refresh = searchParams.get("refresh");
  const price = searchParams.get("price");

  const displayScore = searchParams.get("display");
  const performanceScore = searchParams.get("performance");
  const cameraScore = searchParams.get("camera");
  const batteryScore = searchParams.get("batteryScore");
  const connectivityScore = searchParams.get("connectivity");

  return new ImageResponse(
    (
      <div
        style={{
          width: "1000px",
          height: "1500px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          position: "relative",
          background: "#ffffff",
          overflow: "hidden",
        }}
      >
        {/* Background */}
        {bgimage && (
          <img
            src={bgimage}
            style={{
              position: "absolute",
              inset: "0",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: "10",
            alignItems: "center",
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "#6b7280",
              marginTop: "80px",
            }}
          >
            {brand}
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              color: "#0f172a",
              textAlign: "center",
              marginTop: 10,
              padding: "0 40px",
            }}
          >
            {title}
          </div>

          {/* Phone Image */}
          {image && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 40,
              }}
            >
              <img
                src={image}
                style={{
                  width: "520px",
                  height: "640px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}

          {/* Feature Badges */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {chipset && <div style={badge}>⚡ {chipset}</div>}
            {refresh && <div style={badge}>📱 {refresh}Hz</div>}
            {battery && <div style={badge}>🔋 {battery}mAh</div>}
          </div>

          {/* Price */}
          {price && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 40,
                fontSize: 52,
                fontWeight: 800,
                color: "#d68e43",
              }}
            >
             From RS {Number(price).toLocaleString("en-IN")}*
            </div>
          )}

          {/* Scores */}
          <div
            style={{
              display: "flex",
              gap: 18,
              marginTop: 60,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {displayScore && (
              <CircleScore label="Display" value={displayScore} />
            )}

            {performanceScore && (
              <CircleScore label="Performance" value={performanceScore} />
            )}

            {cameraScore && <CircleScore label="Camera" value={cameraScore} />}

            {batteryScore && (
              <CircleScore label="Battery" value={batteryScore} />
            )}

            {connectivityScore && (
              <CircleScore label="Connectivity" value={connectivityScore} />
            )}
          </div>
        </div>
      </div>
    ),
    {
      width: 1000,
      height: 1500,
    }
  );
}

const badge = {
  display: "flex",
  padding: "12px 22px",
  background: "#f1f5f9",
  borderRadius: 999,
  fontSize: 24,
  color: "#111827",
};

/* Circle Score */
const CircleScore = ({ label, value }) => {
  const val = Number(value);
  const color = getScoreColor(val);

  const radius = 73;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (val / 100) * circumference;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 160,
      }}
    >
      <div
        style={{
          display: "flex",
          width: 160,
          height: 160,
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="160" height="160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="14"
            fill="none"
          />

          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={color}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            fill="none"
            transform="rotate(-90 80 80)"
          />
        </svg>

        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 38,
            fontWeight: 700,
          }}
        >
          {val}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 8,
          fontSize: 22,
          color: "#374151",
        }}
      >
        {label}
      </div>
    </div>
  );
};