import React from "react";
import Verification from "@/lib/verification";
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
import Seoeditbutton from "@/app/_globalcomps/Addseo/Seoeditbutton";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { getseodata } from "@/app/_globalcomps/Addseo/Seodata";
import Metakeywordsreplacer from "@/app/_hooks/Metakeywordsreplcer";
import { Getautofillvalues } from "@/lib/autofillvaluesfn";

async function page({ params }) {
  const tokenRes = await Verification();
  const { ids } = await params;
  const products = await Promise.all(
    ids.slice(0, 3).map((id) => CachedProduct(id)),
  );

  if (products.some((a) => !a)) notFound();

  const scoretitle = { label: "Scores", icon: icons.flag };
  let customnavitems = [scoretitle, ...navitems];

  // autofillvalues
  const autofillvalues = await Getautofillvalues();
  const {
    displayTypes,
    screenProtections,
    cameraCutouts,
    chipsets,
    mobileGPUs,
    batteryType,
    Fingerprints,
    storage,
    storageType,
    ramTypes,
  } = autofillvalues;

  const allscores = await Promise.all(
    products
      .slice(0, 3)
      .map((product) => Scorecalculator(product, autofillvalues)),
  );

  // seo
  const key = JSON.stringify(products.map((p) => p?.model).sort());
  const seokey = `SEO-${key}`;
  const seodata = await getseodata(seokey);
  const converter = new QuillDeltaToHtmlConverter(seodata?.delta, {});
  const html = converter.convert();

  return (
    <Pagectxwrapper>
      <div className="min-h-screen p-2">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-2">
            <div className="sticky -top-8 md:-top-16 bg-bg1 rounded-2xl z-10 space-y-2">
              <CompareHeader ids={ids} products={products} />
              <Navbar navitems={customnavitems} scrolloffset={256} />
            </div>

            <ScorestableComp allscores={allscores} scoretitle={scoretitle} />
            <CompareSpecTable
              title={navitems[0].label}
              id={navitems[0].label}
              Icon={navitems[0].icon}
              products={products}
              rows={[
                { label: "Brand", key: "brand", rank: false },
                { label: "Model", key: "model", rank: false },
                { label: "Variant", key: "variant", rank: false },
                { label: "Device Type", key: "deviceType", rank: false },
                {
                  label: "Release Date",
                  key: "releaseDate",
                  format: (p) => formatDate(p?.releaseDate),
                  rank: false,
                },
                { label: "In Box", key: "inBox", rank: false },
              ]}
            />
            <CompareSpecTable
              title={navitems[1].label}
              id={navitems[1].label}
              Icon={navitems[1].icon}
              products={products}
              rows={[
                { label: "Size", key: "display.0.size", unit: "inches" },
                {
                  label: "Type",
                  key: "display.0.type",
                  type: "list",
                  list: displayTypes,
                  win: "min",
                },
                {
                  label: "Resolution",
                  key: "display.0",
                  format: (p) =>
                    `${p.display?.[0]?.pixelx} × ${p.display?.[0]?.pixely}`,
                  rank: false,
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
                  format: (p) => `~ ${p?.display?.[0]?.screenToBodyRatio} %`,
                },
                {
                  label: "Protection",
                  key: "display.0.screenProtection",
                  type: "list",
                  list: screenProtections,
                  win: "min",
                },
                {
                  label: "Camera Cutout",
                  key: "display.0.cameraCutout",
                  type: "list",
                  list: cameraCutouts,
                  win: "min",
                },
                ...(products.some((p) => p?.display?.[0]?.curved)
                  ? [
                      {
                        label: "Curved Display",
                        key: "display.0.curved",
                        type: "boolean",
                      },
                    ]
                  : []),

                {
                  label: "Round Corners",
                  key: "display.0.roundCorners",
                  type: "boolean",
                },
                ...(products.some((p) => p?.display?.[0]?.antiReflection)
                  ? [
                      {
                        label: "Anti Reflection",
                        key: "display.0.antiReflection",
                        type: "boolean",
                      },
                    ]
                  : []),
                ...(products.some((p) => p?.display?.[0]?.nanoTexture)
                  ? [
                      {
                        label: "Nano Texture",
                        key: "display.0.nanoTexture",
                        type: "boolean",
                      },
                    ]
                  : []),
                ...(products.some((p) => p?.display?.[0]?.dustResistance)
                  ? [
                      {
                        label: "Dust Resistance",
                        key: "display.0.dustResistance",
                        type: "boolean",
                      },
                    ]
                  : []),
              ]}
            />

            <CompareSpecTable
              title={navitems[2].label}
              id={navitems[2].label}
              Icon={navitems[2].icon}
              products={products} // <-- array of products
              rows={[
                {
                  label: "Chipset",
                  key: "chipset",
                  type: "list",
                  list: chipsets,
                  win: "min",
                },
                { label: "CPU Cores", key: "cpuCores" },
                { label: "Cores Details", key: "cpuClockSpeed", rank: false },
                {
                  label: "Max Clock Speed",
                  key: "maxCpuClockSpeed",
                  unit: "GHz",
                },
                {
                  label: "GPU",
                  key: "gpu",
                  type: "list",
                  list: mobileGPUs,
                  win: "min",
                },
                {
                  label: "RAM",
                  key: "ram",
                  format: (p) => `${p?.ram}GB`,
                },
                {
                  label: "RAM Type",
                  key: "ramType",
                  type: "list",
                  list: ramTypes,
                  win: "min",
                },
                {
                  label: "Storage",
                  key: "storage",
                  type: "list",
                  list: storage,
                  win: "min",
                },
                {
                  label: "Storage Type",
                  key: "storageType",
                  type: "list",
                  list: storageType,
                  win: "min",
                },
                ...(products.some((p) => p?.expandableStorage)
                  ? [
                      {
                        label: "Expandable Storage",
                        key: "expandableStorage",
                        type: "boolean",
                      },
                    ]
                  : []),
                {
                  label: "Antutu Score",
                  key: "antutuscore",
                  format: (p) => Number(p?.antutuscore)?.toLocaleString(),
                },
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
                  rank: false,
                },
                {
                  label: "Rear Video",
                  key: "RearCameravideoRecording",
                  rank: false,
                },
                {
                  label: "Flash",
                  key: "flash",
                  type: "boolean",
                },
                ...(products.some((p) => p?.ois)
                  ? [
                      {
                        label: "OIS",
                        key: "ois",
                        type: "boolean",
                      },
                    ]
                  : []),

                {
                  label: "Front Camera",
                  key: "frontCameramegapixelsDetails",
                  rank: false,
                },
                {
                  label: "Front Video",
                  key: "frontCameravideoRecording",
                  rank: false,
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
                  type: "list",
                  list: batteryType,
                  win: "min",
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
                  key: "wirelessChargingSpeed",
                  format: (p) =>
                    p.wirelessCharging ? `${p.wirelessChargingSpeed} W` : "No",
                },
                {
                  label: "Reverse Charging",
                  key: "reverseChargingSpeed",
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
                  rank: false,
                },
                {
                  label: "OS Version",
                  format: (p) => `v${p.osVersion}`,
                  rank: false,
                },
                {
                  label: "Update Policy",
                  key: "updateYears",
                  rank: false,
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
                { label: "Wi-Fi", key: "wifiVersion", rank: false },
                {
                  label: "Bluetooth",
                  key: "bluetoothVersion",
                  format: (p) => `v${p?.bluetoothVersion}`,
                },
                {
                  label: "USB",
                  key: "usbVersion",
                  format: (p) => `v${p?.usbVersion}`,
                },
                { label: "NFC", key: "nfc", type: "boolean" },
                { label: "eSIM", key: "esim", type: "boolean" },
                { label: "IR Blaster", key: "irBlaster", type: "boolean" },
                { label: "Sensors", key: "sensors", rank: false },
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
                {
                  label: "Water Resistance, IP Rating",
                  key: "waterResistance",
                },
                ...(products.some((p) => p?.foldable)
                  ? [{ label: "Foldable", key: "foldable", type: "boolean" }]
                  : []),
                { label: "Colors", key: "colors", rank: false },
              ]}
            />
            <CompareSpecTable
              title={navitems[8].label}
              id={navitems[8].label}
              Icon={navitems[8].icon}
              products={products}
              rows={[
                {
                  label: "Fingerprint",
                  key: "fingerprint",
                  type: "list",
                  list: Fingerprints,
                  win: "min",
                },
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
                  {
                    label: "Dedicated Cooling",
                    key: "dedicatedCooling",
                    type: "boolean",
                  },
                  {
                    label: "Gaming Triggers",
                    key: "gamingTriggers",
                    type: "boolean",
                  },
                  {
                    label: "AI FPS Generation",
                    key: "AiFpsGeneration",
                    type: "boolean",
                  },
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
          {/* description */}
          <div
            className="mt-10 text"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {/* seo form */}
          {tokenRes?.verified && (
            <div className="mt-5">
              <Seoeditbutton editdata={seodata} seokey={seokey} />
            </div>
          )}
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

  const key = JSON.stringify(products.map((p) => p?.model).sort());
  const seokey = `SEO-${key}`;
  const seodata = await getseodata(seokey);

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
      title: Metakeywordsreplacer(
        seodata?.title || `${aName} vs ${bName} – Specs & Price Comparison`,
      ),
      description: Metakeywordsreplacer(
        seodata?.metadesc ||
          `Compare ${aName} vs ${bName} in terms of price, camera, performance, battery, display and features.`,
      ),
      keywords: Metakeywordsreplacer(
        seodata?.keywords ||
          [
            `${aName} vs ${bName}`,
            `${aName} comparison`,
            `${bName} comparison`,
            "mobile comparison",
            "smartphone specs comparison",
          ].join(", "),
      ),
    };
  }

  // 🧩 3-product comparison
  return {
    title: Metakeywordsreplacer(
      seodata?.title || `${aName} vs ${bName} vs ${cName} – Comparison`,
    ),
    description: Metakeywordsreplacer(
      seodata?.metadesc ||
        `Compare ${aName}, ${bName}, and ${cName} on price, performance, camera, battery, display and features.`,
    ),
    keywords: Metakeywordsreplacer(
      seodata?.keywords ||
        [
          `${aName} vs ${bName}`,
          `${bName} vs ${cName}`,
          `${aName} vs ${cName}`,
          "phone comparison",
          "best smartphone comparison",
        ].join(", "),
    ),
  };
};

export default page;
