import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { getSubCategory } from "@/hooks/use-function";
import { Category, TableType } from "@/types";

const SubCategoryPage = async () => {
  const { message, subcategory } = await getSubCategory();

  if (message) {
    return <ErrorPage title={message} />;
  }

  return (
    <DataTable
      apiLink={"subcategory/list"}
      data={subcategory as Category[]}
      title="SubCategories"
      filterColumnName="name"
      createHref="/subcategory/create"
      tableType={TableType.SUBCATEGORY}
    />
  );
};

export default SubCategoryPage;
