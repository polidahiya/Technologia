"use client";
import React, { useState } from "react";
import Standardinputfield from "@/app/_globalcomps/inputfields/Standardinputfield";
import Dropdownmenu from "@/app/_globalcomps/inputfields/Dropdownmenu";
import Dateselector from "@/app/_globalcomps/inputfields/Dateselector";
import Togglebuttons from "@/app/_globalcomps/inputfields/Togglebuttons";
import Imageuploader from "@/app/_globalcomps/inputfields/Imageuploader";
import { Saveproduct } from "./Serveraction";
import { AppContextfn } from "@/app/Context";

function Clientpage() {
  const { setmessagefn } = AppContextfn();
  const initialData = {
    brand: "",
    model: "",
    deviceType: "",
    releaseDate: new Date(),
    price: [
      {
        platform: "",
        variant: "",
        mrp: "",
        sp: "",
        currency: "",
        link: "",
      },
    ],
    images: [],
    //
    display: [
      {
        size: "",
        type: "",
        cameraCutout: "none",
        pixelx: "",
        pixely: "",
        ppi: "",
        refreshRate: "",
        hdr: false,
        roundCorners: false,
        screenToBodyRatio: "",
        screenProtection: "",
        curved: false,
        Brightness: 0,
        dustResistance: false,
        antiReflection: false,
        nanoTexture: false,
      },
    ],
    //
    chipset: "",
    cpuClockSpeed: "",
    maxCpuClockSpeed: "",
    npu: "",
    cpuCores: "",
    cpuScore: "",
    gpuScore: "",
    ram: "",
    ramType: "",
    storage: "",
    storageType: "",
    expandableStorage: false,
    //
    RearCameramegapixels: "",
    RearCameramegapixelsDetails: "",
    frontCameramegapixels: "",
    frontCameramegapixelsDetails: "",
    RearCameravideoRecording: "",
    frontCameravideoRecording: "",
    ois: false,
    CameraimageSamples: [],
    //
    batteryType: "",
    batteryCapacity: "",
    ChargeSpeed: "",
    wirelessCharging: false,
    wirelessChargingSpeed: "",
    reverseCharging: false,
    reverseChargingSpeed: "",
    //
    os: "", // Android | iOS
    osVersion: "", // 14, 15, etc.
    updateYears: "", // promised updates
    //
    has5G: true,
    has4G: true,
    has3G: true,
    sim: "",
    wifiVersion: "", // 5, 6, 6E
    bluetoothVersion: "", // 5.2
    nfc: false,
    usbVersion: "", // 2.0, 3.1
    esim: false,
    irBlaster: false,
    sensors: "",
    //
    height: "",
    width: "",
    weight: "", // grams → 195
    thickness: "", // mm → 8.2
    waterResistance: "", // IP68 → 68
    foldable: false,
    colors: "",
    //
    fingerprint: "none",
    faceUnlock: false,
    //
    speakers: "",
    stereoSpeakers: false,
    headphoneJack: false,
    // gaming
    gaming: [
      {
        name: "",
        maxSettings: "",
        fpsDrop: "",
        TempratureRaise: "",
        batterydrain: "",
        AiFpsGeneration: "",
      },
    ],
    //
    inBox: "",
    youtubeComparison: "",
    youtubeGamingReview: "",
    youtubeCameraReview: "",
  };

  const [data, setdata] = useState(initialData);
  const [selectedgroup, setselectedgroup] = useState("General");
  const [loading, setloading] = useState(false);

  const handlechange = (key, value) => {
    setdata({
      ...data,
      [key]: value,
    });
  };

  const handleArrayChange = (property, action, payload) => {
    setdata((prev) => {
      const arr = prev[property];

      switch (action) {
        case "add":
          return {
            ...prev,
            [property]: [...arr, payload],
          };

        case "update":
          return {
            ...prev,
            [property]: arr.map((item, i) =>
              i === payload.index ? payload.value : item
            ),
          };

        case "delete":
          return {
            ...prev,
            [property]: arr.filter((_, i) => i !== payload.index),
          };

        default:
          return prev;
      }
    });
  };

  const handlenestedchange = (propertry, index, key, value) => {
    setdata((prev) => {
      const next = { ...prev };
      next[propertry][index][key] = value;
      return next;
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const res = await Saveproduct(data);
    if (res.status == 200) {
      setdata(initialData);
    }
    setmessagefn(res?.message);
    setloading(false);
  };

  return (
    <form
      onSubmit={handlesubmit}
      className="bg-gray-100 flex flex-col gap-2 p-2"
    >
      {/* General */}
      <Groupinputs
        title="General"
        selectedgroup={selectedgroup}
        setselectedgroup={setselectedgroup}
      >
        <div className="h-40 flex flex-col flex-wrap justify-start gap-2">
          {data.images.map((image, i) => {
            return (
              <div className="h-full w-40" key={i}>
                <Imageuploader
                  img={image}
                  folder="Technologia/Devices"
                  callback={(imageurl) => {
                    handleArrayChange("images", "update", {
                      index: i,
                      value: imageurl,
                    });
                  }}
                  remove={() => {
                    handleArrayChange("images", "delete", { index: i });
                  }}
                  cover={false}
                />
              </div>
            );
          })}
          <div className="h-full w-40">
            <Imageuploader
              img={""}
              folder="Technologia/Devices"
              callback={(imageurl) => {
                handleArrayChange("images", "add", imageurl);
              }}
              remove={() => {
                handleArrayChange("images", "delete", { index: i });
              }}
            />
          </div>
        </div>

        <Dropdownmenu
          title="Device Type"
          state={data.deviceType}
          onchange={(value) => {
            handlechange("deviceType", value);
          }}
          options={["Smartphone", "Tablet"]}
        />
        <Dropdownmenu
          title="Brand"
          state={data.brand}
          onchange={(value) => {
            handlechange("brand", value);
          }}
          options={[
            "Apple",
            "Samsung",
            "Google",
            "Realme",
            "Huawei",
            "Xiaomi",
            "Oppo",
            "Vivo",
            "OnePlus",
            "iQOO",
            "Motorola",
            "Nokia",
            "Sony",
            "Lenovo",
            "Asus",
            "Micromax",
            "Asus",
            "Nothing",
          ]}
        />
        <Standardinputfield
          titlename="Model"
          value={data.model}
          type="text"
          onchange={(e) => {
            handlechange("model", e.target.value);
          }}
        />
        <Dateselector
          label="Release Date"
          state={data.releaseDate}
          setstate={(isoDate) => {
            handlechange("releaseDate", isoDate);
          }}
        />
        <div className="space-y-2">
          {data.price.map((item, i) => {
            return (
              <div key={i} className="border rounded-2xl p-2 space-y-2">
                <Dropdownmenu
                  title="Platform"
                  state={item.platform}
                  onchange={(value) => {
                    handlenestedchange("price", i, "platform", value);
                  }}
                  options={["amazon", "flipkart"]}
                />
                <Standardinputfield
                  titlename="Variant"
                  value={item.variant}
                  type="text"
                  onchange={(e) => {
                    handlenestedchange("price", i, "variant", e.target.value);
                  }}
                />
                <Standardinputfield
                  titlename="Mrp"
                  value={item.mrp}
                  type="number"
                  onchange={(e) => {
                    handlenestedchange("price", i, "mrp", e.target.value);
                  }}
                />
                <Standardinputfield
                  titlename="Sp"
                  value={item.sp}
                  type="number"
                  onchange={(e) => {
                    handlenestedchange("price", i, "sp", e.target.value);
                  }}
                />
                <Dropdownmenu
                  title="Currency"
                  state={item.currency}
                  onchange={(value) => {
                    handlenestedchange("price", i, "currency", value);
                  }}
                  options={["INR", "USD"]}
                />
                <Standardinputfield
                  titlename="Link"
                  value={item.link}
                  type="text"
                  onchange={(e) => {
                    handlenestedchange("price", i, "link", e.target.value);
                  }}
                />
                {i != 0 && (
                  <button
                    className="px-5 py-2 rounded-md bg-red-600 text-white w-fit ml-auto"
                    type="button"
                    onClick={() =>
                      handleArrayChange("price", "delete", { index: i })
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="px-5 py-2 rounded-2xl text-white bg-green-600 w-fit mx-auto mt-2"
          onClick={() => {
            const newplatform = JSON.stringify(
              data.price[data.price.length - 1]
            );
            setdata({
              ...data,
              price: [...data.price, JSON.parse(newplatform)],
            });
          }}
        >
          + Add Platform
        </button>
      </Groupinputs>
      {/* screens */}
      <div className="flex flex-col gap-2">
        {data.display.map((item, i) => {
          return (
            <Groupinputs
              key={i}
              title={`Display ${i + 1}`}
              selectedgroup={selectedgroup}
              setselectedgroup={setselectedgroup}
            >
              <Standardinputfield
                titlename="Size"
                value={item.size}
                type="number"
                onchange={(e) => {
                  handlenestedchange("display", i, "size", e.target.value);
                }}
              />
              <Dropdownmenu
                title="Type"
                state={item.type}
                onchange={(value) => {
                  handlenestedchange("display", i, "type", value);
                }}
                options={[
                  // Premium / Flagship
                  "LTPO AMOLED",
                  "Dynamic AMOLED 2X",
                  "Super AMOLED",
                  "AMOLED",
                  "OLED",

                  // Upper Mid-range
                  "Flexible AMOLED",
                  "Rigid AMOLED",
                  "P-OLED",
                  "Fluid AMOLED",

                  // LCD Category
                  "IPS LCD",
                  "LTPS LCD",
                  "PLS LCD",
                  "Super LCD",

                  // Budget
                  "TFT LCD",
                ]}
              />
              <Dropdownmenu
                title="Camera Cutout"
                state={item.cameraCutout}
                onchange={(value) => {
                  handlenestedchange("display", i, "cameraCutout", value);
                }}
                options={[
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
                ]}
              />

              <Standardinputfield
                titlename="Pixel X"
                value={item.pixelx}
                type="number"
                onchange={(e) => {
                  handlenestedchange("display", i, "pixelx", e.target.value);
                }}
              />
              <Standardinputfield
                titlename="Pixel Y"
                value={item.pixely}
                type="number"
                onchange={(e) => {
                  handlenestedchange("display", i, "pixely", e.target.value);
                }}
              />
              <Standardinputfield
                titlename="Pixel per inch (ppi)"
                value={item.ppi}
                type="number"
                onchange={(e) => {
                  handlenestedchange("display", i, "ppi", e.target.value);
                }}
              />
              <Standardinputfield
                titlename="Refresh Rate"
                value={item.refreshRate}
                type="number"
                onchange={(e) => {
                  handlenestedchange(
                    "display",
                    i,
                    "refreshRate",
                    e.target.value
                  );
                }}
              />
              <Togglebuttons
                titlename="HDR"
                value={item.hdr}
                positive={() => {
                  handlenestedchange("display", i, "hdr", true);
                }}
                negative={() => {
                  handlenestedchange("display", i, "hdr", false);
                }}
                positiveText="Yes"
                negativeText="No"
              />
              <Togglebuttons
                titlename="Round Corners"
                value={item.roundCorners}
                positive={() => {
                  handlenestedchange("display", i, "roundCorners", true);
                }}
                negative={() => {
                  handlenestedchange("display", i, "roundCorners", false);
                }}
                positiveText="Yes"
                negativeText="No"
              />

              <Standardinputfield
                titlename="Screen To Body Ratio"
                value={item.screenToBodyRatio}
                type="number"
                onchange={(e) => {
                  handlenestedchange(
                    "display",
                    i,
                    "screenToBodyRatio",

                    e.target.value
                  );
                }}
              />
              <Dropdownmenu
                title="Screen Protection"
                state={item.screenProtection}
                onchange={(value) => {
                  handlenestedchange("display", i, "screenProtection", value);
                }}
                options={[
                  // Gorilla Glass (Corning)
                  "Corning Gorilla Armor",
                  "Corning Gorilla Glass Ceramic",
                  "Corning Gorilla Glass Victus 2",
                  "Corning Gorilla Glass Victus",
                  "Corning Gorilla Glass 6",
                  "Corning Gorilla Glass 5",
                  "Corning Gorilla Glass 4",
                  "Corning Gorilla Glass 3",

                  // Other branded glass
                  "Apple Ceramic Shield",
                  "Asahi Dragontrail Pro",
                  "Asahi Dragontrail Star2",
                  "Schott Xensation Alpha",
                  "Schott Xensation Cover",

                  // Foldable / Flexible glass
                  "Ultra Thin Glass (UTG)",

                  // Sapphire
                  "Sapphire Glass",

                  // Unspecified / Basic
                  "Tempered Glass",
                  "Scratch-Resistant Glass",
                  "Mineral Glass",
                  "Plastic Protection",
                  "None",
                ]}
              />
              <Togglebuttons
                titlename="Curved Display"
                value={item.curved}
                positive={() => {
                  handlenestedchange("display", i, "curved", true);
                }}
                negative={() => {
                  handlenestedchange("display", i, "curved", false);
                }}
                positiveText="Yes"
                negativeText="No"
              />
              <Standardinputfield
                titlename="Brightness"
                value={item.Brightness}
                type="number"
                onchange={(e) => {
                  handlenestedchange(
                    "display",
                    i,
                    "Brightness",

                    e.target.value
                  );
                }}
              />
              <Togglebuttons
                titlename="Dust Resistance"
                value={item.dustResistance}
                positive={() => {
                  handlenestedchange("display", i, "dustResistance", true);
                }}
                negative={() => {
                  handlenestedchange("display", i, "dustResistance", false);
                }}
                positiveText="Yes"
                negativeText="No"
              />
              <Togglebuttons
                titlename="Anti Reflection"
                value={item.antiReflection}
                positive={() => {
                  handlenestedchange("display", i, "antiReflection", true);
                }}
                negative={() => {
                  handlenestedchange("display", i, "antiReflection", false);
                }}
                positiveText="Yes"
                negativeText="No"
              />
              <Togglebuttons
                titlename="Nano Texture"
                value={item.nanoTexture}
                positive={() => {
                  handlenestedchange("display", i, "nanoTexture", true);
                }}
                negative={() => {
                  handlenestedchange("display", i, "nanoTexture", false);
                }}
                positiveText="Yes"
                negativeText="No"
              />

              {i != 0 && (
                <button
                  className="px-5 py-2 rounded-md bg-red-600 text-white w-fit ml-auto"
                  type="button"
                  onClick={() =>
                    handleArrayChange("display", "delete", { index: i })
                  }
                >
                  Remove Screen
                </button>
              )}
            </Groupinputs>
          );
        })}
        <button
          type="button"
          className="px-5 py-2 rounded-2xl text-white bg-green-600 w-fit mx-auto"
          onClick={() => {
            const newdisplay = JSON.stringify(
              data.display[data.display.length - 1]
            );
            setdata({
              ...data,
              display: [...data.display, JSON.parse(newdisplay)],
            });
          }}
        >
          + Add Display
        </button>
      </div>
      {/* Performance */}
      <Groupinputs
        title="Performance"
        selectedgroup={selectedgroup}
        setselectedgroup={setselectedgroup}
      >
        <Dropdownmenu
          title="Chipset"
          state={data.chipset}
          onchange={(value) => {
            handlechange("chipset", value);
          }}
          options={[
            // Ultra High Performance (Laptop / Pro class)
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

            // Top Mobile Flagship (2025)
            "Snapdragon 8 Elite Gen 5",
            "Apple A19 Pro",
            "MediaTek Dimensity 9500",
            "Snapdragon 8 Elite (Gen 4)",
            "Apple A19",
            "Dimensity 9400 Plus",
            "Dimensity 9400",
            "Snapdragon 8 Gen 5",
            "Apple A18 Pro",
            "Apple A18",

            // High / Upper Mid Range
            "Snapdragon 8s Gen 4",
            "Snapdragon 8 Gen 3",
            "Dimensity 9300 Plus",
            "Dimensity 9300",
            "Snapdragon 8 Gen 2",
            "Dimensity 8450",
            "Dimensity 8400 Ultra",
            "Dimensity 8400",
            "Apple A17 Pro",
            "Snapdragon 7+ Gen 3",
            "Dimensity 8300",
            "Snapdragon 7s Gen 3",
            "Dimensity 8200",

            // Mid Range
            "Snapdragon 7 Gen 3",
            "Snapdragon 6 Gen 4",
            "Dimensity 7350",
            "Dimensity 7300 Ultra",
            "Dimensity 7300",
            "Dimensity 7200 Ultra",
            "Dimensity 7200",
            "Snapdragon 695",
            "Dimensity 7050",
            "Dimensity 6100+",
            "Helio G99",
            "Snapdragon 680",
            "Dimensity 6400",

            // Budget / Entry Range
            "Snapdragon 4 Gen 4",
            "Snapdragon 4 Gen 2",
            "Snapdragon 6s 4G Gen 2",
            "Helio G96",
            "Helio G88",
            "Snapdragon 460",
            "Helio G85",
            "Helio G80",
            "Helio G70",
          ]}
        />

        <Standardinputfield
          titlename="Cpu Clock Speed"
          value={data.cpuClockSpeed}
          type="Text"
          onchange={(e) => {
            handlechange("cpuClockSpeed", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Max Cpu Clock Speed"
          value={data.maxCpuClockSpeed}
          type="number"
          onchange={(e) => {
            handlechange("maxCpuClockSpeed", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Npu"
          value={data.npu}
          type="number"
          onchange={(e) => {
            handlechange("npu", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="No of Cpu Cores"
          value={data.cpuCores}
          type="number"
          onchange={(e) => {
            handlechange("cpuCores", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Cpu Score"
          value={data.cpuScore}
          type="number"
          onchange={(e) => {
            handlechange("cpuScore", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Gpu Score"
          value={data.gpuScore}
          type="number"
          onchange={(e) => {
            handlechange("gpuScore", e.target.value);
          }}
        />
        <Dropdownmenu
          title="Ram Type"
          state={data.ramType}
          onchange={(value) => {
            handlechange("ramType", value);
          }}
          options={[
            "LPDDR5X",
            "LPDDR5",
            "LPDDR4X",
            "LPDDR4",
            "LPDDR3",
            "LPDDR3L",
            "LPDDR2",
          ]}
        />
        <Standardinputfield
          titlename="Ram"
          value={data.ram}
          type="number"
          onchange={(e) => {
            handlechange("ram", e.target.value);
          }}
        />
        <Dropdownmenu
          title="Storage"
          state={data.storage}
          onchange={(value) => {
            handlechange("storage", value);
          }}
          options={[
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
          ]}
        />
        <Dropdownmenu
          title="Storage Type"
          state={data.storageType}
          onchange={(value) => {
            handlechange("storageType", value);
          }}
          options={["UFS 4.0", "UFS 3.1", "UFS 3.0", "UFS 2.2", "UFS 2.1"]}
        />
        <Togglebuttons
          titlename="Expandable Storage"
          value={data.expandableStorage}
          positive={() => handlechange("expandableStorage", true)}
          negative={() => handlechange("expandableStorage", false)}
          positiveText="Yes"
          negativeText="No"
        />
      </Groupinputs>
      {/* camera */}
      <Groupinputs
        title="Camera"
        selectedgroup={selectedgroup}
        setselectedgroup={setselectedgroup}
      >
        <Standardinputfield
          titlename="Rear Camera megapixels"
          value={data.RearCameramegapixels}
          type="number"
          onchange={(e) => {
            handlechange("RearCameramegapixels", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Rear Camera megapixels Details"
          value={data.RearCameramegapixelsDetails}
          type="text"
          onchange={(e) => {
            handlechange("RearCameramegapixelsDetails", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Front Camera megapixels"
          value={data.frontCameramegapixels}
          type="number"
          onchange={(e) => {
            handlechange("frontCameramegapixels", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Front Camera megapixels Details"
          value={data.frontCameramegapixelsDetails}
          type="text"
          onchange={(e) => {
            handlechange("frontCameramegapixelsDetails", e.target.value);
          }}
        />

        <Standardinputfield
          titlename="Rear Camera video Recording"
          value={data.RearCameravideoRecording}
          type="text"
          onchange={(e) => {
            handlechange("RearCameravideoRecording", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Front Camera video Recording"
          value={data.frontCameravideoRecording}
          type="text"
          onchange={(e) => {
            handlechange("frontCameravideoRecording", e.target.value);
          }}
        />
        <Togglebuttons
          titlename="Optical Image Stabilizer (Ois)"
          value={data.ois}
          positive={() => handlechange("ois", true)}
          negative={() => handlechange("ois", false)}
          positiveText="Yes"
          negativeText="No"
        />
        <div className="h-40 flex flex-col flex-wrap justify-start gap-2">
          {data.CameraimageSamples.map((image, i) => {
            return (
              <div className="h-full w-40" key={i}>
                <Imageuploader
                  img={image}
                  folder="Technologia/Imagesamples"
                  callback={(imageurl) => {
                    handleArrayChange("CameraimageSamples", "update", {
                      index: i,
                      value: imageurl,
                    });
                  }}
                  remove={() => {
                    handleArrayChange("CameraimageSamples", "delete", {
                      index: i,
                    });
                  }}
                  cover={false}
                />
              </div>
            );
          })}
          <div className="h-full w-40">
            <Imageuploader
              img={""}
              folder="Technologia/Imagesamples"
              callback={(imageurl) => {
                handleArrayChange("CameraimageSamples", "add", imageurl);
              }}
              remove={() => {
                handleArrayChange("CameraimageSamples", "delete", { index: i });
              }}
            />
          </div>
        </div>
      </Groupinputs>
      {/* Battery and Charging */}
      <Groupinputs
        title="Battery and Charging"
        selectedgroup={selectedgroup}
        setselectedgroup={setselectedgroup}
      >
        <Dropdownmenu
          title="Battery Type"
          state={data.batteryType}
          onchange={(value) => {
            handlechange("batteryType", value);
          }}
          options={[
            "Silicon-Carbon Battery",
            "Graphene Battery",
            "Lithium-Polymer (Li-Po)",
            "Lithium-Ion (Li-Ion)",
            "Nickel-Metal Hydride (NiMH)",
            "Nickel-Cadmium (NiCd)",
          ]}
        />
        <Standardinputfield
          titlename="Battery Capacity"
          value={data.batteryCapacity}
          type="number"
          onchange={(e) => {
            handlechange("batteryCapacity", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Charge Speed"
          value={data.ChargeSpeed}
          type="number"
          onchange={(e) => {
            handlechange("ChargeSpeed", e.target.value);
          }}
        />
        <Togglebuttons
          titlename="Wireless Charging"
          value={data.wirelessCharging}
          positive={() => handlechange("wirelessCharging", true)}
          negative={() => handlechange("wirelessCharging", false)}
          positiveText="Yes"
          negativeText="No"
        />
        <Standardinputfield
          titlename="Wireless Charging Speed"
          value={data.wirelessChargingSpeed}
          type="number"
          onchange={(e) => {
            handlechange("wirelessChargingSpeed", e.target.value);
          }}
        />
        <Togglebuttons
          titlename="Reverse Charging"
          value={data.reverseCharging}
          positive={() => handlechange("reverseCharging", true)}
          negative={() => handlechange("reverseCharging", false)}
          positiveText="Yes"
          negativeText="No"
        />
        <Standardinputfield
          titlename="Reverse Charging Speed"
          value={data.reverseChargingSpeed}
          type="number"
          onchange={(e) => {
            handlechange("reverseChargingSpeed", e.target.value);
          }}
        />
      </Groupinputs>
      {/* Softwares */}
      <Groupinputs
        title="Softwares"
        selectedgroup={selectedgroup}
        setselectedgroup={setselectedgroup}
      >
        <Dropdownmenu
          title="Opperating System"
          state={data.os}
          onchange={(value) => {
            handlechange("os", value);
          }}
          options={["Android", "iOS", "Windows", "Linux", "ChromeOS", "MacOS"]}
        />
        <Standardinputfield
          titlename="Opperating System Version"
          value={data.osVersion}
          type="number"
          onchange={(e) => {
            handlechange("osVersion", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Update years"
          value={data.updateYears}
          type="number"
          onchange={(e) => {
            handlechange("updateYears", e.target.value);
          }}
        />
      </Groupinputs>
      {/* Network and Connectivity */}
      <Groupinputs
        title="Network and Connectivity"
        selectedgroup={selectedgroup}
        setselectedgroup={setselectedgroup}
      >
        <Togglebuttons
          titlename="3G"
          value={data.has3G}
          positive={() => handlechange("has3G", true)}
          negative={() => handlechange("has3G", false)}
          positiveText="Yes"
          negativeText="No"
        />
        <Togglebuttons
          titlename="4G"
          value={data.has4G}
          positive={() => handlechange("has4G", true)}
          negative={() => handlechange("has4G", false)}
          positiveText="Yes"
          negativeText="No"
        />
        <Togglebuttons
          titlename="5G"
          value={data.has5G}
          positive={() => handlechange("has5G", true)}
          negative={() => handlechange("has5G", false)}
          positiveText="Yes"
          negativeText="No"
        />
        <Standardinputfield
          titlename="Sim Card"
          value={data.sim}
          type="text"
          onchange={(e) => {
            handlechange("sim", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Bluetooth Version"
          value={data.bluetoothVersion}
          type="number"
          onchange={(e) => {
            handlechange("bluetoothVersion", e.target.value);
          }}
        />
        <Togglebuttons
          titlename="Nfc"
          value={data.nfc}
          positive={() => handlechange("nfc", true)}
          negative={() => handlechange("nfc", false)}
          positiveText="Yes"
          negativeText="No"
        />
        <Standardinputfield
          titlename="Usb Version"
          value={data.usbVersion}
          type="number"
          onchange={(e) => {
            handlechange("usbVersion", e.target.value);
          }}
        />
        <Togglebuttons
          titlename="E-Sim"
          value={data.esim}
          positive={() => handlechange("esim", true)}
          negative={() => handlechange("esim", false)}
          positiveText="Yes"
          negativeText="No"
        />
        <Togglebuttons
          titlename="Ir Blaster"
          value={data.irBlaster}
          positive={() => handlechange("irBlaster", true)}
          negative={() => handlechange("irBlaster", false)}
          positiveText="Yes"
          negativeText="No"
        />
        <Standardinputfield
          titlename="Sensors"
          value={data.sensors}
          type="text"
          onchange={(e) => {
            handlechange("sensors", e.target.value);
          }}
        />
      </Groupinputs>
      {/* Physical Design */}
      <Groupinputs
        title="Physical Design"
        selectedgroup={selectedgroup}
        setselectedgroup={setselectedgroup}
      >
        <Standardinputfield
          titlename="Height"
          value={data.height}
          type="number"
          onchange={(e) => {
            handlechange("height", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Width"
          value={data.width}
          type="number"
          onchange={(e) => {
            handlechange("width", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Thickness"
          value={data.thickness}
          type="number"
          onchange={(e) => {
            handlechange("thickness", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Weight"
          value={data.weight}
          type="number"
          onchange={(e) => {
            handlechange("weight", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Water Resistance"
          value={data.waterResistance}
          type="text"
          onchange={(e) => {
            handlechange("waterResistance", e.target.value);
          }}
        />
        <Togglebuttons
          titlename="Foldable"
          value={data.foldable}
          positive={() => handlechange("foldable", true)}
          negative={() => handlechange("foldable", false)}
          positiveText="Yes"
          negativeText="No"
        />
        <Standardinputfield
          titlename="Colors"
          value={data.colors}
          type="text"
          onchange={(e) => {
            handlechange("colors", e.target.value);
          }}
        />
      </Groupinputs>
      {/* Security */}
      <Groupinputs
        title="Security"
        selectedgroup={selectedgroup}
        setselectedgroup={setselectedgroup}
      >
        <Dropdownmenu
          title="Fingerprint"
          state={data.fingerprint}
          onchange={(value) => {
            handlechange("fingerprint", value);
          }}
          options={[
            "none",
            "Side",
            "Rear",
            "Front",
            "Under-display Optical",
            "Under-display Ultrasonic",
          ]}
        />
        <Togglebuttons
          titlename="Face Unlock"
          value={data.faceUnlock}
          positive={() => handlechange("faceUnlock", true)}
          negative={() => handlechange("faceUnlock", false)}
          positiveText="Yes"
          negativeText="No"
        />
      </Groupinputs>
      {/* Audio */}
      <Groupinputs
        title="Audio"
        selectedgroup={selectedgroup}
        setselectedgroup={setselectedgroup}
      >
        <Standardinputfield
          titlename="speakers"
          value={data.speakers}
          type="number"
          onchange={(e) => {
            handlechange("speakers", e.target.value);
          }}
        />
        <Togglebuttons
          titlename="Stereo Speakers"
          value={data.stereoSpeakers}
          positive={() => handlechange("stereoSpeakers", true)}
          negative={() => handlechange("stereoSpeakers", false)}
          positiveText="Yes"
          negativeText="No"
        />
        <Togglebuttons
          titlename="Headphone Jack"
          value={data.headphoneJack}
          positive={() => handlechange("headphoneJack", true)}
          negative={() => handlechange("headphoneJack", false)}
          positiveText="Yes"
          negativeText="No"
        />
      </Groupinputs>
      {/* Gaming */}
      <div className="flex flex-col gap-2">
        {data.gaming.map((item, i) => {
          return (
            <Groupinputs
              key={i}
              title={`Game ${i + 1}`}
              selectedgroup={selectedgroup}
              setselectedgroup={setselectedgroup}
            >
              <Standardinputfield
                titlename="Size"
                value={item.name}
                type="text"
                onchange={(e) => {
                  handlenestedchange("gaming", i, "name", e.target.value);
                }}
              />
              <Standardinputfield
                titlename="Max Settings"
                value={item.maxSettings}
                type="text"
                onchange={(e) => {
                  handlenestedchange(
                    "gaming",
                    i,
                    "maxSettings",
                    e.target.value
                  );
                }}
              />
              <Standardinputfield
                titlename="Fps Drop"
                value={item.fpsDrop}
                type="text"
                onchange={(e) => {
                  handlenestedchange("gaming", i, "fpsDrop", e.target.value);
                }}
              />
              <Standardinputfield
                titlename="Battery Drain"
                value={item.batterydrain}
                type="text"
                onchange={(e) => {
                  handlenestedchange(
                    "gaming",
                    i,
                    "batterydrain",
                    e.target.value
                  );
                }}
              />
              <Standardinputfield
                titlename="Temprature Raise"
                value={item.TempratureRaise}
                type="text"
                onchange={(e) => {
                  handlenestedchange(
                    "gaming",
                    i,
                    "TempratureRaise",
                    e.target.value
                  );
                }}
              />
              <Standardinputfield
                titlename="Ai Fps Generation"
                value={item.AiFpsGeneration}
                type="text"
                onchange={(e) => {
                  handlenestedchange(
                    "gaming",
                    i,
                    "AiFpsGeneration",
                    e.target.value
                  );
                }}
              />

              <button
                className="px-5 py-2 rounded-md bg-red-600 text-white w-fit ml-auto"
                type="button"
                onClick={() =>
                  handleArrayChange("gaming", "delete", { index: i })
                }
              >
                Remove Game
              </button>
            </Groupinputs>
          );
        })}
        <button
          type="button"
          className="px-5 py-2 rounded-2xl text-white bg-green-600 w-fit mx-auto"
          onClick={() => {
            const newgame = JSON.stringify(data.gaming[data.gaming.length - 1]);
            setdata({
              ...data,
              gaming: [...data.gaming, JSON.parse(newgame)],
            });
          }}
        >
          + Add Game
        </button>
      </div>
      {/* more */}
      <Groupinputs
        title="More"
        selectedgroup={selectedgroup}
        setselectedgroup={setselectedgroup}
      >
        <Standardinputfield
          titlename="In Box"
          value={data.inBox}
          type="text"
          onchange={(e) => {
            handlechange("inBox", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Youtube Comparison Link"
          value={data.youtubeComparison}
          type="text"
          onchange={(e) => {
            handlechange("youtubeComparison", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Youtube Gaming Link"
          value={data.youtubeGamingReview}
          type="text"
          onchange={(e) => {
            handlechange("youtubeGamingReview", e.target.value);
          }}
        />
        <Standardinputfield
          titlename="Youtube Camera Link"
          value={data.youtubeCameraReview}
          type="text"
          onchange={(e) => {
            handlechange("youtubeCameraReview", e.target.value);
          }}
        />
      </Groupinputs>
      <div className="flex items-center justify-center sticky bottom-0 bg-white py-5">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        >
          {loading && (
            <span className="inline-block w-5 h-5 border-white border-t-2 border-b-2 animate-spin rounded-full"></span>
          )}
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}

const Groupinputs = ({
  children,
  title = "",
  selectedgroup,
  setselectedgroup,
}) => {
  return (
    <div className="border rounded-2xl border-gray-300 p-2 bg-white">
      <h2
        className="text-lg font-medium cursor-pointer"
        onClick={() => setselectedgroup(title)}
      >
        {title}
      </h2>
      {selectedgroup == title && (
        <div className="flex flex-col gap-2 my-2 mt-2">{children}</div>
      )}
    </div>
  );
};

export default Clientpage;
