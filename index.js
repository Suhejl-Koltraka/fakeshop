const productsContainer = document.getElementById("productContainer");
const categorieContainer = document.getElementById("categorieContainer");

const loader = document.createElement("div");
loader.innerText = "Loading";
loader.className = "loader";

document.body.appendChild(loader);

function renderProducts(products) {
  productsContainer.innerHTML = "";
  const productElements = products.map((p) => {
    const product = document.createElement("div");
    product.className = "product";
    const productImg = document.createElement("img");
    const productTitle = document.createElement("p");
    productImg.src = p.image;
    productImg.className = "productImg";
    productTitle.innerText = p.title;

    product.append(productImg, productTitle);
    return product;
  });
  productsContainer.append(...productElements);
}

function renderCategories(categories) {
  const categoryElements = categories.map((c) => {
    const categoryButton = document.createElement("button");
    categoryButton.className = "category";
    categoryButton.innerText = c;
    categoryButton.addEventListener("click", () => {
      fetch(`https://fakestoreapi.com/products/category/${c}`)
        .then((res) => res.json())
        .then((json) => renderProducts(json));
    });
    return categoryButton;
  });
  categorieContainer.append(...categoryElements);
}

fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  .then((json) => renderCategories(json));

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    renderProducts(json);
    document.body.removeChild(loader);
  });
