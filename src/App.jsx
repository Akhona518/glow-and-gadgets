import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const OWNER_WHATSAPP = "27781288146"; // replace with your real number

const categories = [
  { name: "All", value: "all", short: "ALL" },
  { name: "iPhones", value: "iPhones", short: "IP" },
  { name: "Hair", value: "Hair", short: "HR" },
  { name: "Lashes", value: "Lashes", short: "LS" },
  { name: "Nails", value: "Nails", short: "NL" },
];

const initialListings = [
  {
    id: 1,
    category: "iPhones",
    typeIcon: "iphone",
    title: "iPhone 13",
    price: "R9,500",
    seller: "Aphi Mobile Deals",
    location: "Cape Town",
    type: "Product",
    whatsapp: OWNER_WHATSAPP,
  },
  {
    id: 2,
    category: "Hair",
    typeIcon: "hair",
    title: "Luxury Weaves",
    price: "R1,450",
    seller: "Nokwanda Hair Boutique",
    location: "Khayelitsha",
    type: "Product",
    whatsapp: OWNER_WHATSAPP,
  },
  {
    id: 3,
    category: "Lashes",
    typeIcon: "lashes",
    title: "Volume Lash Install",
    price: "R350",
    seller: "LashbyLelo",
    location: "Bellville",
    type: "Service",
    whatsapp: OWNER_WHATSAPP,
  },
  {
    id: 4,
    category: "Nails",
    typeIcon: "nails",
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

function IconBox({ type, size = 36 }) {
  const styles = {
    iphone: { bg: "#ede9fe", color: "#6d28d9", text: "IP" },
    hair: { bg: "#fef3c7", color: "#92400e", text: "HR" },
    lashes: { bg: "#fce7f3", color: "#be185d", text: "LS" },
    nails: { bg: "#ffe4e6", color: "#be123c", text: "NL" },
    seller: { bg: "#ecfeff", color: "#155e75", text: "ST" },
    location: { bg: "#f0fdf4", color: "#166534", text: "LC" },
    all: { bg: "#f3f4f6", color: "#374151", text: "ALL" },
  };

  const style = styles[type] || styles.all;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "12px",
        background: style.bg,
        color: style.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size <= 24 ? "9px" : "11px",
        fontWeight: "900",
        flexShrink: 0,
      }}
    >
      {style.text}
    </div>
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
        background: "rgba(255,255,255,0.95)",
        border: "1px solid #f5d0fe",
        borderRadius: "22px",
        padding: "18px",
        boxShadow: "0 18px 40px rgba(236, 72, 153, 0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <IconBox type={item.typeIcon} size={48} />

        <span
          style={{
            fontSize: "11px",
            background: "#fff1f2",
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
        <IconBox type={item.typeIcon} size={32} />
        <h3
          style={{
            margin: 0,
            fontSize: "22px",
            fontWeight: "900",
            letterSpacing: "-0.03em",
            color: "#111827",
            lineHeight: "1.1",
          }}
        >
          {item.title}
        </h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IconBox type="seller" size={24} />
          <span style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>
            {item.seller}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IconBox type="location" size={24} />
          <span style={{ fontSize: "13px", color: "#6b7280" }}>{item.location}</span>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            fontSize: "22px",
            fontWeight: "900",
            color: "#d97706",
          }}
        >
          {item.price}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openWhatsApp(item)}
          style={{
            background: "#25D366",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "999px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontWeight: "700",
            fontSize: "12px",
            boxShadow: "0 8px 18px rgba(34, 197, 94, 0.20)",
          }}
        >
          <WhatsAppIcon size={14} />
          Order
        </motion.button>
      </div>
    </motion.div>
  );
}

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.95)",
        border: "1px solid #f5d0fe",
        borderRadius: "16px",
        padding: "12px 14px",
        boxShadow: "0 10px 20px rgba(236, 72, 153, 0.05)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "10px",
          background: "#fdf2f8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#db2777",
          fontWeight: "900",
          fontSize: "12px",
        }}
      >
        🔎
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search iPhones, weaves, lashes, nails..."
        style={{
          border: "none",
          outline: "none",
          background: "transparent",
          width: "100%",
          fontSize: "14px",
          color: "#111827",
          fontWeight: "600",
        }}
      />
    </div>
  );
}

