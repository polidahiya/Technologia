"use server";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "@/lib/data";
import { Cachedproducts } from "../_globalcomps/cachedata/cachedProducts";
import Scorecalculator from "../_globalcomps/scorescalculator/Scorecalculator";
import { Getautofillvalues } from "@/lib/autofillvaluesfn";

const SCORE_SORTS = {
  totalscore: "totalscore",
  displayscore: "displayscore",
  performancescore: "performancescore",
  camerascore: "camerascore",
  batteryscore: "batteryscore",
  connectionscore: "connectionscore",
  designscore: "designscore",
};

export default async function SortFn(type = "default") {
  // autofillvalues
  const autofillvalues = await Getautofillvalues();

  if (type === "default") {
    return getDefaultSorted();
  }

  if (type === "pricelh" || type === "pricehl") {
    return getPriceSorted(type);
  }

  if (type in SCORE_SORTS) {
    return getScoreSorted(type, autofillvalues);
  }

  return getDefaultSorted();
}

const getDefaultSorted = unstable_cache(
  async () => {
    const products = await Cachedproducts();

    return [...products].sort(
      (a, b) => new Date(b?.releaseDate) - new Date(a?.releaseDate),
    );
  },
  ["sort-default"],
  {
    revalidate: CACHE_TIME,
    tags: ["sort-default", "sort", "productsIds", "all"],
  },
);

const getPriceSorted = (type) =>
  unstable_cache(
    async () => {
      const products = await Cachedproducts();

      return [...products].sort((a, b) => {
        const fa = a.price?.[0];
        const fb = b.price?.[0];

        const pa = Number(fa?.sp ?? fa?.mrp ?? Infinity);
        const pb = Number(fb?.sp ?? fb?.mrp ?? Infinity);

        return type === "pricelh" ? pa - pb : pb - pa;
      });
    },
    [`sort-price-${type}`],
    {
      revalidate: CACHE_TIME,
      tags: [`sort-price-${type}`, "sort-price", "sort", "productsIds", "all"],
    },
  )();

const getScoreSorted = (type, autofillvalues) =>
  unstable_cache(
    async () => {
      const products = await Cachedproducts();

      const withScores = await Promise.all(
        products.map(async (p) => ({
          ...p,
          ...(await Scorecalculator(p, autofillvalues)),
        })),
      );

      const key = SCORE_SORTS[type];

      return withScores.sort(
        (a, b) => Number(b[key] ?? 0) - Number(a[key] ?? 0),
      );
    },
    [`sort-score-${type}`],
    {
      // ⏱ longer cache for expensive ops
      revalidate: CACHE_TIME * 3,
      tags: [`sort-score-${type}`, "sort-score", "sort", "productsIds", "all"],
    },
  )();
