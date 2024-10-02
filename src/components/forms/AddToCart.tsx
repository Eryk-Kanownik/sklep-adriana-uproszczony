"use client";
import React, { useState } from "react";
import SizeCard from "./add-to-cart/SizeCard";
import useCartStore from "@/state/cart";

interface IAddToCart {
  productId: number;
  price: number;
  availibleSizes: string[];
}

const AddToCart: React.FC<IAddToCart> = ({
  productId,
  price,
  availibleSizes,
}) => {
  const { addToCart } = useCartStore((state: any) => state);
  const [selectedSize, setSelectedSize] = useState<null | string>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToCart({ productId, amount: 1, size: selectedSize, price });
  };

  return (
    <form onSubmit={onSubmit}>
      <p>Dostępne rozmiary</p>
      <div className="flex gap-2">
        {availibleSizes?.map((size, key) => (
          <SizeCard
            key={key}
            index={key}
            size={size}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        ))}
      </div>
      <button
        className="mt-4 border-2 px-4 py-2 rounded-md font-bold self-end hover:bg-white hover:text-black duration-200 text-white disabled:border-gray-400 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:hover:bg-gray-300/0"
        disabled={selectedSize === null ? true : false}>
        Dodaj do koszyka
      </button>
    </form>
  );
};

export default AddToCart;
