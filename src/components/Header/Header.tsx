"use client";
import React from "react";
import Container from "../Container";
import { navigation } from "@/constant";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="border-b border-lightText py-2 shadow-sm cursor-pointer">
      <Container className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Logo Section */}
        <div>
          <Link
            href={"/"}
            className="text-black text-2xl md:text-3xl font-bold hover:text-lightOrange transition-colors duration-300 cursor-pointer"
          >
            SHOPPERS
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-1/2 lg:w-1/3 mx-0 md:mx-6">
          <input
            className="w-full p-2 pl-10 pr-20 outline-none border border-lightText rounded-md focus:border-lightOrange transition duration-200"
            type="text"
            placeholder="Search for products..."
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-lightText" />
          <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-lightOrange text-white px-4 py-1 rounded-md hover:bg-orange-600 transition duration-200">
            Search
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="w-full md:w-auto">
          <ul className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className="text-black hover:text-lightOrange transition-colors duration-200 text-sm md:text-base"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            {session?.user ? (
              <li onClick={() => signOut()}>SignOut</li>
            ) : (
              <Link href={"/signup"}>Login</Link>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
