import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BiSolidImageAdd } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { AppContextfn } from "@/app/Context";
import { Addimages } from "@/lib/Addordeleteimages";
import imageCompression from "browser-image-compression";

const Images = ({ data, setdata, setdeletedimages, setnewadded }) => {
  const { setmessagefn } = AppContextfn();
  const [imageloading, setimageloading] = useState(false);

  const handleDeleteImage = (imageIndex) => {
    // Store deleted images
    const image = data.images[imageIndex];
    setdeletedimages((pre) => [...pre, image]);
    // remove image

    setdata((pre) => {
      const updateddata = { ...pre };
      updateddata.images = updateddata.images.filter(
        (_, i) => i !== imageIndex
      );
      return updateddata;
    });
  };

  const handleaddimage = async (rawfile, imgIndex) => {
    try {
      setimageloading(true);
      if (!rawfile) {
        setmessagefn(`Please select an image`);
        return;
      }
      //
      const options = {
        maxSizeMB: 0.7,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };

      const file = await imageCompression(rawfile, options);

      const formdata = new FormData();
      formdata.append("image", file);
      const res = await Addimages(formdata, "Mystore");
      if (res.status == 200) {
        const imageurl = res?.imageurl;
        const updateddata = { ...data };

        if (imgIndex !== undefined && imgIndex !== null) {
          setdeletedimages((pre) => [...pre, data.images[imgIndex]]);
          updateddata.images[imgIndex] = imageurl;
        } else {
          updateddata.images.push(imageurl);
        }

        setdata(updateddata);
        setnewadded((pre) => [...pre, imageurl]);
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

  const handleMoveImage = (imageIndex, direction) => {
    const upateddata = { ...data };
    const images = upateddata.images;
    const newIndex = imageIndex + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      [images[imageIndex], images[newIndex]] = [
        images[newIndex],
        images[imageIndex],
      ];
      setdata(upateddata);
    }
  };

  return (
    <div className="mt-5 p-4 border rounded-md">
      <h4 className="font-medium mb-2 text-sm">Images:</h4>
      <div className="flex items-start justify-center gap-2 flex-wrap">
        {data.images.map((image, imgIndex) => (
          <div key={imgIndex} className="flex gap-2 flex-col items-center">
            <img
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt={`Image-${imgIndex}`}
              className="w-32 aspect-square object-cover border"
            />
            <div className="flex h-8 w-full">
              <button
                type="button"
                onClick={() => handleMoveImage(imgIndex, -1)}
                className="flex-1 aspect-square text-sm border rounded-md"
              >
                <BsArrowLeftShort className="inline-block" />
              </button>
              <button
                type="button"
                onClick={() => handleMoveImage(imgIndex, 1)}
                className="flex-1 aspect-square text-sm border rounded-md"
              >
                <BsArrowLeftShort className="inline-block rotate-180" />
              </button>
              {/* Replace Image Button */}
              <label className="flex-1 aspect-square text-theme border rounded-md flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  disabled={imageloading}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleaddimage(file, imgIndex);
                    }
                    e.target.value = null; // Reset input
                  }}
                  className="hidden"
                />
                ↺
              </label>
              <button
                type="button"
                onClick={() => handleDeleteImage(imgIndex)}
                className="flex-1 aspect-square text-sm border rounded-md"
              >
                <MdDeleteOutline className="inline-block" />
              </button>
            </div>
          </div>
        ))}
        <div className="relative border border-dotted border-slate-300 cursor-pointer w-32 aspect-square rounded-md">
          <input
            type="file"
            accept="image/*"
            disabled={imageloading}
            multiple
            onChange={(e) => {
              Array.from(e.target.files).forEach((file) => {
                handleaddimage(file);
              });
              e.target.value = null;
            }}
            className="absolute inset-0 mt-2 opacity-0 z-10 cursor-pointer"
          />
          <div className="h-full w-full pointer-events-none flex flex-col gap-2 items-center justify-center">
            {imageloading ? (
              <span className="text-green-600">Uploading...</span>
            ) : (
              <>
                <BiSolidImageAdd className="text-5xl" />
                <p className=" text-center text-sm">Add Image</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
