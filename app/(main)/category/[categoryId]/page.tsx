import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { currentUser } from "@/lib/auth";
import { axiosBase } from "@/lib/utils";
import { Category, TableType } from "@/types";

interface IParams {
  params: {
    categoryId: string;
  };
}

const CategoryIdPage = async ({ params }: IParams) => {
  const user = await currentUser();

  const { data: category, status } = await axiosBase(user?.token!).get(
    `${process.env.SERVER_URI}/category/${params.categoryId}`
  );

  if (status !== 200 || !category) {
    return <ErrorPage title="Failed to fetch the Category" />;
  }

  return (
    <DataTable
      apiLink={"subcategory/list"}
      model={category as Category}
      data={(category as Category).subcategories || []}
      title={(category as Category).name}
      filterColumnName="name"
      createHref="/subcategory/create"
      tableType={TableType.SUBCATEGORY}
    />
  );
};

export default CategoryIdPage;
