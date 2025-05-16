async function loadHeader () {
  try {
    const res = await fetch ("header.html");

    if(!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.text();
    const header = document.getElementById("header");
    header.innerHTML = data;
  } catch (err) {
    console.error("Failed to load header:", err)
  }
}

export { loadHeader }