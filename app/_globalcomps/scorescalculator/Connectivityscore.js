const wifiVersionScoreMap = {
  "Wi-Fi 7": 20,
  "Wi-Fi 6E": 18,
  "Wi-Fi 6": 16,
  "Wi-Fi 5": 13,
  "Wi-Fi 4": 10,
};

const bluetoothScoreMap = {
  "6.0": 18, // LE Audio v2 (future-facing)
  6: 18, // LE Audio v2 (future-facing)
  5.4: 15, // LE GATT security + improvements
  5.3: 14, // Isochronous stability
  5.2: 13, // LE Audio, LC3
  5.1: 12, // Direction finding
  5.0: 11, // Long range, 2x speed
  5: 11, // Long range, 2x speed
  4.2: 9, // LE Secure Connections
  4.1: 8,
  4.0: 7, // Bluetooth LE
  3.0: 4,
  2.1: 2,
};

const usbVersionScoreMap = {
  4: 5,
  3.2: 4,
  3.1: 3.5,
  "3.0": 3,
  3: 3,
  "2.0": 2,
  2: 2,
};

/* ===================== USB ===================== */

function usbConnectorScore(connector, usbConnectors) {
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

function usbScore(connector, version, usbConnectors) {
  let score = 0;
  score += usbConnectorScore(connector, usbConnectors); // 10
  score += usbVersionScore(version); // 5
  return Math.min(score, 15);
}

/* ===================== WI-FI ===================== */

function wifiScore(version) {
  if (!version) return 0;

  const v = JSON.stringify(version).toLowerCase();

  for (const [key, score] of Object.entries(wifiVersionScoreMap)) {
    if (v.includes(key.toLowerCase())) {
      return score;
    }
  }

  // Fallbacks for common aliases
  if (v.includes("be")) return 20; // Wi-Fi 7
  if (v.includes("6e")) return 18;
  if (v.includes("ax")) return 16; // Wi-Fi 6
  if (v.includes("ac")) return 13; // Wi-Fi 5
  if (v.includes("n")) return 10; // Wi-Fi 4

  return 12; // unknown but modern
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
  // if (product?.gps) score += 3;
  score += 3;

  return Math.min(score, 10);
}

/* ===================== SENSORS ===================== */

function sensorScore(sensors) {
  if (!sensors) return 0;
  sensors = sensors.toLowerCase();

  const importantSensors = ["Gyro", "Compass", "Barometer", "Proximity"];

  let count = 0;
  for (const sensor of importantSensors) {
    if (sensors.includes(sensor.toLowerCase())) {
      count++;
    }
  }

  return Math.min(count, 5);
}

/* ===================== FINAL CONNECTIVITY SCORE ===================== */

export default function ConnectivityScore(product, autofillvalues) {
  const { usbConnectors } = autofillvalues;
  let score = 0;

  score += cellularScore(product); // 25
  score += simScore(product.sim, product.esim); // 10
  score += wifiScore(product.wifiVersion); // 20
  score += bluetoothScore(product.bluetoothVersion); // 15
  score += usbScore(product.usbType, product.usbVersion, usbConnectors); // 15
  score += extraConnectivityScore(product); // 10
  score += sensorScore(product.sensors); // 5

  const clamped = Math.min(Math.round(score), 100);
  return Math.round(50 + (clamped / 100) * 50);
}
