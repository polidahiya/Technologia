import Link from "next/link";

export default function Footer() {
  const footerData = {
    brand: {
      name: "Tecknologia",
      description:
        "Tecknologia provides smartphone and gadget comparisons based on publicly available specifications, price trends, and independent research.",
    },

    sections: [
      {
        title: "Compare",
        links: [
          { label: "Best Phones", href: "/main/all?Performance=flagship" },
          { label: "Best Gaming Phones", href: "/main/all?Gaming=bestGaming" },
          { label: "Best Camera Phones", href: "/main/all?Camera=bestCamera" },
          { label: "Latest Mobiles", href: "/main/all" },
        ],
      },
      {
        title: "Categories",
        links: [
          { label: "Mobiles", href: "/main/all?Device=smartphone" },
          { label: "Tablets", href: "/main/all?Device=tablet" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "About Us", href: "/main/Aboutus" },
          { label: "Privacy Policy", href: "/main/Privacy" },
          {
            label: "Terms & Conditions",
            href: "/main/Terms&Conditions",
          },
          { label: "Disclaimer", href: "/main/Disclaimer" },
        ],
      },
    ],
  };

  return (
    <div className="mt-14">
      <p className="py-5 px-2 max-w-6xl text-sm mx-auto text-center">
        Some links on this page are affiliate links. If you purchase through
        them, we may earn a small commission at no extra cost to you.
      </p>

      <footer className=" bg-[#191918] text-gray-300">
        <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-3">
              {footerData.brand.name}
            </h3>
            <p className="text-sm text-gray-400">
              {footerData.brand.description}
            </p>
          </div>

          {/* Sections */}
          {footerData.sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-medium mb-3">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-theme transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
            <span>
              © {new Date().getFullYear()} Tecknologia. All rights reserved.
            </span>
            <span className="mt-2 sm:mt-0">Built for tech enthusiasts</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
