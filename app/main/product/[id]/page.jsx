import React from "react";
import { CachedProduct } from "@/app/_globalcomps/cachedata/cachedProducts";
import { Pagectxwrapper } from "./Pagecontext";
import Navbar from "./_comps/Navbar";
import Herosection from "./_comps/Herosection";
import SpecTable from "./_comps/Spectable";
import { navitems } from "@/lib/data";

export default async function Page({ params }) {
  const { id } = await params;
  const product = await CachedProduct(id);
  const d = product.display?.[0] || {};

  return (
    <Pagectxwrapper>
      <div className="min-h-screen py-10">
        <div className="max-w-6xl mx-auto space-y-2">
          <Herosection product={product} />

          <Navbar navitems={navitems} />

          <SpecTable
            title={navitems[0].label}
            id={navitems[0].label}
            Icon={navitems[0].icon}
            rows={[
              ["Size", `${d.size} inches`],
              ["Type", d.type],
              ["Resolution", `${d.pixelx} × ${d.pixely}`],
              ["PPI", d.ppi],
              ["Refresh Rate", `${d.refreshRate} Hz`],
              ["HDR", yesNo(d.hdr)],
              ["Brightness", `${d.Brightness} nits`],
              ["Screen to Body Ratio", d.screenToBodyRatio],
              ["Protection", d.screenProtection],
              ["Camera Cutout", d.cameraCutout],
              ["Curved Display", yesNo(d.curved)],
              ["Round Corners", yesNo(d.roundCorners)],
              ["Anti Reflection", yesNo(d.antiReflection)],
              ["Nano Texture", yesNo(d.nanoTexture)],
              ["Dust Resistance", yesNo(d.dustResistance)],
            ]}
          />

          <SpecTable
            title={navitems[1].label}
            id={navitems[1].label}
            Icon={navitems[1].icon}
            rows={[
              ["Chipset", product.chipset],
              ["CPU Cores", product.cpuCores],
              ["Base Clock", product.cpuClockSpeed],
              ["Max Clock", `${product.maxCpuClockSpeed} GHz`],
              ["NPU", product.npu],
              ["CPU Score", product.cpuScore],
              ["GPU Score", product.gpuScore],
              ["RAM", `${product.ram} Gb (${product.ramType})`],
              ["Storage", `${product.storage} (${product.storageType})`],
              ["Expandable Storage", yesNo(product.expandableStorage)],
            ]}
          />

          <SpecTable
            title={navitems[2].label}
            id={navitems[2].label}
            Icon={navitems[2].icon}
            rows={[
              ["Rear Camera", product.RearCameramegapixelsDetails],
              ["Rear Video", product.RearCameravideoRecording],
              ["OIS", yesNo(product.ois)],
              ["Front Camera", product.frontCameramegapixelsDetails],
              ["Front Video", product.frontCameravideoRecording],
            ]}
          />

          <SpecTable
            title={navitems[3].label}
            id={navitems[3].label}
            Icon={navitems[3].icon}
            rows={[
              ["Battery Type", product.batteryType],
              ["Capacity", `${product.batteryCapacity} mAh`],
              ["Fast Charging", `${product.ChargeSpeed} W`],
              [
                "Wireless Charging",
                product.wirelessCharging
                  ? `${product.wirelessChargingSpeed} W`
                  : "No",
              ],
              [
                "Reverse Charging",
                product.reverseCharging
                  ? `${product.reverseChargingSpeed} W`
                  : "No",
              ],
            ]}
          />

          <SpecTable
            title={navitems[4].label}
            id={navitems[4].label}
            Icon={navitems[4].icon}
            rows={[
              ["Operating System", product.os],
              ["OS Version", product.osVersion],
              ["Update Policy", `${product.updateYears} Years`],
            ]}
          />

          <SpecTable
            title={navitems[5].label}
            id={navitems[5].label}
            Icon={navitems[5].icon}
            rows={[
              ["5G", yesNo(product.has5G)],
              ["4G", yesNo(product.has4G)],
              ["3G", yesNo(product.has3G)],
              ["SIM", product.sim],
              ["Wi-Fi", product.wifiVersion],
              ["Bluetooth", product.bluetoothVersion],
              ["USB", product.usbVersion],
              ["NFC", yesNo(product.nfc)],
              ["eSIM", yesNo(product.esim)],
              ["IR Blaster", yesNo(product.irBlaster)],
              ["Sensors", product.sensors],
            ]}
          />

          <SpecTable
            title={navitems[6].label}
            id={navitems[6].label}
            Icon={navitems[6].icon}
            rows={[
              ["Height", `${product.height} mm`],
              ["Width", `${product.width} mm`],
              ["Thickness", `${product.thickness} mm`],
              ["Weight", `${product.weight} g`],
              ["Water Resistance", product.waterResistance],
              ["Foldable", yesNo(product.foldable)],
              ["Colors", product.colors],
            ]}
          />

          <SpecTable
            title={navitems[7].label}
            id={navitems[7].label}
            Icon={navitems[7].icon}
            rows={[
              ["Fingerprint", product.fingerprint],
              ["Face Unlock", yesNo(product.faceUnlock)],
              ["Speakers", product.speakers],
              ["Stereo Speakers", yesNo(product.stereoSpeakers)],
              ["Headphone Jack", yesNo(product.headphoneJack)],
            ]}
          />

          {/* ================= GAMING ================= */}
          {product.gaming?.length > 0 &&
            product.gaming.map((g, i) => (
              <SpecTable
                key={i}
                title={navitems[8].label + " " + g.name}
                id={navitems[8].label}
                Icon={navitems[8].icon}
                rows={[
                  ["Max Settings", g.maxSettings],
                  ["FPS Drop", g.fpsDrop],
                  ["Temperature Rise", g.TempratureRaise],
                  ["AI FPS Generation", g.AiFpsGeneration],
                ]}
              />
            ))}

          {/* ================= VIDEOS ================= */}
          <section
            className="bg-white rounded-2xl shadow overflow-hidden"
            id={navitems[9].label}
          >
            <h2 className="flex  items-center gap-2 px-6 py-4 font-extrabold border-b bg-bg1 border-slate-200 font-tenor">
              {navitems[9].icon} {navitems[9].label}
            </h2>
            <div className="grid md:grid-cols-3 gap-4  p-6">
              <Video src={product.youtubeComparison} />
              <Video src={product.youtubeCameraReview} />
              <Video src={product.youtubeGamingReview} />
            </div>
          </section>
        </div>
      </div>
    </Pagectxwrapper>
  );
}

const yesNo = (v) => (v ? "✅ Yes" : "❌ No");

function Video({ src }) {
  if (!src) return null;
  return <iframe src={src} className="w-full h-56 rounded-xl" loading="lazy" />;
}
