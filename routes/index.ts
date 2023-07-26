import { Product } from "../types/product.d.ts";
import { isValidProduct } from "../utils/index.ts";
import { Router, Status } from "oak";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../db/index.ts";

const router = new Router();

// GET
router.get("/products", async (ctx) => {
  const productsList = await getProducts();
  ctx.response.body = productsList;
  ctx.response.type = "json";
});

router.get("/products/:id", async ({ params, response }) => {
  const { id } = params;
  try {
    const product = await getProduct(id);
    response.status = 201;
    response.body = {
      success: true,
      msg: "producto encontrado",
      data: product,
    };
    response.type = "json";
  } catch (error) {
    response.status = Status.NotFound;
    response.body = {
      success: false,
      msg: `producto con id: ${id} no encontrado`,
    };
    console.error(error);
  }
});

// POST
router.post("/products", async (ctx) => {
  const body = ctx.request.body();
  if (body.type !== "json") {
    ctx.throw(Status.BadRequest, "Must be a JSON document");
  }

  const newProduct = await body.value;

  if (!isValidProduct(newProduct)) {
    ctx.throw(Status.BadRequest, "Payload was not well formed");
  }

  await addProduct(newProduct);
  ctx.response.status = 201;
  ctx.response.body = {
    success: true,
    msg: "Product added successfully",
    data: newProduct,
  };
});

// PUT
router.put("/products/:id", async ({ params, request, response }) => {
  const { id } = params;
  const productToUpdate = await request.body().value;
  try {
    const updatedProduct = await updateProduct(productToUpdate, id);
    response.status = Status.Accepted;
    response.body = {
      success: true,
      msg: "Product updated",
      data: updatedProduct
    };
  } catch (error) {
    response.status = Status.NotFound;
    response.body = {
      success: false,
      msg: "Product not updated",
    };
    console.log(error);
  }
});

// DELETE
router.delete("/products/:id", async ({ params, response }) => {
  const { id } = params;
  try {
    const deletedProduct = await deleteProduct(id);
    response.status = Status.Accepted;
    response.body = {
      success: true,
      msg: "product deleted",
      data: deletedProduct
    };
  } catch (error) {
    response.status = Status.NotFound;
    response.body = {
      success: false,
      msg: `producto con id: ${id} no encontrado`,
    };
    console.log(error);
  }
});

export default router;
