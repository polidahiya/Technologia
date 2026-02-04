"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { FaAngleLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

function Herosection({}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const imageArray = [
    {
      img: ["/brands/1583216214_Samsung.avif", "/brands/1583216214_Samsung.avif"],
      link: "/Furniture",
      title: "Furniture",
    },
    {
      img: ["/brands/1583216214_Samsung.avif", "/brands/1583216214_Samsung.avif"],
      link: "/Health-&-Fitness/Fitness-Machines",
      title: "Treadmill",
    },
    {
      img: ["/brands/1583216214_Samsung.avif", "/brands/1583216214_Samsung.avif"],
      link: "/Furniture",
      title: "Bed",
    },
    {
      img: ["/brands/1583216214_Samsung.avif", "/brands/1583216214_Samsung.avif"],
      link: "/Electronic/Laptops",
      title: "Laptop",
    },
  ];

  return (
      <div className="relative w-full aspect-square md:aspect-3/1 lg:rounded-3xl overflow-hidden group md:pt-5 shadow">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full w-full"
        >
          {imageArray.map((item, i) => (
            <SwiperSlide key={i}>
              <Link
                href={"#"}
                prefetch={false}
                className="relative h-full w-full block"
              >
                <picture className="w-full h-full">
                  <source media="(min-width: 768px)" srcSet={item?.img[1]} />
                  <Nextimage
                    className="h-full w-full object-cover rounded-3xl lg:rounded-none p-2 lg:p-0"
                    src={item?.img[0]}
                    alt={item?.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 70vw"
                    priority={i == 0 ? true : false}
                    quality={100}
                    loading={i != 0 ? "lazy" : "eager"}
                  />
                </picture>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className="absolute left-5 top-1/2 transform -translate-y-1/2 w-12 aspect-square flex items-center justify-center bg-white lg:bg-gray-300 rounded-full opacity-0 lg:group-hover:opacity-80 transition hover:bg-white z-10"
          onClick={() => swiperRef.current.swiper.slidePrev()}
          aria-label="Scroll Left"
          title="Scroll Left"
        >
          <FaAngleLeft />
        </button>
        <button
          className="absolute right-5 top-1/2 transform -translate-y-1/2 w-12 aspect-square flex items-center justify-center bg-white lg:bg-gray-300 rounded-full opacity-0 lg:group-hover:opacity-80 transition hover:bg-white rotate-180 z-10"
          onClick={() => swiperRef.current.swiper.slideNext()}
          aria-label="Scroll Right"
          title="Scroll Right"
        >
          <FaAngleLeft />
        </button>

        {/* custom pagination */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex z-10">
          {imageArray.map((_, i) => (
            <button
              key={i}
              className={`flex items-center justify-center p-1`}
              onClick={() => swiperRef.current.swiper.slideTo(i)}
              aria-label="Index"
              title="Index"
            >
              <span
                className={`block h-1 rounded-full bg-gray-400 duration-150 ${
                  i === activeIndex ? "w-8" : "w-1"
                }`}
              ></span>
            </button>
          ))}
        </div>
      </div>
  );
}

export default Herosection;
