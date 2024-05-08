import ErrorPage from "@/components/error";
import { ProductDataTable } from "@/components/product-data-table";
import { Product } from "@/types";
import axios from "axios";

const ProductsPage = async () => {
  const { data: products, status } = await axios.get(
    `${process.env.SERVER_URI}/products`
  );

  if (status !== 200 || !products) {
    return <ErrorPage title="Failed to load the products!" />;
  }

  return (
    <div className="h-full w-full p-20 flex flex-col gap-5">
      <h1 className="text-black font-semibold text-xl">Products</h1>
      <ProductDataTable data={products as Product[]} />
    </div>
  );
};

export default ProductsPage;
