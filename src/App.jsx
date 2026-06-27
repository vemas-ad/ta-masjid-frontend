import { useEffect, useState } from "react";
import "./index.css";
import api from "./api";

function App() {
  const [status, setStatus] = useState({});
  const [backendURL, setBackendURL] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setBackendURL(api.defaults.baseURL);
    }, 1000);
  }, []);

  useEffect(() => {
    const load = () => {
      api
        .get("/api/status")
        .then((res) => {
          setStatus(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    load();
    const timer = setInterval(load, 1000);

    return () => clearInterval(timer);
  }, []);

  const controlFan = (speed) => {
    api.post("/api/control", {
      command: "fan_control",
      value: speed,
    });
  };

  return (
    <div>
      <header className="header">
        <div>
          <h1>HMI CONTROL SYSTEM</h1>
          <p>Masjid Bahrul Ulum - Single Camera YOLOv8 Implementation</p>
        </div>
        <nav>
          <span>DASHBOARD</span>
          <span>MONITORING</span>
          <span>ANALYTICS</span>
        </nav>
      </header>

      <section className="title">
        <h2>SYSTEM DASHBOARD</h2>
        <p>Real-time Monitoring & Control Panel - Single Camera System</p>
        <div className="top-btn">
          <button>Snapshot</button>
          <button>Report</button>
          <button>Alerts 🔴</button>
        </div>
      </section>

      <div className="grid">
        <div className="card">
          <h3>ZONE DISTRIBUTION</h3>
          <div className="zone-box">
            <div>{status.human_count || 0}</div>
          </div>
          <p>Detected Human</p>
        </div>

        <div className="card">
          <h3>SENSOR DATA</h3>
          <div className="sensor">
            <div>
              Light Intensity
              <br />
              --
            </div>
            <div>
              Temperature
              <br />
              --
            </div>
            <div>
              Humidity
              <br />
              --
            </div>
            <div>
              Power Usage
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
              className="camera"
              alt="Live Feed"
            />
          )}
        </div>
      </div>

      <div className="fan">
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