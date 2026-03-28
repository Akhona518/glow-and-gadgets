import React from "react";

const products = [
  { emoji: "📱", name: "iPhone 13", price: "R9,500", seller: "Aphi Mobile Deals" },
  { emoji: "💇", name: 'Brazilian Hair Bundle 24"', price: "R1,450", seller: "Nokwanda Hair Boutique" },
  { emoji: "👁️", name: "Volume Lash Install", price: "R350", seller: "LashbyLelo" },
  { emoji: "💅", name: "Acrylic Nails Full Set", price: "R220", seller: "Clawed by Zee" },
];

function ProductCard({ emoji, name, price, seller }) {
  return (
    <div
      style={{
        background: "#171717",
        border: "1px solid #2a2a2a",
        borderRadius: "18px",
        padding: "20px",
        color: "white",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ fontSize: "36px", marginBottom: "10px" }}>{emoji}</div>
      <h3 style={{ margin: "0 0 8px 0", fontSize: "20px" }}>{name}</h3>
      <p style={{ margin: "0 0 6px 0", color: "#d4d4d4" }}>Seller: {seller}</p>
      <p style={{ margin: "0 0 16px 0", color: "#facc15", fontWeight: "bold", fontSize: "18px" }}>
        {price}
      </p>
      <button
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Order Now
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#0a0a0a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <section
        style={{
          padding: "60px 20px",
          background: "linear-gradient(135deg, #111111, #1f1f1f)",
          borderBottom: "1px solid #222",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              color: "#facc15",
              fontWeight: "bold",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontSize: "12px",
            }}
          >
            South Africa Marketplace
          </p>

          <h1
            style={{
              fontSize: "48px",
              margin: "10px 0 16px 0",
              lineHeight: "1.1",
            }}
          >
            Glow & Gadgets SA
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#d4d4d4",
              maxWidth: "700px",
              lineHeight: "1.6",
            }}
          >
            Your all-in-one marketplace for iPhones, hair, lashes, nails, and local hustle businesses.
          </p>

          <div style={{ marginTop: "25px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "14px 22px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Shop Now
            </button>

            <button
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid #444",
                padding: "14px 22px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Become a Seller
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: "50px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "10px" }}>Featured Products & Services</h2>
          <p style={{ color: "#b3b3b3", marginBottom: "30px" }}>
            Discover top local sellers in beauty and tech.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "20px 20px 60px 20px" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#171717",
              border: "1px solid #2a2a2a",
              borderRadius: "18px",
              padding: "24px",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Become a Seller</h2>
            <p style={{ color: "#d4d4d4", lineHeight: "1.6" }}>
              Join Glow & Gadgets and get your products or services in front of more customers.
            </p>
            <button
              style={{
                marginTop: "14px",
                background: "#facc15",
                color: "black",
                border: "none",
                padding: "12px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </button>
          </div>

          <div
            style={{
              background: "#171717",
              border: "1px solid #2a2a2a",
              borderRadius: "18px",
              padding: "24px",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Contact</h2>
            <p style={{ color: "#d4d4d4", margin: "8px 0" }}>WhatsApp: 06X XXX XXXX</p>
            <p style={{ color: "#d4d4d4", margin: "8px 0" }}>Instagram: @glowandgadgets_sa</p>
            <p style={{ color: "#d4d4d4", margin: "8px 0" }}>Location: Cape Town, South Africa</p>
          </div>
        </div>
      </section>
    </div>
  );
}