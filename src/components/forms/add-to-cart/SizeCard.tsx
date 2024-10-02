"use client";
import React from "react";

interface ISizeCard {
  index: number;
  size: string;
  selectedSize: string | null;
  setSelectedSize: any;
}

const SizeCard: React.FC<ISizeCard> = ({
  index,
  size,
  selectedSize,
  setSelectedSize,
}) => {
  return (
    <div className="flex flex-col ">
      <label
        htmlFor={`${index}`}
        className={`text-center text-sm flex justify-center items-center rounded-sm cursor-pointer font-semibold w-[35px] h-[35px] border-2  ${
          selectedSize === size && "bg-white text-black"
        }`}>
        {size}
      </label>
      <input
        id={`${index}`}
        type="radio"
        name="size"
        value={size}
        className="hidden"
        onChange={(e) => setSelectedSize(e.target.value)}
      />
    </div>
  );
};

export default SizeCard;
