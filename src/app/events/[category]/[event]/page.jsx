"use client";
import { useState, useEffect } from "react";
import eventData from "./data";
import Hero from "@/components/Hero/index2";
import Link from "next/link";

const CategoryPage = ({ params }) => {
  const [key, setKey] = useState("about");
  const [eventObj, setEventObj] = useState(null);
  const [unstopURL, setunstopURL] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const foundEventObj = eventData.find((e) => e.text === params.event);
      if (foundEventObj) {
        // Remove the 'text' property from the object
        const { text, ...rest } = foundEventObj;
        setunstopURL(rest.unstopURL);
        delete rest.unstopURL;
        setEventObj(rest);
      } else {
        // Handle case where event is not found
        console.error(`Event '${params.event}' not found in eventData`);
      }
    };

    fetchData();
  }, [params.event]);

  if (!eventObj) {
    // Render loading state or return null if eventObj is still undefined
    return null;
  }

  return (
    <>
      <div
        id="page1"
        className="bg-[#12121c] h-[100vh] w-[100%] relative text-white"
      >
        <img
          src="../../Layer_1.svg"
          className="absolute pointer-events-none asset top-0  left-0 h-[200px] md:h-[280px]  xl:h-[340px]"
        />
        <img
          src="../../Ellipse 22.svg"
          className="absolute  pointer-events-none asset top-0 left-0 h-[260px] md:h-[340px] xl:h-[420px]"
        />

        <Hero maintext={params.event} subtext="page" />
      </div>

      <div
        id="page2"
        className="h-auto w-[100%] relative flex items-center justify-center bg-[#12121c]"
      >
        <img
          src="Group 1000003971.svg"
          alt=""
          className="pointer-events-none absolute h-[500px] opacity-60 right-0 top-0 md:h-[650px]   md:right-0 md:-top-20"
        />
        <div className="h-[100vh]  w-[100%] flex flex-col md:flex-row  gap-4  items-center justify-start  relative">
          <img
            src="Rectangle 306.svg"
            className="hidden w-[90%] absolute"
            alt=""
          />
          <div className="flex h-[25%]   w-[100%] md:gap-24 flex-wrap items-center justify-start  md:flex-col md:w-[30%] md:h-[100%] gap-4  md:justify-center md:items-center">
            {Object.keys(eventObj).map((data, i) => {
              return (
                <button
                  key={i}
                  onClick={() => {
                    setKey(data);
                  }}
                  className="relative cursor-pointer flex items-center justify-center   w-[30%] md:w-[60%] "
                >
                  {key === data ? (
                    <img
                      src="../../Rectangle 6328.svg"
                      alt=""
                      className="absolute  "
                    />
                  ) : (
                    <img
                      src="../../Rectangle 63282.svg"
                      alt=""
                      className="absolute  "
                    />
                  )}

                  <span className="absolute  text-white text-[0.7rem] md:text-lg  z-10">
                    {data}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="w-[100%]  md:w-[70%] h-[70%] md:h-[80%] relative flex flex-col justify-center gap-16 md:gap-20 items-center md:justify-center">
            {/* <img src="Vector2.svg" className="w-[90%] max-w-4xl absolute" alt="" /> */}
            {key === "structure" || key==="timeline" || key === "rules" ? (
              <ul className="text-white w-[95%] md:w-[80%] text-left px-2 md:px-0 md:text-xl list-disc">
                {eventObj[key].split(",").map((item, index) => (
                  <li className="mb-4" key={index}>{item.trim()}</li>
                ))}
              </ul>
            ) : (
              <p className="text-white w-[95%] md:w-[80%] text-left px-2 md:px-0 md:text-xl">
                {eventObj[key]}
              </p>
            )}

            <Link href={unstopURL}>
              <button className="relative flex items-center cursor-pointer justify-center h-[60px] w-[200px]">
                <img
                  src="../../Rectangle 6328.svg"
                  alt=""
                  className="absolute  "
                />
                <span className="absolute  text-white  z-10">Register</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
