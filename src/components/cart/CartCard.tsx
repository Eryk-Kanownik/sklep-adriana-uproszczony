import React from "react";
import products from "../../../public/products/products.json";
import Image from "next/image";
import useCartStore from "@/state/cart";

interface ICartCard {
  productId: number;
  price: number;
  size: string;
  amount: number;
}

const CartCard: React.FC<ICartCard> = ({ productId, price, size, amount }) => {
  const { deleteFromCart, increase, decrease, setAmountTo } = useCartStore(
    (state: any) => state
  );
  let index = products.map((prod) => prod.id).indexOf(productId);
  let product = products[index];

  return (
    <div className="p-4  flex gap-2 rounded-md text-white border-[1px] shadow-lg relative">
      <Image
        alt="image product"
        src={product.images[0]}
        width={200}
        height={300}
        className="object-cover shadow-md rounded-md"
      />
      <div>
        <h1 className="font-bold text-xl">{product?.name}</h1>
        <p>Rozmiar: {size}</p>
        <p>Ilość:</p>
        <div className="flex gap-2">
          <button
            className="border-2 w-8 text-center rounded-md hover:bg-white hover:text-black duration-200"
            onClick={() => decrease(productId, size)}>
            -
          </button>
          <input
            type="number"
            className="w-12 text-black text-center rounded-md"
            value={amount}
            onChange={(e) =>
              setAmountTo(productId, parseInt(e.target.value), size)
            }
          />
          <button
            className="border-2 w-8 text-center rounded-md hover:bg-white hover:text-black duration-200"
            onClick={() => increase(productId, size)}>
            +
          </button>
        </div>
        <p>{((price * amount) / 100).toFixed(2)} zł</p>
        <button
          className=" absolute bottom-2 right-2 mt-4 border-2 px-4 py-2 rounded-md font-bold self-end hover:bg-white hover:text-black duration-200 text-white disabled:border-gray-400 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:hover:bg-gray-300/0"
          onClick={() => deleteFromCart({ productId, price, size, amount })}>
          Usuń
        </button>
      </div>
    </div>
  );
};

export default CartCard;
