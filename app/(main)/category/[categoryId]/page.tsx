import ErrorPage from "@/components/error";
import { SubCategoryDataTable } from "@/components/subcategory-data-table";
import { Category } from "@/types";
import axios from "axios";

interface IParams {
  params: {
    categoryId: string;
  };
}

const CategoryIdPage = async ({ params }: IParams) => {
  const { data: category, status } = await axios.get(
    `${process.env.SERVER_URI}/category/${params.categoryId}`
  );

  if (status !== 200 || !category) {
    return <ErrorPage title="Failed to fetch the Category" />;
  }

  return (
    <div className="h-full w-full flex flex-col gap-5 justify-center p-10">
      <h1 className=" text-lg font-semibold">
        {(category as Category).name} Category
      </h1>
      <SubCategoryDataTable
        data={(category as Category).subcategories || []}
        isCategory={category as Category}
      />
    </div>
  );
};

export default CategoryIdPage;
