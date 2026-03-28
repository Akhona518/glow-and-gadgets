import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const OWNER_WHATSAPP = "27781288146"; // replace with your real number

const categories = [
  { name: "iPhones", short: "IP" },
  { name: "Hair", short: "HR" },
  { name: "Lashes", short: "LS" },
  { name: "Nails", short: "NL" },
];

const initialListings = [
  {
    id: 1,
    visual: "PHONE",
    title: "iPhone 13",
    price: "R9,500",
    seller: "Aphi Mobile Deals",
    location: "Cape Town",
    type: "Product",
    whatsapp: OWNER_WHATSAPP,
  },
  {
    id: 2,
    visual: "HAIR",
    title: "Luxury Weaves",
    price: "R1,450",
    seller: "Nokwanda Hair Boutique",
    location: "Khayelitsha",
    type: "Product",
    whatsapp: OWNER_WHATSAPP,
  },
  {
    id: 3,
    visual: "LASH",
    title: "Volume Lash Install",
    price: "R350",
    seller: "LashbyLelo",
    location: "Bellville",
    type: "Service",
    whatsapp: OWNER_WHATSAPP,
  },
  {
    id: 4,
    visual: "NAIL",
    title: "Acrylic Nails Full Set",
    price: "R220",
    seller: "Clawed by Zee",
    location: "Maitland",
    type: "Service",
    whatsapp: OWNER_WHATSAPP,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function NavLink({ children, sectionId }) {
  return (
    <button
      onClick={() => scrollToSection(sectionId)}
      style={{
        color: "#4b5563",
        background: "transparent",
        border: "none",
        fontSize: "14px",
        fontWeight: "700",
        cursor: "pointer",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </button>
  );
}

function LogoBadge() {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      style={{ display: "flex", alignItems: "center", gap: "12px" }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #ec4899, #f97316)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "900",
          fontSize: "16px",
          boxShadow: "0 12px 24px rgba(236,72,153,0.2)",
        }}
      >
        GG
      </div>
      <div>
        <div
          style={{
            fontWeight: "900",
            fontSize: "24px",
            color: "#111827",
            letterSpacing: "-0.03em",
          }}
        >
          Glow & Gadgets
        </div>
        <div
          style={{
            color: "#db2777",
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginTop: "2px",
            fontWeight: "700",
          }}
        >
          South Africa Marketplace
        </div>
      </div>
    </motion.div>
  );
}

function CategoryCard({ name, short }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={{
        background: "rgba(255,255,255,0.9)",
        border: "1px solid #f3e8ff",
        borderRadius: "22px",
        padding: "22px",
        textAlign: "center",
        boxShadow: "0 14px 35px rgba(148, 163, 184, 0.12)",
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          margin: "0 auto 12px",
          borderRadius: "18px",
          background: "linear-gradient(135deg, #fdf2f8, #ffedd5)",
          border: "1px solid #fbcfe8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "800",
          color: "#be185d",
        }}
      >
        {short}
      </div>
      <div
        style={{
          fontWeight: "800",
          color: "#1f2937",
          fontSize: "16px",
          letterSpacing: "-0.02em",
        }}
      >
        {name}
      </div>
    </motion.div>
  );
}

function visualStyle(label) {
  const map = {
    PHONE: {
      bg: "linear-gradient(135deg, #ede9fe, #dbeafe)",
      border: "#c4b5fd",
      text: "#6d28d9",
      icon: "📱",
    },
    HAIR: {
      bg: "linear-gradient(135deg, #fef3c7, #fde68a)",
      border: "#f59e0b",
      text: "#92400e",
      icon: "💇",
    },
    LASH: {
      bg: "linear-gradient(135deg, #fce7f3, #fbcfe8)",
      border: "#ec4899",
      text: "#be185d",
      icon: "✨",
    },
    NAIL: {
      bg: "linear-gradient(135deg, #ffe4e6, #fecdd3)",
      border: "#fb7185",
      text: "#be123c",
      icon: "💅",
    },
    OTHER: {
      bg: "linear-gradient(135deg, #ecfeff, #cffafe)",
      border: "#22d3ee",
      text: "#155e75",
      icon: "🛍️",
    },
  };
  return map[label] || map.OTHER;
}

function VisualCard({ label }) {
  const style = visualStyle(label);
  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
      style={{
        width: "64px",
        height: "64px",
        borderRadius: "20px",
        background: style.bg,
        border: `1px solid ${style.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: style.text,
        fontSize: "28px",
        fontWeight: "800",
      }}
    >
      {style.icon}
    </motion.div>
  );
}

function SmallTitleIcon({ label }) {
  const style = visualStyle(label);
  return (
    <div
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "10px",
        background: style.bg,
        border: `1px solid ${style.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        flexShrink: 0,
      }}
    >
      {style.icon}
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
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      style={{
        background: "rgba(255,255,255,0.94)",
        border: "1px solid #f5d0fe",
        borderRadius: "24px",
        padding: "20px",
        color: "#111827",
        boxShadow: "0 18px 40px rgba(236, 72, 153, 0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: "14px",
        }}
      >
        <VisualCard label={item.visual || "OTHER"} />

        <span
          style={{
            fontSize: "12px",
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            padding: "6px 10px",
            borderRadius: "999px",
            color: "#be185d",
            fontWeight: "700",
          }}
        >
          {item.type}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <SmallTitleIcon label={item.visual || "OTHER"} />
        <h3
          style={{
            margin: 0,
            fontSize: "22px",
            color: "#111827",
            fontWeight: "900",
            letterSpacing: "-0.03em",
            lineHeight: "1.1",
          }}
        >
          {item.title}
        </h3>
      </div>

      <p
        style={{
          margin: "0 0 6px 0",
          color: "#4b5563",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        Seller: {item.seller}
      </p>
      <p
        style={{
          margin: "0 0 16px 0",
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
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
        <div
          style={{
            color: "#d97706",
            fontWeight: "900",
            fontSize: "22px",
            letterSpacing: "-0.02em",
          }}
        >
          {item.price}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => openWhatsApp(item)}
          style={{
            background: "linear-gradient(135deg, #22c55e, #25D366)",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "800",
            boxShadow: "0 10px 20px rgba(37, 211, 102, 0.25)",
          }}
        >
          WhatsApp Order
        </motion.button>
      </div>
    </motion.div>
  );
}

function TrustItem({ title, text }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      style={{
        background: "rgba(255,255,255,0.9)",
        border: "1px solid #ede9fe",
        borderRadius: "22px",
        padding: "22px",
        boxShadow: "0 14px 30px rgba(139, 92, 246, 0.06)",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: "10px",
          fontSize: "20px",
          color: "#111827",
          fontWeight: "900",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          color: "#4b5563",
          lineHeight: "1.7",
          fontSize: "15px",
        }}
      >
        {text}
      </p>
    </motion.div>
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

    const message = `Hi, I want to apply as a seller on Glow & Gadgets.

Business Name: ${businessName}
WhatsApp Number: ${whatsapp}
Category: ${category}
Location: ${location}
Details: ${details}`;

    const url = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`;
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
      <div style={{ display: "grid", gap: "12px", marginTop: "18px" }}>
        <input name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Business name" style={inputStyle} />
        <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp number" style={inputStyle} />
        <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
          <option value="">Select category</option>
          <option value="iPhones">iPhones</option>
          <option value="Hair">Hair</option>
          <option value="Lashes">Lashes</option>
          <option value="Nails">Nails</option>
          <option value="Clothing">Clothing</option>
          <option value="Other">Other</option>
        </select>
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location / area" style={inputStyle} />
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Tell us what you sell or what service you offer"
          style={{ ...inputStyle, minHeight: "110px", resize: "vertical" }}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          style={{
            background: "linear-gradient(135deg, #ec4899, #f97316)",
            color: "white",
            border: "none",
            padding: "13px 18px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "800",
            boxShadow: "0 12px 25px rgba(236, 72, 153, 0.2)",
          }}
        >
          Apply to Sell
        </motion.button>
      </div>
    </form>
  );
}

function DashboardForm({ onAddListing }) {
  const [dashboardData, setDashboardData] = useState({
    seller: "",
    whatsapp: OWNER_WHATSAPP,
    title: "",
    price: "",
    category: "iPhones",
    location: "",
    type: "Product",
    visual: "PHONE",
  });

  function handleChange(e) {
    setDashboardData({
      ...dashboardData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!dashboardData.seller || !dashboardData.title || !dashboardData.price || !dashboardData.whatsapp) {
      alert("Please fill in seller name, title, price, and WhatsApp number.");
      return;
    }

    onAddListing({
      id: Date.now(),
      seller: dashboardData.seller,
      whatsapp: dashboardData.whatsapp,
      title: dashboardData.title,
      price: dashboardData.price,
      category: dashboardData.category,
      location: dashboardData.location,
      type: dashboardData.type,
      visual: dashboardData.visual,
    });

    setDashboardData({
      seller: "",
      whatsapp: OWNER_WHATSAPP,
      title: "",
      price: "",
      category: "iPhones",
      location: "",
      type: "Product",
      visual: "PHONE",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gap: "12px" }}>
        <input name="seller" value={dashboardData.seller} onChange={handleChange} placeholder="Seller name" style={inputStyle} />
        <input name="whatsapp" value={dashboardData.whatsapp} onChange={handleChange} placeholder="Seller WhatsApp number" style={inputStyle} />
        <input name="title" value={dashboardData.title} onChange={handleChange} placeholder="Listing title" style={inputStyle} />
        <input name="price" value={dashboardData.price} onChange={handleChange} placeholder="Price e.g. R2,500" style={inputStyle} />
        <select name="category" value={dashboardData.category} onChange={handleChange} style={inputStyle}>
          <option value="iPhones">iPhones</option>
          <option value="Hair">Hair</option>
          <option value="Lashes">Lashes</option>
          <option value="Nails">Nails</option>
          <option value="Clothing">Clothing</option>
          <option value="Other">Other</option>
        </select>
        <input name="location" value={dashboardData.location} onChange={handleChange} placeholder="Location" style={inputStyle} />
        <select name="type" value={dashboardData.type} onChange={handleChange} style={inputStyle}>
          <option value="Product">Product</option>
          <option value="Service">Service</option>
        </select>
        <select name="visual" value={dashboardData.visual} onChange={handleChange} style={inputStyle}>
          <option value="PHONE">Phone</option>
          <option value="HAIR">Hair</option>
          <option value="LASH">Lash</option>
          <option value="NAIL">Nail</option>
          <option value="OTHER">Other</option>
        </select>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          style={{
            background: "linear-gradient(135deg, #f97316, #fb7185)",
            color: "white",
            border: "none",
            padding: "13px 18px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "800",
            boxShadow: "0 12px 25px rgba(249, 115, 22, 0.18)",
          }}
        >
          Add Listing
        </motion.button>
      </div>
    </form>
  );
}

function FloatingWhatsApp() {
  const message = "Hi, I found Glow & Gadgets and I would like to know more.";
  const url = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      style={{
        position: "fixed",
        right: "18px",
        bottom: "18px",
        width: "62px",
        height: "62px",
        borderRadius: "999px",
        background: "linear-gradient(135deg, #22c55e, #25D366)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "900",
        textDecoration: "none",
        boxShadow: "0 16px 30px rgba(37, 211, 102, 0.28)",
        zIndex: 50,
      }}
      aria-label="Chat on WhatsApp"
    >
      WA
    </motion.a>
  );
}

export default function App() {
  const [listings, setListings] = useState(() => {
    const savedListings = localStorage.getItem("glowandgadgets_listings");
    return savedListings ? JSON.parse(savedListings) : initialListings;
  });

  useEffect(() => {
    localStorage.setItem("glowandgadgets_listings", JSON.stringify(listings));
  }, [listings]);

  function addListing(newListing) {
    setListings((prev) => [newListing, ...prev]);
  }

  return (
    <div
      style={{
        fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
        background: "linear-gradient(180deg, #fffaf5 0%, #fff7fb 35%, #fdf4ff 100%)",
        color: "#111827",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid #f5e7eb",
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(10px)",
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
          <LogoBadge />

          <div style={{ display: "flex", gap: "18px", alignItems: "center", flexWrap: "wrap" }}>
            <NavLink sectionId="home">Home</NavLink>
            <NavLink sectionId="categories">Categories</NavLink>
            <NavLink sectionId="listings">Listings</NavLink>
            <NavLink sectionId="sell">Sell</NavLink>
          </div>
        </div>
      </header>

      <section
        id="home"
        style={{
          padding: "78px 20px 56px",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid #f3e8d9",
        }}
      >
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 30,
            right: 80,
            width: 180,
            height: 180,
            background: "rgba(251, 113, 133, 0.14)",
            borderRadius: "999px",
            filter: "blur(22px)",
          }}
        />
        <motion.div
          animate={{ x: [0, -18, 0], y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: 20,
            left: 60,
            width: 220,
            height: 220,
            background: "rgba(192, 132, 252, 0.14)",
            borderRadius: "999px",
            filter: "blur(28px)",
          }}
        />

        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
            <p
              style={{
                color: "#db2777",
                fontWeight: "800",
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
                lineHeight: "0.98",
                margin: "0 0 18px 0",
                color: "#111827",
                fontWeight: "900",
                letterSpacing: "-0.05em",
              }}
            >
              Discover local sellers in one easy, beautiful marketplace.
            </h1>

            <p
              style={{
                color: "#4b5563",
                fontSize: "18px",
                lineHeight: "1.8",
                maxWidth: "650px",
                marginBottom: "24px",
                fontWeight: "500",
              }}
            >
              Shop iPhones, weaves, lashes, nails, and more from South African sellers all in one place.
              Glow & Gadgets makes it easy to browse, order, and connect.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection("listings")}
                style={{
                  background: "linear-gradient(135deg, #ec4899, #f97316)",
                  color: "white",
                  border: "none",
                  padding: "14px 22px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontWeight: "800",
                  boxShadow: "0 14px 28px rgba(236, 72, 153, 0.18)",
                }}
              >
                Explore Marketplace
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection("sell")}
                style={{
                  background: "rgba(255,255,255,0.85)",
                  color: "#111827",
                  border: "1px solid #f5d0fe",
                  padding: "14px 22px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontWeight: "800",
                }}
              >
                Sell on Glow & Gadgets
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.15, duration: 0.6 }}
            style={{
              background: "rgba(255,255,255,0.9)",
              border: "1px solid #f5d0fe",
              borderRadius: "28px",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.08)",
            }}
          >
            <div
              style={{
                fontWeight: "900",
                marginBottom: "18px",
                fontSize: "20px",
                color: "#111827",
                letterSpacing: "-0.03em",
              }}
            >
              Popular right now
            </div>

            <div style={{ display: "grid", gap: "14px" }}>
              {[
                "iPhone deals from trusted resellers",
                "Luxury weaves and wig installs",
                "Lash appointments near you",
                "Nail techs and beauty services",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.08 }}
                  style={{
                    background: "#fffaf5",
                    border: "1px solid #fce7f3",
                    borderRadius: "16px",
                    padding: "14px 16px",
                    color: "#374151",
                    fontWeight: "600",
                  }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        id="categories"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        style={{ padding: "50px 20px" }}
      >
        <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
          <div style={{ marginBottom: "24px" }}>
            <h2
              style={{
                fontSize: "34px",
                margin: "0 0 10px 0",
                color: "#111827",
                fontWeight: "900",
                letterSpacing: "-0.04em",
              }}
            >
              Shop by category
            </h2>
            <p style={{ color: "#6b7280", margin: 0, fontSize: "16px", fontWeight: "500" }}>
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
      </motion.section>

      <motion.section
        id="listings"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        style={{ padding: "10px 20px 50px" }}
      >
        <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
          <div style={{ marginBottom: "24px" }}>
            <h2
              style={{
                fontSize: "34px",
                margin: "0 0 10px 0",
                color: "#111827",
                fontWeight: "900",
                letterSpacing: "-0.04em",
              }}
            >
              Featured listings
            </h2>
            <p style={{ color: "#6b7280", margin: 0, fontSize: "16px", fontWeight: "500" }}>
              Tap WhatsApp order to contact the seller directly.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {listings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="sell"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        style={{ padding: "0 20px 60px" }}
      >
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          <motion.div
            whileHover={{ y: -4 }}
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid #fbcfe8",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 18px 35px rgba(236, 72, 153, 0.07)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#111827",
                fontWeight: "900",
                letterSpacing: "-0.03em",
                fontSize: "28px",
              }}
            >
              Become a Seller
            </h2>
            <p style={{ color: "#4b5563", lineHeight: "1.7", fontWeight: "500" }}>
              Join Glow & Gadgets and get your products or services in front of more customers across South Africa.
            </p>

            <SellerForm />
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid #fed7aa",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 18px 35px rgba(249, 115, 22, 0.07)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#111827",
                fontWeight: "900",
                letterSpacing: "-0.03em",
                fontSize: "28px",
              }}
            >
              Seller Dashboard
            </h2>
            <p style={{ color: "#4b5563", lineHeight: "1.7", fontWeight: "500" }}>
              Use this section to add seller listings manually while you’re still in MVP mode.
            </p>

            <DashboardForm onAddListing={addListing} />
          </motion.div>
        </div>
      </motion.section>

      <footer
        style={{
          borderTop: "1px solid #f5e7eb",
          padding: "22px 20px",
          color: "#6b7280",
          textAlign: "center",
          fontSize: "14px",
          background: "rgba(255,255,255,0.7)",
          fontWeight: "600",
        }}
      >
        Glow & Gadgets SA — marketplace for beauty, tech, and local hustlers.
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}

const inputStyle = {
  background: "rgba(255,255,255,0.95)",
  border: "1px solid #e5e7eb",
  color: "#111827",
  padding: "13px 14px",
  borderRadius: "12px",
  outline: "none",
  boxShadow: "0 4px 12px rgba(15,23,42,0.03)",
  fontWeight: "500",
};