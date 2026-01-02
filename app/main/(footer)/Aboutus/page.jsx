import { social } from "@/lib/data";
export default function AboutUsPage() {
  return (
    <main className="text">
      <h1>About Tecknologia</h1>

      <p>
        Tecknologia is a technology-focused platform built to help users compare
        smartphones and gadgets with clarity and confidence. Our goal is to
        simplify complex specifications, highlight meaningful differences, and
        make technology decisions easier for everyone.
      </p>

      <h2>What We Do</h2>

      <p>
        We provide detailed comparisons of smartphones and consumer electronics
        based on publicly available specifications, feature sets, and price
        trends. Tecknologia allows users to explore devices by brand, price,
        features, and performance categories to find products that best match
        their needs.
      </p>

      <h2>How We Make Money</h2>

      <p>
        Tecknologia earns revenue through third-party advertising networks and
        affiliate partnerships. Some links on our website may be affiliate
        links, meaning we may earn a commission if you make a purchase through
        them, at no additional cost to you.
      </p>

      <h2>Editorial Independence</h2>

      <p>
        Our content is created with editorial independence. While we may earn
        commissions from affiliate links, this does not influence our opinions,
        comparisons, or the way products are presented. Our aim is to provide
        well-researched and informative content to help users make informed
        decisions.
      </p>

      <h2>Accuracy of Information</h2>

      <p>
        We strive to keep all information on Tecknologia accurate and up to
        date. However, product specifications, prices, and availability may
        change over time. We recommend verifying critical details directly with
        the manufacturer or seller before making a purchase.
      </p>

      <h2>Our Vision</h2>

      <p>
        Our vision is to build a trusted technology resource where users can
        discover, compare, and understand gadgets without confusion. We aim to
        grow Tecknologia into a comprehensive platform covering smartphones,
        tablets, laptops, and other consumer electronics.
      </p>

      <h2>Contact Us</h2>

      <p>
        If you have questions, feedback, or suggestions, you can reach us. We value user feedback
        and continuously work to improve our platform.
      </p>
      <p>
        <strong>Email:</strong> {social?.contactmail}
      </p>
      <p>
        <strong>Website:</strong> https://tecknologia.in
      </p>
    </main>
  );
}
