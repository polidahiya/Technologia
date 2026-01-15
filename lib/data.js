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
export const platforms = {
  /* ---------- Marketplaces ---------- */
  amazon: {
    name: "Amazon",
    logo: "/stores/amazon.avif",
  },
  flipkart: {
    name: "Flipkart",
    logo: "/stores/flipkart.avif",
  },
  croma: {
    name: "Croma",
    logo: "/stores/croma.avif",
  },
  "reliance-digital": {
    name: "Reliance Digital",
    logo: "/stores/reliance.avif",
  },
  "vijay-sales": {
    name: "Vijay Sales",
    logo: "/stores/vijay.avif",
  },
  poorvika: {
    name: "Poorvika",
    logo: "/stores/poorvika.avif",
  },
  sangeetha: {
    name: "Sangeetha",
    logo: "/stores/sangeetha.avif",
  },
  "lot-mobiles": {
    name: "Lot Mobiles",
    logo: "/stores/lot.avif",
  },

  /* ---------- Brand Official Stores ---------- */
  "apple-store": {
    name: "Apple Store",
    logo: "/stores/apple.avif",
  },
  "samsung-store": {
    name: "Samsung Store",
    logo: "/stores/samsung.avif",
  },
  "mi-store": {
    name: "Mi Store",
    logo: "/stores/mi.avif",
  },
  "oneplus-store": {
    name: "OnePlus Store",
    logo: "/stores/oneplus.avif",
  },
  "oppo-store": {
    name: "Oppo Store",
    logo: "/stores/oppo.avif",
  },
  "vivo-store": {
    name: "Vivo Store",
    logo: "/stores/vivo.avif",
  },
  "realme-store": {
    name: "realme Store",
    logo: "/stores/realme.avif",
  },
  "nothing-store": {
    name: "Nothing Store",
    logo: "/stores/nothing.avif",
  },
  "google-store": {
    name: "Google Store",
    logo: "/stores/google.avif",
  },
  "asus-store": {
    name: "ASUS Store",
    logo: "/stores/asus.avif",
  },
  "lenovo-store": {
    name: "Lenovo Store",
    logo: "/stores/lenovo.avif",
  },
  "motorola-store": {
    name: "Motorola Store",
    logo: "/stores/motorola.avif",
  },
  "nokia-store": {
    name: "Nokia Store",
    logo: "/stores/nokia.avif",
  },
  "sony-store": {
    name: "Sony Store",
    logo: "/stores/sony.avif",
  },
};

