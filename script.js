const productsContainerWrapper = document.getElementById("products-wrapper");
let allProducts = [];
let productsSet = [];
let setStartIdx = 0;
let setEndIdx = 6;
let currentPage = 1;
let allProductsPagesNum;

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    getProductsSet(setStartIdx, setEndIdx);
    allProductsPagesNum = generateProductsPagination(allProducts);
    generateProductsPaginationHTML(allProductsPagesNum);
    setupPaginationControls();
    updateActivePageButton();
  })
  .catch((err) => {
    console.log(err);
    productsContainerWrapper.innerHTML = `An error occurred while trying to load the data: ${err}`;
  });

function getProductsSet(startingIdx, endingIdx) {
  productsSet = allProducts.slice(startingIdx, endingIdx);
  generateProductSetHTML(productsSet);
}

function generateProductSetHTML(productsSet) {
  productsContainerWrapper.innerHTML = "";
  productsSet.forEach(
    ({ imageUrl, shortdescription, status, Title, category, price, id }) => {
      const productContainer = document.createElement("div");
      productContainer.classList.add("product-card");
      productContainer.setAttribute("id", id);
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
    buttonsHTML += `<button class="page-btn" id="${i}">${i}</button>`;
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
  console.log(productsBtns);
  productsBtns.forEach((btn) => {
    btn.classList.remove("active-page");
    console.log(btn)
  });


  const activeBtn = document.getElementById(currentPage.toString());
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
      const selectedPage = parseInt(btn.id);
      if (currentPage !== selectedPage) {
        currentPage = selectedPage;
        updateIndicesFromPage();
        getProductsSet(setStartIdx, setEndIdx);
        updateActivePageButton();
      }
    });
  });
}


// fix the issue with the first page-btn not getting the active class