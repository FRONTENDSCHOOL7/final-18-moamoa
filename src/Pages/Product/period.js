export const productPeriod = (productData) => {
  const date = productData.price.toString();
  const start = date.slice(0, 8);
  const end = date.slice(8);
  const result = `${start.slice(0, 4)}.${start.slice(4, 6)}.${start.slice(6)} ~ ${end.slice(
    0,
    4,
  )}.${end.slice(4, 6)}.${end.slice(6)}`;
  return result;
};