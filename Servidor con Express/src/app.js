import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const pm = new ProductManager();

app.use(express.urlencoded({extended: true}));

app.get("/products/?", async (req, res) => {
  const products = await pm.getProducts();
  const limit = req.query.limit;
  const newProducts = products.products.slice(0, limit);
  res.send(newProducts);
});

app.get("/products/:id", async (req, res) => {
  const productId = await pm.getProductById(req.params.id);
  productId ? res.send(productId) : res.send({error: "not found"});
});

app.listen(8080, () => {
  console.log("Servidor levantado");
});