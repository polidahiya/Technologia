import { cameraCutouts, screenProtections, displayTypes } from "@/lib/data";
function normalize(value, max, weight) {
  if (!value || !max) return 0;
  return Math.min(value / max, 1) * weight;
}

function getIndexedScore(value, list, maxPoints) {
  const index = list.indexOf(value);
  if (index === -1) return maxPoints * 0.5;

  const maxIndex = list.length - 1;
  return Number((maxPoints * (1 - index / maxIndex)).toFixed(2));
}

function getScreenSizeScore(size, deviceType, isFoldable) {
  const SIZE_PROFILES = {
    Smartphone: {
      ideal: 6.6,
      tolerance: 1.2,
      maxPoints: 4,
    },
    Foldable: {
      ideal: 7.6, // inner display
      tolerance: 1.5,
      maxPoints: 5,
    },
    Tablet: {
      ideal: 11,
      tolerance: 2.5,
      maxPoints: 6,
    },
  };
  if (!size) return 0;

  const profile = isFoldable
    ? SIZE_PROFILES.Foldable
    : SIZE_PROFILES[deviceType];

  if (!profile) return 0;

  const { ideal, tolerance, maxPoints } = profile;
  const distance = Math.abs(size - ideal);
  const factor = Math.max(0, 1 - distance / tolerance);

  return Number((maxPoints * factor).toFixed(2));
}

/* ---------------- Main Display Score ---------------- */

export default function Displayscore(product, max) {
  const d = product?.display?.[0];
  let score = 0;

  /* -------- Quantitative (70 pts) -------- */
  score += normalize(d.ppi, max.ppi, 25);
  score += normalize(d.Brightness, max.brightness, 20);
  score += normalize(d.refreshRate, max.refreshRate, 15);
  score += normalize(d.screenToBodyRatio, max.screenToBody, 10);

  /* -------- Qualitative (30 pts) -------- */
  if (d.hdr) score += 8;
  if (d.antiReflection) score += 5;
  if (d.nanoTexture) score += 4;
  if (d.dustResistance) score += 3;
  if (d.curved) score += 1;

  /* -------- Indexed Ranking Scores -------- */
  score += getIndexedScore(d.type, displayTypes, 7);
  score += getIndexedScore(d.cameraCutout, cameraCutouts, 5);
  score += getIndexedScore(d.screenProtection, screenProtections, 6);

  score += getScreenSizeScore(d.size, product.deviceType, product.foldable);

  score = Math.min(Math.round(score), 100);
  const finalScore = 50 + (score / 100) * 50;
  return finalScore;
}