function FilterBar({ activeCategory, setActiveCategory }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      {categories.map((category) => {
        const active = activeCategory === category.value;
        return (
          <button
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            style={{
              border: active ? "1px solid #f9a8d4" : "1px solid #e5e7eb",
              background: active ? "#fdf2f8" : "rgba(255,255,255,0.9)",
              color: active ? "#be185d" : "#4b5563",
              borderRadius: "999px",
              padding: "10px 14px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "13px",
              boxShadow: active ? "0 8px 18px rgba(236,72,153,0.08)" : "none",
            }}
          >
            {category.name}
          </button>
        );
      })}
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
    typeIcon: "iphone",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    let updated = {
      ...dashboardData,
      [name]: value,
    };

    if (name === "category") {
      const iconMap = {
        iPhones: "iphone",
        Hair: "hair",
        Lashes: "lashes",
        Nails: "nails",
      };
      updated.typeIcon = iconMap[value] || "iphone";
    }

    setDashboardData(updated);
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
      typeIcon: dashboardData.typeIcon,
    });

    setDashboardData({
      seller: "",
      whatsapp: OWNER_WHATSAPP,
      title: "",
      price: "",
      category: "iPhones",
      location: "",
      type: "Product",
      typeIcon: "iphone",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gap: "12px" }}>
        <input
          name="seller"
          value={dashboardData.seller}
          onChange={handleChange}
          placeholder="Seller name"
          style={inputStyle}
        />
        <input
          name="whatsapp"
          value={dashboardData.whatsapp}
          onChange={handleChange}
          placeholder="Seller WhatsApp number"
          style={inputStyle}
        />
        <input
          name="title"
          value={dashboardData.title}
          onChange={handleChange}
          placeholder="Listing title"
          style={inputStyle}
        />
        <input
          name="price"
          value={dashboardData.price}
          onChange={handleChange}
          placeholder="Price e.g. R2,500"
          style={inputStyle}
        />
        <select
          name="category"
          value={dashboardData.category}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="iPhones">iPhones</option>
          <option value="Hair">Hair</option>
          <option value="Lashes">Lashes</option>
          <option value="Nails">Nails</option>
          <option value="Clothing">Clothing</option>
          <option value="Other">Other</option>
        </select>
        <input
          name="location"
          value={dashboardData.location}
          onChange={handleChange}
          placeholder="Location"
          style={inputStyle}
        />
        <select
          name="type"
          value={dashboardData.type}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Product">Product</option>
          <option value="Service">Service</option>
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

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 3C8.82 3 3 8.73 3 15.8c0 2.5.74 4.83 2.02 6.79L3.7 29l6.63-1.75A13.1 13.1 0 0 0 16 28.6c7.18 0 13-5.73 13-12.8C29 8.73 23.18 3 16 3Z"
        fill="white"
        fillOpacity="0.18"
      />
      <path
        d="M16 5.2c-5.95 0-10.77 4.74-10.77 10.58 0 2.2.69 4.25 1.87 5.94l-1.09 3.87 4.02-1.05a10.9 10.9 0 0 0 5.97 1.77c5.95 0 10.77-4.74 10.77-10.58C26.77 9.94 21.95 5.2 16 5.2Zm6.31 14.43c-.26.72-1.52 1.37-2.1 1.46-.54.08-1.22.11-1.96-.12-.45-.14-1.02-.34-1.76-.65-3.1-1.33-5.13-4.45-5.29-4.66-.16-.22-1.26-1.64-1.26-3.13 0-1.49.79-2.22 1.07-2.52.28-.29.61-.36.82-.36.2 0 .41 0 .59.01.19.01.44-.07.69.52.26.62.87 2.14.95 2.29.08.15.13.33.03.53-.1.2-.15.33-.31.5-.15.17-.33.39-.47.52-.16.15-.33.31-.14.61.18.29.81 1.32 1.75 2.14 1.2 1.04 2.21 1.36 2.51 1.51.31.15.49.13.67-.08.18-.21.77-.88.97-1.18.2-.29.41-.25.69-.15.28.1 1.79.84 2.1.99.31.15.51.22.59.34.08.12.08.7-.18 1.42Z"
        fill="white"
      />
    </svg>
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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "fixed",
        right: "16px",
        bottom: "16px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 12px 25px rgba(37, 211, 102, 0.3)",
        zIndex: 50,
      }}
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={22} />
    </motion.a>
  );
}

export default function App() {
  const [listings, setListings] = useState(() => {
    const savedListings = localStorage.getItem("glowandgadgets_listings");
    return savedListings ? JSON.parse(savedListings) : initialListings;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    localStorage.setItem("glowandgadgets_listings", JSON.stringify(listings));
  }, [listings]);

  function addListing(newListing) {
    setListings((prev) => [newListing, ...prev]);
  }

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      const text = `${item.title} ${item.seller} ${item.location} ${item.category}`.toLowerCase();
      const matchesSearch = text.includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [listings, searchTerm, activeCategory]);

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
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6 }}
          >
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
            {categories.slice(1).map((category) => (
              <CategoryCard key={category.name} name={category.name} short={category.short} />
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
              Search and filter products or services faster.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "14px",
              marginBottom: "20px",
            }}
          >
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <FilterBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          </div>

          <div style={{ marginBottom: "16px", color: "#6b7280", fontSize: "14px", fontWeight: "600" }}>
            {filteredListings.length} result{filteredListings.length !== 1 ? "s" : ""} found
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredListings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div
              style={{
                marginTop: "20px",
                background: "rgba(255,255,255,0.9)",
                border: "1px solid #f5d0fe",
                borderRadius: "18px",
                padding: "20px",
                textAlign: "center",
                color: "#6b7280",
                fontWeight: "600",
              }}
            >
              No listings match your search yet.
            </div>
          )}
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