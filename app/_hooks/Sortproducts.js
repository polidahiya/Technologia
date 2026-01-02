export default async function SortFn(products, type = 0) {
  if (type == 0) {
    return products.sort(
      (a, b) => new Date(a?.releaseDate) - new Date(b?.releaseDate)
    );
  } else if (type == 1) {
    return products.sort(
      (a, b) => new Date(b?.releaseDate) - new Date(a?.releaseDate)
    ); //newer first
  } else if (type == 2) {
  } else if (type == 3) {
  } else if (type == 4) {
  }
}
