import { useEffect, useState } from "react";
import "./App.css";
import api from "./api";

function App() {
  const [status, setStatus] = useState({});
  const [backendURL, setBackendURL] = useState("");

  // Ambil URL backend dari axios
  useEffect(() => {
    setBackendURL(api.defaults.baseURL);
  }, []);

  // Polling status setiap 1 detik
  useEffect(() => {
    const load = () => {
      api
        .get("/api/status")
        .then((res) => {
          setStatus(res.data);
        })
        .catch((err) => {
          console.error("Status fetch error:", err);
        });
    };

    load();
    const timer = setInterval(load, 1000);

    return () => clearInterval(timer);
  }, []);

  const controlFan = (speed) => {
    api
      .post("/api/control", {
        command: "fan_control",
        value: speed,
      })
      .catch((err) => {
        console.error("Control error:", err);
      });
  };

  return (
    <div>
      <header>
        <div>
          <h1>HMI CONTROL SYSTEM</h1>
          <p>Masjid Bahrul Ulum - Single Camera YOLOv8 Implementation</p>
        </div>
        <nav>DASHBOARD &nbsp;&nbsp; MONITORING &nbsp;&nbsp; ANALYTICS</nav>
      </header>

      <section className="title">
        <h2>SYSTEM DASHBOARD</h2>
        <p>Real-time Monitoring & Control Panel - Single Camera System</p>
      </section>

      <div className="grid">
        <div className="card">
          <h3>ZONE DISTRIBUTION</h3>
          <h1>{status.human_count || 0}</h1>
          <p>Detected Human</p>
        </div>

        <div className="card">
          <h3>SENSOR DATA</h3>
          <div className="sensor">
            <div>
              Light Intensity
              <br />--
            </div>
            <div>
              Temperature
              <br />--
            </div>
            <div>
              Humidity
              <br />--
            </div>
            <div>
              Fan Speed
              <br />
              {status.fan_speed || 0}
            </div>
          </div>
        </div>

        <div className="card">
          <h3>LIVE PREVIEW</h3>
          {backendURL && (
            <img
              src={`${backendURL}/video_feed`}
              width="100%"
              alt="Live CCTV"
            />
          )}
        </div>
      </div>

      <div className="control">
        <h2>FAN CONTROL</h2>
        <button onClick={() => controlFan(0)}>OFF</button>
        <button onClick={() => controlFan(1)}>SPEED 1</button>
        <button onClick={() => controlFan(2)}>SPEED 2</button>
        <button onClick={() => controlFan(3)}>SPEED 3</button>
      </div>
    </div>
  );
}

export default App;