import React, { useState } from "react";

const OWNER_WHATSAPP = "27781288146"; // replace with your real number

const categories = [
  { name: "iPhones", icon: "📱" },
  { name: "Hair", icon: "💇" },
  { name: "Lashes", icon: "👁️" },
  { name: "Nails", icon: "💅" },
];

const featuredListings = [
  {
    id: 1,
    emoji: "📱",
    title: "iPhone 13",
    price: "R9,500",
    seller: "Aphi Mobile Deals",
    location: "Cape Town",
    type: "Product",
    whatsapp: OWNER_WHATSAPP,
  },
  {
    id: 2,
    emoji: "💇",
    title: 'Brazilian Hair Bundle 24"',
    price: "R1,450",
    seller: "Nokwanda Hair Boutique",
    location: "Khayelitsha",
    type: "Product",
    whatsapp: OWNER_WHATSAPP,
  },
  {
    id: 3,
    emoji: "👁️",
    title: "Volume Lash Install",
    price: "R350",
    seller: "LashbyLelo",
    location: "Bellville",
    type: "Service",
    whatsapp: OWNER_WHATSAPP,
  },
  {
    id: 4,
    emoji: "💅",
    title: "Acrylic Nails Full Set",
    price: "R220",
    seller: "Clawed by Zee",
    location: "Maitland",
    type: "Service",
    whatsapp: OWNER_WHATSAPP,
  },
  {
    id: 5,
    emoji: "📱",
    title: "iPhone 11",
    price: "R6,000",
    seller: "Cape iPhone Plug",
    location: "Cape Town",
    type: "Product",
    whatsapp: OWNER_WHATSAPP,
  },
  {
    id: 6,
    emoji: "💇",
    title: "HD Wig Install",
    price: "R650",
    seller: "The Wig Suite",
    location: "Parow",
    type: "Service",
    whatsapp: OWNER_WHATSAPP,
  },
];

function NavLink({ children }) {
  return (
    <a
      href="/"
      style={{
        color: "#d4d4d4",
        textDecoration: "none",
        fontSize: "14px",
      }}
    >
      {children}
    </a>
  );
}

