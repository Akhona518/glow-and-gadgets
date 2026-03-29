import React from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  async function testConnection() {
    try {
      const { data, error } = await supabase.auth.getSession();
      console.log("SESSION DATA:", data);
      console.log("SESSION ERROR:", error);
      alert(error ? error.message : "Supabase connection worked");
    } catch (err) {
      console.error("FULL ERROR:", err);
      alert("Error: " + err.message);
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Supabase Test</h1>
      <button onClick={testConnection}>Test Supabase</button>
    </div>
  );
}