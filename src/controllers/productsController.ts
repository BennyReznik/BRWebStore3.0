import { store } from "../store/index";
import { IProduct } from "../models";
import { Request, Response, NextFunction } from "express";

const loadProducts = store.loadProducts();

const getProducts = async (req: Request, res: Response) => store.loadProducts();

const getProductById = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  const id = req.params.id;
  const existing = (await loadProducts).find(p => p.id === id);

  return existing;
};

const createProduct = async (req: Request, res: Response) => {
  const newProduct = req.body as IProduct;

  newProduct.id = ((await getMaxId()) + 1).toString();

  (await loadProducts).push(newProduct);
  return newProduct;
};

const updateProduct = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const product = (await loadProducts).find(p => p.id === id.toString());

  const productToUpdate = req.body as IProduct;
  productToUpdate.id = id;
  Object.assign(product, productToUpdate);

  return product;
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  const index = (await loadProducts).findIndex(p => p.id === req.params.id);

  if (index !== 0 && !index) {
  } else {
    (await loadProducts).splice(index, 1);
  }
};

const productNotFound = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  const product = (await loadProducts).find(p => p.id === req.params.id);
  if (product) {
    if (next) {
      next();
    }
  } else {
    res.status(404).send("product not found");
  }
};

const isProductNameLengthValid = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  const newProduct = req.body as IProduct;
  if (newProduct.name.length >= 3) {
    if (next) {
      next();
    }
  } else {
    if (next) {
      const err = new Error("Name length must be more than three characters");
      err.name = "400";
      next(err);
    }
  }
};

async function getMaxId() {
  let maxId = 1;

  (await loadProducts).forEach(e => {
    const id = Number.parseInt(e.id, undefined);
    if (id > maxId) {
      maxId = id;
    }
  });

  return maxId;
}

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  isProductNameLengthValid,
  productNotFound
};
