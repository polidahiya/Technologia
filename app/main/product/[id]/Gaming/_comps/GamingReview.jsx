export default function GamingReview({ product }) {
  if (!product) return null;

  const display = product.display?.[0];

  return (
    <div className="text">
      <h2>🎮 Gaming Review – {product.model}</h2>

      <p>
        The <strong>{product.model}</strong> is powered by{" "}
        <strong>{product.chipset}</strong> paired with{" "}
        <strong>{product.ramType}</strong> RAM and{" "}
        <strong>{product.storageType}</strong> storage.
        {product.antutuscore && (
          <>
            {" "}With an AnTuTu score of approximately{" "}
            <strong>{product.antutuscore}</strong>,
          </>
        )}{" "}
        and the <strong>{product.gpu}</strong> GPU, it delivers strong gaming
        performance in its segment.
      </p>

      {product.gaming?.length > 0 && (
        <>
          <h3>🔥 Performance & Stability</h3>

          {product.gaming.map((game, index) => (
            <p key={index}>
              In <strong>{game.name}</strong>, the device supports{" "}
              <strong>{game.maxSettings}</strong>
              {game.fpsDrop && <> with FPS dropping to {game.fpsDrop}.</>}
              {game.tempratureRaise && (
                <> Temperature rise observed: {game.tempratureRaise}.</>
              )}
              {game.batterydrain && (
                <> Battery drain: {game.batterydrain}.</>
              )}
            </p>
          ))}
        </>
      )}

      {display && (
        <>
          <h3>🖥️ Display & Touch Response</h3>
          <p>
            The {display.size}-inch {display.type} display with a{" "}
            {display.refreshRate}Hz refresh rate ensures smooth gameplay.
            Peak brightness of {display.Brightness} nits enhances visibility.
          </p>
        </>
      )}

      <h3>🔋 Battery & Charging</h3>
      <p>
        The {product.batteryCapacity}mAh {product.batteryType} battery
        provides reliable endurance. Charging speed is {product.ChargeSpeed}W.
      </p>

      <p>
        {product.bypasscharging
          ? "Supports bypass charging for reduced heat during gaming."
          : "Bypass charging is not supported."}
      </p>

      <h3>🎧 Audio</h3>
      <p>
        {product.stereoSpeakers
          ? "Equipped with stereo speakers for immersive sound."
          : "Single speaker setup."}
      </p>

      <h3>🏆 Final Verdict</h3>
      <p>
        Overall, the <strong>{product.model}</strong> offers balanced gaming
        performance suitable for most users.
      </p>
    </div>
  );
}