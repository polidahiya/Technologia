/* ===================== ENUMS / PRIORITY LISTS ===================== */
import { usbConnectors } from "@/lib/data";

const wifiVersionScoreMap = {
  "Wi-Fi 7": 20,
  "Wi-Fi 6E": 18,
  "Wi-Fi 6": 16,
  "Wi-Fi 5": 13,
  "Wi-Fi 4": 10,
};

const bluetoothScoreMap = {
  5.4: 15,
  5.3: 14,
  5.2: 13,
  5.1: 12,
  "5.0": 11,
  4.2: 9,
  4.1: 8,
  "4.0": 7,
};

const usbVersionScoreMap = {
  4: 5,
  3.2: 4,
  3.1: 3.5,
  "3.0": 3,
  "2.0": 2,
};

/* ===================== USB ===================== */

function usbConnectorScore(connector) {
  if (!connector) return 0;

  const index = usbConnectors.indexOf(connector);
  if (index === -1) return 5;

  const maxIndex = usbConnectors.length - 1;
  return Number((10 * (1 - index / maxIndex)).toFixed(2));
}

function usbVersionScore(version) {
  if (!version) return 0;
  return usbVersionScoreMap[version] ?? 3;
}

function usbScore(connector, version) {
  let score = 0;
  score += usbConnectorScore(connector); // 10
  score += usbVersionScore(version); // 5
  return Math.min(score, 15);
}

/* ===================== WI-FI ===================== */

function wifiScore(version) {
  if (!version) return 0;
  return wifiVersionScoreMap[version] ?? 12;
}

/* ===================== BLUETOOTH ===================== */

function bluetoothScore(version) {
  if (!version) return 0;
  return bluetoothScoreMap[version] ?? 10;
}

/* ===================== CELLULAR ===================== */

function cellularScore(product) {
  let score = 0;

  if (product?.has5G) score += 15;
  if (product?.has4G) score += 7;
  if (product?.has3G) score += 3;

  return Math.min(score, 25);
}

/* ===================== SIM ===================== */

function simScore(sim, esim) {
  let score = 0;

  if (sim?.toLowerCase().includes("dual")) score += 6;
  else if (sim) score += 4;

  if (esim) score += 4;

  return Math.min(score, 10);
}

/* ===================== EXTRA CONNECTIVITY ===================== */

function extraConnectivityScore(product) {
  let score = 0;

  if (product?.nfc) score += 4;
  if (product?.irBlaster) score += 3;
  if (product?.gps) score += 3;

  return Math.min(score, 10);
}

/* ===================== SENSORS ===================== */

function sensorScore(sensors) {
  if (!sensors || !Array.isArray(sensors)) return 0;

  const importantSensors = [
    "Fingerprint",
    "Gyroscope",
    "Compass",
    "Barometer",
    "Proximity",
  ];

  let count = 0;
  for (const sensor of importantSensors) {
    if (sensors.some((s) => s.toLowerCase().includes(sensor.toLowerCase()))) {
      count++;
    }
  }

  return Math.min(count, 5);
}

/* ===================== FINAL CONNECTIVITY SCORE ===================== */

export default function ConnectivityScore(product) {
  let score = 0;

  score += cellularScore(product); // 25
  score += simScore(product.sim, product.esim); // 10
  score += wifiScore(product.wifiVersion); // 20
  score += bluetoothScore(product.bluetoothVersion); // 15
  score += usbScore(product.usbType, product.usbVersion); // 15
  score += extraConnectivityScore(product); // 10
  score += sensorScore(product.sensors); // 5

  const clamped = Math.min(Math.round(score), 100);
  return Math.round(50 + (clamped / 100) * 50);
}
