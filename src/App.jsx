import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const API = "https://37a2-103-181-255-55.ngrok-free.app/";

function App() {
  const [data, setData] = useState({});

  const loadData = () => {
    axios
      .get(`${API}/api/status`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  const control = (speed) => {
    axios.post(`${API}/api/control`, {
      command: "fan_control",
      value: speed,
    });
  };

  return (
    <div className="app">
      <header>
        <div>
          <h1>HMI CONTROL SYSTEM</h1>
          <p>Masjid Bahrul Ulum - YOLOv8 Smart Mosque</p>
        </div>
        <nav>
          Dashboard Monitoring Analytics
        </nav>
      </header>

      <section className="hero">
        <h2>SYSTEM DASHBOARD</h2>
        <p>Real-time Monitoring & Control Panel</p>
      </section>

      <div className="container">
        <div className="card">
          <h3>ZONE DISTRIBUTION</h3>
          <div className="value">{data.human_count ?? 0}</div>
          <p>Detected Human</p>
        </div>

        <div className="card">
          <h3>SENSOR DATA</h3>
          <div className="sensor">
            <div>
              Light
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
              Fan Speed
              <br />
              {data.fan_speed ?? 0}
            </div>
          </div>
        </div>

        <div className="card">
          <h3>LIVE PREVIEW</h3>
          <img src={`${API}/video_feed`} className="camera" alt="Live feed" />
        </div>
      </div>

      <div className="control">
        <h2>FAN CONTROL</h2>
        <button onClick={() => control(0)}>OFF</button>
        <button onClick={() => control(1)}>SPEED 1</button>
        <button onClick={() => control(2)}>SPEED 2</button>
        <button onClick={() => control(3)}>SPEED 3</button>
      </div>
    </div>
  );
}

export default App;