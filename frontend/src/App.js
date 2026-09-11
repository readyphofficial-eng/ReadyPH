import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.location.replace("/portal.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", background: "#FFF8E7" }}>
      <p>Loading Ready PH Portal…</p>
    </div>
  );
}

export default App;
