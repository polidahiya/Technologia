// app/viral-tech-products/page.jsx

import Link from "next/link";

export const metadata = {
  title: "Viral Tech Products – Trending Gadgets & Best Deals",
  description:
    "Discover viral tech products in India with latest pricing and platform availability. Find trending gadgets with affiliate deals on Amazon and Flipkart.",
};

const products = [
  {
    id: 1,
    name: "Wipro 16A WiFi Smart Plug",
    price: "₹799",
    tag: "Trending",
    image: "/products/smartplug.jpg",
    platforms: [
      { name: "Amazon", link: "https://amazon.in/your-affiliate-link" },
      { name: "Flipkart", link: "https://flipkart.com/your-affiliate-link" },
    ],
  },
  {
    id: 2,
    name: "boAt Airdopes ANC 141",
    price: "₹1,299",
    tag: "Best Seller",
    image: "/products/boat.jpg",
    platforms: [
      { name: "Amazon", link: "https://amazon.in/your-affiliate-link" },
    ],
  },
  {
    id: 3,
    name: "Mini Portable Projector",
    price: "₹4,999",
    tag: "Hot Deal",
    image: "/products/projector.jpg",
    platforms: [
      { name: "Amazon", link: "https://amazon.in/your-affiliate-link" },
      { name: "Flipkart", link: "https://flipkart.com/your-affiliate-link" },
    ],
  },
];

export default function ViralTechProductsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Viral Tech Products
      </h1>

      <p className="text-gray-600 mb-6">
        Discover trending and viral tech gadgets available online. Prices and
        availability may change. Updated regularly.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="relative">
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {product.tag}
              </span>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mb-4"
              />
            </div>

            <h2 className="font-semibold text-lg mb-2">
              {product.name}
            </h2>

            <p className="text-xl font-bold mb-4">{product.price}</p>

            <div className="flex gap-2 flex-wrap">
              {product.platforms.map((platform, index) => (
                <Link
                  key={index}
                  href={platform.link}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="bg-black text-white text-sm px-4 py-2 rounded hover:opacity-80 transition"
                >
                  Buy on {platform.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
