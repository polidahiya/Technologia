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

function parseStorageToGB(value) {
  if (!value || typeof value !== "string") return 0;

  const match = value.match(/(\d+(?:\.\d+)?)\s*(tb|gb)/i);
  if (!match) return 0;

  const amount = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  return unit === "tb" ? amount * 1024 : amount;
}

export default function PerformanceScore(product, max, autofillvalues) {
  const { chipsets, mobileGPUs, ramTypes, storage, storageType } =
    autofillvalues;
  let score = 0;

  /* ---------- Quantitative (55 pts) ---------- */

  score += normalize(product.antutuscore, max.antutu, 30);
  score += normalize(product.maxCpuClockSpeed, max.cpuClock, 10);
  score += normalize(product.ram, max.ram, 10);
  score += normalize(parseStorageToGB(product.storage), max.storage, 5);
  score += normalize(product.cpuCores || 8, max.maxcores, 6);

  /* ---------- Indexed Rankings (45 pts) ---------- */

  score += getIndexedScore(product.chipset, chipsets, 20);
  score += getIndexedScore(product.gpu, mobileGPUs, 15);
  score += getIndexedScore(product.ramType, ramTypes, 5);
  score += getIndexedScore(product.storageType, storageType, 5);

  /* ---------- Optional micro bonus ---------- */
  if (product.expandableStorage) score += 1;

  /* ---------- Clamp + Scale (50–100) ---------- */
  const clamped = Math.min(Math.round(score), 100);
  return Math.round(50 + (clamped / 100) * 50);
}
