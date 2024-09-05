import "./style.css";
import { IProdukts, IRating } from "./interfaces/IProducts";
import { isPast } from "date-fns";

const input = document.getElementById("search-input") as HTMLInputElement;
const sortBy = document.getElementById("sort") as HTMLSelectElement;
const electroBtn = document.getElementById("electro") as HTMLButtonElement;
const jeweleryBtn = document.getElementById("jewelery") as HTMLButtonElement;
const mensBtn = document.getElementById("mens") as HTMLButtonElement;
const womensBtn = document.getElementById("womens") as HTMLButtonElement;
const output = document.getElementById("output-container") as HTMLDivElement;

const BASE_URL = "https://fakestoreapi.com/products";

let productsArray: IProdukts[] = [];

fetch(BASE_URL)
  .then((resp: Response) => {
    if (!resp.ok) {
      throw new Error("Couldn't find any products ");
    }
    return resp.json();
  })
  .then((data: IProdukts[]) => {
    productsArray = data;
    displayProducts(productsArray);
  })
  .catch((err: Error) => {
    console.log("Error fetching data");
    output.innerHTML = `<p>Error fetching data: ${err.message}</p>`;
  });

function displayProducts(products: IProdukts[]) {
  if (output) {
    output.innerHTML = "";
    products.forEach((product: IProdukts) => {
      const productCard = document.createElement("div") as HTMLDivElement;
      productCard.className = "product-card";

      const productImage = document.createElement("img") as HTMLImageElement;
      productImage.src = product.image;
      output.appendChild(productImage);

      const productTitle = document.createElement("h3") as HTMLHeadElement;
      productTitle.textContent = product.title;
      output.appendChild(productTitle);

      const productPrice = document.createElement("p") as HTMLParagraphElement;
      productPrice.textContent = product.price.toString();
      output.appendChild(productPrice);

      const productBtn = document.createElement("button") as HTMLButtonElement;
      productBtn.textContent = "Add to cart";
      output.appendChild(productBtn);

      output.appendChild(productCard);
    });
  }
}

input.addEventListener("input", () => {
  const searchTerm = input.value.toLowerCase();
  const filteredProducts = productsArray.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
});
electroBtn.addEventListener("click", () => filterByCategory("electronics"));
jeweleryBtn.addEventListener("click", () => filterByCategory("jewelery"));
mensBtn.addEventListener("click", () => filterByCategory("men's clothing"));
womensBtn.addEventListener("click", () => filterByCategory("women's clothing"));

function filterByCategory(category: string) {
  const filteredProducts = productsArray.filter(
    (product) => product.category === category
  );
  displayProducts(filteredProducts);
}
