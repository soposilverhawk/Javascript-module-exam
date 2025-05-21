import { loadHeader } from "./loadHeader.js";
import { loadFooter } from "./loadFooter.js";
loadHeader();
loadFooter();

const productsContainerWrapper = document.getElementById("products-wrapper");
const mainContainer = document.querySelector(".main-container");
let allProducts = [];
let productsSet = [];
let setStartIdx = 0;
let setEndIdx = 6;
let currentPage = 1;
let allProductsPagesNum;
let filteredProductsPagesNum;

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    getProductsSet(setStartIdx, setEndIdx);
    allProductsPagesNum = generateProductsPagination(allProducts);
    generateProductsPaginationHTML(allProductsPagesNum);
    setupPaginationControls();
    updateActivePageButton();

    const productsSearchForm = document.getElementById("search-form");
    productsSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const productsSearchUserInput =
        document.getElementById("products-search").value;
      handleSearch(allProducts, productsSearchUserInput);
    });
  })
  .catch((err) => {
    console.log(err);
    productsContainerWrapper.innerHTML = `An error occurred while trying to load the data: ${err}`;
  });

function getProductsSet(startingIdx, endingIdx, arrayToRender = allProducts) {
  productsSet = arrayToRender.slice(startingIdx, endingIdx);
  generateProductSetHTML(productsSet);
}

function generateProductSetHTML(productsSet) {
  productsContainerWrapper.innerHTML = "";
  productsSet.forEach(
    ({ imageUrl, shortdescription, status, Title, category, price, id }) => {
      const productContainer = document.createElement("a");
      productContainer.classList.add("product-card");

      const productContainerAttributes = {
        id: id,
        href: `product-details.html?id=${id}`,
        target: "_blank",
      };

      for (const [key, value] of Object.entries(productContainerAttributes)) {
        productContainer.setAttribute(key, value);
      }

      productContainer.innerHTML = `
        <div class="product-img">
            <img src="${imageUrl}" alt="${shortdescription}" />
        </div>
        <div class="product-description-cont">
            <span class="product-status">${status}</span>
            <p class="product-name">${Title}</p>
            <p class="product-category">${category}</p>
            <span class="product-price">MRP: ₹${price}</span>
        </div>
      `;
      productsContainerWrapper.appendChild(productContainer);
    }
  );
}

function generateProductsPagination(allProductsArr) {
  return Math.ceil(allProductsArr.length / 6);
}

function generateProductsPaginationHTML(totalPagesCount) {
  const productsPaginationWrapper = document.getElementById(
    "products-pagination-wrapper"
  );

  let buttonsHTML = `<button class="prev-btn">prev</button>`;

  for (let i = 1; i <= totalPagesCount; i++) {
    buttonsHTML += `<button class="page-btn" id="product-page-${i}">${i}</button>`;
  }

  buttonsHTML += `<button class="next-btn">next</button>`;

  productsPaginationWrapper.innerHTML = buttonsHTML;
}

function updateIndicesFromPage() {
  setStartIdx = (currentPage - 1) * 6;
  setEndIdx = currentPage * 6;
}

function updateActivePageButton() {
  const productsBtns = document.querySelectorAll(".page-btn");
  productsBtns.forEach((btn) => {
    btn.classList.remove("active-page");
  });

  const activeBtn = document.getElementById(`product-page-${currentPage}`);
  if (activeBtn) {
    activeBtn.classList.add("active-page");
  }
}

function setupPaginationControls() {
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const productsBtns = document.querySelectorAll(".page-btn");

  nextBtn.addEventListener("click", () => {
    if (currentPage < allProductsPagesNum) {
      currentPage++;
      updateIndicesFromPage();
      getProductsSet(setStartIdx, setEndIdx);
      updateActivePageButton();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updateIndicesFromPage();
      getProductsSet(setStartIdx, setEndIdx);
      updateActivePageButton();
    }
  });

  productsBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedPageStr = btn.id;
      const selectedPage = parseInt(
        selectedPageStr.split("product-page-")[1],
        10
      );

      if (currentPage !== selectedPage) {
        currentPage = selectedPage;
        updateIndicesFromPage();
        getProductsSet(setStartIdx, setEndIdx);
        updateActivePageButton();
      }
    });
  });
}

function handleScroll(isScrolledDown) {
  if (isScrolledDown) {
    mainContainer.classList.add("main-container-scrolled");
  } else {
    mainContainer.classList.remove("main-container-scrolled");
  }
}

window.addEventListener("scroll", () => {
  if (window.scrollY >= 80) {
    handleScroll(true);
  } else {
    handleScroll(false);
  }

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
});

function handleSearch(allProducts, userInput) {
  const normalizedInput = userInput.toLowerCase().trim();

  const filteredProducts = allProducts.filter((item) =>
    item.Title.toLowerCase().includes(normalizedInput)
  );

  getProductsSet(0, filteredProducts.length, filteredProducts);
  filteredProductsPagesNum = generateProductsPagination(filteredProducts);
  generateProductsPaginationHTML(filteredProductsPagesNum);
  setupPaginationControls();
  updateActivePageButton();
}

const checkboxesContainers = document.querySelectorAll(".checkboxes-cont");

checkboxesContainers.forEach((container) => {
  container.addEventListener("click", (e) => {
    const collapseExpandBtn = e.target.closest(".collapse-expand-btn");

    if (e.target == collapseExpandBtn) {
      const checkboxGroups = container.querySelectorAll(".checkbox-group");
      console.log(checkboxGroups);
      checkboxGroups.forEach((group) =>
        group.classList.toggle("checkbox-group-active")
      );
      collapseExpandBtn.classList.toggle("expanded");
    }
  });
});
