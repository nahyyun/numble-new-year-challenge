import { navigate } from "./src/router.js";

window.addEventListener("DOMContentLoaded", () => {
  navigate(location.pathname);
});
