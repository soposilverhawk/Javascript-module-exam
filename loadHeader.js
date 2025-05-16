fetch("header.html")
.then((res) => res.text())
.then((data) => {
  const header = document.getElementById("header");
  header.innerHTML = data;
})
.catch((err) => console.log(`Error loading header: ${err}`))