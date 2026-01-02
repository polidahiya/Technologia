import React from "react";
import { social } from "@/lib/data";

const TermsAndConditions = () => {
  return (
    <div classname="text">
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to <strong>Tecknologia</strong> (“we”, “our”, “us”). By
        accessing or using <strong>https://tecknologia.in</strong> (the
        “Website”), you agree to be bound by these Terms and Conditions. If you
        do not agree with any part of these terms, please do not use the
        Website.
      </p>
      <h2>1. Use of the Website</h2>
      <p>
        Tecknologia provides users with product comparisons, product
        specifications, and informational content related to technology and
        consumer products.
      </p>
      <p>
        All information on this Website is provided for general informational
        purposes only. We do not guarantee that product details, prices, or
        availability are always accurate, complete, or up to date.
      </p>
      <h2>2. No Professional or Purchase Advice</h2>
      <p>
        The content on Tecknologia does not constitute professional, financial,
        or purchasing advice. Users should verify product information directly
        from the manufacturer or seller before making a purchase.
      </p>
      <h2>3. Advertisements and Affiliate Links</h2>
      <p>
        Tecknologia generates revenue through third-party advertisements such as
        Google Ads, Monetag, and affiliate marketing programs including Amazon
        Affiliate and Flipkart Affiliate.
      </p>
      <p>
        Some links on the Website may be affiliate links. If you click on these
        links and make a purchase, we may earn a commission at no extra cost to
        you.
      </p>
      <h2>4. Third-Party Websites</h2>
      <p>
        The Website may contain links to third-party websites. We are not
        responsible for the content, privacy policies, or practices of any
        third-party websites.
      </p>
      <h2>5. User Data and Privacy</h2>
      <p>
        We respect user privacy. We do not sell, trade, or share personal user
        data with third parties. Advertising partners may use cookies or similar
        technologies to display relevant ads.
      </p>
      <h2>6. Intellectual Property</h2>
      <p>
        All content on Tecknologia, including text, logos, design, layout, and
        graphics, is the property of Tecknologia unless otherwise stated. You
        may not reproduce or distribute any content without permission.
      </p>
      <h2>7. Limitation of Liability</h2>
      <p>
        Tecknologia is not liable for any direct or indirect loss, errors, or
        omissions in product information, or damages resulting from reliance on
        Website content.
      </p>
      <h2>8. Availability and Changes</h2>
      <p>
        We reserve the right to modify or discontinue any part of the Website or
        update these Terms and Conditions at any time without prior notice.
      </p>
      <h2>9. Governing Law</h2>
      <p>These Terms and Conditions are governed by the laws of India.</p>
      <h2>10. Contact Information</h2>
      <p>
        If you have any questions about these Terms and Conditions, you may
        contact us at:
      </p>
      <p>
        <strong>Email:</strong>  {social?.contactmail}
      </p>
    </div>
  );
};

export default TermsAndConditions;
