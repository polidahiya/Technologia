"use server";
import { getcollection } from "@/lib/db";
import Verification from "@/lib/verification";
import Revalidatefn from "@/app/_globalcomps/cachedata/Revalidatefn";

export async function UpdateEnumField(field, values) {
  try {
    const tokenRes = await Verification();
    if (!tokenRes?.verified) {
      return { status: 401, message: "Unauthorized" };
    }
    const { formautofillscollections } = await getcollection();

    const result = await formautofillscollections.updateOne(
      { _id: "catalog" },
      {
        $set: {
          [field]: values,
          updatedAt: new Date(),
        },
      },
    );

    if (result.modifiedCount > 0) {
      Revalidatefn(["catalog-config"]);
    }
    return { status: 200, message: "Updated successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
}
