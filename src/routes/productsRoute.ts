import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  isProductNameLengthValid,
  checkIfIdIsNumber,
  productNotFound
} from "../controllers";
import { wrapAsync, wrapAsyncAndSend } from "../utils/async";

const router = express.Router();

router.get("/", wrapAsyncAndSend(getProducts));

router.get(
  "/:id",
  wrapAsync(checkIfIdIsNumber),
  wrapAsync(productNotFound),
  wrapAsyncAndSend(getProductById)
);

router.post(
  "/",
  wrapAsync(isProductNameLengthValid),
  wrapAsyncAndSend(createProduct, 201)
);

router.put(
  "/:id",
  wrapAsync(checkIfIdIsNumber),
  wrapAsync(productNotFound),
  wrapAsync(isProductNameLengthValid),
  wrapAsyncAndSend(updateProduct)
);

router.delete(
  "/:id",
  wrapAsync(checkIfIdIsNumber),
  wrapAsync(productNotFound),
  wrapAsyncAndSend(deleteProduct, 204)
);

export { router };
