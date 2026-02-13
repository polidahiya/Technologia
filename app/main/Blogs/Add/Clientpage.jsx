"use client";
import React, { useRef, useState, useEffect } from "react";
import Editor from "@/app/_globalcomps/Editor";
import Standardinputfield from "@/app/_globalcomps/inputfields/Standardinputfield";
//
import { AppContextfn } from "@/app/Context";
import { Addimages, Deleteimages } from "@/lib/Addordeleteimages";
import { Addblog } from "../Serveraction";
import { LuCloudUpload } from "react-icons/lu";
import { MdModeEditOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function Clientpage({ editdata }) {
  const router = useRouter();
  const initialdatastate = {
    title: "",
    desc: "",
    keywords: "",
    images: [""],
  };
  const { setmessagefn } = AppContextfn();
  const [data, setdata] = useState(
    editdata
      ? {
          title: editdata?.title || "",
          desc: editdata?.desc || "",
          keywords: editdata?.keywords || "",
          images: editdata?.images,
          _id: editdata?._id,
        }
      : initialdatastate,
  );
  const [imageloading, setimageloading] = useState(false);
  const [newadded, setnewadded] = useState([]);
  const [deletedimages, setdeletedimages] = useState([]);
  const [Delta, setDelta] = useState(null);

  const quillRef = useRef(null);

  // Load Delta only on client
  useEffect(() => {
    import("quill").then((Quill) => {
      setDelta(() => Quill.default.import("delta"));
    });
  }, []);

  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const handleaddimage = async (file) => {
    try {
      setimageloading(true);
      if (!file) {
        setmessagefn(`Please select an image`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setmessagefn(`Image exceeds 1 MB of size`);
        return;
      }
      const formdata = new FormData();
      formdata.append("image", file);
      const res = await Addimages(formdata, "Technologia/Blogs");
      if (res.status == 200) {
        const imageurl = res?.imageurl;
        if (data.images[0].length > 0) {
          setdeletedimages((pre) => [...pre, data.images[0]]);
        }
        setdata((pre) => {
          const updateddata = { ...pre };
          updateddata.images[0] = imageurl;
          return updateddata;
        });
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

  const submitform = async (e) => {
    e.preventDefault();
    const delta = quillRef.current.getContents();
    const deltaJSON = delta.ops;
    data.delta = deltaJSON;
    const res = await Addblog(data, deletedimages);
    setmessagefn(res?.message);
    if (res?.status === 200) {
      setdata(initialdatastate);
      quillRef.current.setContents({
        ops: [
          { insert: "Hello\n", attributes: { header: 1 } },
          { insert: "Start writing your blog here...\n" },
        ],
      });
      setnewadded([]);
      setdeletedimages([]);
    }
  };

  const handlecancel = async () => {
    if (newadded.length > 0) {
      setmessagefn("Cleaning up...");
      await Deleteimages(newadded, "Technologia/Blogs");
    }
    router.back();
  };

  if (!Delta) return <div className="p-8 text-gray-500">Loading editor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <form
        onSubmit={submitform}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6"
      >
        <div className="flex items-center">
          <div className="flex-1">
            <button
              type="button"
              className="border px-5 py-1 rounded-md"
              onClick={handlecancel}
            >
              Back
            </button>
          </div>
          <h1 className="flex-1 text-3xl font-tenor text-center">
            ✏️ Blog Post Editor
          </h1>
          <div className="flex-1"></div>
        </div>
        <div className="">
          <div className="flex justify-center">
            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center w-36 aspect-square border border-dashed border-theme cursor-pointer rounded-lg overflow-hidden"
            >
              {data.images[0].length > 0 ? (
                <div className="relative w-full h-full group hover:bg-black">
                  <img
                    src={data.images[0]}
                    alt=""
                    className="w-full h-full lg:group-hover:opacity-30"
                  />
                  <MdModeEditOutline className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-theme text-white text-2xl box-content p-2 lg:hidden lg:group-hover:block" />
                </div>
              ) : (
                <>
                  <LuCloudUpload className="text-3xl" />
                  <p className="text-center">
                    {imageloading ? "Uploading..." : "Upload Thumbnail"}
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                disabled={imageloading}
                onChange={(e) => {
                  handleaddimage(e.target.files[0]);
                  e.target.value = null;
                }}
                className="hidden"
              />
            </label>
          </div>
          <Standardinputfield
            titlename="Blog Title"
            value={data.title}
            isRequired={true}
            type="text"
            onchange={(e) => {
              setdata((pre) => ({ ...pre, title: e.target.value }));
            }}
            clear={() => setdata((pre) => ({ ...pre, title: "" }))}
            placeholder=""
          />
          <Standardinputfield
            titlename="Meta desc"
            value={data.desc}
            isRequired={true}
            type="text"
            onchange={(e) => {
              setdata((pre) => ({ ...pre, desc: e.target.value }));
            }}
            clear={() => setdata((pre) => ({ ...pre, desc: "" }))}
            placeholder=""
          />
          <Standardinputfield
            titlename="Meta keywords"
            value={data.keywords}
            isRequired={true}
            type="text"
            onchange={(e) => {
              setdata((pre) => ({ ...pre, keywords: e.target.value }));
            }}
            clear={() => setdata((pre) => ({ ...pre, keywords: "" }))}
            placeholder=""
          />
        </div>
        <Editor
          ref={quillRef}
          defaultValue={
            editdata
              ? { ops: editdata?.delta }
              : new Delta()
                  .insert("Hello")
                  .insert("\n", { header: 1 })
                  .insert("Some ")
                  .insert("initial", { bold: true })
                  .insert(" ")
                  .insert("content", { underline: true })
                  .insert("\n")
          }
        />
        {/* submit button */}
        <div className="sticky bottom-0 flex justify-center gap-5 mt-3">
          <button
            type="submit"
            className=" px-10 py-3 w-fit mt-auto bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 duration-300"
          >
            {editdata ? "Update Now" : "Post Now"}
          </button>
          {/* cancel button */}
          {editdata && (
            <button
              type="button"
              className=" px-10 py-3 w-fit mt-auto border border-theme text-theme bg-white"
              onClick={handlecancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
