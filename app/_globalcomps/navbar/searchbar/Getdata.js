"use server";
import { Cachedproducts } from "../../cachedata/cachedProducts";
const Getdata = async (searchQuery) => {
  let allproducts = await Cachedproducts();
  const words = searchQuery?.split(" ") || [];

  // Filtering products based on the search query
  words.forEach((word) => {
    if (word.trim() !== "") {
      allproducts = allproducts.filter((product) => {
        const modelMatch = product?.model
          ?.toLowerCase()
          .includes(word.toLowerCase());

        const keyfeaturesMatch = product?.keyfeatures?.some((descItem) =>
          descItem.toLowerCase().includes(word.toLowerCase())
        );

        const keywordsMatch = product?.keywords
          ?.toLowerCase()
          .includes(word.toLowerCase());

        const categoryMatch = product?.category
          ?.toLowerCase()
          .includes(word.toLowerCase());

        const subcatMatch = product?.subcat
          ?.toLowerCase()
          .includes(word.toLowerCase());

        const skuMatch = product?.sku
          ?.toLowerCase()
          .includes(word.toLowerCase());

        return (
          modelMatch ||
          keyfeaturesMatch ||
          keywordsMatch ||
          categoryMatch ||
          subcatMatch ||
          skuMatch
        );
      });
    }
  });

  // Sorting the filtered products
  return allproducts.sort((a, b) => {
    const nameA = a?.model?.toLowerCase();
    const nameB = b?.model?.toLowerCase();
    const lowerQuery = searchQuery?.toLowerCase();

    if (nameA.includes(lowerQuery) && !nameB.includes(lowerQuery)) {
      return -1;
    } else if (!nameA.includes(lowerQuery) && nameB.includes(lowerQuery)) {
      return 1;
    } else {
      return 0;
    }
  });
};

export default Getdata;
