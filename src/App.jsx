import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const OWNER_WHATSAPP = "27781288146"; // replace with your real number

const categories = [
  { name: "iPhones", icon: "📱" },
  { name: "Hair", icon: "💇" },
  { name: "Lashes", icon: "👁️" },
  { name: "Nails", icon: "💅" },
];

const initialListings = [
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
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function NavLink({ children }) {
  return (
    <a
      href="/"
      style={{
        color: "#5b6470",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "600",
      }}
    >
      {children}
    </a>
  );
}

function CategoryCard({ icon, name }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={{
        background: "rgba(255,255,255,0.88)",
        border: "1px solid #f3e8ff",
        borderRadius: "22px",
        padding: "22px",
        textAlign: "center",
        boxShadow: "0 14px 35px rgba(148, 163, 184, 0.12)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ fontSize: "34px", marginBottom: "10px" }}>{icon}</div>
      <div style={{ fontWeight: "700", color: "#1f2937" }}>{name}</div>
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
        background: "rgba(255,255,255,0.92)",
        border: "1px solid #f5d0fe",
        borderRadius: "24px",
        padding: "20px",
        color: "#111827",
        boxShadow: "0 18px 40px rgba(236, 72, 153, 0.08)",
        backdropFilter: "blur(10px)",
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
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          style={{ fontSize: "34px" }}
        >
          {item.emoji}
        </motion.div>

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

      <h3 style={{ margin: "0 0 10px 0", fontSize: "20px", color: "#111827" }}>
        {item.title}
      </h3>

      <p style={{ margin: "0 0 6px 0", color: "#4b5563", fontSize: "14px" }}>
        Seller: {item.seller}
      </p>
      <p style={{ margin: "0 0 14px 0", color: "#6b7280", fontSize: "14px" }}>
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
        <div style={{ color: "#d97706", fontWeight: "800", fontSize: "20px" }}>
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
            fontWeight: "700",
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
      <h3 style={{ marginTop: 0, marginBottom: "10px", fontSize: "18px", color: "#111827" }}>
        {title}
      </h3>
      <p style={{ margin: 0, color: "#4b5563", lineHeight: "1.6", fontSize: "14px" }}>
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
            fontWeight: "700",
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
    emoji: "📱",
  });

  function handleChange(e) {
    setDashboardData({
      ...dashboardData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !dashboardData.seller ||
      !dashboardData.title ||
      !dashboardData.price ||
      !dashboardData.whatsapp
    ) {
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
      emoji: dashboardData.emoji,
    });

    setDashboardData({
      seller: "",
      whatsapp: OWNER_WHATSAPP,
      title: "",
      price: "",
      category: "iPhones",
      location: "",
      type: "Product",
      emoji: "📱",
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
        <select
          name="emoji"
          value={dashboardData.emoji}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="📱">📱 Phone</option>
          <option value="💇">💇 Hair</option>
          <option value="👁️">👁️ Lashes</option>
          <option value="💅">💅 Nails</option>
          <option value="👗">👗 Clothing</option>
          <option value="✨">✨ Other</option>
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
            fontWeight: "700",
            boxShadow: "0 12px 25px rgba(249, 115, 22, 0.18)",
          }}
        >
          Add Listing
        </motion.button>
      </div>
    </form>
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
        fontFamily: "Arial, sans-serif",
        background:
          "linear-gradient(180deg, #fffaf5 0%, #fff7fb 35%, #fdf4ff 100%)",
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
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ fontWeight: "800", fontSize: "22px", color: "#111827" }}>
              Glow & Gadgets
            </div>
            <div
              style={{
                color: "#d97706",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              South Africa Marketplace
            </div>
          </motion.div>

          <div style={{ display: "flex", gap: "18px", alignItems: "center", flexWrap: "wrap" }}>
            <NavLink>Home</NavLink>
            <NavLink>Categories</NavLink>
            <NavLink>Sellers</NavLink>
            <NavLink>How It Works</NavLink>
          </div>
        </div>
      </header>

      <section
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
                fontWeight: "700",
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
                lineHeight: "1.02",
                margin: "0 0 18px 0",
                color: "#111827",
              }}
            >
              Discover local sellers in one easy, beautiful marketplace.
            </h1>

            <p
              style={{
                color: "#4b5563",
                fontSize: "18px",
                lineHeight: "1.7",
                maxWidth: "650px",
                marginBottom: "24px",
              }}
            >
              Shop iPhones, hair, lashes, nails, and more from South African sellers all in one place.
              Glow & Gadgets makes it easy to browse, order, and connect.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "linear-gradient(135deg, #ec4899, #f97316)",
                  color: "white",
                  border: "none",
                  padding: "14px 22px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontWeight: "700",
                  boxShadow: "0 14px 28px rgba(236, 72, 153, 0.18)",
                }}
              >
                Explore Marketplace
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "rgba(255,255,255,0.85)",
                  color: "#111827",
                  border: "1px solid #f5d0fe",
                  padding: "14px 22px",
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontWeight: "700",
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
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{ fontWeight: "700", marginBottom: "18px", fontSize: "18px", color: "#111827" }}>
              Popular right now
            </div>

            <div style={{ display: "grid", gap: "14px" }}>
              {[
                "📱 iPhone deals from trusted resellers",
                "💇 Premium hair bundles and wig installs",
                "👁️ Lash appointments near you",
                "💅 Nail techs and beauty services",
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
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        style={{ padding: "50px 20px" }}
      >
        <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "32px", margin: "0 0 10px 0", color: "#111827" }}>
              Shop by category
            </h2>
            <p style={{ color: "#6b7280", margin: 0 }}>
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
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        style={{ padding: "10px 20px 50px" }}
      >
        <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "32px", margin: "0 0 10px 0", color: "#111827" }}>
              Featured listings
            </h2>
            <p style={{ color: "#6b7280", margin: 0 }}>
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
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        style={{ padding: "0 20px 50px" }}
      >
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
      </motion.section>

      <motion.section
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
            <h2 style={{ marginTop: 0, color: "#111827" }}>Become a Seller</h2>
            <p style={{ color: "#4b5563", lineHeight: "1.7" }}>
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
            <h2 style={{ marginTop: 0, color: "#111827" }}>Seller Dashboard</h2>
            <p style={{ color: "#4b5563", lineHeight: "1.7" }}>
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
        }}
      >
        Glow & Gadgets SA — marketplace for beauty, tech, and local hustlers.
      </footer>
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
};