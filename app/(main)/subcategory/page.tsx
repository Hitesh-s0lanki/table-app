import ErrorPage from "@/components/error";
import { SubCategoryDataTable } from "@/components/subcategory-data-table";
import { SubCategory } from "@/types";
import axios from "axios";

const SubCategoryPage = async () => {
  const { data, status } = await axios.get(
    `${process.env.SERVER_URI!}/subcategory`
  );

  if (status !== 200 || !data) {
    return <ErrorPage title="Failed to load the category!" />;
  }

  return (
    <div className="h-full w-full flex flex-col justify-center gap-5 overflow-auto p-10">
      <h1 className=" text-lg font-semibold ">SubCategories</h1>
      <SubCategoryDataTable data={data as SubCategory[]} />
    </div>
  );
};

export default SubCategoryPage;
