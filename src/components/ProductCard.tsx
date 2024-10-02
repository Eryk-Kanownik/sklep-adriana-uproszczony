import React from "react";
import Image from "next/image";
import Link from "next/link";

interface IProductCard {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string[];
}

const ProductCard: React.FC<IProductCard> = ({
  id,
  name,
  category,
  price,
  images,
}) => {
  return (
    <Link
      href={`/products/${id}`}
      className=" border-[1px] rounded-md overflow-hidden grid grid-rows-[1fr,auto] text-white hover:scale-[101%] shadow-sm hover:shadow-lg duration-200">
      <Image
        alt="image product"
        src={images[0]}
        width={200}
        height={300}
        className="object-cover w-[100%] h-[100%]"
      />
      <div className="p-4 flex flex-col">
        <p className="text-sm">{category}</p>
        <h3 className="font-bold text-lg">{name}</h3>
        <p>{(price / 100).toFixed(2)} zł</p>
      </div>
    </Link>
  );
};

export default ProductCard;
