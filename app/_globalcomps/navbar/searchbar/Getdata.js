"use server";
import SortFn from "@/app/_hooks/Sortproducts";

const Getdata = async (
  searchQuery = "",
  sort = "default",
  maxProducts = 10,
  limitdata = false
) => {
  let allproducts = await SortFn(sort);

  const lowerQuery = searchQuery.slice(0, 40).toLowerCase();
  const words = lowerQuery.split(" ").filter(Boolean);

  // 1️⃣ Sort by relevance (query match first)
  allproducts.sort((a, b) => {
    const aMatch = a?.model?.toLowerCase().includes(lowerQuery);
    const bMatch = b?.model?.toLowerCase().includes(lowerQuery);

    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  // 2️⃣ Collect results with early exit
  const results = [];

  for (const product of allproducts) {
    if (results.length >= maxProducts) break;

    const model = product?.model?.toLowerCase() || "";
    const brand = product?.brand?.toLowerCase() || "";

    const matchesAllWords = words.every(
      (word) => model.includes(word) || brand.includes(word)
    );

    if (matchesAllWords) {
      if (limitdata) {
        results.push({
          _id: product?._id,
          brand: product?.brand,
          model: product?.model,
          variant: product?.variant,
          deviceType: product?.deviceType,
          releaseDate: product?.releaseDate,
          price: product?.price,
          images: product?.images,
          awards: product?.awards,
        });
      } else {
        results.push(product);
      }
    }
  }

  return results;
};

export default Getdata;
