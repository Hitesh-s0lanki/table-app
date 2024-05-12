import ErrorPage from "@/components/common/error";
import { DataTable } from "@/components/data-table";
import { currentUser } from "@/lib/auth";
import { axiosBase } from "@/lib/utils";
import { Product, TableType } from "@/types";

const ProductsPage = async () => {
  const user = await currentUser();

  if (!user) return <ErrorPage title="User not found" />;

  const { data: products, status } = await axiosBase(user?.token!).get(
    `${process.env.SERVER_URI}/products`
  );

  if (status !== 200 || !products) {
    return <ErrorPage title="Failed to load the products!" />;
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
