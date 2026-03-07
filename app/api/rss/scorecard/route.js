"use server";
import Getproducts from "@/lib/Getproducts";
import Scorecalculator from "@/app/_globalcomps/scorescalculator/Scorecalculator";
import { Getautofillvalues } from "@/lib/autofillvaluesfn";
const domain = "https://tecknologia.in";

const getBestStoreLink = (priceArray, fallbackLink) => {
  if (!priceArray || priceArray.length === 0) return fallbackLink;

  const availableStores = priceArray.filter(
    (store) => store.status === "Available",
  );

  if (availableStores.length === 0) return fallbackLink;

  const lowest = availableStores.reduce((min, store) =>
    Number(store.sp) < Number(min.sp) ? store : min,
  );

  return lowest.link || fallbackLink;
};

function escapeXml(str) {
  return str
    ?.replace(/&/g, "&amp;")
    ?.replace(/</g, "&lt;")
    ?.replace(/>/g, "&gt;")
    ?.replace(/"/g, "&quot;")
    ?.replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    const allproducts = await Getproducts(
      "",
      {},
      "default",
      10000,
      false,
      false,
    );
    const autofillvalues = await Getautofillvalues();
    const today = new Date(); // Get today's date

    const posts = await Promise.all(
      allproducts?.products?.map(async (p) => {
        const productLink = getBestStoreLink(
          p?.price,
          `${domain}/main/product/${p?._id}`,
        );
        const scores = await Scorecalculator(p, autofillvalues);
        const imageurl = escapeXml(
          `https://tecknologia.in/api/og?title=${encodeURIComponent(p?.model)}&brand=${encodeURIComponent(p?.brand)}&chipset=${encodeURIComponent(p?.chipset)}&battery=${encodeURIComponent(p?.batteryCapacity)}&refresh=${encodeURIComponent(p?.display?.[0]?.refreshRate)}&price=${encodeURIComponent(p?.price?.[0]?.sp)}&display=${encodeURIComponent(scores?.displayscore)}&performance=${encodeURIComponent(scores?.performancescore)}&camera=${encodeURIComponent(scores?.camerascore)}&batteryScore=${encodeURIComponent(scores?.batteryscore)}&connectivity=${encodeURIComponent(scores?.connectionscore)}&image=${encodeURIComponent(p?.images[0].replace("/upload/", "/upload/f_png/"))}`,
        );

        return {
          title: p?.model,
          link: productLink,
          description: `${p?.model} smartphone features a ${p?.display?.[0]?.size}-inch ${p?.display?.[0]?.type} display with ${p?.display?.[0]?.refreshRate}Hz refresh rate and ${p?.display?.[0]?.screenProtection}. Powered by the ${p?.chipset} with ${p?.ram}GB RAM and ${p?.storage} storage, it delivers flagship performance. The ${p?.RearCameramegapixelsDetails.trim()} camera system supports ${p?.RearCameravideoRecording.split(",")[0]}. A ${p?.batteryCapacity}mAh ${p?.batteryType} with ${p?.ChargeSpeed}W fast charging keeps it running all day. With ${p?.waterResistance}, ${p?.wifiVersion}, and Android ${p?.osVersion}, it offers a sleek ${p?.thickness}mm premium design.`,
          pubDate: today.toUTCString(), // Convert to proper date string
          imageUrl: imageurl,
        };
      }),
    );

    const rssFeed = `
      <?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>Tecknologia - Latest Smartphones, Tablets and Mobile Processors</title>
          <link>${domain}</link>
          <description>
          Discover and compare the latest smartphones, tablets, and mobile processors on Tecknologia. Explore detailed specifications, performance scores, camera capabilities, battery life, and connectivity features to find the best device for your needs.
          </description>
          <language>en-us</language>
          ${posts
            .map(
              (post) => `
           <item>
            <title><![CDATA[${post.title}]]></title>
            <link>${post.link}</link>
            <guid>${post.link}</guid>
            <description><![CDATA[${post.description}]]></description>
            <pubDate>${post.pubDate}</pubDate>
            <enclosure url="${post.imageUrl}" type="image/png" />
          </item>
          `,
            )
            .join("")}
        </channel>
      </rss>
    `.trim();

    return new Response(rssFeed, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
