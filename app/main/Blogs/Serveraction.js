"use server";
import Verification from "@/lib/verification";
import { getcollection } from "@/lib/db";
import { Deleteimagefromurl } from "@/lib/Cloudinary";
import Revalidatefn from "@/app/_globalcomps/cachedata/Revalidatefn";

export async function Addblog(data, deletedimages) {
  try {
    const res = await Verification();
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { blogscollection, ObjectId } = await getcollection();

    // delete previous images
    deletedimages.forEach(async (image) => {
      await Deleteimagefromurl(image, "Technologia/Blogs");
    });

    const date = new Date().getTime();

    // Add to MongoDB
    if (data._id) {
      // to update a post
      const { _id, ...updateFields } = data;
      await blogscollection.updateOne(
        { _id: new ObjectId(data._id) },
        { $set: { ...updateFields, lastupdated: date } },
      );
      Revalidatefn(["Blogs"]);
      return { status: 200, message: "Updated successfully" };
    } else {
      // to add a post
      await blogscollection.insertOne({ ...data, lastupdated: date });
      Revalidatefn(["Blogs"]);
      return { status: 200, message: "Added successfully" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
}

export const Deleteblog = async (data) => {
  try {
    const res = await Verification("Blogs_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }
    const { blogscollection, ObjectId } = await getcollection();

    data.images.forEach(async (image) => {
      await Deleteimagefromurl(image, "Technologia/Blogs");
    });

    // delete form mongodb
    await blogscollection.findOneAndDelete({ _id: new ObjectId(data._id) });
    Revalidatefn(["Blogs"]);
    return { status: 200, message: "Deleted successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};
