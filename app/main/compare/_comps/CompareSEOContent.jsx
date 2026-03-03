export default function CompareSEOContent({ product }) {
  if (!product) return <EmptyCompareSEOContent />;

  const display = product.display?.[0];

  return (
    <div className="compare-seo-content text">
      <h2>
        Compare {product.model} ({product.variant})
      </h2>

      <p>
        Looking to compare the <strong>{product.model}</strong> with other
        smartphones or tablets? Tecknologia’s advanced comparison tool allows
        you to analyze specifications, features, pricing, and performance
        side-by-side to make a smarter buying decision.
      </p>

      <h3>Display & Design Comparison</h3>
      <p>
        The {product.model} features a {display?.size && `${display.size}-inch`}{" "}
        {display?.type} display
        {display?.refreshRate && ` with ${display.refreshRate}Hz refresh rate`}
        {display?.Brightness &&
          ` and peak brightness up to ${display.Brightness} nits`}
        .
        {display?.screenProtection &&
          ` It is protected by ${display.screenProtection}.`}
      </p>

      <p>
        When compared side-by-side with other devices, you can instantly
        evaluate differences in display size, resolution, refresh rate,
        brightness levels, and screen protection.
      </p>

      <h3>Performance & Hardware Comparison</h3>
      <p>
        Powered by the <strong>{product.chipset}</strong>
        {product.maxCpuClockSpeed &&
          ` clocked up to ${product.maxCpuClockSpeed}GHz`}{" "}
        and paired with <strong>{product.gpu}</strong>, the device delivers
        powerful performance for gaming and multitasking.
      </p>

      <p>
        With {product.ram}GB {product.ramType} RAM and {product.storage}{" "}
        {product.storageType} storage, you can compare real-world speed,
        benchmark scores, GPU capabilities, and storage technologies easily
        using our 3-slot comparison system.
      </p>

      <h3>Camera Comparison</h3>
      <p>
        The {product.model} comes with a {product.RearCameramegapixels}MP rear
        camera setup
        {product.RearCameramegapixelsDetails &&
          ` (${product.RearCameramegapixelsDetails})`}
        .
        {product.frontCameramegapixels &&
          ` It also features a ${product.frontCameramegapixels}MP front camera.`}
      </p>

      <p>
        Compare camera megapixels, optical zoom, OIS support, and video
        recording capabilities like {product.RearCameravideoRecording} across
        multiple devices to find the best photography smartphone.
      </p>

      <h3>Battery & Charging</h3>
      <p>
        Equipped with a {product.batteryCapacity}mAh {product.batteryType}{" "}
        battery,
        {product.ChargeSpeed && ` ${product.ChargeSpeed}W fast charging`}
        {product.wirelessCharging && ", wireless charging support"}
        {product.reverseCharging && ", and reverse charging capability"}.
      </p>

      <h3>Software & Connectivity</h3>
      <p>
        Running on {product.os} {product.osVersion},
        {product.updateYears && ` with ${product.updateYears}`}, the{" "}
        {product.model} ensures long-term software support.
      </p>

      <p>
        It supports {product.has5G && "5G connectivity, "}
        {product.wifiVersion && product.wifiVersion + ", "}
        {product.bluetoothVersion && `Bluetooth ${product.bluetoothVersion}, `}
        {product.nfc && "NFC, "}
        and {product.usbType}.
      </p>

      <p>
        Start comparing the {product.model} with other smartphones now and find
        out which device truly matches your needs and budget.
      </p>
    </div>
  );
}

function EmptyCompareSEOContent() {
  return (
    <div className="compare-seo-content text">
      <h2>Compare Smartphones & Tablets Side by Side</h2>

      <p>
        Welcome to Tecknologia’s advanced smartphone and tablet comparison tool.
        If you're looking to compare phones online before making a purchase
        decision, you're in the right place. Our side-by-side mobile comparison
        platform allows you to analyze specifications, features, pricing, and
        performance details in a clear and structured format.
      </p>

      <p>
        Choosing the right smartphone can be confusing with so many brands,
        processors, camera systems, and battery technologies available in the
        market. Whether you’re comparing flagship devices, mid-range phones,
        budget smartphones, or premium tablets, our comparison tool helps you
        make smarter and faster buying decisions.
      </p>

      <h3>What Can You Compare?</h3>
      <p>
        Our tool allows you to compare up to three devices at the same time. You
        can evaluate differences in:
      </p>

      <ul>
        <li>Display size, resolution, refresh rate, and brightness</li>
        <li>Processor, GPU, and benchmark performance scores</li>
        <li>RAM, storage type, and expandability</li>
        <li>Camera specifications and video recording capabilities</li>
        <li>Battery capacity and fast charging support</li>
        <li>Operating system and software update policies</li>
        <li>5G connectivity, Wi-Fi version, Bluetooth, and NFC</li>
        <li>Build quality, weight, thickness, and water resistance</li>
      </ul>

      <h3>Why Use Tecknologia’s Comparison Tool?</h3>
      <p>
        Unlike basic specification tables, our comparison engine presents
        structured, easy-to-read data that highlights key differences between
        devices instantly. You don’t have to switch between multiple tabs or
        websites — everything is visible in one place.
      </p>

      <p>
        We also provide updated pricing information for India, popular
        comparison links, and trending device matchups so you can quickly
        discover what other users are comparing. This makes it easier to find
        the best alternative to any smartphone or tablet.
      </p>

      <h3>Perfect for Every Type of Buyer</h3>
      <p>
        Whether you're a gamer looking for high FPS performance, a photography
        enthusiast searching for the best camera phone, a student wanting a
        budget device, or a professional comparing productivity tablets, this
        tool is designed for you.
      </p>

      <p>
        Our database includes the latest smartphones, upcoming releases,
        flagship devices, and budget-friendly options. As new models launch,
        they are added to the comparison system so you always have access to
        up-to-date specifications.
      </p>

      <h3>How to Start Comparing?</h3>
      <p>
        Simply select a device in the first slot and add up to two more products
        to begin your side-by-side comparison. You can also explore predefined
        popular comparisons to quickly check trending matchups.
      </p>

      <p>
        Start comparing smartphones and tablets now on Tecknologia and find the
        perfect device that matches your needs, performance expectations, and
        budget.
      </p>
    </div>
  );
}
