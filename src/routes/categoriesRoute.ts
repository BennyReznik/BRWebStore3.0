import express from "express";

import {
  getCategories,
  getCategoryById,
  getProductsByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  isCategoryNameLengthValid,
  checkIfIdIsNumber,
  categoryNotFound
} from "../controllers";
import { wrapAsync, wrapAsyncAndSend } from "../utils/async";

const router = express.Router();

router.get("/", wrapAsyncAndSend(getCategories));

router.get(
  "/:id",
  wrapAsync(categoryNotFound),
  wrapAsync(checkIfIdIsNumber),
  wrapAsyncAndSend(getCategoryById)
);

router.get(
  "/:id/products",
  wrapAsync(categoryNotFound),
  wrapAsync(checkIfIdIsNumber),
  wrapAsyncAndSend(getProductsByCategory)
);

router.post(
  "/",
  wrapAsync(isCategoryNameLengthValid),
  wrapAsyncAndSend(createCategory, 201)
);

router.put(
  "/:id",
  wrapAsync(checkIfIdIsNumber),
  wrapAsync(categoryNotFound),
  wrapAsync(isCategoryNameLengthValid),
  wrapAsyncAndSend(updateCategory)
);

router.delete(
  "/:id",
  wrapAsync(checkIfIdIsNumber),
  wrapAsync(categoryNotFound),
  wrapAsyncAndSend(deleteCategory, 204)
);

export { router };
