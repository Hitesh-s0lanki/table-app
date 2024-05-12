import Editor from "@/components/common/editor";
import ErrorPage from "@/components/common/error";
import ProductDetails from "@/components/product-details";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/auth";
import { axiosBase } from "@/lib/utils";
import { Product } from "@/types";

interface IParams {
  params: {
    productId: string;
  };
}

const ProductIdPage = async ({ params }: IParams) => {
  const user = await currentUser();

  if (!user) return <ErrorPage title="User not found" />;

  const { data: product, status } = await axiosBase(user.token).get(
    `${process.env.SERVER_URI}/products/${params.productId}`
  );

  if (status !== 200 || !product) {
    return <ErrorPage title="Failed to load the products!" />;
  }

  return (
    <div className="flex flex-col gap-5 h-full w-full p-20">
      <h1 className=" text-xl font-semibold">{(product as Product).name}</h1>
      <p className=" text-muted-foreground text-md">
        {" "}
        price : $ {(product as Product).price}
      </p>
      <Separator />
      <div className=" flex flex-col gap-5">
        <h2 className=" text-sm font-semibold">Description</h2>
        <Editor
          initialContent={(product as Product).description}
          editable={false}
        />
      </div>
      <Separator />
      <ProductDetails product={product as Product} />
    </div>
  );
};

export default ProductIdPage;
