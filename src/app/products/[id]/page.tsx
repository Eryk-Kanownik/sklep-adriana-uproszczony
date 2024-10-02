import React from "react";
import products from "../../../../public/products/products.json";
import AddToCart from "@/components/forms/AddToCart";
import Carousel from "@/components/carousel/Carousel";

const page = ({ params: { id } }: { params: { id: string } }) => {
  let product = products[products.map((p) => p.id).indexOf(parseInt(id))];
  return (
    <div className=" px-4 sm:px-36 lg:px-64 xl:px-72 mt-20 md:mt-0 flex justify-center items-center  gap-4 min-h-screen text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Carousel images={product.images} />
        <div>
          <h1 className="font-bold text-2xl mb-2">{product.name}</h1>
          <p className="mb-2">{product.description}</p>
          <h3 className="font-semibold text-xl my-2">
            {(product.price / 100).toFixed(2)} zł
          </h3>
          <AddToCart
            productId={product.id}
            price={product.price}
            availibleSizes={product.availableSizes}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
