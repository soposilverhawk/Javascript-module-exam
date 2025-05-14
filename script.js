const productsContainerWrapper = document.getElementById("products-wrapper");
let allProducts = [];
let productsSet = [];
let setStartIdx = 0;
let setEndIdx = 6;

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    getProductsSet(setStartIdx, setEndIdx);
    const allProductsPagesNum = generateProductsPagination(allProducts);
    generateProductsPaginationHTML(allProductsPagesNum)
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");

    console.log(allProductsPagesNum)

    nextBtn.addEventListener("click", () => {
      if (setEndIdx < allProducts.length) {
        setStartIdx += 6;
        setEndIdx += 6;
        getProductsSet(setStartIdx, setEndIdx);
      }
    });

    prevBtn.addEventListener("click", () => {
      if (setStartIdx >= 6) {
        setStartIdx -= 6;
        setEndIdx -= 6;
        getProductsSet(setStartIdx, setEndIdx);
      }
    });
  })
  .catch((err) => {
    console.log(err);
    productsContainerWrapper.innerHTML = `An error occured while trying to load the data: ${err}`;
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
                <span class="product-price">MRP: ₹${price}</p>
            </div>
            `;
      productsContainerWrapper.appendChild(productContainer);
    }
  );
}

function generateProductsPagination (allProductsArr) {
  const totalPages = Math.ceil(allProductsArr.length / 6);
  return totalPages;
}

function generateProductsPaginationHTML (totalPagesCount) {
  const productsPaginationWrapper = document.getElementById("products-pagination-wrapper");

  let buttonsHTML = `<button class="prev-btn products-btn">prev</button>`

  for (let i = 1; i < totalPagesCount; i++) {
    buttonsHTML += `<button class="products-btn" id="${i}">${i}</button>`
  }

  buttonsHTML += `<button class="next-btn products-btn">next</button>`

  productsPaginationWrapper.innerHTML = buttonsHTML
}