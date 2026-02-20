import React from "react";
import { CachedProduct } from "@/app/_globalcomps/cachedata/cachedProducts";
import { Pagectxwrapper } from "./Pagecontext";
import Navbar from "./_comps/Navbar";
import Herosection from "./_comps/Herosection";
import SpecTable from "./_comps/Spectable";
import { navitems } from "@/lib/data";
import Verification from "@/lib/verification";
import Comparewith from "./_comps/Comparewith";
import { notFound } from "next/navigation";
import formatDate from "@/app/_globalcomps/Formateddate";
import { icons } from "@/lib/data";
import Scorecalculator from "@/app/_globalcomps/scorescalculator/Scorecalculator";
import ScoreOverview from "./_comps/_scores/Showscores";
import Seoeditbutton from "@/app/_globalcomps/Addseo/Seoeditbutton";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { getseodata } from "@/app/_globalcomps/Addseo/Seodata";
import Topfives from "./_comps/Topfives";
import Link from "next/link";
import { Getautofillvalues } from "@/lib/autofillvaluesfn";
import Fallbackreview from "./_comps/Fallbackreview";
import Metakeywordsreplacer from "@/app/_hooks/Metakeywordsreplcer";

export default async function page({ params }) {
  const tokenRes = await Verification();
  const { id } = await params;
  if (!id || id == "undefined") notFound();
  //
  const product = await CachedProduct(id);
  if (!product) notFound();

  const d = product?.display?.[0] || {};

  const videoreview =
    product?.youtubeComparison ||
    product?.youtubeCameraReview ||
    product?.youtubeGamingReview;

  const gamingreview =
    product?.dedicatedCooling ||
    product?.gamingTriggers ||
    product?.AiFpsGeneration ||
    product?.bypasscharging;

  //
  const comparisontitle = { label: "Comparisons", icon: icons.compare };
  let customnavitems = [...navitems, comparisontitle];

  if (!videoreview)
    customnavitems = customnavitems.filter((p) => p.label != "Video Reviews");
  if (!gamingreview && !product?.gaming?.length)
    customnavitems = customnavitems.filter((p) => p.label != "Gaming");

  // autofillvalues
  const autofillvalues = await Getautofillvalues();

  const scores = await Scorecalculator(product, autofillvalues);

  // seo
  const seokey = `SEO-${product?.model}`;
  const seodata = await getseodata(seokey);
  const converter = new QuillDeltaToHtmlConverter(seodata?.delta, {});
  const html = converter.convert();

  // schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.model,
    image: product?.images,

    description: seodata?.metadesc || generateMetaDescription(product),

    sku: product?._id,
    productID: product?._id,
    category: product?.deviceType,

    brand: {
      "@type": "Brand",
      name: product?.brand,
    },

    offers: {
      "@type": "Offer",
      url: `https://tecknologia.in/main/product/${product?._id}`,
      priceCurrency: "INR",
      price: parseInt(product?.price?.[0]?.sp || product?.price?.[0]?.mrp, 10),
      availability: product?.price?.some((a) => a == "Avaialable")
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: product?.price?.[0]?.platform,
      },
    },

    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: scores?.totalscore / 20,
      reviewCount: "10",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <Pagectxwrapper>
      <div className="min-h-screen py-2 px-2 md:px-0 w-full">
        <div className="max-w-7xl mx-auto space-y-2 w-full">
          <Herosection product={product} tokenRes={tokenRes} scores={scores} />
          <ScoreOverview scores={scores} />

          <Navbar
            navitems={customnavitems}
            stickyat="top-16"
            scrolloffset={135}
          />

          <div className="flex flex-col md:flex-row gap-2 w-full">
            <div className="space-y-2 w-full">
              <SpecTable
                title={navitems[0].label}
                id={navitems[0].label}
                Icon={navitems[0].icon}
                rows={[
                  ["Brand", product?.brand],
                  ["Model", product?.model],
                  ["Variant", product?.variant],
                  ["Device Type", product?.deviceType],
                  ["Release Date", formatDate(product?.releaseDate)],
                  ["In Box", product?.inBox],
                  ...(product?.awards.length
                    ? [["Tecknologia Awards", product?.awards]]
                    : []),
                ]}
              />
              <SpecTable
                title={navitems[1].label}
                id={navitems[1].label}
                Icon={navitems[1].icon}
                rows={[
                  ["Size", `${d.size} inches`],
                  ["Type", d.type],
                  ["Resolution", `${d.pixelx} × ${d.pixely}`],
                  ["PPI", `~ ${d.ppi}`],
                  ["Refresh Rate", `${d.refreshRate} Hz`],
                  ["HDR", yesNo(d.hdr)],
                  ["Brightness", `${d.Brightness} nits`],
                  ["Screen to Body Ratio", `${d.screenToBodyRatio} %`],
                  ["Protection", d.screenProtection],
                  ["Camera Cutout", d.cameraCutout],
                  ["Curved Display", yesNo(d.curved)],
                  ["Round Corners", yesNo(d.roundCorners)],
                  ...(d.antiReflection
                    ? [["Anti Reflection", yesNo(d.antiReflection)]]
                    : []),
                  ...(d.nanoTexture
                    ? [["Nano Texture", yesNo(d.nanoTexture)]]
                    : []),
                  ...(d.dustResistance
                    ? [["Dust Resistance", yesNo(d.dustResistance)]]
                    : []),
                ]}
              />

              <SpecTable
                title={navitems[2].label}
                id={navitems[2].label}
                Icon={navitems[2].icon}
                rows={[
                  ["Chipset", product?.chipset],
                  ["CPU Cores", `${product?.cpuCores} Cores`],
                  ["Core Details", product?.cpuClockSpeed],
                  ["Max Clock Speed", `${product?.maxCpuClockSpeed} GHz`],
                  ["GPU", product?.gpu],
                  ["RAM", `${product?.ram} Gb (${product?.ramType})`],
                  ["Storage", `${product?.storage} (${product?.storageType})`],
                  ["Expandable Storage", yesNo(product?.expandableStorage)],
                  ["Antutu Score", product?.antutuscore],
                ]}
              />

              <SpecTable
                title={navitems[3].label}
                id={navitems[3].label}
                Icon={navitems[3].icon}
                rows={[
                  ["Rear Camera", product?.RearCameramegapixelsDetails],
                  ["Rear Video", product?.RearCameravideoRecording],
                  ["Flash", yesNo(product?.flash)],
                  ["OIS", yesNo(product?.ois)],
                  ["Front Camera", product?.frontCameramegapixelsDetails],
                  ["Front Video", product?.frontCameravideoRecording],
                ]}
              />

              <SpecTable
                title={navitems[4].label}
                id={navitems[4].label}
                Icon={navitems[4].icon}
                rows={[
                  ["Battery Type", product?.batteryType],
                  ["Capacity", `${product?.batteryCapacity} mAh`],
                  ["Fast Charging", `${product?.ChargeSpeed} W`],
                  [
                    "Wireless Charging",
                    product?.wirelessCharging
                      ? `${product?.wirelessChargingSpeed} W`
                      : "No",
                  ],
                  [
                    "Reverse Charging",
                    product?.reverseCharging
                      ? `${product?.reverseChargingSpeed} W`
                      : "No",
                  ],
                ]}
              />

              <SpecTable
                title={navitems[5].label}
                id={navitems[5].label}
                Icon={navitems[5].icon}
                rows={[
                  ["Operating System", product?.os],
                  ["OS Version", product?.osVersion],
                  ["Update Policy", `${product?.updateYears}`],
                ]}
              />

              <SpecTable
                title={navitems[6].label}
                id={navitems[6].label}
                Icon={navitems[6].icon}
                rows={[
                  ["5G", yesNo(product?.has5G)],
                  ["4G", yesNo(product?.has4G)],
                  ["3G", yesNo(product?.has3G)],
                  ["SIM", product?.sim],
                  ["Wi-Fi", product?.wifiVersion],
                  ["Bluetooth", `v${product?.bluetoothVersion}`],
                  [
                    "USB",
                    `${product?.usbType ? product?.usbType + " " : ""}v${product?.usbVersion}`,
                  ],
                  ["NFC", yesNo(product?.nfc)],
                  ["eSIM", yesNo(product?.esim)],
                  ...(product?.irBlaster
                    ? [["IR Blaster", yesNo(product?.irBlaster)]]
                    : []),
                  ["Sensors", product?.sensors],
                ]}
              />

              <SpecTable
                title={navitems[7].label}
                id={navitems[7].label}
                Icon={navitems[7].icon}
                rows={[
                  ["Height", `${product?.height} mm`],
                  ["Width", `${product?.width} mm`],
                  ["Thickness", `${product?.thickness} mm`],
                  ["Weight", `${product?.weight} g`],
                  ["Water Resistance", product?.waterResistance],
                  ...(product?.foldable
                    ? [["Foldable", yesNo(product?.foldable)]]
                    : []),
                  ["Colors", product?.colors],
                ]}
              />

              <SpecTable
                title={navitems[8].label}
                id={navitems[8].label}
                Icon={navitems[8].icon}
                rows={[
                  ["Fingerprint", product?.fingerprint],
                  ["Face Unlock", yesNo(product?.faceUnlock)],
                  ["Speakers", product?.speakers],
                  ["Stereo Speakers", yesNo(product?.stereoSpeakers)],
                  ["Headphone Jack", yesNo(product?.headphoneJack)],
                ]}
              />

              {/* ================= GAMING ================= */}
              {gamingreview && (
                <SpecTable
                  title={navitems[9].label}
                  id={navitems[9].label}
                  Icon={navitems[9].icon}
                  rows={[
                    ["Dedicated Cooling", yesNo(product?.dedicatedCooling)],
                    ["Gaming Triggers", yesNo(product?.gamingTriggers)],
                    ["Ai Fps Generation", yesNo(product?.AiFpsGeneration)],
                    ["Bypass Charging", yesNo(product?.bypasscharging)],
                  ]}
                />
              )}

              {product?.gaming?.length > 0 &&
                product?.gaming.map((g, i) => (
                  <SpecTable
                    key={i}
                    title={g.name}
                    id={navitems[9].label}
                    Icon={navitems[9].icon}
                    rows={[
                      ["Max Settings", g?.maxSettings],
                      ["FPS Drop", g?.fpsDrop],
                      ["Temperature Rise", g?.tempratureRaise],
                      ["Battery Drain", g?.batterydrain],
                    ]}
                  />
                ))}

              {/* ================= VIDEOS ================= */}
              {videoreview && (
                <section
                  className="bg-white rounded-2xl shadow overflow-hidden"
                  id={navitems[10].label}
                >
                  <h2 className="relative flex  items-center gap-2 px-6 py-4 font-extrabold border-b border-slate-200 font-tenor tracking-wider">
                    {navitems[10].icon} {navitems[10].label}
                    <span className="block absolute h-1/2 w-1 bg-theme rounded-r-full top-1/2 left-0 -translate-y-1/2 "></span>
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4  p-6">
                    <Video src={product?.youtubeComparison} />
                    <Video src={product?.youtubeCameraReview} />
                    <Video src={product?.youtubeGamingReview} />
                  </div>
                </section>
              )}
            </div>
            <div className="w-full md:w-96 flex flex-col gap-2">
              <Topfives
                price={product?.price}
                deviceType={product?.deviceType}
              />
              {/*  */}
              <div className="w-full rounded-2xl bg-white p-3 shadow space-y-3">
                <div className="">
                  <h2 className="text-lg font-semibold pl-2 mb-2">
                    More Links
                  </h2>
                  {[
                    {
                      label: "Latest Phones",
                      link: "/main/all?ReleaseDate=available",
                    },
                    {
                      label: "Upcoming Mobile Phones",
                      link: "/main/all?ReleaseDate=upcomming",
                    },
                    {
                      label: "New Phones by " + product?.brand,
                      link: `/main/all?ReleaseDate=available&Brand=${product?.brand}`,
                    },
                    {
                      label: "Best Phones Under ₹10,000",
                      link: "/main/all?ReleaseDate=available&sort=totalscore&Price=0-10000",
                    },
                    {
                      label: "Best Phones Under ₹15,000",
                      link: "/main/all?ReleaseDate=available&sort=totalscore&Price=0-15000",
                    },
                    {
                      label: "Best Phones Under ₹20,000",
                      link: "/main/all?ReleaseDate=available&sort=totalscore&Price=0-20000",
                    },
                    {
                      label: "Best Phones Under ₹25,000",
                      link: "/main/all?ReleaseDate=available&sort=totalscore&Price=0-25000",
                    },
                    {
                      label: "Best Phones Under ₹30,000",
                      link: "/main/all?ReleaseDate=available&sort=totalscore&Price=0-30000",
                    },
                    {
                      label: "Best Camera Phones Under ₹20,000",
                      link: "/main/all?ReleaseDate=available&sort=camerascore&Price=0-20000",
                    },
                    {
                      label: "Best Camera Phones Under ₹30,000",
                      link: "/main/all?ReleaseDate=available&sort=camerascore&Price=0-30000",
                    },
                    {
                      label: "Good Selfie Camera Phones",
                      link: "/main/all?ReleaseDate=available&sort=camerascore&Camera=selfie",
                    },
                    {
                      label: "Best Video Recording Phones",
                      link: "/main/all?ReleaseDate=available&Camera=video4k&sort=camerascore",
                    },

                    // 🎮 Gaming Focused
                    {
                      label: "Best Gaming Phones Under ₹20,000",
                      link: "/main/all?ReleaseDate=available&sort=performancescore&Gaming=bestGaming",
                    },
                    {
                      label: "Best Gaming Phones Under ₹30,000",
                      link: "/main/all?ReleaseDate=available&sort=performancescore&Gaming=bestGaming&Price=0-30000",
                    },
                    {
                      label: "High Performance Gaming Phones",
                      link: "/main/all?ReleaseDate=available&sort=performancescore&Gaming=bestGaming%2ChighFps",
                    },

                    // 🔋 Battery & Display
                    {
                      label: "Best Battery Backup Phones",
                      link: "/main/all?ReleaseDate=available&sort=batteryscore&Battery=mah5000Plus",
                    },
                    {
                      label: "Fast Charging Phones",
                      link: "/main/all?ReleaseDate=available&sort=pricelh&Battery=fastCharge67",
                    },
                    {
                      label: "AMOLED Display Phones",
                      link: "/main/all?ReleaseDate=available&sort=pricelh&Display=amoled",
                    },
                    {
                      label: "120Hz Display Phones",
                      link: "/main/all?ReleaseDate=available&sort=pricelh&Display=hz120",
                    },
                  ].map((item, i) => (
                    <Link
                      key={i}
                      prefetch={false}
                      href={item?.link}
                      className="block text-sm w-full p-2  lg:hover:text-theme"
                    >
                      {item?.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div id={comparisontitle.label}>
            <Comparewith product={product} />
          </div>
          {/* description */}
          {seodata ? (
            <div
              className="text mt-10"
              dangerouslySetInnerHTML={{ __html: Metakeywordsreplacer(html) }}
            />
          ) : (
            <Fallbackreview product={product} />
          )}
        </div>
        {tokenRes?.verified && (
          <Seoeditbutton editdata={seodata} seokey={seokey} />
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
    </Pagectxwrapper>
  );
}

const yesNo = (v) => (v ? "✅ Yes" : "❌ No");

function Video({ src }) {
  if (!src) return null;
  return <iframe src={src} className="w-full h-56 rounded-xl" loading="lazy" />;
}

const join = (...parts) => parts.filter(Boolean).join(" ");

const joinComma = (...parts) => parts.filter(Boolean).join(", ");
const generateMetaTitle = (p) => {
  const title = join(p.model, p.variant && `(${p.variant})`);

  const highlight =
    p.chipset ||
    (p.RearCameramegapixels && `${p.RearCameramegapixels}MP Camera`) ||
    (p.batteryCapacity && `${p.batteryCapacity}mAh Battery`);

  return join(
    title,
    highlight && "–",
    highlight,
    "| Price, Specs & Comparison",
  ).slice(0, 60);
};
const generateMetaDescription = (p) => {
  return join(
    `Check ${p.model} full specifications, price in India,`,
    p.display?.[0]?.size && `${p.display[0].size}" display,`,
    p.RearCameramegapixels && `${p.RearCameramegapixels}MP camera,`,
    p.batteryCapacity && `${p.batteryCapacity}mAh battery,`,
    "pros & cons and best alternatives.",
  ).slice(0, 160);
};

const generateMetaKeywords = (p) => {
  return joinComma(
    `${p.brand} ${p.model}`,
    `${p.brand} ${p.model} price`,
    `${p.brand} ${p.model} specifications`,
    `${p.brand} ${p.model} review`,
    `${p.brand} ${p.model} comparison`,
    p.chipset,
    p.gpu,
    p.os && `${p.os} phone`,
  );
};

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const product = await CachedProduct(id);

  const seokey = `SEO-${product?.model}`;
  const seodata = await getseodata(seokey);

  const ogImage = product?.images[0] || null;
  return {
    title: Metakeywordsreplacer(seodata?.title || generateMetaTitle(product)),
    description: Metakeywordsreplacer(
      seodata?.metadesc || generateMetaDescription(product),
    ),
    keywords: Metakeywordsreplacer(
      seodata?.keywords || generateMetaKeywords(product),
    ),
    openGraph: {
      images: ogImage,
    },
    alternates: {
      canonical: "https://tecknologia.in/main/product/" + id,
    },
  };
};
