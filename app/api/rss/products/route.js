"use server";
import Getproducts from "@/lib/Getproducts";
const domain = "https://tecknologia.in";

export async function GET() {
  try {
    const allproducts = await Getproducts(
      "",
      {},
      "default",
      10000,
      false,
      true,
    );
    const today = new Date(); // Get today's date

    const posts = allproducts?.products?.map((p) => ({
      title: p?.model,
      link: `${domain}/main/product/${p?._id}`,
      description: `${p?.model} smartphone features a ${p?.display?.[0]?.size}-inch ${p?.display?.[0]?.type} display with ${p?.display?.[0]?.refreshRate}Hz refresh rate and ${p?.display?.[0]?.screenProtection}. Powered by the ${p?.chipset} with ${p?.ram}GB RAM and ${p?.storage} storage, it delivers flagship performance. The ${p?.RearCameramegapixelsDetails.trim()} camera system supports ${p?.RearCameravideoRecording.split(",")[0]}. A ${p?.batteryCapacity}mAh ${p?.batteryType} with ${p?.ChargeSpeed}W fast charging keeps it running all day. With ${p?.waterResistance}, ${p?.wifiVersion}, and Android ${p?.osVersion}, it offers a sleek ${p?.thickness}mm premium design.`,
      pubDate: today.toUTCString(), // Convert to proper date string
      imageUrl: p?.images?.[0],
    }));

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
              <link><![CDATA[${post.link}]]></link>
              <description><![CDATA[${post.description}]]></description>
              <pubDate>${post.pubDate}</pubDate>
              <enclosure url="${post.imageUrl}"/>
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
