import React from "react";
import Container from "../Container";
import { navigation } from "@/constant";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="border-b border-lightText py-2 shadow-sm">
      <Container className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Logo Section */}
        <div>
          <h1 className="text-black text-2xl md:text-3xl font-bold hover:text-lightOrange transition-colors duration-300 cursor-pointer">
            SHOPPERS
          </h1>
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
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
