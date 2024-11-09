import { getProductData } from "@/lib/getData";
import ProductCard from "./ProductCard";
import { Product } from "../../type";
import Container from "./Container";

const ProductList = async () => {
  const product = await getProductData();
  // console.log("product", product);
  return (
    <Container className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {product.map((item: Product) => (
        <ProductCard item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default ProductList;
