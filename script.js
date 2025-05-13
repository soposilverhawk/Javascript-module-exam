const productsContainerWrapper = document.getElementById("products-wrapper");
let productsData = [];
let productsCount = 0;

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    let { slicedProductsArr, newStartingIdx } = getProductSet(
      data,
      productsCount
    );
    productsCount = newStartingIdx;
    console.log(productsCount);
    generateProductSetHTML(slicedProductsArr);
  })
  .catch((err) => {
    console.log(err);
    productsContainerWrapper.innerHTML = `An error occured while trying to load the data: ${err}`;
  });

function getProductSet(productsArray, startingIdx) {
  if (startingIdx < productsArray.length) {
    let endingIdx = startingIdx + 6;
    const sixProductsArray = productsArray.slice(startingIdx, endingIdx);
    return {
      slicedProductsArr: sixProductsArray,
      newStartingIdx: endingIdx,
    };
  }
}

function generateProductSetHTML(productsSet) {
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
