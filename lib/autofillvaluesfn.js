"use server";
import { getcollection } from "./db";
import { unstable_cache } from "next/cache";
import { CACHE_TIME } from "./data";
import Revalidatefn from "@/app/_globalcomps/cachedata/Revalidatefn";

export const Getautofillvalues = unstable_cache(
  async () => {
    const { formautofillscollections } = await getcollection();
    return formautofillscollections.findOne({ _id: "catalog" });
  },
  ["catalog-config"],
  {
    revalidate: CACHE_TIME,
    tags: ["catalog-config", "all"],
  },
);

export async function Setautofillvalues(prod) {
  try {
    const { formautofillscollections } = await getcollection();

    const result = await formautofillscollections.updateOne(
      { _id: "catalog" },
      {
        $addToSet: {
          deviceType: { $each: [prod.deviceType].filter(Boolean) },
          availability: { $each: [prod.availability].filter(Boolean) },
          currency: {
            $each: (prod.price?.map((p) => p.currency) || []).filter(Boolean),
          },
          displayTypes: {
            $each: (prod.display?.map((d) => d.type) || []).filter(Boolean),
          },
          cameraCutouts: {
            $each: (prod.display?.map((d) => d.cameraCutout) || []).filter(
              Boolean,
            ),
          },
          screenProtections: {
            $each: (prod.display?.map((d) => d.screenProtection) || []).filter(
              Boolean,
            ),
          },
          chipsets: { $each: [prod.chipset].filter(Boolean) },
          mobileGPUs: { $each: [prod.gpu].filter(Boolean) },
          ramTypes: { $each: [prod.ramType].filter(Boolean) },
          storage: { $each: [prod.storage].filter(Boolean) },
          storageType: { $each: [prod.storageType].filter(Boolean) },
          batteryType: { $each: [prod.batteryType].filter(Boolean) },
          osTypes: { $each: [prod.os].filter(Boolean) },
          Fingerprints: { $each: [prod.fingerprint].filter(Boolean) },
          usbConnectors: { $each: [prod.usbType].filter(Boolean) },
          smartphoneAwards: {
            $each: (prod.awards || []).filter(Boolean),
          },
        },
      },
      { upsert: true },
    );

    // Only revalidate if something was actually added
    if (result.modifiedCount > 0 || result.upsertedId) {
      await formautofillscollections.updateOne(
        { _id: "catalog" },
        { $set: { updatedAt: new Date() } },
      );
      Revalidatefn(["catalog-config"])
    }

    return { updated: result.modifiedCount > 0 };
  } catch (error) {
    console.log(error);
  }
}
