import ErrorPage from "@/components/error";
import { ProductDataTable } from "@/components/product-data-table";
import { SubCategory } from "@/types";
import axios from "axios";

interface IParams {
  params: {
    subcategoryId: string;
  };
}

const SubCategoryIdPage = async ({ params }: IParams) => {
  const { data: subcategory, status } = await axios.get(
    `${process.env.SERVER_URI}/subcategory/${params.subcategoryId}`
  );

  if (status !== 200 || !subcategory) {
    return <ErrorPage title="Failed to fetch the SubCategory" />;
  }

  return (
    <div className="h-full w-full flex flex-col gap-5 justify-center p-10">
      <h1 className=" text-lg font-semibold">
        {(subcategory as SubCategory).name} SubCategory
      </h1>
      <ProductDataTable data={(subcategory as SubCategory).products || []} />
    </div>
  );
};

export default SubCategoryIdPage;
