import { FiCpu, FiCamera, FiHardDrive } from "react-icons/fi";
import { PiAndroidLogo } from "react-icons/pi";
import { BsMemory } from "react-icons/bs";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import { FaCameraRetro } from "react-icons/fa";
import { PiBatteryVerticalMediumFill } from "react-icons/pi";
import { SlGameController } from "react-icons/sl";
import { LuWifi, LuPencilRuler } from "react-icons/lu";
import { MdOutlineSecurity } from "react-icons/md";
import { AiOutlineYoutube } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { BiRefresh } from "react-icons/bi";
import { IoFingerPrint } from "react-icons/io5";
import { FaApple } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";

export const logintime = [60 * 60 * 24 * 30, "30d"]; // 30 days

export const CACHE_TIME = 60 * 60 * 24 * 7; //7days

export const social = {
  contactmail: "polidahiya830@gmail.com",
};

// google ads id
export const Googleadsid = "ca-pub-7398670337880164";

export const icons = {
  battery: <PiBatteryVerticalMediumFill className="w-5" />,
  processor: <FiCpu className="w-5" />,
  ram: <BsMemory className="w-5" />,
  storage: <FiHardDrive className="w-5" />,
  screen: <HiOutlineDeviceMobile className="w-5" />,
  rearcamera: <FiCamera className="w-5" />,
  selficamera: <FaCameraRetro className="w-5" />,
  software: <PiAndroidLogo className="w-5" />,
  connectivity: <LuWifi className="w-5" />,
  design: <LuPencilRuler className="w-5" />,
  security: <MdOutlineSecurity className="w-5" />,
  gaming: <SlGameController className="w-5" />,
  video: <AiOutlineYoutube className="w-5" />,
  fingerprint: <IoFingerPrint className="w-5" />,
  Replace: <BiRefresh className="" />,
  Cross: <RxCross2 className="" />,
  apple: <FaApple className="" />,
  dollar: <BiDollar className="" />,
};

export const navitems = [
  { label: "Display", icon: icons.screen },
  { label: "Performance", icon: icons.processor },
  { label: "Camera", icon: icons.rearcamera },
  { label: "Battery & Charging", icon: icons.battery },
  { label: "Software", icon: icons.software },
  { label: "Connectivity", icon: icons.connectivity },
  { label: "Design & Build", icon: icons.design },
  { label: "Security & Multimedia", icon: icons.security },
  { label: "Gaming", icon: icons.gaming },
  { label: "Video Reviews", icon: icons.video },
];

