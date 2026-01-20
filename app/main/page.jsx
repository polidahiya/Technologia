import Link from "next/link";
import Nextimage from "../_globalcomps/Nextimage";
import Priceselection from "./_comps/Priceselection";
import Latestphones from "./_comps/Latestphones";
import Getproducts from "@/lib/Getproducts";
import Homepagedesc from "./_comps/Homepagedesc";
import Topcomparisons from "./_comps/Topcomparisons";
import {
  Zap,
  Camera,
  Gamepad2,
  Signal,
  CreditCard,
  MemoryStick,
  HardDrive,
  Smartphone,
  RefreshCcw,
  BatteryCharging,
} from "lucide-react";

export default async function HomePage() {
  const latestproducts = await Getproducts();

  const priceChips = [
    { label: "Below ₹10,000", value: "0-10000" },
    { label: "₹15,000", value: "0-15000" },
    { label: "₹20,000", value: "0-20000" },
    { label: "₹25,000", value: "0-25000" },
    { label: "₹30,000", value: "0-30000" },
    { label: "₹40,000", value: "0-40000" },
    { label: "₹50,000", value: "0-50000" },
  ];

  const features = [
    {
      title: "Flagship Performance",
      link: "/main/all?Performance=flagship",
      img: "/moreimages/phone.jpg",
      icon: Zap,
      color: "bg-linear-to-r from-purple-100 to-white border border-purple-300",
    },
    {
      title: "Best Camera Phones",
      link: "/main/all?Camera=bestCamera",
      img: "/moreimages/phone.jpg",
      icon: Camera,
      color: "bg-linear-to-r from-purple-100 to-white border border-purple-300",
    },
    {
      title: "Best Gaming Phones",
      link: "/main/all?Gaming=bestGaming",
      img: "/moreimages/phone.jpg",
      icon: Gamepad2,
      color: "bg-linear-to-r from-purple-100 to-white border border-purple-300",
    },
    {
      title: "5G Phones",
      link: "/main/all?Connectivity=fiveG",
      img: "/moreimages/phone.jpg",
      icon: Signal,
      color: "bg-linear-to-r from-purple-100 to-white border border-purple-300",
    },
    {
      title: "eSIM Support",
      link: "/main/all?Connectivity=esim",
      img: "/moreimages/phone.jpg",
      icon: CreditCard,
      color: "bg-linear-to-r from-purple-100 to-white border border-purple-300",
    },
    {
      title: "8GB RAM",
      link: "/main/all?Memory=ram8Plus",
      img: "/moreimages/phone.jpg",
      icon: MemoryStick,
      color: "bg-linear-to-r from-purple-100 to-white border border-purple-300",
    },
    {
      title: "256GB Storage",
      link: "/main/all?Memory=storage256Plus",
      img: "/moreimages/phone.jpg",
      icon: HardDrive,
      color: "bg-linear-to-r from-purple-100 to-white border border-purple-300",
    },
    {
      title: "AMOLED Display",
      link: "/main/all?Display=amoled",
      img: "/moreimages/phone.jpg",
      icon: Smartphone,
      color: "bg-linear-to-r from-purple-100 to-white border border-purple-300",
    },
    {
      title: "120Hz (Super Smooth Display)",
      link: "/main/all?Display=hz120",
      img: "/moreimages/phone.jpg",
      icon: RefreshCcw,
      color: "bg-linear-to-r from-purple-100 to-white border border-purple-300",
    },
    {
      title: "Wireless Charging",
      link: "/main/all?Battery=wireless",
      img: "/moreimages/phone.jpg",
      icon: BatteryCharging,
      color: "bg-linear-to-r from-purple-100 to-white border border-purple-300",
    },
  ];

  const brands = [
    {
      name: "Apple",
      img: "/brands/1763016542_Apple.png",
      link: "/main/all?Brand=apple",
    },
    {
      name: "Samsung",
      img: "/brands/1583216214_Samsung.avif",
      link: "/main/all?Brand=samsung",
    },
    {
      name: "Xiaomi",
      img: "/brands/1763016604_MI.png",
      link: "/main/all?Brand=xiaomi",
    },
    {
      name: "Motorola",
      img: "/brands/1758304370_1758303907.avif",
      link: "/main/all?Brand=motorola",
    },

    {
      name: "Realme",
      img: "/brands/1761805391_realme.avif",
      link: "/main/all?Brand=realme",
    },

    {
      name: "Google",
      img: "/brands/google.png",
      link: "/main/all?Brand=google",
    },

    {
      name: "OPPO",
      img: "/brands/1763016167_OPPO.png",
      link: "/main/all?Brand=oppo",
    },
    {
      name: "OnePlus",
      img: "/brands/1763016567_OnePlus.avif",
      link: "/main/all?Brand=oneplus",
    },
    {
      name: "IQOO",
      img: "/brands/1763016387_iQOO.png",
      link: "/main/all?Brand=iqoo",
    },

    {
      name: "vivo",
      img: "/brands/1763016653_vivo.avif",
      link: "/main/all?Brand=vivo",
    },
  ];

  const res = await fetch(
    `https://newsapi.org/v2/everything?q=smartphone OR android OR iphone&pageSize=6&apiKey=${process.env.NEWS_API_KEY}`,
    { next: { revalidate: 3600 } } // cache 1 hour
  );

  const newsdata = await res.json();

  return (
    <main className="min-h-screen p-2 max-w-7xl mx-auto space-y-2">
      {/* Top Section */}
      <div className="grid lg:grid-cols-3 gap-2 ">
        {/* Finder */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Price Slider */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Let’s Find a Mobile For You!
              </h2>
              <Priceselection usepath="/main/all" />
            </div>

            {/* Popular Features */}
            <div>
              <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-scroll">
                {features.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      prefetch={false}
                      key={i}
                      href={item.link}
                      className={`flex items-center gap-3 border rounded-xl p-2 hover:shadow cursor-pointer ${item.color}`}
                    >
                      <Icon className="w-5 h-5 rounded"></Icon>
                      <span className="font-medium">{item?.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="font-semibold mb-4">What are you looking to buy?</h3>
          <div className="grid grid-cols-2 gap-2 mb-6">
            {[
              {
                title: "Mobiles",
                link: "/main/all?Device=smartphone",
                img: "/moreimages/phone.jpg",
                color:
                  "bg-linear-to-r from-yellow-100 to-white border border-yellow-300",
              },
              {
                title: "Tablets",
                link: "/main/all?Device=tablet",
                img: "/moreimages/tablet.png",
                color:
                  "bg-linear-to-r from-pink-100 to-white border border-pink-300",
              },
            ].map((item, i) => (
              <Link
                prefetch={false}
                key={i}
                href={item.link}
                className={`flex items-center gap-3 border rounded-xl p-2 hover:shadow cursor-pointer ${item.color}`}
              >
                <Nextimage
                  src={item.img}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="w-10 h-10 bg-gray-200 rounded"
                ></Nextimage>
                <span className="font-medium">{item?.title}</span>
              </Link>
            ))}
          </div>

          <h3 className="font-semibold mb-3">Mobiles by Price</h3>
          <div className="flex flex-wrap gap-2">
            {priceChips.map((p, i) => (
              <Link
                prefetch={false}
                key={i}
                href={`/main/all?Price=${p.value}`}
                className="px-3 py-1 border border-slate-300 rounded-lg text-sm hover:bg-gray-100 cursor-pointer"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Featured Mobile Brands</h3>
          <Link
            prefetch={false}
            href="/main/all"
            className="text-theme font-medium px-5"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {brands.map((b, i) => (
            <Link prefetch={false} href={b.link} key={i}>
              <div className=" rounded-xl p-4 hover:shadow cursor-pointer bg-gray-100 flex items-center justify-center">
                <Nextimage
                  src={b.img}
                  alt={b.name}
                  height={40}
                  width={100}
                  loading="lazy"
                  className="h-20 object-contain mix-blend-multiply"
                />
              </div>
              <p className="text-sm font-medium text-center mt-2">{b.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* latest */}
      <Latestphones products={latestproducts.products} />
      <Topcomparisons />

      {/* Tech News */}
      <section className="bg-white rounded-2xl p-6 shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Latest Tech News</h3>
          <a href="/tech-news" className="text-theme font-medium px-5">
            View All
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsdata?.articles?.slice(0, 6).map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-300 overflow-hidden hover:shadow-md transition cursor-pointer"
            >
              {/* Image */}
              <div className="h-40 bg-gray-200 overflow-hidden">
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="font-semibold mb-2 line-clamp-2">
                  {article.title}
                </h4>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {article.description || "Read more about this tech update."}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-400">
                    {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-xs text-gray-500">
                    {article.source?.name}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
      <Homepagedesc />
    </main>
  );
}
