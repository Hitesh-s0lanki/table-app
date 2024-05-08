"use client";

import { Product } from "@/types";
import Image from "next/image";

const ProductDetails = ({ product }: { product: Product }) => {
  return (
    <div className="flex justify-center flex-col items-center w-full p-5">
      <Image
        src={product.bannerImage}
        alt="Banner image"
        height={500}
        width={500}
        className=" object-contain"
      />
    </div>
  );
};

export default ProductDetails;
