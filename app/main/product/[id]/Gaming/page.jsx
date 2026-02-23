import React from "react";
import Verification from "@/lib/verification";
import { notFound } from "next/navigation";
import { CachedProduct } from "@/app/_globalcomps/cachedata/cachedProducts";
import { Getautofillvalues } from "@/lib/autofillvaluesfn";
import Scorecalculator from "@/app/_globalcomps/scorescalculator/Scorecalculator";
import { getseodata } from "@/app/_globalcomps/Addseo/Seodata";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import Herosection from "../_comps/Herosection";
import SpecTable from "../_comps/Spectable";
import { icons } from "@/lib/data";
import Topfives from "./_comps/Topfives";
import Metakeywordsreplacer from "@/app/_hooks/Metakeywordsreplcer";
import GamingReview from "./_comps/GamingReview";
import Seoeditbutton from "@/app/_globalcomps/Addseo/Seoeditbutton";
import Floatingshopbutton from "../_comps/Floatingshopbutton";

export default async function page({ params }) {
  const tokenRes = await Verification();
  const { id } = await params;
  if (!id || id == "undefined") notFound();
  //
  const product = await CachedProduct(id);
  if (!product) notFound();

  // autofillvalues
  const autofillvalues = await Getautofillvalues();

  const scores = await Scorecalculator(product, autofillvalues);

  // seo
  const seokey = `SEO-Gaming-${product?.model}`;
  const seodata = await getseodata(seokey);
  const converter = new QuillDeltaToHtmlConverter(seodata?.delta, {});
  const html = converter.convert();

  return (
    <div>
      <div className="min-h-screen py-2 px-2 md:px-0 w-full">
        <div className="max-w-7xl mx-auto space-y-2 w-full">
          <Herosection product={product} tokenRes={tokenRes} scores={scores} />
          <div className="flex flex-col md:flex-row gap-2 w-full items-stretch">
            <div className="md:sticky md:top-20 space-y-2 w-full h-fit">
              {product?.youtubeGamingReview && (
                <section className="bg-white rounded-2xl shadow overflow-hidden">
                  <h2 className="relative flex  items-center gap-2 px-6 py-4 font-extrabold border-b border-slate-200 font-tenor tracking-wider">
                    {icons?.video} Video Reviews
                    <span className="block absolute h-1/2 w-1 bg-theme rounded-r-full top-1/2 left-0 -translate-y-1/2 "></span>
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4  p-6">
                    <Video src={product?.youtubeGamingReview} />
                  </div>
                </section>
              )}
              <SpecTable
                title="Gaming"
                Icon={icons.gaming}
                rows={[
                  ["Dedicated Cooling", yesNo(product?.dedicatedCooling)],
                  ["Gaming Triggers", yesNo(product?.gamingTriggers)],
                  ["Ai Fps Generation", yesNo(product?.AiFpsGeneration)],
                  ["Bypass Charging", yesNo(product?.bypasscharging)],
                ]}
              />

              {product?.gaming?.length > 0 &&
                product?.gaming.map((g, i) => (
                  <SpecTable
                    key={i}
                    title={g.name}
                    Icon={icons.gaming}
                    rows={[
                      ["Max Settings", g?.maxSettings],
                      ["FPS Drop", g?.fpsDrop],
                      ["Temperature Rise", g?.tempratureRaise],
                      ["Battery Drain", g?.batterydrain],
                    ]}
                  />
                ))}
            </div>
            <div className="w-full min-h-full md:w-96 flex flex-col gap-2">
              <Topfives
                price={product?.price}
                deviceType={product?.deviceType}
              />
              <Floatingshopbutton product={product}/>
            </div>
          </div>
        </div>
      </div>
      {/* description */}
      {html ? (
        <div
          className="text mt-10"
          dangerouslySetInnerHTML={{ __html: Metakeywordsreplacer(html) }}
        />
      ) : (
        <GamingReview product={product} />
      )}
      {tokenRes?.verified && (
        <Seoeditbutton editdata={seodata} seokey={seokey} />
      )}
    </div>
  );
}

const yesNo = (v) => (v ? "✅ Yes" : "❌ No");
function Video({ src }) {
  if (!src) return null;
  return <iframe src={src} className="w-full h-56 rounded-xl" loading="lazy" />;
}

function generateProductMeta(product) {
  if (!product) return {};

  const display = product.display?.[0];

  const title = `${product.model} Gaming Review, Specs, Price in India | ${product.chipset} | ${display?.refreshRate}Hz Display`;

  const description = `${product.model} with ${product.chipset}, ${product.ram}GB ${product.ramType} RAM, ${product.batteryCapacity}mAh battery, ${display?.refreshRate}Hz display & ${product.gpu}. Check gaming performance, price & full specs.`;

  const keywords = [
    `${product.model} price in India`,
    `${product.model} gaming review`,
    `${product.model} specifications`,
    `${product.model} AnTuTu score`,
    `${product.chipset} performance`,
    `${display?.refreshRate}Hz display phone`,
    `${product.gpu} gaming`,
    `${product.model} battery life`,
  ].join(", ");

  return {
    title,
    description,
    keywords,
  };
}

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const product = await CachedProduct(id);
  const { title, description, keywords } = generateProductMeta(product);

  const seokey = `SEO-Gaming-${product?.model}`;
  const seodata = await getseodata(seokey);

  const ogImage = product?.images[0] || null;
  return {
    title: Metakeywordsreplacer(seodata?.title || title),
    description: Metakeywordsreplacer(seodata?.metadesc || description),
    keywords: Metakeywordsreplacer(seodata?.keywords || keywords),
    openGraph: {
      images: ogImage,
    },
    alternates: {
      canonical: "https://tecknologia.in/main/product/" + id + "/Gaming",
    },
  };
};
