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
import { MdCompare } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { MdSportsScore } from "react-icons/md";

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
  compare: <MdCompare className="" />,
  list: <TbListDetails className="" />,
  flag: <MdSportsScore className="" />,
};

export const navitems = [
  { label: "General", icon: icons?.list },
  { label: "Display", icon: icons?.screen },
  { label: "Performance", icon: icons?.processor },
  { label: "Camera", icon: icons?.rearcamera },
  { label: "Battery & Charging", icon: icons?.battery },
  { label: "Software", icon: icons?.software },
  { label: "Connectivity", icon: icons?.connectivity },
  { label: "Design & Build", icon: icons?.design },
  { label: "Security & Multimedia", icon: icons?.security },
  { label: "Gaming", icon: icons?.gaming },
  { label: "Video Reviews", icon: icons?.video },
];

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
      tecno: { name: "Tecno", operation: (p) => p?.brand == "Tecno" },
      infinix: { name: "Infinix", operation: (p) => p?.brand == "Infinix" },
      oppo: { name: "Oppo", operation: (p) => p?.brand == "Oppo" },
      vivo: { name: "Vivo", operation: (p) => p?.brand == "Vivo" },
      oneplus: { name: "OnePlus", operation: (p) => p?.brand == "OnePlus" },
      iqoo: { name: "iQOO", operation: (p) => p?.brand == "iQOO" },
      nothing: { name: "Nothing", operation: (p) => p?.brand == "Nothing" },
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
    },
  },
  ReleaseDate: {
    name: <>Release Date & Availability</>,
    multipleMode: true,
    options: {
      available: {
        name: "Available",
        operation: (p) => {
          return p.price.some((a) => a.status == "Available");
        },
      },
      upcomming: {
        name: "Upcomming",
        operation: (p) => {
          if (!p?.releaseDate) return false;
          const now = new Date();
          return (
            new Date(p.releaseDate) > now ||
            p.price.some((a) => a.status == "Upcoming")
          );
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
        operation: (p) => /(4k|8k)/i.test(p?.RearCameravideoRecording),
      },
      selfie: {
        name: "Good Selfie Camera",
        operation: (p) => p?.frontCameramegapixels >= 20,
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
      small: {
        name: "Small Display",
        operation: (p) =>
          (p?.deviceType == "Smartphone" && p?.display[0]?.size <= 6.1) ||
          (p?.deviceType == "Tablet" && p?.display[0]?.size <= 9),
      },
      medium: {
        name: "Medium Display",
        operation: (p) =>
          (p?.deviceType == "Smartphone" &&
            p?.display[0]?.size >= 6.2 &&
            p?.display[0]?.size <= 6.6) ||
          (p?.deviceType == "Tablet" &&
            p?.display[0]?.size >= 9.1 &&
            p?.display[0]?.size <= 11),
      },
      large: {
        name: "Large Display",
        operation: (p) =>
          (p?.deviceType == "Smartphone" && p?.display[0]?.size >= 6.7) ||
          (p?.deviceType == "Tablet" && p?.display[0]?.size >= 11.1),
      },
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
            p?.fingerprint,
          ),
      },
      foldable: {
        name: "Foldables",
        operation: (p) => p?.foldable,
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
        operation: (p) => p?.waterResistance?.includes("IP69"),
      },
    },
  },

  Connectivity: {
    name: <>{icons?.connectivity} Connectivity</>,
    multipleMode: true,
    options: {
      fiveG: { name: "5G Phones", operation: (p) => p?.has5G },
      wifi6: {
        name: "Wi-Fi 6 or above",
        operation: (p) =>
          p?.wifiVersion?.toString()?.includes("Wi-Fi 6") ||
          p?.wifiVersion?.toString()?.includes("Wi-Fi 6E") ||
          p?.wifiVersion?.toString()?.includes("Wi-Fi 7"),
      },
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
      cooling: {
        name: "Dedicated Cooling",
        operation: (p) => p?.dedicatedCooling,
      },
      triggers: {
        name: "Gaming Triggers",
        operation: (p) => p?.gamingTriggers,
      },
      chargingbypass: {
        name: "Bypass Charging",
        operation: (p) => p?.bypasscharging,
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
  totalscore: {
    name: "Spec Score: Total",
  },
  displayscore: {
    name: "Spec Score: Display",
  },
  performancescore: {
    name: "Spec Score: Performance",
  },
  camerascore: {
    name: "Spec Score: Camera",
  },
  batteryscore: {
    name: "Spec Score: Battery",
  },
  connectionscore: {
    name: "Spec Score: Connections",
  },
  designscore: {
    name: "Spec Score: Design",
  },
  totalantutu: {
    name: "AnTuTu: Total",
  },
};
