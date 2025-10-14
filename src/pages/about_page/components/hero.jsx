import React from "react";
import canterburyworkshopimg from "../assets/canterbury_workshop.png"

export default () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        backgroundImage: `url(${canterburyworkshopimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center"
      }}
    >
      {/* Content overlay (no dark overlay per your instruction) */}
      <div
        style={{
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: "1000px",
          paddingRight: "200px"
        }}
      >
        {/* Heading: Poly */}
        <div
          style={{
            fontFamily: "Poly, serif",
            color: "#FFFFFF",
            fontWeight: 400,
            fontSize: "64px",
            lineHeight: 1.0,
            letterSpacing: "0.01em",
            margin: 0,
          }}
        >
          About
        </div>

        {/* Paragraph with accent bar: Montserrat */}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: "18px",
            marginTop: "28px",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              width: "8px",
              backgroundColor: "#1B56BA",
              alignSelf: "stretch",
            }}
          />
          <div
            style={{
              fontFamily:
                'Montserrat, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              color: "#FFFFFF",
              fontSize: "18px",
              lineHeight: 1.7,
              margin: 0,
              whiteSpace: "pre-line",
            }}
          >
            {`Echo believes in a more empowered Australia, where every young person
understands the economic forces shaping their lives and has the tools to
shape them back.`}
          </div>
        </div>
      </div>
    </div>
  );
}

