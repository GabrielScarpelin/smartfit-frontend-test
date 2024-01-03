import localFont from "next/font/local";

const GothamLight = localFont({ src: "../app/fonts/gotham-light.woff2" });
export default function TimeSelection({ range, turno }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <input type="radio" value={`${range.toString()}`} name="time" />
        <p className={GothamLight.className}>{`${turno}`}</p>
      </div>
      <p className={GothamLight.className}>
        {range[0]} às {range[1]}
      </p>
    </div>
  );
}
