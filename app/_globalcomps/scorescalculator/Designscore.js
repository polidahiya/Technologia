const DESIGN_PROFILES = {
  Smartphone: {
    idealWeight: 190,
    weightTolerance: 60,
    idealThickness: 7.8,
    thicknessTolerance: 1.5,
    idealAspect: 2.16, // 19.5:9
    aspectTolerance: 0.35,
    maxPoints: {
      dimensions: 25,
      weight: 25,
      thickness: 20,
      waterResistance: 15,
    },
  },

  Tablet: {
    idealWeight: 520,
    weightTolerance: 200,
    idealThickness: 6.5,
    thicknessTolerance: 1.8,
    idealAspect: 1.45, // ~3:2 / 16:10
    aspectTolerance: 0.4,
    maxPoints: {
      dimensions: 25,
      weight: 15,
      thickness: 30,
      waterResistance: 10,
    },
  },
};

function idealScore(value, ideal, tolerance, maxPoints) {
  if (!value) return 0;
  const diff = Math.abs(value - ideal);
  return Number((Math.max(0, 1 - diff / tolerance) * maxPoints).toFixed(2));
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

function dimensionScore(height, width, profile) {
  if (!height || !width) return 0;

  const aspect = height / width;
  return idealScore(
    aspect,
    profile.idealAspect,
    profile.aspectTolerance,
    profile.maxPoints.dimensions,
  );
}

export default function DesignScore(product) {
  const type = product.deviceType || "Smartphone";
  const profile = DESIGN_PROFILES[type];
  if (!profile) return 0;

  let score = 0;

  score += idealScore(
    product.weight,
    profile.idealWeight,
    profile.weightTolerance,
    profile.maxPoints.weight,
  );

  score += idealScore(
    product.thickness,
    profile.idealThickness,
    profile.thicknessTolerance,
    profile.maxPoints.thickness,
  );

  score += dimensionScore(product.height, product.width, profile);

  score += waterResistanceScore(
    product.waterResistance,
    profile.maxPoints.waterResistance,
  );

  // Foldable innovation bonus (controlled)
  if (product.foldable) score += 3;

  const clamped = Math.min(Math.round(score), 100);
  return Math.round(50 + (clamped / 100) * 50);
}