export const deviceType = ["Smartphone", "Tablet"];
export const platforms = ["amazon", "flipkart"];
export const currency = ["INR", "USD"];
export const displayTypes = [
  "LTPO AMOLED",
  "Dynamic AMOLED 2X",
  "Super AMOLED",
  "AMOLED",
  "OLED",
  "Flexible AMOLED",
  "Rigid AMOLED",
  "P-OLED",
  "Fluid AMOLED",
  "IPS LCD",
  "LTPS LCD",
  "PLS LCD",
  "Super LCD",
  "TFT LCD",
];
export const cameraCutouts = [
  "none",
  "Under-Display Camera",
  "Pop-Up Camera",
  "Flip Camera",
  "Punch-Hole Center",
  "Punch-Hole Left",
  "Punch-Hole Right",
  "Dual Punch-Hole",
  "Waterdrop Notch",
  "U-Notch",
  "V-Notch",
  "Wide Notch",
  "Pill Cutout",
  "Dual Notch",
];
export const screenProtections = [
  "Corning Gorilla Armor",
  "Corning Gorilla Glass Ceramic",
  "Corning Gorilla Glass Victus 2",
  "Corning Gorilla Glass Victus",
  "Corning Gorilla Glass 6",
  "Corning Gorilla Glass 5",
  "Corning Gorilla Glass 4",
  "Corning Gorilla Glass 3",
  "Apple Ceramic Shield",
  "Asahi Dragontrail Pro",
  "Asahi Dragontrail Star2",
  "Schott Xensation Alpha",
  "Schott Xensation Cover",
  "Ultra Thin Glass (UTG)",
  "Sapphire Glass",
  "Tempered Glass",
  "Scratch-Resistant Glass",
  "Mineral Glass",
  "Plastic Protection",
  "None",
];
export const chipsets = [
  "Apple M5 Max",
  "Apple M5 Pro",
  "Apple M5",
  "Apple M4 Pro",
  "Apple M4",
  "Apple M3 Max",
  "Apple M3 Pro",
  "Apple M3",
  "Apple M2 Ultra",
  "Apple M2 Max",
  "Apple M2 Pro",
  "Apple M2",
  "Apple M1 Ultra",
  "Apple M1 Max",
  "Apple M1 Pro",
  "Apple M1",
  "Snapdragon 8 Elite Gen 5",
  "MediaTek Dimensity 9500",
  "Snapdragon 8 Gen 5",
  "Snapdragon 8 Elite (Gen 4)",
  "MediaTek Dimensity 9400 Plus",
  "MediaTek Dimensity 9400",
  "Apple A19 Pro",
  "Apple A19",
  "Samsung Exynos 2600",
  "Samsung Exynos 2500",
  "Snapdragon 8s Gen 4",

  "Dimensity 9300 Plus",
  "Dimensity 9300",
  "Snapdragon 8 Gen 3",

  "Apple A18 Pro",
  "Apple A18",

  "Samsung Exynos 2400",
  "Samsung Exynos 2400e",

  "Dimensity 8450",
  "Dimensity 8400 Ultra",
  "Dimensity 8400",
  "Snapdragon 7+ Gen 3",

  "Exynos 2300",

  "Dimensity 8300",
  "Snapdragon 7s Gen 3",

  "Dimensity 8200",
  "Snapdragon 7 Gen 3",
  "Exynos 2200",

  "Snapdragon 6 Gen 4",
  "Dimensity 7350",
  "Dimensity 7300 Ultra",
  "Dimensity 7300",
  "Dimensity 7200 Ultra",
  "Dimensity 7200",

  "Exynos 1380",
  "Exynos 1330",

  "Snapdragon 695",
  "Dimensity 7050",
  "Exynos 1280",

  "Dimensity 6100+",
  "Helio G99",
  "Snapdragon 680",
  "Dimensity 6400",

  "Snapdragon 4 Gen 4",
  "Snapdragon 4 Gen 2",
  "Snapdragon 6s 4G Gen 2",

  "Helio G96",
  "Helio G88",
  "Snapdragon 460",
  "Helio G85",
  "Helio G80",
  "Helio G70",
];
export const ramTypes = [
  "LPDDR6",
  "LPDDR5X",
  "LPDDR5",
  "LPDDR4X",
  "LPDDR4",
  "LPDDR3",
  "LPDDR3L",
  "LPDDR2",
];
export const storage = [
  "4 Tb",
  "2 Tb",
  "1 Tb",
  "512 Gb",
  "256 Gb",
  "128 Gb",
  "64 Gb",
  "32 Gb",
  "16 Gb",
  "8 Gb",
  "4 Gb",
  "2 Gb",
  "1 Gb",
];
export const storageType = [
  "UFS 5.0",
  "UFS 4.0",
  "UFS 3.1",
  "UFS 3.0",
  "UFS 2.2",
  "UFS 2.1",
];
export const batteryType = [
  "Silicon-Carbon Battery",
  "Graphene Battery",
  "Lithium-Polymer (Li-Po)",
  "Lithium-Ion (Li-Ion)",
  "Nickel-Metal Hydride (NiMH)",
  "Nickel-Cadmium (NiCd)",
];

export const osTypes = [
  "Android",
  "iOS",
  "Windows",
  "Linux",
  "ChromeOS",
  "MacOS",
];
export const Fingerprints = [
  "none",
  "Side",
  "Rear",
  "Front",
  "Under-display Optical",
  "Under-display Ultrasonic",
];
export const smartphoneAwards = [
  "Phone of the Year",
  "Best Flagship Phone",
  "Best Mid-Range Phone",
  "Best Budget Phone",
  "Best Value for Money",

  "Best Camera Phone",
  "Best Video Recording",
  "Best Display",
  "Best Design & Build",

  "Fastest Smartphone",
  "Best Gaming Phone",

  "Best Battery Life",
  "Best Fast Charging",

  "Best Software Experience",
  "Best Long-Term Updates",

  "Most Durable Phone",

  "Best Innovation",
  "People’s Choice",

  "All-Rounder",
];

