import { loadHeader } from "./loadHeader.js";
import { loadFooter } from "./loadFooter.js";

loadHeader();
loadFooter();

const productMainImg = document.querySelector(".product-main-img");
const productStylesContainer = document.querySelector(".product-styles-container");
const productDescription = document.querySelector(".product-description");
const pageTitle = document.querySelector("title");
console.log(pageTitle)

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

fetch("data.json")
.then((res) => res.json())
.then((data) => {
    const product = data.find((item) => item.id === productId);
    if(!product) {
        throw new Error("product not found");
    }

    productMainImg.src = product.imageUrl;
    productMainImg.alt = product.Title;
    productDescription.textContent = product.shortdescription;
    pageTitle.textContent = product.Title;

    productStylesContainer.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.Title}" />
        <img src="${product.imageUrl}" alt="${product.Title}" />
    `
    // As this project does not include additional images for different variations of product items I hardcode the default img into the productStylesContainer. if it actually had variations in the data.json file in an array - i would loop over them, create img element for each and push them into the productStylesContainer
})