import React from "react";
import { CachedProduct } from "@/app/_globalcomps/cachedata/cachedProducts";
import CompareSpecTable from "./_comps/Spectable";
import CompareHeader from "./_comps/Header";
import Navbar from "../../product/[id]/_comps/Navbar";
import { navitems, icons } from "@/lib/data";
import { Pagectxwrapper } from "./Pagecontext";
import Storesmenu from "./_comps/Storesmenu";
import { notFound } from "next/navigation";
import formatDate from "@/app/_globalcomps/Formateddate";
import Scorecalculator from "@/app/_globalcomps/scorescalculator/Scorecalculator";
import ScorestableComp from "./_comps/Scorestable";

async function page({ params }) {
  const { ids } = await params;
  const products = await Promise.all(
    ids.slice(0, 3).map((id) => CachedProduct(id)),
  );

  if (products.some((a) => !a)) notFound();

  const scoretitle = { label: "Scores", icon: icons.flag };
  let customnavitems = [scoretitle, ...navitems];

  const allscores = await Promise.all(
    products.slice(0, 3).map((product) => Scorecalculator(product)),
  );

  return (
    <Pagectxwrapper>
      <div className="min-h-screen p-2">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="sticky -top-8 md:-top-16 p-2 bg-white rounded-2xl shadow z-10 space-y-2">
            <CompareHeader ids={ids} products={products} />
            <Navbar navitems={customnavitems} scrolloffset={272} />
          </div>

          <ScorestableComp allscores={allscores} scoretitle={scoretitle} />
          <CompareSpecTable
            title={navitems[0].label}
            id={navitems[0].label}
            Icon={navitems[0].icon}
            products={products}
            rows={[
              { label: "Brand", key: "brand" },
              { label: "Model", key: "model" },
              { label: "Variant", key: "variant" },
              { label: "Device Type", key: "deviceType" },
              {
                label: "Release Date",
                key: "releaseDate",
                format: (p) => formatDate(p?.releaseDate),
              },
              { label: "In Box", key: "inBox" },
            ]}
          />
          <CompareSpecTable
            title={navitems[1].label}
            id={navitems[1].label}
            Icon={navitems[1].icon}
            products={products}
            rows={[
              { label: "Size", key: "display.0.size", unit: "inches" },
              { label: "Type", key: "display.0.type" },
              {
                label: "Resolution",
                key: "display.0",
                format: (p) =>
                  `${p.display?.[0]?.pixelx} × ${p.display?.[0]?.pixely}`,
              },
              { label: "PPI", key: "display.0.ppi" },
              {
                label: "Refresh Rate",
                key: "display.0.refreshRate",
                unit: "Hz",
              },
              { label: "HDR", key: "display.0.hdr", type: "boolean" },
              {
                label: "Brightness",
                key: "display.0.Brightness",
                unit: "nits",
              },
              {
                label: "Screen to Body Ratio",
                key: "display.0.screenToBodyRatio",
                unit: "%",
              },
              { label: "Protection", key: "display.0.screenProtection" },
              { label: "Camera Cutout", key: "display.0.cameraCutout" },
              {
                label: "Curved Display",
                key: "display.0.curved",
                type: "boolean",
              },
              {
                label: "Round Corners",
                key: "display.0.roundCorners",
                type: "boolean",
              },
              {
                label: "Anti Reflection",
                key: "display.0.antiReflection",
                type: "boolean",
              },
              {
                label: "Nano Texture",
                key: "display.0.nanoTexture",
                type: "boolean",
              },
              {
                label: "Dust Resistance",
                key: "display.0.dustResistance",
                type: "boolean",
              },
            ]}
          />

          <CompareSpecTable
            title={navitems[2].label}
            id={navitems[2].label}
            Icon={navitems[2].icon}
            products={products} // <-- array of products
            rows={[
              { label: "Chipset", key: "chipset" },
              { label: "CPU Cores", key: "cpuCores" },
              { label: "Base Clock", key: "cpuClockSpeed" },
              { label: "Max Clock", key: "maxCpuClockSpeed", unit: "GHz" },
              {
                label: "RAM",
                key: "ram",
                format: (p) => `${p.ram} Gb (${p.ramType})`,
              },
              {
                label: "Storage",
                key: "storage",
                format: (p) => `${p.storage} (${p.storageType})`,
              },
              {
                label: "Expandable Storage",
                key: "expandableStorage",
                type: "boolean",
              },
              { label: "Antutu Score", key: "antutuscore" },
            ]}
          />
          <CompareSpecTable
            title={navitems[3].label}
            id={navitems[3].label}
            Icon={navitems[3].icon}
            products={products}
            rows={[
              {
                label: "Rear Camera",
                key: "RearCameramegapixelsDetails",
              },
              {
                label: "Rear Video",
                key: "RearCameravideoRecording",
              },
              {
                label: "OIS",
                key: "ois",
                type: "boolean",
              },
              {
                label: "Front Camera",
                key: "frontCameramegapixelsDetails",
              },
              {
                label: "Front Video",
                key: "frontCameravideoRecording",
              },
            ]}
          />
          <CompareSpecTable
            title={navitems[4].label}
            id={navitems[4].label}
            Icon={navitems[4].icon}
            products={products}
            rows={[
              {
                label: "Battery Type",
                key: "batteryType",
              },
              {
                label: "Capacity",
                key: "batteryCapacity",
                unit: "mAh",
              },
              {
                label: "Fast Charging",
                key: "ChargeSpeed",
                unit: "W",
              },
              {
                label: "Wireless Charging",
                key: "wirelessCharging",
                format: (p) =>
                  p.wirelessCharging ? `${p.wirelessChargingSpeed} W` : "No",
              },
              {
                label: "Reverse Charging",
                key: "reverseCharging",
                format: (p) =>
                  p.reverseCharging ? `${p.reverseChargingSpeed} W` : "No",
              },
            ]}
          />
          <CompareSpecTable
            title={navitems[5].label}
            id={navitems[5].label}
            Icon={navitems[5].icon}
            products={products}
            rows={[
              {
                label: "Operating System",
                key: "os",
              },
              {
                label: "OS Version",
                key: "osVersion",
              },
              {
                label: "Update Policy",
                key: "updateYears",
                unit: "Years",
              },
            ]}
          />
          <CompareSpecTable
            title={navitems[6].label}
            id={navitems[6].label}
            Icon={navitems[6].icon}
            products={products}
            rows={[
              { label: "5G", key: "has5G", type: "boolean" },
              { label: "4G", key: "has4G", type: "boolean" },
              { label: "3G", key: "has3G", type: "boolean" },
              { label: "SIM", key: "sim" },
              { label: "Wi-Fi", key: "wifiVersion" },
              { label: "Bluetooth", key: "bluetoothVersion" },
              { label: "USB", key: "usbVersion" },
              { label: "NFC", key: "nfc", type: "boolean" },
              { label: "eSIM", key: "esim", type: "boolean" },
              { label: "IR Blaster", key: "irBlaster", type: "boolean" },
              { label: "Sensors", key: "sensors" },
            ]}
          />
          <CompareSpecTable
            title={navitems[7].label}
            id={navitems[7].label}
            Icon={navitems[7].icon}
            products={products}
            rows={[
              { label: "Height", key: "height", unit: "mm" },
              { label: "Width", key: "width", unit: "mm" },
              {
                label: "Thickness",
                key: "thickness",
                unit: "mm",
                win: "min",
              },
              { label: "Weight", key: "weight", unit: "g", win: "min" },
              { label: "Water Resistance", key: "waterResistance" },
              { label: "Foldable", key: "foldable", type: "boolean" },
              { label: "Colors", key: "colors" },
            ]}
          />
          <CompareSpecTable
            title={navitems[8].label}
            id={navitems[8].label}
            Icon={navitems[8].icon}
            products={products}
            rows={[
              { label: "Fingerprint", key: "fingerprint" },
              { label: "Face Unlock", key: "faceUnlock", type: "boolean" },
              { label: "Speakers", key: "speakers" },
              {
                label: "Stereo Speakers",
                key: "stereoSpeakers",
                type: "boolean",
              },
              {
                label: "Headphone Jack",
                key: "headphoneJack",
                type: "boolean",
              },
            ]}
          />
          {products.some((p) => p.gaming?.length > 0) && (
            <CompareSpecTable
              title={navitems[9].label}
              id={navitems[9].label}
              Icon={navitems[9].icon}
              products={products}
              rows={[
                { label: "Max Settings", key: "gaming.0.maxSettings" },
                { label: "FPS Drop", key: "gaming.0.fpsDrop" },
                { label: "Temperature Rise", key: "gaming.0.TempratureRaise" },
                { label: "AI FPS Generation", key: "gaming.0.AiFpsGeneration" },
              ]}
            />
          )}

          <section
            className="bg-white rounded-2xl shadow overflow-hidden"
            id={navitems[10].label}
          >
            <h2 className="relative flex items-center gap-2 px-6 py-4 font-extrabold border-b border-slate-200 font-tenor tracking-wider text-theme">
              {navitems[10].icon} {navitems[10].label}
              <span className="block absolute h-1/2 w-1 bg-theme rounded-r-full top-1/2 left-0 -translate-y-1/2 "></span>
            </h2>

            <div className="grid md:grid-cols-3 gap-4 p-6">
              {products.map((product, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-medium text-center">{product.model}</h3>
                  <Video src={product.youtubeComparison} />
                  <Video src={product.youtubeCameraReview} />
                  <Video src={product.youtubeGamingReview} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Storesmenu />
    </Pagectxwrapper>
  );
}

function Video({ src }) {
  if (!src) return null;
  return <iframe src={src} className="w-full h-56 rounded-xl" loading="lazy" />;
}

const withVariant = (model, variant) =>
  variant && variant.trim() !== "" ? `${model} (${variant})` : model;

export const generateMetadata = async ({ params }) => {
  const { ids } = await params;

  const products = await Promise.all(
    ids.slice(0, 3).map((id) => CachedProduct(id)),
  );

  const validProducts = products.filter(Boolean);

  if (validProducts.length < 2) {
    return {
      title: "Product Comparison | Tecknologia",
      description:
        "Compare smartphones, tablets and gadgets to find the best device for your needs.",
    };
  }

  const [a, b, c] = validProducts;

  const aName = withVariant(a?.model, a?.variant);
  const bName = withVariant(b?.model, b?.variant);
  const cName = c ? withVariant(c?.model, c?.variant) : null;

  // 🆚 2-product comparison
  if (validProducts.length === 2) {
    return {
      title: `${aName} vs ${bName} – Specs & Price Comparison`,
      description: `Compare ${aName} vs ${bName} in terms of price, camera, performance, battery, display and features.`,
      keywords: [
        `${aName} vs ${bName}`,
        `${aName} comparison`,
        `${bName} comparison`,
        "mobile comparison",
        "smartphone specs comparison",
      ].join(", "),
    };
  }

  // 🧩 3-product comparison
  return {
    title: `${aName} vs ${bName} vs ${cName} – Comparison`,
    description: `Compare ${aName}, ${bName}, and ${cName} on price, performance, camera, battery, display and features.`,
    keywords: [
      `${aName} vs ${bName}`,
      `${bName} vs ${cName}`,
      `${aName} vs ${cName}`,
      "phone comparison",
      "best smartphone comparison",
    ].join(", "),
  };
};

export default page;
