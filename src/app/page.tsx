import ProductCard from "@/components/ProductCard";
import products from "../../public/products/products.json";
import Link from "next/link";
import heroImage from "../../public/hero-background.jpg";
import Image from "next/image";

export default function Home() {
  let filteredProducts = products.filter(
    (product) => product.isVisible === true
  );

  return (
    <main className="px-4 sm:px-36 lg:px-64 xl:px-72 relative">
      <div className=" h-[100dvh] flex justify-center items-center text-white ">
        <Image
          src={heroImage}
          alt="hero section image"
          className="absolute -z-10 top-0 left-0 right-0 bottom-0 blur-md"
        />
        <div className=" flex flex-col justify-center">
          <h1 className="font-extrabold text-4xl mb-2 text-center">
            Sklep Adriana
          </h1>
          <p className="mb-4 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            dignissimos totam debitis ex officia nisi quos quidem error! Commodi
            ex illo praesentium numquam. Odio porro vel repellat quasi at sed.
          </p>
          <Link
            href="#products"
            className="border-2 px-4 py-2 rounded-md font-bold self-center hover:bg-white hover:text-black duration-200">
            Produkty
          </Link>
        </div>
      </div>
      <div id="products" className="py-20">
        <h1 className="font-bold text-2xl mb-4 text-white">Produkty</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 4xl:grid-cols-4  gap-2">
          {filteredProducts.map(
            ({ id, name, category, price, images }, key: React.Key) => (
              <ProductCard
                key={key}
                id={id}
                name={name}
                category={category}
                price={price}
                images={images}
              />
            )
          )}
        </div>
      </div>
    </main>
  );
}
