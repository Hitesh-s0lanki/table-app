import { CategoryDataTable } from "@/components/category-data-table";
import ErrorPage from "@/components/error";
import { Category } from "@/types";
import axios from "axios";

const CategoryPage = async () => {
  const { data, status } = await axios.get(
    `${process.env.SERVER_URI!}/category`
  );

  if (status !== 200 || !data) {
    return <ErrorPage title="Failed to load the category!" />;
  }

  return (
    <div className="h-full w-full flex flex-col justify-center gap-5 overflow-auto p-10">
      <h1 className=" text-lg font-semibold ">Categories</h1>
      <CategoryDataTable data={data as Category[]} />
    </div>
  );
};

export default CategoryPage;
