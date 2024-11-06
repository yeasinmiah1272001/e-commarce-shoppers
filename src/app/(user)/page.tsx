import Banner from "@/components/Banner";
import ProductList from "@/components/ProductList";
import ServicesTag from "@/components/ServicesTag";

const HomePage = () => {
  return (
    <div className=" py-14">
      <Banner />
      <ServicesTag />
      <ProductList />
    </div>
  );
};

export default HomePage;
