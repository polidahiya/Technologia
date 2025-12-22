"use client";
import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import imageCompression from "browser-image-compression";
import { AppContextfn } from "@/app/Context";
import { Addimages } from "@/lib/Addordeleteimages";

function Imageuploader({
  img = "",
  callback = () => {},
  remove = () => {},
  size = 1,
  dimension = 1920,
  folder = "Technologia",
  cover = true,
}) {
  const { setmessagefn } = AppContextfn();
  const [imageloading, setimageloading] = useState(false);

  const handleaddimage = async (rawfile) => {
    try {
      setimageloading(true);
      if (!rawfile) {
        setmessagefn(`Please select an image`);
        return;
      }
      //
      const options = {
        maxSizeMB: size,
        maxWidthOrHeight: dimension,
        useWebWorker: true,
      };

      const file = await imageCompression(rawfile, options);

      const formdata = new FormData();
      formdata.append("image", file);
      const res = await Addimages(formdata, folder);
      if (res.status == 200) {
        const imageurl = res?.imageurl;
        callback(imageurl);
      } else {
        setmessagefn(`Unable to update image`);
      }
      setimageloading(false);
    } catch (error) {
      console.log(error);
      setmessagefn(`Unable to update image`);
      setimageloading(false);
    }
  };
  return (
    <div className="relative w-full h-full border flex items-center justify-center rounded-md overflow-hidden">
      {img ? (
        <img
          src={img}
          alt=""
          className={`h-full w-full ${
            cover ? "object-cover" : "object-contain"
          }`}
        />
      ) : (
        <AiOutlineCloudUpload className="w-1/2 h-1/2" />
      )}
      <input
        type="file"
        accept="image/*"
        disabled={imageloading}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            handleaddimage(file);
          }
          e.target.value = null; // Reset input
        }}
        className="absolute top-0 left-0 h-full w-full opacity-0"
      />
      {imageloading && (
        <div className="absolute top-0 left-0 h-full w-full bg-black/20 flex items-center justify-center ">
          <div className="w-10 aspect-square border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
        </div>
      )}
      {img && (
        <button
          type="button"
          className="absolute top-0 right-0 w-10 aspect-square text-red-500 bg-gray-200 rounded-full z-20"
          onClick={() => {
            remove();
          }}
        >
          X
        </button>
      )}
    </div>
  );
}

export default Imageuploader;
