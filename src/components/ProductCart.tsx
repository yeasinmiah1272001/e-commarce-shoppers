"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { IoMdClose } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import { StateType } from "../../type";
import { useDispatch, useSelector } from "react-redux";
import {
  allRemove,
  deceressQuantity,
  incressQuantity,
  resetOrder,
  singeDelete,
} from "@/redux/shopperSlice";
import FormatedPrice from "./FormatedPrice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

const ProductCart = () => {
  const selector = useSelector((state: StateType) => state.name.cart);
  const [totalamt, setTotalAmt] = useState(0);
  const [totalDis, setTotalDis] = useState(0);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    const TotalPrice = selector.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmt(TotalPrice);
    // discount
    const TotalDiscount = selector.reduce(
      (acc, item) => acc + item.rowprice - item.price,
      0
    );
    setTotalDis(TotalDiscount);
  }, [selector]);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: selector, // your cart data
          email: session?.user?.email,
        }),
      });

      const data = await response.json();
      console.log("Checkout Data:", data);

      if (response.ok && data.sessionId) {
        // Proceed with redirect to Stripe checkout
        await stripe?.redirectToCheckout({ sessionId: data.sessionId });

        // // After checkout, reset the order in Redux
        // dispatch(resetOrder()); // Reset the cart in Redux
      } else {
        toast.error(data.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      {selector.length ? (
        <div>
          <div className="overflow-x-auto mt-10">
            <h1 className="text-xl font-semibold text-black">
              Your Products Shopping Cart
            </h1>
            <table className="min-w-full bg-bgLight border mt-5">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Remove</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Old Price</th>
                  <th className="px-4 py-2 border">Unit Price</th>
                  <th className="px-4 py-2 border">Discount</th>

                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Subtotal</th>
                </tr>
              </thead>
              <tbody className="mt-2 bg-gray-200">
                {selector.map((item) => (
                  <tr key={item._id} className="text-center">
                    <td className="px-4 py-2 border border-white">
                      <button
                        onClick={() =>
                          dispatch(
                            singeDelete(item._id),
                            toast.success(`${item.title} deleted success`)
                          )
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <IoMdClose size={20} />
                      </button>
                    </td>
                    <td className="px-4 py-2 border border-white">
                      <Image
                        width={200}
                        height={200}
                        src={urlFor(item?.image).url()}
                        alt={"image"}
                        className="w-20 mx-auto h-20 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2 border border-white">
                      {item.title}
                    </td>
                    <td className="px-4 py-2 border border-white">
                      ${item.rowprice.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border border-white">
                      {" "}
                      <FormatedPrice
                        amount={item.price}
                        className="className="
                        text-xl
                        font-medium
                        text-gray-900
                      />
                    </td>
                    <td className="px-4 py-2 border border-white">
                      <FormatedPrice
                        amount={item.rowprice - item.price}
                        className="className="
                        text-xl
                        font-medium
                        text-gray-900
                      />
                    </td>
                    <td className="px-4 py-2 border border-white">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => dispatch(deceressQuantity(item._id))}
                          className="px-2 py-1 text-white bg-gray-500 hover:bg-gray-700 rounded"
                        >
                          <FaMinus />
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(incressQuantity(item._id))}
                          className="px-2 py-1 text-white bg-blue-500 hover:bg-blue-700 rounded"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2 border">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full">
            <button
              onClick={() =>
                dispatch(allRemove(), toast.success("all product remove"))
              }
              className="bg-transparent border w-full border-gray-500 text-black rounded-lg px-6 py-1.5 hover:bg-red-500 hover:text-black duration-300 my-2"
            >
              Delete All
            </button>
          </div>

          <div className="px-24">
            <h2 className="text-2xl font-medium text-gray-900 mt-3">
              Order Summary
            </h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <p className="text-base font-medium text-gray-900">
                  Total Discount
                </p>
                <FormatedPrice
                  amount={totalDis}
                  className="className="
                  text-xl
                  font-medium
                  text-gray-900
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xl text-gray-600">Total Payable Amount</p>
                <FormatedPrice
                  amount={totalamt}
                  className="  text-2xl
                  font-semibold text-lightOrange"
                />
              </div>

              <div
                onClick={handleCheckout}
                className="mt-6 flex justify-center"
              >
                <button className="w-full max-w-xs px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-md">
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>Product No available</>
      )}
    </div>
  );
};

export default ProductCart;
