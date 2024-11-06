"use client";
import { twMerge } from "tailwind-merge";
import { Product } from "../../type";

interface Props {
  item: Product;
  className?: string;
}

const AddToCartButton = ({ item, className }: Props) => {
  const handleAddToCart = () => {
    console.log(item);
  };
  return (
    <div className="w-full">
      <button
        onClick={handleAddToCart}
        className={twMerge(
          "mt-4 bg-lightOrange text-white px-6 py-2 rounded-full hover:bg-darkOrange transition-colors w-full",
          className
        )}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default AddToCartButton;
