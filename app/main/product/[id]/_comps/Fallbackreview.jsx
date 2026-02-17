import React from "react";

const Fallbackreview = ({ product }) => {
  const display = product?.display?.[0] || {};
  const priceData = product?.price?.[0] || {};

  const releaseYear = product?.releaseDate
    ? new Date(product?.releaseDate).getFullYear()
    : "";

  const isTablet = product?.deviceType?.toLowerCase() === "tablet";
  const price = Number(priceData?.sp) || 0;

  const segment =
    price <= 15000 ? "budget" : price <= 30000 ? "midrange" : "flagship";

  const hasWirelessCharging = product?.wirelessCharging;
  const has5G = product?.has5G;

  const segmentIntro = {
    budget: isTablet
      ? "It focuses on essential features, long battery life, and affordable performance for everyday use."
      : "It focuses on delivering essential features, strong battery life, and reliable everyday performance at an affordable price.",
    midrange: isTablet
      ? "It strikes a balance between performance and multimedia features without flagship pricing."
      : "It aims to balance performance, camera quality, and modern features without entering flagship pricing territory.",
    flagship: isTablet
      ? "It is designed for top-tier performance, productivity, and entertainment experiences."
      : "It is designed to deliver top-tier performance, premium build quality, and cutting-edge features for power users.",
  };

  return (
    <div className="text mt-10 space-y-6">
      {/* Intro */}
      <p>
        <strong>
          {product?.model} {product?.variant}
        </strong>{" "}
        is a {product?.deviceType?.toLowerCase()} launched in {releaseYear}.{" "}
        {segmentIntro[segment]} Priced around {priceData?.currency}{" "}
        {priceData?.sp}, it features a {display?.size}-inch {display?.type}{" "}
        {isTablet ? "panel ideal for immersive experiences" : "display"},
        {product?.chipset} processor, and a {product?.batteryCapacity}mAh
        battery.
      </p>

      {/* Display */}
      <h2>Display & Design</h2>
      <p>
        The device offers a {display?.size}-inch {display?.type} panel with a
        resolution of {display?.pixelx} × {display?.pixely} pixels and a
        {display?.refreshRate}Hz refresh rate.
        {isTablet
          ? " Its expansive screen makes it ideal for watching videos, multitasking, and productivity apps."
          : " The display adapts well for both media and gaming on the go."}
        With {display?.Brightness} nits peak brightness and{" "}
        {display?.screenProtection}, the display performs well in varied
        lighting conditions.
      </p>

      {/* Performance */}
      <h2>Performance & Hardware</h2>
      <p>
        Under the hood, it runs on the {product?.chipset} processor paired with{" "}
        {product?.ram}GB {product?.ramType} RAM and {product?.storage}{" "}
        {product?.storageType} storage.{" "}
        {isTablet
          ? "The performance ensures smooth multitasking, boosting productivity and entertainment."
          : "This setup handles daily tasks, streaming, and gaming smoothly."}
        {has5G && !isTablet && " It also supports 5G connectivity."}{" "}
        Connectivity includes{" "}
        {isTablet
          ? product?.wifiVersion
          : `${product?.wifiVersion}, Bluetooth ${product?.bluetoothVersion}`}
        .
      </p>

      {/* Camera */}
      {!isTablet && (
        <>
          <h2>Camera Performance</h2>
          <p>
            The smartphone comes with a {product?.RearCameramegapixelsDetails}{" "}
            setup. The {product?.RearCameramegapixels}MP primary camera captures
            detailed images and supports {product?.RearCameravideoRecording}.
            For selfies, you get a {product?.frontCameramegapixels}MP front
            camera with {product?.frontCameravideoRecording} support.
          </p>
        </>
      )}

      {isTablet && (
        <>
          <h2>Camera Performance</h2>
          <p>
            Tablets typically focus more on productivity and video calls than
            high-end photography. This device includes a capable camera setup
            for clear videos and everyday snapping needs.
          </p>
        </>
      )}

      {/* Battery */}
      <h2>Battery & Charging</h2>
      <p>
        A large {product?.batteryCapacity}mAh battery powers the device,
        offering prolonged usage for work or entertainment. It supports{" "}
        {product?.ChargeSpeed}W wired charging and{" "}
        {hasWirelessCharging ? "wireless charging" : "no wireless charging"}.
      </p>

      {/* Software */}
      <h2>Software & Features</h2>
      <p>
        It runs on {product?.os} {product?.osVersion}, promising{" "}
        {product?.updateYears}. Additional features include{" "}
        {product?.waterResistance}, and {product?.speakers} speaker(s).{" "}
        {isTablet
          ? "Tablets often prioritize big immersive sound and app flexibility."
          : " Phones blend portability with connectivity features on the go."}
      </p>

      {/* Verdict */}
      <h2>Final Verdict</h2>
      <p>
        The {product?.model} is a{" "}
        {segment === "budget"
          ? "value-oriented device"
          : segment === "midrange"
            ? "balanced performer"
            : "powerful flagship"}{" "}
        that delivers solid performance.{" "}
        {isTablet
          ? "Its large display is great for media, work, and multitasking."
          : "Its balanced hardware and features make it suitable for everyday use."}
      </p>
    </div>
  );
};

export default Fallbackreview;
