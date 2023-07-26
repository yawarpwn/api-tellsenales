import type { Product } from "../types/product.js";

let db: Product[] = [{
  name: "Lamina HIP reflectivo ",
  code: "lhip",
  cost: 200,
}, {
  name: "Fibra de vidrio 60x60cm",
  code: "fhip",
  cost: 150,
}];


export function add(product: Product) {
  [...db, product]
}

export function getAll() {
  return db
}

export function remove(code: string) {
  const dbFiltered = db.filter(item => item.code !== code)
  db = dbFiltered
}

