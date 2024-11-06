import React from "react";
import Container from "./Container";
import Image from "next/image";

import { getBannerData } from "@/lib/getData";
import { urlFor } from "@/sanity/lib/image";
import { BannerType } from "../../type";

const Banner = async () => {
  const banner = await getBannerData();
  const singleBanner = banner[0];
  return (
    <Container className="grid grid-cols-1 gap-4 p-4 md:grid-cols-5 md:grid-rows-5">
      {/* Main Banner */}
      <div className="md:col-span-3 md:row-span-5 bg-bgLight p-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="space-y-4 text-center md:text-left md:w-1/2 lg:px-4">
          <button className="bg-lightGreen text-white px-2 py-1 mt-4 rounded-full hover:bg-darkOrange">
            Sale 255
          </button>
          <h2 className="text-lg md:text-2xl font-semibold">
            {singleBanner.subtitle}
          </h2>
          <h1 className="text-2xl md:text-6xl font-bold">
            {singleBanner.title}
          </h1>
          <p className="text-sm md:text-base">{singleBanner.description}</p>
          <button className="bg-lightOrange text-white px-4 py-2 mt-4 rounded-full hover:bg-darkOrange">
            Shop Now
          </button>
        </div>
        <div className="flex justify-center md:w-1/2">
          <Image
            className="w-full md:w-[400px] lg:w-[500px] mx-auto"
            src={urlFor(singleBanner?.image).url()}
            width={500}
            height={500}
            alt="Playstation Banner"
          />
        </div>
      </div>

      {/* Smaller Banners */}
      <div className="md:col-span-2 md:row-span-5 space-y-8">
        {/* Microsoft Headphone Banner */}

        {/* iPhone 16 Banner */}
        {banner.slice(1, 3).map((item: BannerType) => (
          <div
            key={item._id}
            className="bg-bgLight p-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
          >
            <div className="text-center md:text-left space-y-2 md:w-1/2">
              <h2 className="text-lg font-semibold">{item.subtitle}</h2>
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <button className="bg-lightOrange text-white px-4 py-2 rounded-full hover:bg-darkOrange">
                Shop Now
              </button>
            </div>
            <div className="flex justify-center md:w-1/2">
              <Image
                className="w-full md:w-[150px] lg:w-[200px] mx-auto"
                src={urlFor(item?.image).url()}
                width={200}
                height={200}
                alt="Microsoft Headphone"
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Banner;
