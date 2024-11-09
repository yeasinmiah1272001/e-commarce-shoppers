import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FormatedPrice from "@/components/FormatedPrice";
import ProductList from "@/components/ProductList";
import SectionTittle from "@/components/SectionTittle";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface Props {
  params: Promise<{ slug: string }>; // Wrap params in a Promise to satisfy type constraint
}

const SingleProductPage = async ({ params }: Props) => {
  const resolvedParams = await params; // Await params here to resolve it
  const query = groq`*[_type == 'product' && slug.current == $slug][0]{ ... }`;

  const product = await client.fetch(query, { slug: resolvedParams.slug });
  const rating =
    typeof product.rating === "number" && product.rating > 0
      ? Math.floor(product.rating)
      : 0;

  return (
    <div className="bg-bgLight py-10">
      <Container className="cursor-pointer">
        <div className="grid gap-10 lg:grid-cols-2 justify-between w-full">
          <div className="flex justify-center lg:justify-end">
            <Image
              className="w-full max-w-md rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              src={urlFor(product.image).url()}
              width={500}
              height={500}
              alt="Product Image"
              priority
            />
          </div>
          <div className="space-y-6 px-6 lg:px-0">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              {product.title}
            </h1>
            <div className="space-x-4 flex">
              <FormatedPrice
                className="text-xl line-through"
                amount={product.rowprice}
              />
              <FormatedPrice
                className="text-xl font-bold text-lightOrange"
                amount={product.price}
              />
              <p>you saved</p>
              <FormatedPrice
                className="text-sm font-bold text-white rounded-md p-1 bg-lightGreen"
                amount={product.rowprice - product.price}
              />
              <p>from this item</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 text-xl">
              {[...Array(rating)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
            <AddToCartButton item={product} className="w-full md:w-1/2 mt-4" />
          </div>
        </div>
        <div className="mt-4">
          <SectionTittle center="" subtitle="" title="Best seller product" />
          <ProductList />
        </div>
      </Container>
    </div>
  );
};

export default SingleProductPage;
