"use client";
import React, { useEffect } from "react";
import { AppContextfn } from "../Context";
import { motion, useAnimation } from "framer-motion";

function Message() {
  const { messagearray } = AppContextfn();

  return (
    <>
      {messagearray?.map((item) => (
        <Rentbeannotif key={item.id} item={item} />
      ))}
    </>
  );
}

function Rentbeannotif({ item }) {
  const container = useAnimation();
  const text = useAnimation();
  const { setmessagearray } = AppContextfn();

  useEffect(() => {
    const Openanimation = async () => {
      await container.start({
        y: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: 0.1, type: "spring", mass: 0.2, damping: 5 },
      });
      await container.start({
        width: "400px",
        transition: { duration: 0.2, type: "spring", mass: 0.2, damping: 5 },
      });
      await text.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.2 },
      });
    };
    Openanimation();
    const timer = setTimeout(() => {
      Closeanimtion(); // Auto-remove after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const Closeanimtion = async () => {
    await text.start({
      opacity: 0,
      y: 10,
      transition: { duration: 0.3 },
    });
    await container.start({
      width: "40px",
      transition: { duration: 0.3 },
    });
    await container.start({
      y: 70,
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    });

    // remove message
    setmessagearray((pre) =>
      pre.filter((notification) => notification.id !== item.id)
    );
  };
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 flex items-center justify-center z-50">
      <motion.div
        initial={{ width: "40px", y: 70, scale: 0, opacity: 0 }}
        animate={container}
        className="relative max-w-[90%] h-10 bg-white rounded-full flex items-center border border-slate-300 shadow-md"
      >
        <motion.div
          className="w-full text-center overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={text}
        >
          {item?.message}
        </motion.div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 h-full aspect-square rounded-full overflow-hidden p-0.5 bg-white">
          <button
            className="h-full w-full rounded-full bg-theme text-white"
            onClick={() => Closeanimtion()}
          >
            X
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Message;
