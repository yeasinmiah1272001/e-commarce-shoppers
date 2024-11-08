"use client";
import React from "react";
import { useSelector } from "react-redux";
import { StateType } from "../../../../type";

const OrderData = () => {
  const selector = useSelector((state: StateType) => state.name.cart);
  console.log("sele", selector);
  return <div>OrderData</div>;
};

export default OrderData;
