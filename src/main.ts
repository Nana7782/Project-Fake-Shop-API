import "./style.css";
import { IProdukts, IRating } from "./interfaces/IProducts";

const input = document.getElementById("search-input") as HTMLInputElement;
const sortBy = document.getElementById("sort") as HTMLSelectElement;
const electroBtn = document.getElementById("electro") as HTMLButtonElement;
const jeweleryBtn = document.getElementById("jewelery") as HTMLButtonElement;
const mensBtn = document.getElementById("mens") as HTMLButtonElement;
const womensBtn = document.getElementById("womens") as HTMLButtonElement;
const output = document.getElementById("output-container") as HTMLDivElement;

const BASE_URL = "https://fakestoreapi.com/products";
