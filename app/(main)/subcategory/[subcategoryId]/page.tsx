import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { getSubCategoryById } from "@/hooks/use-function";
import { Category, TableType } from "@/types";

interface IParams {
  params: {
    subcategoryId: string;
  };
}

const SubCategoryIdPage = async ({ params }: IParams) => {
  const { message, subcategory } = await getSubCategoryById(
    params.subcategoryId
  );

  if (message) {
    return <ErrorPage title={message} />;
  }

  return (
    <DataTable
      apiLink={"products/list"}
      data={
        (subcategory as Category).products.filter(
          (e) => e.isArchived === false
        ) || []
      }
      title={`SubCategory ${(subcategory as Category).name}`}
      filterColumnName="name"
      createHref="/products/create"
      tableType={TableType.PRODUCT}
      description={(subcategory as Category).description}
      history={(subcategory as Category).history}
    />
  );
};

export default SubCategoryIdPage;
