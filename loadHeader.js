function loadHeader () {
  fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    const header = document.getElementById("header");
    header.innerHTML = data;
  })
}

export { loadHeader }