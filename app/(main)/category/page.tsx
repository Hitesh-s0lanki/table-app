import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { getCategory } from "@/hooks/use-function";
import { Category, TableType } from "@/types";

const CategoryPage = async () => {
  const { message, category } = await getCategory();

  if (message) {
    return <ErrorPage title={message} />;
  }

  return (
    <DataTable
      apiLink={"category/list"}
      data={category as Category[]}
      title="Category"
      filterColumnName="name"
      createHref="/category/create"
      tableType={TableType.CATEGORY}
    />
  );
};

export default CategoryPage;
