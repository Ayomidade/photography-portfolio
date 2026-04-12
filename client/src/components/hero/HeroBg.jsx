const trees = [
  { width: 28, height: "55%", margin: "-20px" },
  { width: 22, height: "70%", margin: "0" },
  { width: 35, height: "85%", margin: "-10px" },
  { width: 18, height: "60%", margin: "0" },
  { width: 40, height: "90%", margin: "0" },
  { width: 25, height: "75%", margin: "-15px" },
  { width: 30, height: "65%", margin: "0" },
  { width: 20, height: "80%", margin: "-12px" },
  { width: 45, height: "95%", margin: "0" },
  { width: 22, height: "70%", margin: "-8px" },
  { width: 32, height: "82%", margin: "0" },
  { width: 18, height: "58%", margin: "0" },
];

const sunbeams = [
  { left: "25%", rotate: "-8deg", delay: "0s", width: "2px", opacity: 1 },
  { left: "35%", rotate: "-3deg", delay: "-2s", width: "3px", opacity: 0.7 },
  { left: "45%", rotate: "2deg", delay: "-4s", width: "2px", opacity: 1 },
];

const HeroBg = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      {/* ── Base gradient ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
          radial-gradient(ellipse at 30% 60%, rgba(200,169,110,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 30%, rgba(50,80,120,0.15) 0%, transparent 50%),
          linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.0) 40%, rgba(8,8,8,0.7) 80%, rgba(8,8,8,1) 100%),
          linear-gradient(135deg, #1a1208 0%, #0d1a1f 40%, #080808 70%, #1a0f05 100%)
        `,
        }}
      />

      {/* ── Sunbeams ── */}
      {sunbeams.map((beam, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: beam.left,
            width: beam.width,
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(200,169,110,0.12), transparent 60%)",
            transform: `rotate(${beam.rotate})`,
            transformOrigin: "top center",
            opacity: beam.opacity,
            animation: `beamFlicker 6s ${beam.delay} ease-in-out infinite`,
          }}
        />
      ))}

      {/* ── Tree silhouettes ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
        }}
      >
        {trees.map((tree, i) => (
          <div
            key={i}
            style={{
              width: `${tree.width}px`,
              height: tree.height,
              background: "rgba(5,10,8,0.85)",
              borderRadius: "2px 2px 0 0",
              marginLeft: tree.margin,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBg;
