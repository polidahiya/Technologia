"use server";
import { uploadImage, Deleteimagefromurl } from "./Cloudinary";
import Verification from "./verification";
export const Addimages = async (formdata, foldername = "Technologia") => {
  try {
    const tokenres = await Verification("public");
    if (!tokenres?.verified) return { status: 400, message: "Invalid user" };

    const arrayBuffer = await formdata.get("image").arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const cloudinaryres = await uploadImage(buffer, foldername);
    const imageurl = cloudinaryres.secure_url;

    return { status: 200, message: "successfully", imageurl };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};

export const Deleteimages = async (images, foldername = "Technologia") => {
  try {
    const tokenres = await Verification("public");
    if (!tokenres?.verified) return { status: 400, message: "Invalid user" };

    foldername = foldername.concat(`/${tokenres.storeid}`);

    await Promise.all(images.map((url) => Deleteimagefromurl(url, foldername)));

    return { status: 200, message: "Cleanup successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};
