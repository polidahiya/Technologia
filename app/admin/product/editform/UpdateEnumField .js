"use server";

import { getcollection } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function UpdateEnumField(field, values) {
  const { formautofillscollections } = await getcollection();

  const result = await formautofillscollections.updateOne(
    { _id: "catalog" },
    {
      $set: {
        [field]: values,
        updatedAt: new Date(),
      },
    }
  );

  if (result.modifiedCount > 0) {
    revalidateTag("catalog-config");
  }

  return { success: true };
}
