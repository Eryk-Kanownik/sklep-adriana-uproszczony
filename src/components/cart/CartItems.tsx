"use client";
import React from "react";
import CartCard from "./CartCard";
import useCartStore from "@/state/cart";
import { useRouter } from "next/navigation";

const CartItems = () => {
  const router = useRouter();
  const { cart } = useCartStore((state: any) => state);

  const onClick = () => {
    router.push("/cart/delivery");
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-white font-bold text-2xl mb-2">Koszyk</h1>
      <div className="flex flex-col gap-2">
        {cart.map(({ productId, price, size, amount }: any, key: React.Key) => (
          <CartCard
            key={key}
            productId={productId}
            price={price}
            size={size}
            amount={amount}
          />
        ))}
      </div>
      <button
        onClick={onClick}
        className="mt-4 border-2 px-4 py-2 rounded-md font-bold self-end hover:bg-white hover:text-black duration-200 text-white disabled:border-gray-400 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:hover:bg-gray-300/0"
        disabled={cart.length === 0 ? true : false}>
        Dostawa i płatność
      </button>
    </div>
  );
};

export default CartItems;