export const currency = ["INR", "USD"];
export const displayTypes = [
  "LTPO AMOLED",
  "LTPO OLED",
  "Dynamic AMOLED 2X",
  "Super AMOLED",
  "AMOLED",
  "Flexible AMOLED",
  "Rigid AMOLED",
  "P-OLED",
  "Fluid AMOLED",
  "OLED",
  "Liquid Retina Display",
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
  "Corning Gorilla Armor 2",
  "Kunlun Glass 2",
  "Apple Ceramic Shield 2",
  "Corning Gorilla Armor",
  "Corning Gorilla Glass Ceramic 2",
  "Corning Gorilla Glass Ceramic",
  "Corning Gorilla Glass Victus 2",
  "Corning Gorilla Glass Victus+",
  "Corning Gorilla Glass Victus",
  "Corning Gorilla Glass 7i",
  "Corning Gorilla Glass 6",
  "Corning Gorilla Glass 5",
  "Corning Gorilla Glass 4",
  "Corning Gorilla Glass 3",
  "Apple Ceramic Shield",
  "Asahi Dragontrail Pro",
  "Asahi Dragontrail DT Star D+",
  "Asahi Dragontrail Star2",
  "Schott Xensation Alpha",
  "Schott Xensation Cover",
  "Ultra Thin Glass (UTG)",
  "Sapphire Glass",
  "Tempered Glass",
  "EPU / Hydrogel Protector",
  "Scratch-Resistant Glass",
  "Mineral Glass",
  "Plastic Protection",
  "None",
];
export const chipsets = [
  // ===============================
  // 🥇 TIER 1: Ultra Flagship (2nm / 3nm leaders, Laptop-class)
  // ===============================
  "Apple M6 Max",
  "Apple M6 Pro",
  "Apple M6",
  "Apple M5 Max",
  "Apple M5 Pro",
  "Apple M5",
  "Apple M4 Pro",
  "Apple M4",
  "Apple M3 Max",
  "Apple M3 Pro",
  "Apple M3",

  "Snapdragon 8 Extreme",
  "Snapdragon 8 Elite 2",
  "Snapdragon 8 Elite Gen 5",
  "Snapdragon 8 Gen 5",

  "MediaTek Dimensity 9500",
  "MediaTek Dimensity 9400 Plus",
  "MediaTek Dimensity 9400",

  "Apple A19 Pro",
  "Apple A19",

  "Samsung Exynos 2600",

  // ===============================
  // 🥈 TIER 2: Flagship
  // ===============================
  "Apple M2 Ultra",
  "Apple M2 Max",
  "Apple M2 Pro",
  "Apple M2",
  "Apple M1 Ultra",
  "Apple M1 Max",
  "Apple M1 Pro",
  "Apple M1",

  "Snapdragon 8 Elite (Gen 4)",
  "Snapdragon 8 Gen 3",
  "Snapdragon 8s Gen 4",
  "Dimensity 9400e",

  "Dimensity 9300 Plus",
  "Dimensity 9300",

  "Apple A18 Pro",
  "Apple A18",

  "Samsung Exynos 2500",
  "Google Tensor G5",

  // ===============================
  // 🥉 TIER 3: Upper Mid / Turbo Performance
  // ===============================
  "Kirin 9020",
  "Dimensity 8500 Elite",
  "Dimensity 8450",
  "Dimensity 8400 Max",
  "Dimensity 8400 Ultra",
  "Dimensity 8400",

  "Snapdragon 7 Gen 4",
  "Snapdragon 7+ Gen 3",

  "Google Tensor G4",
  "Samsung Exynos 2400",
  "Samsung Exynos 2400e",
  "Exynos 2300",

  "Kirin 9010",
  "Kirin 9010s",

  // ===============================
  // 🔸 TIER 4: Mid-Range
  // ===============================
  "Samsung Exynos 1580",
  "Exynos 1480",

  "Dimensity 8350 Ultimate",
  "Dimensity 8300",
  "Dimensity 8200",
  "Snapdragon 7 Gen 1",
  "Dimensity 7400 Ultra",
  "Dimensity 7350",
  "Dimensity 7350 Pro",
  "Dimensity 7300 Max",
  "Dimensity 7300 Plus",
  "Dimensity 7300 Ultra",
  "Dimensity 7300",
  "Dimensity 7300 Energy",
  "Dimensity 7200 Ultra",
  "Dimensity 7200",

  "Snapdragon 7s Gen 3",
  "Snapdragon 7 Gen 3",

  "Snapdragon 6 Gen 4",

  // ===============================
  // 🔻 TIER 5: Budget 5G / Strong 4G
  // ===============================
  "Unisoc T820",
  "Snapdragon 6 Gen 3",

  "Dimensity 7400",
  "Dimensity 7050",

  "Snapdragon 4 Gen 4",
  "Snapdragon 4 Gen 2",
  "Snapdragon 4s Gen 2",

  "MediaTek Dimensity 6400 Max",
  "Dimensity 6400",
  "Dimensity 6300",
  "Dimensity 6100+",

  "Unisoc T760",

  "Helio G100",
  "Helio G99 Ultimate",
  "Helio G99",

  "Exynos 1380",
  "Exynos 1330",
  "Exynos 1280",

  // ===============================
  // 🧓 TIER 6: Entry Level
  // ===============================
  "Snapdragon 680",
  "Unisoc T616",
  "Unisoc T606",

  "Helio G96",
  "Helio G88",
  "Helio G85",
  "Helio G80",
  "Helio G70",
  "Helio G36",

  "Snapdragon 460",
  "Snapdragon 6s 4G Gen 2",
];

