import Container from "@/components/Container";
import ProductList from "@/components/ProductList";
import SectionTittle from "@/components/SectionTittle";
import React from "react";

const ShoppingPage = () => {
  return (
    <Container className="">
      <SectionTittle center="" title="Continue your shopping" subtitle="" />
      <div>
        <ProductList />
      </div>
    </Container>
  );
};

export default ShoppingPage;
