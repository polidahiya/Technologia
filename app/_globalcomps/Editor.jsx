"use client";
import React, { forwardRef, useEffect, useRef } from "react";
import "quill/dist/quill.snow.css"; // Import Quill theme

const Editor = forwardRef(({ defaultValue }, ref) => {
  const containerRef = useRef(null);
  const defaultValueRef = useRef(defaultValue);

  useEffect(() => {
    let quillInstance;

    const loadQuill = async () => {
      const Quill = (await import("quill")).default;

      // Your toolbar options
      const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        ["link", "image"],

        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],

        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],

        ["clean"], // remove formatting
      ];

      // Clear any existing editor
      if (containerRef.current.firstChild) {
        containerRef.current.innerHTML = "";
      }

      const editorElement = document.createElement("div");
      containerRef.current.appendChild(editorElement);

      quillInstance = new Quill(editorElement, {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
        },
      });

      ref.current = quillInstance;

      if (defaultValueRef.current) {
        quillInstance.setContents(defaultValueRef.current);
      }
    };

    loadQuill();

    return () => {
      ref.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [ref]);

  return <div ref={containerRef} className=""></div>;
});

Editor.displayName = "Editor";
export default Editor;
