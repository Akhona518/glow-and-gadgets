import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [session, setSession] = useState(null);
  const [mode, setMode] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("iPhones");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

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
    if (session) fetchListings();
  }, [session]);

  async function handleSignUp(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return setMessage(error.message);

    await supabase.from("profiles").insert({
      id: data.user.id,
      email,
      business_name: businessName,
      whatsapp,
    });

    setMessage("Account created. You can log in.");
    setMode("login");
  }

  async function handleLogin(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setMessage(error.message);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  async function fetchListings() {
    const user = (await supabase.auth.getUser()).data.user;

    const { data } = await supabase
      .from("listings")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });

    setListings(data || []);
  }

  async function addListing(e) {
    e.preventDefault();

    const user = (await supabase.auth.getUser()).data.user;

    await supabase.from("listings").insert({
      seller_id: user.id,
      title,
      category,
      price,
      location,
      whatsapp,
    });

    setTitle("");
    setPrice("");
    setLocation("");
    fetchListings();
  }

  async function deleteListing(id) {
    await supabase.from("listings").delete().eq("id", id);
    fetchListings();
  }

  if (!session) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Glow & Gadgets Seller Portal</h1>

        <form onSubmit={mode === "login" ? handleLogin : handleSignUp}>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          {mode === "signup" && (
            <>
              <input
                placeholder="Business Name"
                onChange={(e) => setBusinessName(e.target.value)}
              />
              <br />

              <input
                placeholder="WhatsApp"
                onChange={(e) => setWhatsapp(e.target.value)}
              />
              <br />
            </>
          )}

          <button type="submit">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <button onClick={() => setMode(mode === "login" ? "signup" : "login")}>
          Switch to {mode === "login" ? "Sign Up" : "Login"}
        </button>

        <p>{message}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Seller Dashboard</h1>

      <button onClick={handleLogout}>Logout</button>

      <h2>Add Listing</h2>
      <form onSubmit={addListing}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />

        <button>Add</button>
      </form>

      <h2>My Listings</h2>
      {listings.map((item) => (
        <div key={item.id}>
          {item.title} - {item.price}
          <button onClick={() => deleteListing(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}