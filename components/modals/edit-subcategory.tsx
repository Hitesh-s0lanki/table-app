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
import ErrorPage from "../error";
import axios from "axios";
import { SERVER_URI } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useEditSubCategoryModal } from "@/hooks/use-edit-subcategory";

const formSchema = z.object({
  name: z.string().min(2).max(20),
  description: z.string().min(1, {
    message: "description must be provided...",
  }),
});

const EditSubCategoryModal = () => {
  const router = useRouter();

  const { isOpen, onClose, subcategory } = useEditSubCategoryModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name, description } = values;

    const data: any = {};

    if (!subcategory) return;

    if (name !== subcategory?.name) {
      data.name = name;
    }
    if (description !== subcategory?.description) {
      data.description = description;
    }

    if (data) {
      const promise = axios
        .patch(`${SERVER_URI}/subcategory/${subcategory.id}`, data)
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
    if (subcategory) {
      form.setValue("name", subcategory.name);
      form.setValue("description", subcategory.description);
    }
  }, [subcategory, form]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset();
        onClose();
      }}
    >
      <DialogContent>
        {subcategory ? (
          <>
            <DialogHeader>
              <DialogTitle>Edit SubCategory</DialogTitle>
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

export default EditSubCategoryModal;
