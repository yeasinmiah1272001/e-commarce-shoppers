import Image from "next/image";
import { Product } from "../../type";
import { urlFor } from "@/sanity/lib/image";
import { FaStar } from "react-icons/fa";
import FormatedPrice from "./FormatedPrice";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

const ProductCard = ({ item }: { item: Product }) => {
  const rating =
    typeof item.rating === "number" && item.rating > 0
      ? Math.floor(item.rating)
      : 0;
  // console.log(item.slug.current);

  return (
    <div className="border border-gray-300 rounded-lg h-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl shadow-lg hover:shadow-black duration-300 transform hover:scale-105 transition ease-in-out overflow-hidden">
      <div className="p-4 flex flex-col items-center">
        <Link href={`/product/${item.slug.current}`}>
          <Image
            className="w-full h-48 object-cover rounded-md hover:scale-95 duration-300 transition-transform"
            src={urlFor(item?.image).url()}
            width={500}
            height={500}
            alt="Product Image"
            priority
          />
        </Link>
        <div className="mt-2 flex items-center gap-1 text-lightOrange text-xl font-semibold">
          {[...Array(rating)].map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>
        <p className="text-center text-black text-sm font-bold">{item.brand}</p>
        <p className="text-center text-black text-xl font-bold">{item.title}</p>
        <p className="text-center text-gray-600 text-sm mt-1">
          {item.description.slice(0, 60)}...
        </p>
        <div className="flex gap-3 justify-center items-center mt-2">
          <FormatedPrice
            className="text-black text-xl line-through"
            amount={item.rowprice}
          />
          <FormatedPrice
            className="text-lightOrange text-2xl font-bold"
            amount={item.price}
          />
        </div>
        <AddToCartButton item={item} />
      </div>
    </div>
  );
};

export default ProductCard;
