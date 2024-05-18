"use client";

import { ProductID } from "@/interface/interface";
import { useFetchProductQuery } from "@/lib/Products/product.api";
export default function Home(): JSX.Element {
  const { data } = useFetchProductQuery("");
  return (
    <>
      <main className="h-screen flex flex-col justify-center items-center">
        <h1>Welcome to the KRSHNA</h1>
        <h2>Find Your Amazing Product Below</h2>
        {data?.data?.Product.map((product: ProductID) => (
          <div key={product._id}>
            <h1>{product.name}</h1>
          </div>
        ))}
      </main>
      <div className="h-96 flex justify-center">Product</div>
    </>
  );
}
