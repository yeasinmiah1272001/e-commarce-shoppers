"use client";
import { twMerge } from "tailwind-merge";
import { Product } from "../../type";
import { useDispatch } from "react-redux";
import { addToCsrt } from "@/redux/shopperSlice";
import toast from "react-hot-toast";

interface Props {
  item: Product;
  className?: string;
}

const AddToCartButton = ({ item, className }: Props) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCsrt(item));
    toast.success("product added");
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
