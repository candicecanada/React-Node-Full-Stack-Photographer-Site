const DOMAIN = import.meta.env.VITE_ENDPOINT
  ? import.meta.env.VITE_ENDPOINT
  : "http://localhost:8085";

export default DOMAIN;
