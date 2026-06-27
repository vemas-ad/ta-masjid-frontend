import axios from "axios";
import { supabase } from "./supabase";

const api = axios.create();
let backendURL = "";

async function loadBackendURL() {
  try {
    const { data, error } = await supabase
      .from("system_config")
      .select("ngrok_url")
      .eq("id", 1)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return;
    }

    backendURL = data.ngrok_url;
    api.defaults.baseURL = backendURL;
    console.log("Backend URL:", backendURL);
  } catch (err) {
    console.error("Backend URL Error:", err);
  }
}

loadBackendURL();

export default api;