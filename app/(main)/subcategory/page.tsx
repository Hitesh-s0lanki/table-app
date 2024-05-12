import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { currentUser } from "@/lib/auth";
import { axiosBase } from "@/lib/utils";
import { SubCategory, TableType } from "@/types";

const SubCategoryPage = async () => {
  const user = await currentUser();

  if (!user) return <ErrorPage title="User not logged in" />;

  const { data, status } = await axiosBase(user?.token!).get(
    `${process.env.SERVER_URI!}/subcategory`
  );

  if (status !== 200 || !data) {
    return <ErrorPage title="Failed to load the category!" />;
  }

  return (
    <DataTable
      apiLink={"subcategory/list"}
      data={data as SubCategory[]}
      title="SubCategories"
      filterColumnName="name"
      createHref="/subcategory/create"
      tableType={TableType.SUBCATEGORY}
    />
  );
};

export default SubCategoryPage;
