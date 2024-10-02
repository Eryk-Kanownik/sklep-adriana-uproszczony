"use client";
import useCartStore from "@/state/cart";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { cart } = useCartStore((state: any) => state);
  return (
    <div className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 text-white z-10">
      <Link href="/" className="font-bold">
        Sklep Adriana
      </Link>
      <Link
        href="/cart"
        className=" border-2 px-4 py-2 rounded-md font-bold self-end hover:bg-white hover:text-black duration-200 text-white disabled:border-gray-400 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:hover:bg-gray-300/0">
        Koszyk{" "}
        {cart.length > 0 &&
          `(${cart
            .map((item: any) => item.amount)
            .reduce((sum: number, total: number) => sum + total)})`}
      </Link>
    </div>
  );
};

export default Navbar;
