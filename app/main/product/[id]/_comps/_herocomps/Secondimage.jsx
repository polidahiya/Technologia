export default function ProductSpecImage({ device }) {
  return (
    <div className="w-[500px] h-[500px] bg-white flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={device.images?.[0]}
          alt={device.model}
          className="w-28 h-28 object-contain"
        />

        <div className="flex flex-col">
          <h1 className="text-xl font-bold leading-tight">
            {device.brand} {device.model}
          </h1>
          <p className="text-sm text-gray-500">
            Android {device.osVersion} • Dual SIM • 4G
          </p>

          <p className="mt-2 text-3xl font-extrabold text-black">
            ₹{device.price?.[0]?.sp}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-gray-200" />

      {/* Key Specs Grid */}
      <div className="grid grid-cols-2 gap-y-4 text-sm">
        <SpecBig label="Display" value={`6.74\" IPS LCD`} sub="120Hz • Punch Hole" />
        <SpecBig label="Processor" value="Unisoc T7250" sub="Octa Core" />

        <SpecBig label="Memory" value="4GB + 64GB" sub="LPDDR4X • eMMC" />
        <SpecBig label="Camera" value="13MP Rear" sub="8MP Front" />

        <SpecBig label="Battery" value="5000 mAh" sub="15W Charging" />
        <SpecBig label="Security" value="Side FP" sub="Face Unlock" />
      </div>

      {/* Feature Strip */}
      <div className="mt-auto flex justify-between text-xs text-gray-700">
        <Feature text="120Hz Display" />
        <Feature text="IR Blaster" />
        <Feature text="IP64 Splash" />
        <Feature text="3.5mm Jack" />
      </div>
    </div>
  );
}

const SpecBig = ({ label, value, sub }) => (
  <div>
    <p className="text-gray-500 uppercase tracking-wide text-[11px]">
      {label}
    </p>
    <p className="text-base font-semibold">{value}</p>
    <p className="text-xs text-gray-400">{sub}</p>
  </div>
);

const Feature = ({ text }) => (
  <div className="px-2 py-1 border rounded-md">{text}</div>
);
