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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { toast } from "sonner";
import ErrorPage from "../common/error";
import { axiosBase, SERVER_URI } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { editUserRoleFormSchema } from "@/schemas";
import { useChangeRoleModal } from "@/hooks/use-change-role";
import NpmSelect from "../common/NpmSelect";
import { Role, User } from "@/types";
import { getRoles, getUserById } from "@/hooks/use-client-function";
import { currentUser } from "@/lib/auth";

const EditUserRoleModal = () => {
  const router = useRouter();
  const currentUser = useCurrentUser();

  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { isOpen, onClose, id } = useChangeRoleModal();

  const formSchema = editUserRoleFormSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onLoad = useCallback(async () => {
    const { users, message } = await getUserById(id, currentUser);
    const { roles, message: RoleMessage } = await getRoles(currentUser);
    if (message || RoleMessage) {
      setError(message || RoleMessage);
    } else {
      setUser(users);
      setRoles(roles);
    }
  }, [id]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    //   if (!task) return toast.error("User not found!");
    //   if (!user) return toast.error("User not found!");
    //   if (task.status !== values.status) {
    //     const promise = axiosBase(user.token)
    //       .patch(`${SERVER_URI}/tasks/${task.id}`, values)
    //       .then(() => {
    //         router.refresh();
    //         form.reset();
    //       })
    //       .finally(() => onClose());
    //     toast.promise(promise, {
    //       loading: "Editing a Category...",
    //       success: "Successfully updated the category",
    //       error: "Something went wrong in updating a category",
    //     });
    //   } else {
    //     toast.warning("No Update in data");
    //     onClose();
    //   }
  };

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset();
        onClose();
      }}
    >
      <DialogContent>
        <>
          <DialogHeader>
            <DialogTitle>Edit User Role</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          {user && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="roleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Change Role</FormLabel>
                      <FormControl>
                        <NpmSelect
                          isLoading={loading}
                          options={role.map((user: User) => ({
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
                <div className=" w-full ">
                  <Button type="submit" className=" w-full">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserRoleModal;
