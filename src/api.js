import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api"  // <-- change 5000 → 3001
});
