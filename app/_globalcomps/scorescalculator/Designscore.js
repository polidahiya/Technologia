/* ===================== DESIGN PROFILES ===================== */

const DESIGN_PROFILES = {
  Smartphone: {
    idealWeight: 185,
    weightTolerance: 50,

    idealThickness: 7.2,
    thicknessTolerance: 1.2,

    idealAspect: 2.16, // 19.5:9
    aspectTolerance: 0.30,

    idealScreenSize: 6.8,
    screenTolerance: 0.6,

    maxPoints: {
      dimensions: 20,
      weight: 20,
      thickness: 25,
      screenSize: 20,
      waterResistance: 15,
    },
  },

  Tablet: {
    idealWeight: 520,
    weightTolerance: 200,

    idealThickness: 6.5,
    thicknessTolerance: 1.8,

    idealAspect: 1.45,
    aspectTolerance: 0.4,

    idealScreenSize: 11,
    screenTolerance: 1.5,

    maxPoints: {
      dimensions: 20,
      weight: 15,
      thickness: 30,
      screenSize: 20,
      waterResistance: 15,
    },
  },
};

/* ===================== GENERIC IDEAL SCORING ===================== */
/* Slimmer than ideal = full score */
/* Thicker than ideal = penalized */

function idealScore(value, ideal, tolerance, maxPoints) {
  if (!value) return 0;

  const numeric = parseFloat(value);
  const diff = numeric - ideal;

  // If better than ideal (e.g., slimmer / lighter)
  if (diff <= 0) return maxPoints;

  const penalty = diff / tolerance;
  return Number((Math.max(0, 1 - penalty) * maxPoints).toFixed(2));
}

/* ===================== SCREEN SIZE ===================== */

function screenSizeScore(size, profile) {
  if (!size) return 0;

  return idealScore(
    parseFloat(size),
    profile.idealScreenSize,
    profile.screenTolerance,
    profile.maxPoints.screenSize
  );
}

/* ===================== WATER RESISTANCE ===================== */

function waterResistanceScore(wr, maxPoints) {
  if (!wr) return 0;
  const up = wr.toUpperCase();

  if (up.includes("IP69")) return maxPoints;
  if (up.includes("IP68")) return maxPoints * 0.9;
  if (up.includes("IP67")) return maxPoints * 0.75;
  if (up.includes("IP65")) return maxPoints * 0.5;

  return maxPoints * 0.25;
}

/* ===================== DIMENSION / ASPECT ===================== */

function dimensionScore(height, width, profile) {
  if (!height || !width) return 0;

  const aspect = parseFloat(height) / parseFloat(width);

  return idealScore(
    aspect,
    profile.idealAspect,
    profile.aspectTolerance,
    profile.maxPoints.dimensions
  );
}

/* ===================== FINAL DESIGN SCORE ===================== */

export default function DesignScore(product) {
  const type = product.deviceType || "Smartphone";
  const profile = DESIGN_PROFILES[type];
  if (!profile) return 0;

  let score = 0;

  // Weight
  score += idealScore(
    product.weight,
    profile.idealWeight,
    profile.weightTolerance,
    profile.maxPoints.weight
  );

  // Thickness (stronger reward for slim phones)
  score += idealScore(
    product.thickness,
    profile.idealThickness,
    profile.thicknessTolerance,
    profile.maxPoints.thickness
  );

  // Aspect Ratio
  score += dimensionScore(product.height, product.width, profile);

  // Screen Size
  score += screenSizeScore(
    product.display?.[0]?.size,
    profile
  );

  // Water Resistance
  score += waterResistanceScore(
    product.waterResistance,
    profile.maxPoints.waterResistance
  );

  // Small premium bonuses
  if (product.foldable) score += 3;
  if (product.display?.[0]?.curved) score += 1;
  if (product.display?.[0]?.roundCorners) score += 1;
  if (parseFloat(product.display?.[0]?.screenToBodyRatio) > 90) score += 2;

  // Clamp & scale to 50–100 range
  const clamped = Math.min(Math.round(score), 100);
  return Math.round(50 + (clamped / 100) * 50);
}