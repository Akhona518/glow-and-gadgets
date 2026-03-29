import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [session, setSession] = useState(null);
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("iPhones");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Product");

  const [listings, setListings] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchMyListings();
    }
  }, [session]);

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: data.user.id,
          email: email,
          business_name: businessName,
          whatsapp: whatsapp,
        });

        if (profileError) {
          setMessage(profileError.message);
          setLoading(false);
          return;
        }
      }

      setMessage("Account created successfully. You can now log in.");
      setMode("login");
    } catch (err) {
      setMessage(err.message || "Something went wrong during sign up.");
    }

    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      }
    } catch (err) {
      setMessage(err.message || "Something went wrong during login.");
    }

    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  async function fetchMyListings() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setListings(data || []);
    }
  }

  async function handleAddListing(e) {
    e.preventDefault();
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase.from("listings").insert({
      seller_id: user.id,
      title,
      category,
      price,
      location,
      type,
      whatsapp,
      status: "active",
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setTitle("");
    setCategory("iPhones");
    setPrice("");
    setLocation("");
    setType("Product");
    setMessage("Listing added successfully.");
    fetchMyListings();
  }

  async function handleDeleteListing(id) {
    const { error } = await supabase.from("listings").delete().eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    fetchMyListings();
  }

  if (!session) {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Glow & Gadgets Seller Portal</h1>
          <p style={subtitleStyle}>
            {mode === "login"
              ? "Log in to manage your listings"
              : "Create your seller account"}
          </p>

          <form
            onSubmit={mode === "login" ? handleLogin : handleSignUp}
            style={formStyle}
          >
            <input
              style={inputStyle}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              style={inputStyle}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {mode === "signup" && (
              <>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />

                <input
                  style={inputStyle}
                  type="text"
                  placeholder="WhatsApp number"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                />
              </>
            )}

            <button style={buttonStyle} type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Log In"
                : "Create Account"}
            </button>
          </form>

          <button
            style={secondaryButtonStyle}
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setMessage("");
            }}
          >
            {mode === "login"
              ? "Need an account? Sign up"
              : "Already have an account? Log in"}
          </button>

          {message ? <p style={messageStyle}>{message}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={dashboardStyle}>
        <div style={topBarStyle}>
          <div>
            <h1 style={titleStyle}>Seller Dashboard</h1>
            <p style={subtitleStyle}>Manage your listings</p>
          </div>
          <button style={secondaryButtonStyle} onClick={handleLogout}>
            Log Out
          </button>
        </div>

        <div style={gridStyle}>
          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>Add Listing</h2>
            <form onSubmit={handleAddListing} style={formStyle}>
              <input
                style={inputStyle}
                type="text"
                placeholder="Listing title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <select
                style={inputStyle}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>iPhones</option>
                <option>Hair</option>
                <option>Lashes</option>
                <option>Nails</option>
                <option>Clothing</option>
                <option>Other</option>
              </select>

              <input
                style={inputStyle}
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <input
                style={inputStyle}
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <select
                style={inputStyle}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>Product</option>
                <option>Service</option>
              </select>

              <button style={buttonStyle} type="submit">
                Add Listing
              </button>
            </form>
          </div>

          <div style={cardStyle}>
            <h2 style={sectionTitleStyle}>My Listings</h2>

            {listings.length === 0 ? (
              <p style={subtitleStyle}>No listings yet.</p>
            ) : (
              <div style={{ display: "grid", gap: "12px" }}>
                {listings.map((item) => (
                  <div key={item.id} style={listingCardStyle}>
                    <div>
                      <strong>{item.title}</strong>
                      <div style={smallTextStyle}>
                        {item.category} • {item.type}
                      </div>
                      <div style={smallTextStyle}>{item.price}</div>
                      <div style={smallTextStyle}>{item.location}</div>
                    </div>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDeleteListing(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}

            {message ? <p style={messageStyle}>{message}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #fffaf5 0%, #fff7fb 35%, #fdf4ff 100%)",
  padding: "24px",
  fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
};

const dashboardStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
};

const topBarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "white",
  border: "1px solid #f5d0fe",
  borderRadius: "24px",
  padding: "24px",
  boxShadow: "0 18px 35px rgba(236, 72, 153, 0.08)",
};

const formStyle = {
  display: "grid",
  gap: "12px",
};

const inputStyle = {
  background: "rgba(255,255,255,0.95)",
  border: "1px solid #e5e7eb",
  color: "#111827",
  padding: "13px 14px",
  borderRadius: "12px",
  outline: "none",
  fontWeight: "500",
};

const buttonStyle = {
  background: "linear-gradient(135deg, #ec4899, #f97316)",
  color: "white",
  border: "none",
  padding: "13px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "800",
};

const secondaryButtonStyle = {
  background: "white",
  color: "#be185d",
  border: "1px solid #f9a8d4",
  padding: "10px 14px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "700",
};

const deleteButtonStyle = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "12px",
};

const listingCardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  border: "1px solid #f3f4f6",
  borderRadius: "16px",
  padding: "14px",
};

const titleStyle = {
  margin: 0,
  fontSize: "30px",
  fontWeight: "900",
  letterSpacing: "-0.04em",
  color: "#111827",
};

const sectionTitleStyle = {
  marginTop: 0,
  marginBottom: "14px",
  fontSize: "22px",
  fontWeight: "900",
  color: "#111827",
};

const subtitleStyle = {
  color: "#6b7280",
  fontWeight: "500",
};

const smallTextStyle = {
  color: "#6b7280",
  fontSize: "14px",
  marginTop: "4px",
};

const messageStyle = {
  marginTop: "12px",
  color: "#374151",
  fontWeight: "600",
};