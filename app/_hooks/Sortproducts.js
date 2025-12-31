export default async function SortFn(products, type = 0) {
  if (type == 0) {
    return products.sort((a, b) => a?.releaseDate - b?.releaseDate);
  } else if (type == 1) {
    return products.sort((a, b) => b?.releaseDate - a?.releaseDate);
  } else if (type == 2) {
  } else if (type == 3) {
  } else if (type == 4) {
  }
}
