function loadFooter () {
    fetch("footer.html")
    .then((res) => res.text())
    .then((data) => {
        const footer = document.getElementById("footer");
        footer.innerHTML = data;
    })
}

export { loadFooter }