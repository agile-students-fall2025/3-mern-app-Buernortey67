import { useEffect, useState } from "react";

export default function AboutUs() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const load = async () => {
      try {
        const base = process.env.REACT_APP_API_BASE || "http://localhost:5002/api";
        const res = await fetch(`${base}/about`);
        const json = await res.json();
        setData(json);
        setStatus("success");
      } catch (e) {
        console.error(e);
        setStatus("error");
      }
    };
    load();
  }, []);

  if (status === "loading") return <div style={{ padding: 16 }}>Loading…</div>;
  if (status === "error") return <div style={{ padding: 16, color: "crimson" }}>Failed to load About info.</div>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 16px" }}>
      <h1>{data.title}</h1>
      {data.name && <h2 style={{ color: "#555", marginTop: 0 }}>{data.name}</h2>}
      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt={`${data.name || "Profile"} headshot`}
          style={{ width: 240, height: 240, objectFit: "cover", borderRadius: 12, margin: "16px 0" }}
        />
      )}
      {Array.isArray(data.paragraphs) &&
        data.paragraphs.map((p, i) => <p key={i} style={{ lineHeight: 1.6 }}>{p}</p>)}
    </div>
  );
}
