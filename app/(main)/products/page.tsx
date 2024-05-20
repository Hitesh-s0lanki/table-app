import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { getProducts } from "@/hooks/use-function";
import { Product, TableType } from "@/types";

const ProductsPage = async () => {
  const { message, products } = await getProducts();

  if (message) {
    return <ErrorPage title={message} />;
  }

  return (
    <DataTable
      apiLink={"products/list"}
      data={products as Product[]}
      title="Products"
      filterColumnName="name"
      createHref="/products/create"
      tableType={TableType.PRODUCT}
    />
  );
};

export default ProductsPage;
