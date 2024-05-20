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
import ErrorPage from "../common/error";
import axios from "axios";
import { axiosBase, SERVER_URI } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useEditTaskModal } from "@/hooks/use-edit-tasks";
import { Status } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCurrentUser } from "@/hooks/use-current-user";
import { editTaskFormSchema } from "@/schemas";

const EditTaskModal = () => {
  const router = useRouter();
  const user = useCurrentUser();

  const { isOpen, onClose, task } = useEditTaskModal();

  const formSchema = editTaskFormSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!task) return toast.error("User not found!");
    if (!user) return toast.error("User not found!");

    if (task.status !== values.status) {
      const promise = axiosBase(user.token)
        .patch(`${SERVER_URI}/tasks/${task.id}`, values)
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
    if (task) {
      form.setValue("status", task.status);
    }
  }, [task, form]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset();
        onClose();
      }}
    >
      <DialogContent>
        {task ? (
          <>
            <DialogHeader>
              <DialogTitle>Edit Task Status</DialogTitle>
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
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={task.status}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the Status of Tasks" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PENDING">PENDING</SelectItem>
                          <SelectItem value="TODO">TODO</SelectItem>
                          <SelectItem value="INPROGRESS">INPROGRESS</SelectItem>
                          <SelectItem value="COMPLETE">COMPLETE</SelectItem>
                        </SelectContent>
                      </Select>
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
          <ErrorPage title="Task not provided!" />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;