export const filters = {
  Price: {
    name: <>{icons?.dollar} Price</>,
    multipleMode: false,
    options: {
      "0-10000": {
        name: "Below ₹10,000",
      },
      "10000-15000": {
        name: "₹10,000 – ₹15,000",
      },
      "15000-20000": {
        name: "₹15,000 – ₹20,000",
      },
      "20000-30000": {
        name: "₹20,000 – ₹30,000",
      },
      "30000-40000": {
        name: "₹30,000 – ₹40,000",
      },
      "40000-60000": {
        name: "₹40,000 – ₹60,000",
      },
      "60000-500000": {
        name: "Above ₹60,000",
      },
    },
  },
  Device: {
    name: <>{icons?.processor} Device</>,
    multipleMode: true,
    options: {
      smartphone: {
        name: "Smartphone",
        operation: (p) => p?.deviceType == "Smartphone",
      },
      tablet: {
        name: "Tablet",
        operation: (p) => p?.deviceType == "Tablet",
      },
    },
  },
  Performance: {
    name: <>{icons?.processor} Performance</>,
    multipleMode: true,
    options: {
      flagship: {
        name: "Flagship Performance",
        operation: (p) => p?.maxCpuClockSpeed >= 4,
      },
      upperMidrange: {
        name: "Upper Mid-Range",
        operation: (p) => p?.maxCpuClockSpeed >= 3 && p?.maxCpuClockSpeed < 4,
      },
      midrange: {
        name: "Mid-Range",
        operation: (p) => p?.maxCpuClockSpeed >= 2.5 && p?.maxCpuClockSpeed < 3,
      },
      entryLevel: {
        name: "Entry Level",
        operation: (p) => p?.maxCpuClockSpeed < 2.5,
      },
    },
  },

  Brand: {
    name: <>{icons?.apple} Brand</>,
    multipleMode: true,
    options: {
      apple: { name: "Apple", operation: (p) => p?.brand == "Apple" },
      samsung: { name: "Samsung", operation: (p) => p?.brand == "Samsung" },
      google: { name: "Google", operation: (p) => p?.brand == "Google" },
      realme: { name: "Realme", operation: (p) => p?.brand == "Realme" },
      huawei: { name: "Huawei", operation: (p) => p?.brand == "Huawei" },
      xiaomi: { name: "Xiaomi", operation: (p) => p?.brand == "Xiaomi" },
      oppo: { name: "Oppo", operation: (p) => p?.brand == "Oppo" },
      vivo: { name: "Vivo", operation: (p) => p?.brand == "Vivo" },
      oneplus: { name: "OnePlus", operation: (p) => p?.brand == "OnePlus" },
      iqoo: { name: "iQOO", operation: (p) => p?.brand == "iQOO" },
      poco: { name: "POCO", operation: (p) => p?.brand == "POCO" },
      motorola: { name: "Motorola", operation: (p) => p?.brand == "Motorola" },
      nokia: { name: "Nokia", operation: (p) => p?.brand == "Nokia" },
      sony: { name: "Sony", operation: (p) => p?.brand == "Sony" },
      lenovo: { name: "Lenovo", operation: (p) => p?.brand == "Lenovo" },
      asus: { name: "Asus", operation: (p) => p?.brand == "Asus" },
      micromax: { name: "Micromax", operation: (p) => p?.brand == "Micromax" },
      nothing: { name: "Nothing", operation: (p) => p?.brand == "Nothing" },
    },
  },

  Gaming: {
    name: <>{icons?.gaming} Gaming</>,
    multipleMode: true,
    options: {
      bestGaming: {
        name: "Best Gaming Phones",
        operation: (p) =>
          p?.display[0]?.refreshRate >= 120 && p?.maxCpuClockSpeed >= 3,
      },
      highFps: {
        name: "High FPS Gaming",
        operation: (p) =>
          p?.display[0]?.refreshRate >= 90 && p?.maxCpuClockSpeed >= 3,
      },
      cooling: { name: "Dedicated Cooling", operation: (p) => {} },
      triggers: { name: "Gaming Triggers", operation: (p) => {} },
    },
  },

  Features: {
    name: <>{icons?.fingerprint} Features</>,
    multipleMode: true,
    options: {
      inDisplayFingerprint: {
        name: "In-Display Fingerprint",
        operation: (p) =>
          ["Under-display Optical", "Under-display Ultrasonic"].includes(
            p?.fingerprint
          ),
      },
      stereoSpeakers: {
        name: "Stereo Speakers",
        operation: (p) => p?.stereoSpeakers,
      },
      headphoneJack: {
        name: "Headphone Jack",
        operation: (p) => p?.headphoneJack,
      },
      ipRated: {
        name: "IP Rated (Water Resistant)",
        operation: (p) => p?.waterResistance,
      },
    },
  },

  Connectivity: {
    name: <>{icons?.connectivity} Connectivity</>,
    multipleMode: true,
    options: {
      fiveG: { name: "5G Phones", operation: (p) => p?.has5G },
      wifi6: { name: "Wi-Fi 6 / 6E", operation: (p) => p?.wifiVersion >= 6 },
      bluetooth53: {
        name: "Bluetooth 5.3+",
        operation: (p) => p?.bluetoothVersion >= 5.3,
      },
      nfc: { name: "NFC Support", operation: (p) => p?.nfc },
      esim: { name: "eSIM Support", operation: (p) => p?.esim },
    },
  },

  Memory: {
    name: <>{icons?.ram} Memory</>,
    multipleMode: true,
    options: {
      ram8Plus: { name: "8GB RAM & Above", operation: (p) => p?.ram >= 8 },
      ram12Plus: { name: "12GB RAM & Above", operation: (p) => p?.ram >= 12 },
      storage256Plus: {
        name: "256GB Storage & Above",
        operation: (p) => {
          storage.indexOf(p?.storage) <= storage.indexOf("256 Gb");
        },
      },
      expandableStorage: {
        name: "Expandable Storage",
        operation: (p) => p?.expandableStorage,
      },
    },
  },

  Display: {
    name: <>{icons?.screen} Display</>,
    multipleMode: true,
    options: {
      amoled: {
        name: "AMOLED Display",
        operation: (p) => p?.display[0]?.type.includes("AMOLED"),
      },
      hz120: {
        name: "120Hz Refresh Rate",
        operation: (p) => p?.display[0]?.refreshRate >= 120,
      },
      hz144: {
        name: "144Hz Refresh Rate",
        operation: (p) => p?.display[0]?.refreshRate >= 144,
      },
      hdr: { name: "HDR Display", operation: (p) => p?.display[0]?.hdr },
      curved: {
        name: "Curved Display",
        operation: (p) => p?.display[0]?.curved,
      },
    },
  },

  Battery: {
    name: <>{icons?.battery} Battery</>,
    multipleMode: true,
    options: {
      mah5000Plus: {
        name: "5000mAh & Above",
        operation: (p) => p?.batteryCapacity >= 5000,
      },
      fastCharge67: {
        name: "Fast Charging (67W+)",
        operation: (p) => p?.ChargeSpeed >= 67,
      },
      wireless: {
        name: "Wireless Charging",
        operation: (p) => p?.wirelessCharging,
      },
      reverse: {
        name: "Reverse Charging",
        operation: (p) => p?.reverseCharging,
      },
    },
  },

  Camera: {
    name: <>{icons?.rearcamera} Camera</>,
    multipleMode: true,
    options: {
      bestCamera: {
        name: "Best Camera Phones",
        operation: (p) => p?.awards?.includes("Best Camera Phone"),
      },
      mp108Plus: {
        name: "108MP & Above",
        operation: (p) => p?.RearCameramegapixels >= 108,
      },
      mp48: {
        name: "48MP Camera Phones",
        operation: (p) => p?.RearCameramegapixels >= 48,
      },
      ois: { name: "With OIS", operation: (p) => p?.ois },
      video4k: {
        name: "4K Video Recording",
        operation: (p) => /\b(4k|8k)\b/i.test(p?.RearCameramegapixelsDetails),
      },
      selfie: {
        name: "Good Selfie Camera",
        operation: (p) => p?.frontCameramegapixels >= 20,
      },
    },
  },
};
