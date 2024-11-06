import { client } from "../sanity/lib/client";
import { bannerQuery, bestsellerQuery, productQuery } from "./query";

export const revalidate = 0;

const getBannerData = async () => {
  const bannerData = await client.fetch(bannerQuery);
  return bannerData;
};
const getProductData = async () => {
  const bannerData = await client.fetch(productQuery);
  return bannerData;
};
const getBestSellerData = async () => {
  const bannerData = await client.fetch(bestsellerQuery);
  return bannerData;
};

export { getBannerData, getProductData, getBestSellerData };
