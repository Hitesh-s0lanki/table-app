import ProductForm from "@/components/create-form/create-product-form";
import ErrorPage from "@/components/common/error";
import { SubCategory } from "@/types";
import axios from "axios";
import { currentUser } from "@/lib/auth";
import { axiosBase } from "@/lib/utils";

const CreatePage = async () => {
  const user = await currentUser();

  if (!user) return <ErrorPage title="User not found" />;

  const { data: subcategory, status } = await axiosBase(user.token).get(
    `${process.env.SERVER_URI!}/subcategory`
  );

  if (status !== 200 || !subcategory) {
    return <ErrorPage title="Failed to load the category!" />;
  }

  return (
    <div className="h-full w-full flex flex-col gap-5 p-10">
      <h1 className=" text-black text-xl font-semibold w-full px-10">
        Create new Product.
      </h1>
      <ProductForm subcategory={subcategory as SubCategory[]} />
    </div>
  );
};

export default CreatePage;
