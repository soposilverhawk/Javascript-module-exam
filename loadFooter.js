async function loadFooter() {
  try {
    const res = await fetch("footer.html");

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.text();
    const footer = document.getElementById("footer");
    footer.innerHTML = data;
  } catch (err) {
    console.error("Failed to load header:", err);
  }
}

export { loadFooter };