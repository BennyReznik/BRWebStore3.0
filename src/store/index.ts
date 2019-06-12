import { IProduct } from "../models/product";
import { ICategory } from "../models/category";
import products from "./products.json";
import categories from "./categories.json";

interface Store {
  loadProducts: () => Promise<IProduct[]>;
  loadCategories: () => Promise<ICategory[]>;
}

const store: Store = {
  loadProducts: () => Promise.resolve(products),
  loadCategories: () => Promise.resolve(categories)
};

export { store };
