import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import NpmSelect from "../NpmSelect";
import { useCreateSubCategoryModal } from "@/hooks/use-create-subcategory";
import { Category } from "@/types";
import axios from "axios";
import { SERVER_URI } from "@/lib/utils";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  id: z.string().min(2, {
    message: "Id is require",
  }),
  name: z.string().min(2).max(20),
  description: z.string().min(1, {
    message: "description must be provided...",
  }),
});

const CreateSubCategorieModel = () => {
  const router = useRouter();
  const { isOpen, onClose, id } = useCreateSubCategoryModal();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategoriesName = useCallback(async () => {
    try {
      const { data: categories, status } = await axios.get(
        `${SERVER_URI}/category`
      );
      if (status !== 200) {
        throw new Error("Something went wrong in fetching the category names");
      }
      setCategories((categories as Category[]) || []);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id ?? "",
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name, description } = values;

    const promise = axios
      .post(`${SERVER_URI}/subcategory/${values.id}`, {
        name,
        description,
      })
      .then(() => {
        form.reset();
        router.refresh();
      })
      .catch((error) => console.log(error))
      .finally(() => onClose());

    toast.promise(promise, {
      loading: "Adding a Categorie...",
      success: "Successfully added the sub category",
      error: "Something went wrong in creating a subcategory",
    });
  };

  useEffect(() => {
    if (id) {
      form.setValue("id", id);
    } else {
      getCategoriesName();
    }
  }, [form, id, getCategoriesName]);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new SubCategory</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the name of categorie"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!id && (
              <div className="flex flex-col gap-1">
                <FormLabel className=" text-md whitespace-normal">
                  Categorie name
                </FormLabel>
                <div className="mx-2">
                  <NpmSelect
                    isLoading={loading}
                    options={categories.map((categorie: Category) => ({
                      value: categorie.id,
                      label: categorie.name,
                    }))}
                    onChange={(value) => {
                      form.setValue("id", value.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the categorie description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" w-full ">
              <Button type="submit" className=" w-full">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubCategorieModel;
