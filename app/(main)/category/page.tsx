import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { currentUser } from "@/lib/auth";
import { axiosBase } from "@/lib/utils";
import { Category, TableType } from "@/types";

const CategoryPage = async () => {
  const user = await currentUser();

  if (!user?.token) {
    return <ErrorPage title="No accessToken provided" />;
  }

  const { data } = await axiosBase(user?.token).get("/category");

  if (data.message) {
    return <ErrorPage title={data.message} />;
  }

  return (
    <DataTable
      apiLink={"category/list"}
      data={data as Category[]}
      title="Category"
      filterColumnName="name"
      createHref="/category/create"
      tableType={TableType.CATEGORY}
    />
  );
};

export default CategoryPage;
