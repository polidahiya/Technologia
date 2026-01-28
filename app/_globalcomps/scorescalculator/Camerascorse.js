function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/* ---------- SENSOR SCORING ---------- */

function primarySensorScore(mp, maxPoints = 22) {
  if (!mp || mp <= 0) return 0;

  const ref = 50; // saturation point
  const normalized = Math.log(mp) / Math.log(ref);

  return clamp(Number((normalized * maxPoints).toFixed(2)), 0, maxPoints);
}

function maxSensorBonus(maxMp) {
  if (!maxMp) return 0;
  if (maxMp >= 200) return 6;
  if (maxMp >= 108) return 4;
  if (maxMp >= 64) return 2;
  return 0;
}

/* ---------- REAR CAMERA ---------- */

function rearCameraScore(product) {
  let score = 0;

  score += primarySensorScore(product.RearCameramegapixels, 22);
  score += maxSensorBonus(product.maxRearCameramegapixels);

  if (product.ois) score += 10;
  if (product.flash) score += 3;

  if (product.RearCameramegapixels >= 50) score += 2;

  return clamp(score, 0, 45);
}

/* ---------- FRONT CAMERA ---------- */

function frontCameraScore(product) {
  let score = 0;
  const mp = product.frontCameramegapixels;

  if (!mp) return 0;

  score += clamp((Math.log(mp) / Math.log(60)) * 10, 0, 10);

  if (mp >= 32) score += 3;
  else if (mp >= 16) score += 1.5;

  return clamp(score, 0, 15);
}

/* ---------- VIDEO SCORING ---------- */

function parseVideo(video) {
  if (!video || typeof video !== "string") return null;

  const v = video.toLowerCase();

  let resolution = 720;
  let fps = 30;

  if (v.includes("8k")) resolution = 4320;
  else if (v.includes("4k") || v.includes("2160")) resolution = 2160;
  else if (v.includes("full hd") || v.includes("1080")) resolution = 1080;
  else if (v.includes("hd") || v.includes("720")) resolution = 720;

  const fpsMatch = v.match(/(\d{2,3})\s*fps|@(\d{2,3})/g);
  if (fpsMatch) {
    fps = Math.max(...fpsMatch.map((f) => parseInt(f)));
  }

  return { resolution, fps };
}

function videoScore(video, maxPoints) {
  const parsed = parseVideo(video);
  if (!parsed) return 0;

  let score = 0;

  if (parsed.resolution >= 4320) score = maxPoints;
  else if (parsed.resolution >= 2160) score = maxPoints * 0.8;
  else if (parsed.resolution >= 1080) score = maxPoints * 0.55;
  else score = maxPoints * 0.3;

  if (parsed.fps >= 120) score += 4;
  else if (parsed.fps >= 60) score += 2;

  return clamp(Number(score.toFixed(2)), 0, maxPoints);
}

/* ---------- CAMERA FEATURES ---------- */

function cameraHardwareScore(product) {
  let score = 0;

  if (product.ois) score += 5;
  if (product.eis || /60fps/.test(product.RearCameravideoRecording)) score += 3;
  if (product.laserAF) score += 2;

  return clamp(score, 0, 10);
}

/* ---------- FINAL SCORE ---------- */

export default function CameraScore(product) {
  let score = 0;

  score += rearCameraScore(product); // 45
  score += frontCameraScore(product); // 15
  score += videoScore(product.RearCameravideoRecording, 18);
  score += videoScore(product.frontCameravideoRecording, 7);
  score += cameraHardwareScore(product); // 10

  const clamped = clamp(Math.round(score), 0, 100);
  return Math.round(50 + (clamped / 100) * 50);
}
