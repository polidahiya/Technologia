import React from "react";
import Clientpage from "./Clientpage";
import { CachedProduct } from "@/app/_globalcomps/cachedata/cachedProducts";

async function page({ searchParams }) {
  const { edit, copy } = await searchParams;

  let productdata = {
    brand: "Nothing",
    model: "Nothing Phone (3a) Community Edition",
    deviceType: "Smartphone",
    releaseDate: new Date("2025-12-09"),

    price: [
      {
        platform: "amazon",
        variant: "12GB + 256GB",
        mrp: 28999,
        sp: 28999,
        currency: "INR",
        link: "",
        status: "Available",
      },
    ],

    images: [],

    display: [
      {
        size: 6.77,
        type: "Flexible AMOLED",
        cameraCutout: "Punch-Hole Center",
        pixelx: 1080,
        pixely: 2392,
        ppi: 388,
        refreshRate: 120,
        hdr: true,
        roundCorners: true,
        screenToBodyRatio: 88.0,
        screenProtection: "Panda Glass",
        curved: false,
        Brightness: 3000,
        dustResistance: false,
        antiReflection: false,
        nanoTexture: false,
      },
    ],

    chipset: "Snapdragon 7s Gen 3",
    cpuClockSpeed: "2.5",
    maxCpuClockSpeed: 2.5,
    cpuCores: 8,
    ram: 12,
    ramType: "LPDDR4X",
    storage: "256 Gb",
    storageType: "UFS 2.2",
    expandableStorage: false,
    antutuscore: 550000,

    RearCameramegapixels: 50,
    RearCameramegapixelsDetails:
      "50 MP (wide, OIS) + 50 MP (telephoto 2×) + 8 MP (ultrawide)",
    frontCameramegapixels: 32,
    frontCameramegapixelsDetails: "32 MP (wide)",
    RearCameravideoRecording: "4K@30fps",
    frontCameravideoRecording: "1080p@30fps",
    ois: true,
    CameraimageSamples: [],

    batteryType: "Lithium-Polymer (Li-Po)",
    batteryCapacity: 5000,
    ChargeSpeed: 50,
    wirelessCharging: false,
    wirelessChargingSpeed: 0,
    reverseCharging: false,
    reverseChargingSpeed: 0,

    os: "Android",
    osVersion: 15,
    updateYears: 3,

    has5G: true,
    has4G: true,
    has3G: true,
    sim: "Dual SIM (Nano + Nano)",
    wifiVersion: 6,
    bluetoothVersion: 5.4,
    nfc: true,
    usbVersion: 3.1,
    esim: false,
    irBlaster: false,
    sensors: "Accelerometer, Gyro, Proximity, Compass, In‑Display Fingerprint",

    height: 163.52,
    width: 77.5,
    weight: 201,
    thickness: 8.35,
    waterResistance: "IP64 Splash Resistant",
    foldable: false,
    colors: "Frosted Teal",

    fingerprint: "Under-display Optical",
    faceUnlock: true,

    speakers: 2,
    stereoSpeakers: true,
    headphoneJack: false,

    dedicatedCooling: false,
    gamingTriggers: false,
    AiFpsGeneration: false,
    gaming: [
      {
        name: "PUBG Mobile",
        maxSettings: "HDR",
        fpsDrop: "Moderate",
        tempratureRaise: "Warm",
        batterydrain: "Medium",
      },
    ],

    inBox: "Phone (3a) Community Edition, USB‑C Cable, Charger, SIM Tool",
    awards: [],
    youtubeComparison: "",
    youtubeGamingReview: "",
    youtubeCameraReview: "",
  };

  if (edit || copy) {
    const product = await CachedProduct(edit || copy);
    if (edit) {
      productdata = product;
    }
    if (copy) {
      const data = product;
      delete data._id;
      productdata = data;
    }
  }

  return (
    <div>
      <Clientpage productdata={productdata} />
    </div>
  );
}

export default page;
