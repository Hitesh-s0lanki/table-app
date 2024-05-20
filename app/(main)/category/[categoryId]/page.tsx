import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { getCategoryById } from "@/hooks/use-function";
import { Category, TableType } from "@/types";

interface IParams {
  params: {
    categoryId: string;
  };
}

const CategoryIdPage = async ({ params }: IParams) => {
  const { message, category } = await getCategoryById(params.categoryId);

  if (message) {
    return <ErrorPage title={message} />;
  }

  return (
    <DataTable
      apiLink={"subcategory/list"}
      model={category as Category}
      data={(category as Category).subCategories || []}
      title={`Category ${(category as Category).name}`}
      filterColumnName="name"
      createHref="/subcategory/create"
      tableType={TableType.SUBCATEGORY}
      description={(category as Category).description}
      history={(category as Category).history}
    />
  );
};

export default CategoryIdPage;
