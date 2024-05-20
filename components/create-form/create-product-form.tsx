"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosBase, SERVER_URI, Tags } from "@/lib/utils";
import NpmSelect from "../common/NpmSelect";
import { useState } from "react";
import { SingleImageDropzone } from "../common/SingleImageDropzone";
import {
  MultiImageDropzone,
  type FileState,
} from "../common/MultiImageDropzone";
import Editor from "../common/editor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createProductFormSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import MultiCreatableSelect from "../multi-createable";
import { Category } from "@/types";

const ProductForm = ({ subcategory }: { subcategory: Category[] }) => {
  const router = useRouter();

  const user = useCurrentUser();

  const formSchema = createProductFormSchema;

  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  const [tagsValue, setTagsValue] = useState([]);

  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      Tags: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (!user) return toast.error("User not found!");

    setLoading(true);

    const formdata = new FormData();

    formdata.append("name", values.name);
    formdata.append("sellingPrice", values.sellingPrice);
    formdata.append("actualPrice", values.actualPrice);
    formdata.append("description", values.description);

    for (let i in values) {
      if (i === "Tags") {
        for (let tag of values.Tags) {
          formdata.append(i, tag);
        }
      } else if (i === "images") {
        for (let image of values.images) {
          formdata.append(i, image);
        }
      }
    }

    formdata.append("bannerImage", values.bannnerImage);

    const promise = axiosBase(user.token)
      .post(`/products/${values.category}`, formdata)
      .then(() => {
        form.reset();
        router.replace("/products");
      });

    toast.promise(promise, {
      loading: "Product is creating...",
      success: "Succefully created the product.",
      error: "error in creating the product.",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-20 py-10"
      >
        <div className="grid grid-cols-2 gap-5 grid-rows-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="enter the name of product" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sellingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selling Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the price of product"
                    {...field}
                    type="number"
                    step="0.01"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="actualPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Actual Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the price of product"
                    {...field}
                    type="number"
                    step="0.01"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SubCategory</FormLabel>
                <FormControl>
                  <NpmSelect
                    isLoading={loading}
                    options={subcategory.map((subcategory: Category) => ({
                      value: subcategory.id,
                      label: subcategory.name,
                    }))}
                    onChange={(value) => {
                      form.setValue("category", value.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <MultiCreatableSelect
                    disabled={loading}
                    options={Tags.map((tag) => ({
                      value: tag.name,
                      label: tag.name,
                    }))}
                    onChange={(value: any) => {
                      setTagsValue(value);
                      form.setValue(
                        "Tags",
                        value.map((e: any) => e.value),
                        {
                          shouldValidate: true,
                        }
                      );
                    }}
                    value={tagsValue}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Editor
                  onChange={(value: string) => {
                    form.setValue("description", value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bannnerImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner Image</FormLabel>
              <FormControl>
                <SingleImageDropzone
                  width={200}
                  height={200}
                  value={file}
                  onChange={(file) => {
                    setFile(file);
                    if (file) {
                      console.log("i m set", file);
                      form.setValue("bannnerImage", file);
                    }
                  }}
                  className="w-full h-[300px] p-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <MultiImageDropzone
                  value={fileStates}
                  dropzoneOptions={{
                    maxFiles: 4,
                    maxSize: 1024 * 1024 * 2, // 2 MB
                  }}
                  onChange={(fileStates: FileState[]) => {
                    setFileStates(fileStates);

                    const files: File[] = fileStates.map((e) => e.file);
                    console.log(files);
                    form.setValue("images", files);
                  }}
                  onFilesAdded={async (addedFiles) => {
                    setFileStates([...fileStates, ...addedFiles]);
                    const files: File[] = [
                      ...fileStates.map((e) => e.file),
                      ...addedFiles.map((e) => e.file),
                    ];
                    form.setValue("images", files);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className=" w-full p-4 flex justify-center items-center">
          <Button type="submit" className="w-1/2">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
