import React from "react";

export default function App() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Env Check</h1>
      <p><strong>Supabase URL:</strong> {String(url)}</p>
      <p><strong>Key starts with:</strong> {key ? key.slice(0, 20) : "missing"}</p>
    </div>
  );
}