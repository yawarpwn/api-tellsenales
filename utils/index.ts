export function isValidProduct(product: object): boolean {
  if (
    "name" in product &&
    "code" in product &&
    "cost" in product
  ) {
    return true;
  }
  return false;
}
