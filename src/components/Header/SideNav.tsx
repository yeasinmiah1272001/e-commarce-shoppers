"use client";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../../type";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { addUser, removeUser } from "@/redux/shopperSlice";
import Image from "next/image";
import { redirect } from "next/navigation";

const SideNav = () => {
  const selector = useSelector((state: StateType) => state.name.cart);
  const { data: session } = useSession();
  // console.log("session", session);
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(addUser(session.user));
    } else {
      dispatch(removeUser());
    }
  }, [session?.user]);

  const handleClick = () => {
    redirect(session?.user ? "/cart" : "/");
  };

  return (
    <div className="space-y-8 fixed top-1/2 transform -translate-y-1/2 right-0">
      <div className="relative">
        {session?.user ? (
          <div className="h-16 w-16 flex justify-center items-center rounded-md shadow-lg bg-bgLight p-4 hover:scale-110 transition-transform duration-300">
            <Image
              className="h-10 w-28"
              src={session.user.image!}
              alt="img"
              height={35}
              width={35}
            />
          </div>
        ) : (
          <Link
            href={"/signup"}
            className=" flex justify-center items-center rounded-md shadow-lg bg-bgLight p-4 hover:scale-110 transition-transform duration-300"
          >
            <FaUser className="text-3xl text-primary" />
          </Link>
        )}
      </div>

      <div className="relative">
        <p
          onClick={handleClick}
          className="h-16 w-16 flex justify-center items-center rounded-md shadow-lg bg-bgLight p-4 hover:scale-110 transition-transform duration-300"
        >
          <FaShoppingBag className="text-3xl text-primary" />
        </p>
        <span className="absolute top-0 right-0 text-white text-xs bg-red-500 rounded-full px-2 py-1">
          {selector.length > 0 ? selector.length : "0"}
        </span>
      </div>
    </div>
  );
};

export default SideNav;
