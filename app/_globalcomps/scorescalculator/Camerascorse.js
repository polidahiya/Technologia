function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function megapixelScore(mp, maxPoints, reference = 200) {
  if (!mp || mp <= 0) return 0;

  const normalized = Math.log(mp) / Math.log(reference);
  return clamp(Number((normalized * maxPoints).toFixed(2)), 0, maxPoints);
}

function primarySensorScore(mp, maxPoints = 22) {
  if (!mp || mp <= 0) return 0;

  const ref = 50; // real-world saturation
  const normalized = Math.log(mp) / Math.log(ref);

  return clamp(Number((normalized * maxPoints).toFixed(2)), 0, maxPoints);
}


function maxSensorBonus(maxMp) {
  if (!maxMp || maxMp < 64) return 0;
  if (maxMp >= 200) return 6;
  if (maxMp >= 108) return 4;
  return 2;
}


function rearCameraScore(product) {
  let score = 0;

  score += primarySensorScore(product.RearCameramegapixels, 22);
  score += maxSensorBonus(product.maxRearCameramegapixels);

  // Stabilization & lighting (rear only)
  if (product.ois) score += 10;
  if (product.flash) score += 3;

  // Sensor maturity bonus
  if (product.RearCameramegapixels >= 50) score += 2;

  return clamp(score, 0, 45);
}


function frontCameraScore(product) {
  let score = 0;

  score += megapixelScore(product.frontCameramegapixels, 10, 60);

  if (product.frontCameramegapixels >= 32) score += 3;
  if (product.frontCameramegapixels >= 48) score += 2;

  return clamp(score, 0, 15);
}


function videoScore(video, maxPoints) {
  if (!video) return 0;

  let resolution = 0;
  let fps = 30;

  // Numeric input (8, 4, 1080)
  if (typeof video === "number") {
    resolution = video;
  }

  // String input
  if (typeof video === "string") {
    const v = video.toLowerCase();

    if (v.includes("8k")) resolution = 8;
    else if (v.includes("4k") || v.includes("2160")) resolution = 4;
    else if (v.includes("1080")) resolution = 1080;
    else if (v.includes("720")) resolution = 720;

    const fpsMatch = v.match(/(\d{2,3})\s*fps|@(\d{2,3})/);
    if (fpsMatch) fps = Number(fpsMatch[1] || fpsMatch[2]);
  }

  let score = 0;
  if (resolution >= 8) score = maxPoints * 1.0;
  else if (resolution >= 4) score = maxPoints * 0.75;
  else if (resolution >= 1080) score = maxPoints * 0.5;
  else if (resolution >= 720) score = maxPoints * 0.3;

  if (fps >= 120) score += 4;
  else if (fps >= 60) score += 2;

  return clamp(Number(score.toFixed(2)), 0, maxPoints);
}


function cameraHardwareScore(product) {
  let score = 0;

  if (product.eis) score += 2; // electronic stabilization
  if (product.laserAF) score += 2;
  if (product.sensorShiftOIS) score += 3;

  return clamp(score, 0, 10);
}

export default function CameraScore(product) {
  let score = 0;

  score += rearCameraScore(product);                // 45
  score += frontCameraScore(product);               // 15

  score += videoScore(product.RearCameravideoRecording, 18);
  score += videoScore(product.frontCameravideoRecording, 7);

  score += cameraHardwareScore(product);             // 10

  const clamped=clamp(Math.round(score), 0, 100);
  return Math.round(50 + (clamped / 100) * 50);
}