function CategoryCard({ icon, name }) {
  return (
    <div
      style={{
        background: "#161616",
        border: "1px solid #2a2a2a",
        borderRadius: "18px",
        padding: "18px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "10px" }}>{icon}</div>
      <div style={{ fontWeight: "bold" }}>{name}</div>
    </div>
  );
}

function openWhatsApp(item) {
  const message = `Hi ${item.seller}, I'm interested in ${item.title} listed on Glow & Gadgets for ${item.price}. Is it still available?`;
  const url = `https://wa.me/${item.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function ListingCard({ item }) {
  return (
    <div
      style={{
        background: "#171717",
        border: "1px solid #2b2b2b",
        borderRadius: "20px",
        padding: "20px",
        color: "white",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: "12px",
        }}
      >
        <div style={{ fontSize: "34px" }}>{item.emoji}</div>
        <span
          style={{
            fontSize: "12px",
            background: "#232323",
            border: "1px solid #333",
            padding: "6px 10px",
            borderRadius: "999px",
            color: "#d4d4d4",
          }}
        >
          {item.type}
        </span>
      </div>

      <h3 style={{ margin: "0 0 10px 0", fontSize: "20px" }}>{item.title}</h3>

      <p style={{ margin: "0 0 6px 0", color: "#cfcfcf", fontSize: "14px" }}>
        Seller: {item.seller}
      </p>
      <p style={{ margin: "0 0 14px 0", color: "#a3a3a3", fontSize: "14px" }}>
        Location: {item.location}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div>
          <div style={{ color: "#facc15", fontWeight: "bold", fontSize: "20px" }}>
            {item.price}
          </div>
        </div>
        <button
          onClick={() => openWhatsApp(item)}
          style={{
            background: "#25D366",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          WhatsApp Order
        </button>
      </div>
    </div>
  );
}

function TrustItem({ title, text }) {
  return (
    <div
      style={{
        background: "#171717",
        border: "1px solid #2a2a2a",
        borderRadius: "18px",
        padding: "20px",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "10px", fontSize: "18px" }}>{title}</h3>
      <p style={{ margin: 0, color: "#cfcfcf", lineHeight: "1.6", fontSize: "14px" }}>
        {text}
      </p>
    </div>
  );
}

function SellerForm() {
  const [formData, setFormData] = useState({
    businessName: "",
    whatsapp: "",
    category: "",
    location: "",
    details: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { businessName, whatsapp, category, location, details } = formData;

    if (!businessName || !whatsapp || !category) {
      alert("Please fill in business name, WhatsApp number, and category.");
      return;
    }

    const message =
      `Hi, I want to apply as a seller on Glow & Gadgets.%0A%0A` +
      `Business Name: ${businessName}%0A` +
      `WhatsApp Number: ${whatsapp}%0A` +
      `Category: ${category}%0A` +
      `Location: ${location}%0A` +
      `Details: ${details}`;

    const url = `https://wa.me/${OWNER_WHATSAPP}?text=${message}`;
    window.open(url, "_blank");

    setFormData({
      businessName: "",
      whatsapp: "",
      category: "",
      location: "",
      details: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gap: "12px",
          marginTop: "18px",
        }}
      >
        <input
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          placeholder="Business name"
          style={inputStyle}
        />

        <input
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          placeholder="WhatsApp number"
          style={inputStyle}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select category</option>
          <option value="iPhones">iPhones</option>
          <option value="Hair">Hair</option>
          <option value="Lashes">Lashes</option>
          <option value="Nails">Nails</option>
          <option value="Clothing">Clothing</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location / area"
          style={inputStyle}
        />

        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Tell us what you sell or what service you offer"
          style={{
            ...inputStyle,
            minHeight: "110px",
            resize: "vertical",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#facc15",
            color: "black",
            border: "none",
            padding: "13px 18px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Apply to Sell
        </button>
      </div>
    </form>
  );
}

export default function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#0a0a0a",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid #1f1f1f",
          background: "#0b0b0b",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontWeight: "bold", fontSize: "22px" }}>Glow & Gadgets</div>
            <div
              style={{
                color: "#facc15",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              South Africa Marketplace
            </div>
          </div>

          <div style={{ display: "flex", gap: "18px", alignItems: "center", flexWrap: "wrap" }}>
            <NavLink>Home</NavLink>
            <NavLink>Categories</NavLink>
            <NavLink>Sellers</NavLink>
            <NavLink>How It Works</NavLink>
            <button
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid #333",
                padding: "10px 14px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Become a Seller
            </button>
          </div>
        </div>
      </header>

      <section
        style={{
          padding: "70px 20px 50px",
          background:
            "radial-gradient(circle at top left, rgba(250,204,21,0.10), transparent 25%), radial-gradient(circle at top right, rgba(239,68,68,0.12), transparent 25%), linear-gradient(135deg, #0f0f0f, #151515)",
          borderBottom: "1px solid #1d1d1d",
        }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#facc15",
                fontWeight: "bold",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontSize: "12px",
                marginBottom: "10px",
              }}
            >
              One platform for beauty, tech and hustlers
            </p>

            <h1
              style={{
                fontSize: "clamp(38px, 6vw, 64px)",
                lineHeight: "1.05",
                margin: "0 0 18px 0",
              }}
            >
              Discover local sellers in one trusted marketplace.
            </h1>

            <p
              style={{
                color: "#d4d4d4",
                fontSize: "18px",
                lineHeight: "1.7",
                maxWidth: "650px",
                marginBottom: "24px",
              }}
            >
              Shop iPhones, hair, lashes, nails, and more from South African sellers all in one place.
              Glow & Gadgets helps local businesses get seen and helps customers buy with confidence.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
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
                Explore Marketplace
              </button>

              <button
                style={{
                  background: "transparent",
                  color: "white",
                  border: "1px solid #3a3a3a",
                  padding: "14px 22px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Sell on Glow & Gadgets
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                marginTop: "24px",
                color: "#bfbfbf",
                fontSize: "14px",
              }}
            >
              <span>✔ Verified sellers</span>
              <span>✔ Local businesses</span>
              <span>✔ Beauty + tech in one place</span>
            </div>
          </div>

          <div
            style={{
              background: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "18px", fontSize: "18px" }}>
              Popular right now
            </div>

            <div style={{ display: "grid", gap: "14px" }}>
              {[
                "📱 iPhone deals from trusted resellers",
                "💇 Premium hair bundles and wig installs",
                "👁️ Lash appointments near you",
                "💅 Nail techs and beauty services",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    background: "#1a1a1a",
                    border: "1px solid #2a2a2a",
                    borderRadius: "16px",
                    padding: "14px 16px",
                    color: "#dddddd",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "50px 20px" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "32px", margin: "0 0 10px 0" }}>Shop by category</h2>
            <p style={{ color: "#b3b3b3", margin: 0 }}>
              Start with the categories people already search for most.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "16px",
            }}
          >
            {categories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "10px 20px 50px" }}>
        <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "32px", margin: "0 0 10px 0" }}>Featured listings</h2>
              <p style={{ color: "#b3b3b3", margin: 0 }}>
                Tap WhatsApp order to contact the seller directly.
              </p>
            </div>

            <button
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid #333",
                padding: "12px 16px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              View All Listings
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {featuredListings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "0 20px 50px" }}>
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <TrustItem
            title="For customers"
            text="Find local sellers faster, compare options in one place, and message the seller directly on WhatsApp."
          />
          <TrustItem
            title="For sellers"
            text="Get more visibility without posting all day. Use Glow & Gadgets as your online storefront and customer discovery platform."
          />
          <TrustItem
            title="For the brand"
            text="Glow & Gadgets is built to grow into a real SA marketplace for side hustlers, beauty services, fashion, and tech."
          />
        </div>
      </section>

      <section style={{ padding: "0 20px 60px" }}>
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#171717",
              border: "1px solid #2a2a2a",
              borderRadius: "20px",
              padding: "24px",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Become a Seller</h2>
            <p style={{ color: "#d4d4d4", lineHeight: "1.7" }}>
              Join Glow & Gadgets and get your products or services in front of more customers across South Africa.
            </p>

            <SellerForm />
          </div>

          <div
            style={{
              background: "#171717",
              border: "1px solid #2a2a2a",
              borderRadius: "20px",
              padding: "24px",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Contact</h2>
            <p style={{ color: "#d4d4d4", margin: "8px 0" }}>WhatsApp: 06X XXX XXXX</p>
            <p style={{ color: "#d4d4d4", margin: "8px 0" }}>Instagram: @glowandgadgets_sa</p>
            <p style={{ color: "#d4d4d4", margin: "8px 0" }}>Location: Cape Town, South Africa</p>

            <div
              style={{
                marginTop: "18px",
                padding: "16px",
                borderRadius: "16px",
                background: "#111111",
                border: "1px solid #2a2a2a",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "8px" }}>Why this works</div>
              <div style={{ color: "#cfcfcf", lineHeight: "1.6", fontSize: "14px" }}>
                Buyers want convenience. Sellers want visibility. Glow & Gadgets sits in the middle and makes both easier.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid #1f1f1f",
          padding: "22px 20px",
          color: "#9a9a9a",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        Glow & Gadgets SA — marketplace for beauty, tech, and local hustlers.
      </footer>
    </div>
  );
}

const inputStyle = {
  background: "#111111",
  border: "1px solid #2f2f2f",
  color: "white",
  padding: "13px 14px",
  borderRadius: "12px",
  outline: "none",
};