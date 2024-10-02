"use client";
import createOrder from "@/lib/actions/create-order";
import useCartStore from "@/state/cart";
import React, { useEffect, useState } from "react";
import deliveryPrices from "../../../public/products/delivery-price.json";
import { useRouter } from "next/navigation";

const Delivery = () => {
  const router = useRouter();
  const { cart } = useCartStore((state: any) => state);
  const [isDeliveryWithPayment, setIsDeliveryWithPayment] = useState<
    true | false | null
  >(null);

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/");
    }
  }, []);

  return (
    <form
      className="text-white"
      action={(formData: FormData) => createOrder(formData, cart)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1">Imię</label>
          <input
            type="text"
            className="p-2 rounded-md   border-2 text-black"
            placeholder="Imię..."
            name="first-name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Nazwisko</label>
          <input
            type="text"
            className="p-2 rounded-md   border-2 text-black "
            placeholder="Nazwisko..."
            name="last-name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Email</label>
          <input
            type="email"
            className="p-2 rounded-md   border-2 text-black"
            placeholder="Email..."
            name="email"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Miejscowość dostawy</label>
          <input
            type="text"
            className="p-2 rounded-md   border-2 text-black"
            placeholder="Miejscowość..."
            name="place"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">
            Ulica {"("}Niewymagane{")"}
          </label>
          <input
            type="text"
            className="p-2 rounded-md   border-2 text-black"
            placeholder="Ulica..."
            name="street"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Nr budynku</label>
          <input
            type="text"
            className="p-2 rounded-md   border-2 text-black"
            placeholder="Nr budynku..."
            name="building-number"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Kod pocztowy</label>
          <input
            type="text"
            className="p-2 rounded-md   border-2 text-black"
            placeholder="Kod pocztowy..."
            name="postal-code"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1">Numer telefonu</label>
          <input
            type="text"
            className="p-2 rounded-md border-2 text-black"
            placeholder="Numer telefonu..."
            name="phone-number"
            required
          />
        </div>
      </div>
      <div>
        <h2 className="my-4 font-bold text-xl">Sposób dostawy</h2>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="delivery"
            value="Kurier"
            id="kurier"
            defaultChecked
            onChange={() => setIsDeliveryWithPayment(false)}
          />
          <label className="mb-1" htmlFor="kurier">
            Kurier - {(deliveryPrices.kurierZwykły / 100).toFixed(2)} zł
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="delivery"
            value="Kurier Pobranie"
            id="pobranie"
            onChange={() => setIsDeliveryWithPayment(true)}
          />
          <label className="mb-1" htmlFor="pobranie">
            Kurier pobranie - {(deliveryPrices.kurierPobranie / 100).toFixed(2)}{" "}
            zł
          </label>
        </div>
      </div>
      <button className="border-2 mt-2 px-4 py-2 rounded-md font-bold self-center text-white hover:bg-white hover:text-black duration-200">
        {isDeliveryWithPayment ? "Zamów" : "Przejdź do płatności"}
      </button>
    </form>
  );
};

export default Delivery;