export const mobileGPUs = [
  // ===============================
  // 🏆 Absolute Top (Tablet / Laptop Class)
  // ===============================
  "Apple M5 GPU", // 2026 flagship iPad/Mac
  "Apple M4 GPU",
  "Apple M3 GPU",
  "Apple M2 GPU",
  "Apple M1 GPU",

  // ===============================
  // 🥇 Top Smartphone GPUs (Flagship)
  // ===============================
  "Apple A19 Pro GPU", // iPhone 17 Pro
  "Adreno 840", // Snapdragon 8 Elite Gen 5
  "Xclipse 960", // Exynos 2600
  "Immortalis-G935", // Dimensity 9500
  "Apple A18 Pro GPU",
  "Adreno 830", // Snapdragon 8 Elite (Gen 4)
  "Xclipse 950", // Exynos 2500
  "Immortalis-G925", // Dimensity 9400
  "Apple A18 GPU",
  "Adreno 750", // Snapdragon 8 Gen 3
  "Immortalis-G720 MC12", // Dimensity 9300
  "Apple A17 Pro GPU",

  // ===============================
  // 🥈 Upper Flagship
  // ===============================
  "Adreno 740", // Snapdragon 8 Gen 2
  "Immortalis-G715 MC11", // Dimensity 9200
  "Xclipse 940", // Exynos 2400
  "Mali-G725 MP6", // Dimensity 8400 series
  "Apple A16 Bionic GPU",
  "Kirin 9020 Maleoon 910",
  "Kirin Maleoon 920",

  // ===============================
  // 🥉 Older Flagship / Upper Mid
  // ===============================
  "Apple A15 Bionic GPU",
  "Adreno 735", // Snapdragon 8s Gen 3
  "Adreno 730", // Snapdragon 8 Gen 1
  "Immortalis-G610 MC6", // Dimensity 9000
  "Mali-G720 MP7", // Dimensity 8300
  "Mali-G720 MC7",
  "Mali-G715 MP7",
  "Xclipse 920", // Exynos 2200
  "Apple A14 Bionic GPU",

  // ===============================
  // 🔸 Mid-Range
  // ===============================
  "Apple A13 Bionic GPU",
  "Adreno 725", // Snapdragon 7+ Gen 3
  "Adreno 722",
  "Adreno 720", // Snapdragon 7 Gen 3
  "Mali-G615 MC6", // Dimensity 7350
  "Mali-G615 MC2", // Dimensity 7300
  "Mali-G610 MC4",
  "Xclipse 540", // Exynos 1580
  "Adreno 710", // Snapdragon 7s Gen 2 / 6 Gen 3
  "Adreno 644",
  "Apple A12 Bionic GPU",

  // ===============================
  // 🔻 Lower Mid / Budget
  // ===============================
  "Apple A11 Bionic GPU",
  "Mali-G68 MP5", // Exynos 1380
  "Adreno 642L", // Snapdragon 778G
  "Mali-G57 MC3",
  "Mali-G57 MC2", // Dimensity 6100+
  "Mali-G57 MP2",
  "Adreno 619",
  "Adreno 618",
  "Mali-G52 MC2", // Helio G80/G85/G88/G99
  "Adreno 612",
  "PowerVR DXT-48-1536",

  // ===============================
  // 🧓 Entry / Legacy
  // ===============================
  "Mali-G52 MC1", // Helio G36
  "PowerVR GE8320",
  "PowerVR GE8300",
  "Adreno 506",
  "Adreno 505",
  "Mali-T860",
  "Mali-T720",
  "PowerVR Rogue Series",
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
  "NVMe",
  "UFS 5.0",
  "UFS 4.1",
  "UFS 4.0",
  "UFS 3.1",
  "UFS 3.0",
  "UFS 2.2",
  "UFS 2.1",
  "eMMC 5.1",
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
  "HarmonyOS",
];
export const Fingerprints = [
  "none",
  "Side",
  "Rear",
  "Front",
  "Under-display Optical",
  "Under-display Ultrasonic",
];

export const usbConnectors = [
  "USB Type-C",
  "USB Type-B",
  "USB Mini-B",
  "USB Micro-B",
  "Lightning",
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
      blackshark: {
        name: "Black Shark",
        operation: (p) => p?.brand == "Black Shark",
      },
      nokia: { name: "Nokia", operation: (p) => p?.brand == "Nokia" },
      sony: { name: "Sony", operation: (p) => p?.brand == "Sony" },
      lenovo: { name: "Lenovo", operation: (p) => p?.brand == "Lenovo" },
      asus: { name: "Asus", operation: (p) => p?.brand == "Asus" },
      micromax: { name: "Micromax", operation: (p) => p?.brand == "Micromax" },
      nothing: { name: "Nothing", operation: (p) => p?.brand == "Nothing" },
    },
  },
  ReleaseDate: {
    name: <>Release Date</>,
    multipleMode: true,
    options: {
      upcomming: {
        name: "Upcomming",
        operation: (p) => {
          if (!p?.releaseDate) return false;
          const now = new Date();
          return new Date(p.releaseDate) > now;
        },
      },

      thismonth: {
        name: "This Month",
        operation: (p) => {
          if (!p?.releaseDate) return false;
          const now = new Date();
          const d = new Date(p.releaseDate);
          return (
            d.getFullYear() === now.getFullYear() &&
            d.getMonth() === now.getMonth()
          );
        },
      },

      thisyear: {
        name: "This Year",
        operation: (p) => {
          if (!p?.releaseDate) return false;
          const now = new Date();
          return new Date(p.releaseDate).getFullYear() === now.getFullYear();
        },
      },

      RY2025: {
        name: "2025",
        operation: (p) => {
          if (!p?.releaseDate) return false;
          return new Date(p.releaseDate).getFullYear() === 2025;
        },
      },

      RY2024: {
        name: "2024",
        operation: (p) => {
          if (!p?.releaseDate) return false;
          return new Date(p.releaseDate).getFullYear() === 2024;
        },
      },

      RY2023: {
        name: "2023",
        operation: (p) => {
          if (!p?.releaseDate) return false;
          return new Date(p.releaseDate).getFullYear() === 2023;
        },
      },

      RY2022: {
        name: "2022",
        operation: (p) => {
          if (!p?.releaseDate) return false;
          return new Date(p.releaseDate).getFullYear() === 2022;
        },
      },
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

export const sortdata = {
  default: {
    name: "Default",
  },
  pricelh: {
    name: "Price: Low to High",
  },
  pricehl: {
    name: "Price: High to Low",
  },
};
