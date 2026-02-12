function getIndexedScore(value, list, maxPoints) {
  const index = list.indexOf(value);
  if (index === -1) return maxPoints * 0.5;

  const maxIndex = list.length - 1;
  return Number((maxPoints * (1 - index / maxIndex)).toFixed(2));
}

function batteryTypeScore(type, batteryType) {
  return getIndexedScore(type, batteryType, 15);
}

function reverseChargingScore(enabled, watts) {
  if (!enabled) return 0;

  if (!watts) return 5;
  if (watts >= 15) return 10;
  if (watts >= 10) return 7;
  if (watts >= 5) return 5;

  return 3;
}

function wirelessChargingScore(enabled, watts) {
  if (!enabled || !watts) return 0;

  const ref = 50;
  const score = (Math.log(watts) / Math.log(ref)) * 15;

  return Math.min(Number(score.toFixed(2)), 15);
}

function fastChargingScore(watts) {
  if (!watts || watts <= 0) return 0;

  const ref = 120; // saturation point
  const score = (Math.log(watts) / Math.log(ref)) * 25;

  return Math.min(Number(score.toFixed(2)), 25);
}

function batteryCapacityScore(capacity, deviceType) {
  if (!capacity) return 0;

  const PROFILES = {
    Smartphone: { ideal: 5000, max: 35 },
    Tablet: { ideal: 9000, max: 35 },
  };

  const profile = PROFILES[deviceType] || PROFILES.Smartphone;

  const normalized = Math.min(capacity / profile.ideal, 1);
  return Number((normalized * profile.max).toFixed(2));
}

export default function BatteryScore(product, autofillvalues) {
  const { batteryType } = autofillvalues;
  
  let score = 0;

  score += batteryTypeScore(product.batteryType, batteryType);
  score += batteryCapacityScore(product.batteryCapacity, product.deviceType);
  score += fastChargingScore(product.ChargeSpeed);
  score += wirelessChargingScore(
    product.wirelessCharging,
    product.wirelessChargingSpeed,
  );
  score += reverseChargingScore(
    product.reverseCharging,
    product.reverseChargingSpeed,
  );

  const clamped = Math.min(Math.round(score), 100);
  return Math.round(50 + (clamped / 100) * 50);
}
