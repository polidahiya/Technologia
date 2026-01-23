"use server";
import { getcollection } from "@/lib/db";
import Verification from "@/lib/verification";
import Revalidatefn from "@/app/_globalcomps/cachedata/Revalidatefn";

export const Saveproduct = async (data) => {
  try {
    const tokenRes = await Verification();
    if (!tokenRes?.verified) {
      return { status: 401, message: "Unauthorized" };
    }
    const { Productscollection, ObjectId } = await getcollection();
    const date = new Date().getTime();

    if (data._id) {
      const { _id, ...updateFields } = data;
      await Productscollection.updateOne(
        { _id: new ObjectId(data._id) },
        { $set: { ...updateFields, lastupdated: date } }
      );
      Revalidatefn([`product-${_id}`, "productsIds", `Variant-${data?.model}`,`score-${_id}`]);
      return { status: 200, message: "Updated successfully" };
    } else {
      await Productscollection.insertOne({ ...data, lastupdated: date });
      Revalidatefn(["productsIds", `Variant-${data?.model}`]);
      return { status: 200, message: "Added successfully" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
};
