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
import { useEditCategoryModal } from "@/hooks/use-edit-category";
import ErrorPage from "../common/error";
import axios from "axios";
import { axiosBase, SERVER_URI } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { editCategoryFormSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";

const EditCategoryModal = () => {
  const router = useRouter();
  const user = useCurrentUser();

  const { isOpen, onClose, category } = useEditCategoryModal();
  const formSchema = editCategoryFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!user) return toast.error("User not found!");

    const { name, description } = values;

    const data: any = {};

    if (!category) return;

    if (name !== category?.name) {
      data.name = name;
    }
    if (description !== category?.description) {
      data.description = description;
    }

    if (data) {
      const promise = axiosBase(user.token)
        .patch(`${SERVER_URI}/category/${category.id}`, data)
        .then(() => {
          router.refresh();
          form.reset();
        })
        .finally(() => onClose());

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
    if (category) {
      form.setValue("name", category.name);
      form.setValue("description", category.description);
    }
  }, [category, form]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset();
        onClose();
      }}
    >
      <DialogContent>
        {category ? (
          <>
            <DialogHeader>
              <DialogTitle>Edit Categorie</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
          </>
        ) : (
          <ErrorPage title="Category not provided!" />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
