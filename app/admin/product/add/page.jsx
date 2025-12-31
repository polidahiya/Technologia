import React from "react";
import Clientpage from "./Clientpage";
import { CachedProduct } from "@/app/_globalcomps/cachedata/cachedProducts";

async function page({ searchParams }) {
  const { edit, copy } = await searchParams;
  let productdata = {
    brand: "POCO",
    model: "X3 NFC",
    deviceType: "Smartphone",
    releaseDate: new Date("2020-09-07"),

    price: [
      {
        platform: "amazon",
        variant: "6GB + 64GB",
        mrp: 17999,
        sp: 14999,
        currency: "INR",
        link: "",
        status: "Unavailable",
      },
      {
        platform: "flipkart",
        variant: "6GB + 128GB",
        mrp: 19999,
        sp: 16999,
        currency: "INR",
        link: "",
        status: "Unavailable",
      },
    ],

    images: [],

    display: [
      {
        size: 6.67,
        type: "IPS LCD",
        cameraCutout: "Punch-Hole Center",
        pixelx: 1080,
        pixely: 2400,
        ppi: 395,
        refreshRate: 120,
        hdr: true,
        roundCorners: true,
        screenToBodyRatio: 84.6,
        screenProtection: "Corning Gorilla Glass 5",
        curved: false,
        Brightness: 450,
        dustResistance: true,
        antiReflection: false,
        nanoTexture: false,
      },
    ],

    chipset: "Snapdragon 732G",
    cpuClockSpeed: "2.3",
    maxCpuClockSpeed: 2.3,
    cpuCores: 8,
    ram: 6,
    ramType: "LPDDR4X",
    storage: "64 Gb",
    storageType: "UFS 2.1",
    expandableStorage: true,
    antutuscore: 395000,

    RearCameramegapixels: 64,
    RearCameramegapixelsDetails:
      "64 MP (wide) + 13 MP (ultrawide) + 2 MP (macro) + 2 MP (depth)",
    frontCameramegapixels: 20,
    frontCameramegapixelsDetails: "20 MP (wide)",
    RearCameravideoRecording: "4K@30fps, 1080p@120fps, 720p@960fps",
    frontCameravideoRecording: "1080p@30fps",
    ois: false,
    CameraimageSamples: [],

    batteryType: "Lithium‑Ion (Li‑Ion)",
    batteryCapacity: 5160,
    ChargeSpeed: 33,
    wirelessCharging: false,
    wirelessChargingSpeed: 0,
    reverseCharging: false,
    reverseChargingSpeed: 0,

    os: "Android",
    osVersion: 10,
    updateYears: 2,

    has5G: false,
    has4G: true,
    has3G: true,
    sim: "Dual SIM (Nano‑SIM, dual stand‑by)",
    wifiVersion: "5",
    bluetoothVersion: 5.1,
    nfc: true,
    usbVersion: "2.0",
    esim: false,
    irBlaster: true,
    sensors:
      "Accelerometer, Gyroscope, Proximity, Ambient Light, Compass, Fingerprint",

    height: 165.3,
    width: 76.8,
    weight: 215,
    thickness: 9.4,
    waterResistance: "IP53",
    foldable: false,
    colors: "Cobalt Blue, Shadow Grey",

    fingerprint: "Side",
    faceUnlock: true,

    speakers: 2,
    stereoSpeakers: true,
    headphoneJack: true,

    dedicatedCooling: false,
    gamingTriggers: false,
    AiFpsGeneration: false,
    gaming: [
      {
        name: "PUBG Mobile",
        maxSettings: "High",
        fpsDrop: "Moderate",
        tempratureRaise: "Moderate",
        batterydrain: "Medium",
      },
    ],

    inBox: "Phone, 33W Charger, USB‑C Cable, SIM Tool",
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
