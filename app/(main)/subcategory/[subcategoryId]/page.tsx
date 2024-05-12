import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { currentUser } from "@/lib/auth";
import { axiosBase } from "@/lib/utils";
import { SubCategory, TableType } from "@/types";

interface IParams {
  params: {
    subcategoryId: string;
  };
}

const SubCategoryIdPage = async ({ params }: IParams) => {
  const user = await currentUser();

  if (!user) return <ErrorPage title="User not logged in" />;

  const { data: subcategory, status } = await axiosBase(user?.token!).get(
    `${process.env.SERVER_URI}/subcategory/${params.subcategoryId}`
  );

  if (status !== 200 || !subcategory) {
    return <ErrorPage title="Failed to fetch the SubCategory" />;
  }

  return (
    <DataTable
      apiLink={"products/list"}
      data={
        (subcategory as SubCategory).products.filter(
          (e) => e.isArchived === false
        ) || []
      }
      title={`${(subcategory as SubCategory).name} SubCategory`}
      filterColumnName="name"
      createHref="/products/create"
      tableType={TableType.PRODUCT}
    />
  );
};

export default SubCategoryIdPage;
