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
  Replace: <BiRefresh className="" />,
  Cross: <RxCross2 className="" />,
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


export const logintime = [60 * 60 * 24 * 30, "30d"]; // 30 days

export const CACHE_TIME = 60 * 60 * 24 * 7; //7days

// google ads id
export const Googleadsid = "ca-pub-7398670337880164";
