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
import { axiosBase, SERVER_URI } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useEditSubCategoryModal } from "@/hooks/use-edit-subcategory";
import { useCurrentUser } from "@/hooks/use-current-user";
import { editSubCategoryFormSchema } from "@/schemas";
import NpmSelect from "../common/NpmSelect";
import { Category } from "@/types";

const EditSubCategoryModal = () => {
  const router = useRouter();
  const user = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);

  const getAllCategory = useCallback(async () => {
    if (user) {
      const { data: category } = await axiosBase(user!.token, user.role).get(
        "/category"
      );
      setCategory(category);
    }
  }, []);

  const { isOpen, onClose, subcategory } = useEditSubCategoryModal();
  const formSchema = editSubCategoryFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentId: subcategory?.id,
      name: subcategory?.name,
      description: subcategory?.description ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    if (!user) return toast.error("User not found!");
    const { name, description, parentId } = values;

    const data: any = {};

    if (!subcategory) return;

    if (name !== subcategory?.name) {
      data.name = name;
    }
    if (description !== subcategory?.description) {
      data.description = description;
    }
    if (parentId !== subcategory?.parent?.id) {
      data.parentId = parentId;
    }

    if (data) {
      const promise = axiosBase(user.token)
        .patch(`${SERVER_URI}/subcategory/${subcategory.id}`, data)
        .then(() => {
          router.refresh();
          form.reset();
        })
        .finally(() => {
          setIsLoading(false);
          onClose();
        });

      toast.promise(promise, {
        loading: "Editing a Category...",
        success: "Successfully updated the category",
        error: "Something went wrong in updating a category",
      });
    } else {
      toast.warning("No Update in data");
      onClose();
    }
  };

  useEffect(() => {
    getAllCategory();
    if (subcategory) {
      form.setValue("parentId", subcategory.parent!.id);
      form.setValue("name", subcategory.name);
      form.setValue("description", subcategory.description);
    }
  }, [getAllCategory, form, subcategory, user]);

  if (!subcategory || !user) return;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset();
        onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit SubCategory</DialogTitle>
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
            <div className="flex flex-col gap-1">
              <FormLabel className=" text-md whitespace-normal">
                Category
              </FormLabel>
              <div className="mx-2">
                <NpmSelect
                  isLoading={isLoading}
                  options={category.map((category: Category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                  onChange={(value) => {
                    form.setValue("parentId", value.value, {
                      shouldValidate: true,
                    });
                  }}
                  defaultValue={{
                    value: subcategory.parent!.id,
                    label: subcategory.parent!.name,
                  }}
                />
              </div>
            </div>
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
              <Button disabled={isLoading} type="submit" className=" w-full">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSubCategoryModal;
