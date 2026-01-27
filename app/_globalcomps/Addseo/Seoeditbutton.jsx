"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import { AppContextfn } from "@/app/Context";
import Standardinputfield from "../inputfields/Standardinputfield";
import Editor from "../Editor";
import { savedata } from "./Seodata";
import Revalidatepathfn from "@/app/_serveractions/Revalidatepathfn";
import { usePathname } from "next/navigation";

export default function Seoeditbutton({ editdata, seokey, showabout = false }) {
  const pathname = usePathname();
  const { setmessagefn } = AppContextfn();
  const [showform, setshowform] = useState(false);
  const [formData, setFormData] = useState(
    editdata
      ? {
          seokey: editdata?.seokey,
          title: editdata?.title,
          keywords: editdata?.keywords,
          metadesc: editdata?.metadesc,
          about: editdata?.about,
        }
      : {
          seokey: seokey,
          title: "",
          keywords: "",
          metadesc: "",
          about: "",
        },
  );

  const [Delta, setDelta] = useState(null);
  const quillRef = useRef(null);

  useEffect(() => {
    import("quill").then((Quill) => {
      setDelta(() => Quill.default.import("delta"));
    });
  }, []);

  const submitform = async (e) => {
    e.preventDefault();
    const delta = quillRef.current.getContents();
    const deltaJSON = delta.ops;
    formData.delta = deltaJSON;

    const res = await savedata(formData);
    setmessagefn(res?.message);
    if (res?.status === 200) {
      setshowform(false);
      Revalidatepathfn(pathname);
    }
  };

  return (
    <>
      <button
        className="fixed top-24 right-5  bg-theme text-white border border-white rounded-full w-10 aspect-square flex items-center justify-center z-60"
        onClick={() => setshowform(true)}
      >
        <MdModeEditOutline />
      </button>
      <AnimatePresence>
        {showform && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed min-h-dvh h-dvh w-full top-0 left-0 flex items-center justify-center bg-black/30 z-60 p-2"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3 }}
              className="relative w-full bg-white py-10 px-5 md:px-10 md:py-10 flex flex-col h-full max-h-full"
            >
              <div className="font-tenor text-3xl text-center mt-5">
                Edit Seo
              </div>
              <div className="h-full overflow-y-scroll">
                <form
                  onSubmit={submitform}
                  className="flex flex-col gap-5 mt-5"
                >
                  <Standardinputfield
                    titlename={"Title (what appear on browser tab)"}
                    value={formData.title}
                    isRequired={false}
                    type="text"
                    onchange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        title: e.target.value,
                      }));
                    }}
                    clear={() => {
                      setFormData((prevData) => ({ ...prevData, title: "" }));
                    }}
                  />
                  <Standardinputfield
                    titlename={"Keywords (separated by comma)"}
                    value={formData.keywords}
                    isRequired={false}
                    type="text"
                    onchange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        keywords: e.target.value,
                      }));
                    }}
                    clear={() => {
                      setFormData((prevData) => ({
                        ...prevData,
                        keywords: "",
                      }));
                    }}
                  />
                  <Standardinputfield
                    titlename={
                      "Meta Description (what appear on search engines,  max 150 words)"
                    }
                    value={formData.metadesc}
                    isRequired={false}
                    type="text"
                    onchange={(e) => {
                      setFormData((prevData) => ({
                        ...prevData,
                        metadesc: e.target.value,
                      }));
                    }}
                    clear={() => {
                      setFormData((prevData) => ({
                        ...prevData,
                        metadesc: "",
                      }));
                    }}
                  />
                  {showabout && (
                    <Standardinputfield
                      titlename={"About"}
                      value={formData.about}
                      isRequired={false}
                      type="text"
                      onchange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          about: e.target.value,
                        }));
                      }}
                      clear={() => {
                        setFormData((prevData) => ({ ...prevData, about: "" }));
                      }}
                    />
                  )}
                  <Editor
                    ref={quillRef}
                    defaultValue={
                      editdata?.delta
                        ? { ops: editdata.delta }
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
                  <div className="flex justify-center gap-5 mt-3">
                    <button
                      type="submit"
                      className="px-10 py-3 w-fit mt-auto bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 duration-300"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
              {/* cancel button */}
              <button
                type="button"
                className="group h-14 aspect-square absolute top-0 right-0 flex items-center justify-center z-10"
                onClick={() => setshowform(false)}
              >
                <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
