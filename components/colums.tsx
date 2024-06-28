"use client";

import {
  Category,
  columnsType,
  dataTableColumnType,
  Product,
  Project,
  Role,
  TableType,
  Task,
  User,
} from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import {
  ArrowUpDown,
  CassetteTape,
  ChefHatIcon,
  Edit,
  MoreHorizontal,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ConfirmModal from "./common/confirm-model";
import { axiosBase, SERVER_URI, status as statusList } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEditCategoryModal } from "@/hooks/use-edit-category";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEditSubCategoryModal } from "@/hooks/use-edit-subcategory";
import Image from "next/image";
import { useEditTaskModal } from "@/hooks/use-edit-tasks";
import ProfileImage from "./common/profile-image";
import { DataTableColumnHeader } from "./data-table-components/data-table-column-header";
import { Badge } from "./ui/badge";
import { useEditProjectModal } from "@/hooks/use-edit-project";
import { ImProfile } from "react-icons/im";
import { Checkbox } from "./ui/checkbox";
import { useChangeRoleModal } from "@/hooks/use-change-role";

export const Columns: (
  table: TableType,
  data?: dataTableColumnType
) => columnsType = (table: TableType, data?: dataTableColumnType) => {
  const router = useRouter();
  const user = useCurrentUser();
  const { onOpen: handleCategoryEdit } = useEditCategoryModal();
  const { onOpen: handleSubCategoryEdit } = useEditSubCategoryModal();
  const { onOpen: handleTaskEdit } = useEditTaskModal();
  const { onOpen: handleProjectEdit } = useEditProjectModal();
  const { onOpen: handleUserRoleEdit } = useChangeRoleModal();

  const categoryColumns: ColumnDef<Category>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className=" truncate">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "subCategories",
      header: "SubCategories",
      cell: ({ row }) => (
        <div className=" text-center w-[100px]">
          {(row.getValue("subCategories") as Category[]).length}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const category = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`/category/${category.id}`)}
              >
                Show more
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleCategoryEdit(category)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <ConfirmModal
                onConfirm={() => {
                  const promise = axiosBase(user?.token!, user?.role)
                    .patch(`${SERVER_URI}/category/${category.id}`, {
                      isArchived: true,
                    })
                    .then(() => router.refresh());
                  toast.promise(promise, {
                    loading: "Archiving the modal",
                    success: "Successfully Archived",
                    error: "Error in deleting",
                  });
                }}
              >
                <div className="w-full flex gap-2 text-sm items-center justify-start p-2 rounded-md hover:bg-secondary cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </div>
              </ConfirmModal>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const subCategoryColumns: ColumnDef<Category>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className=" truncate">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "parent",
      header: "Category",
      cell: ({ row }: any) => {
        if (!row.getValue("parent") && data)
          return (
            <div className=" text-center w-[100px]">
              {(data as Category).name}
            </div>
          );
        return (
          <div className=" text-center w-[100px]">
            {(row.getValue("parent") as Category).name}
          </div>
        );
      },
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => (
        <div className=" text-center w-[100px]">
          {row.getValue("products")
            ? (row.getValue("products") as Category[]).length
            : 0}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const subcategory = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`/subcategory/${subcategory.id}`)}
              >
                show more
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleSubCategoryEdit(subcategory)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <ConfirmModal
                onConfirm={() => {
                  const promise = axiosBase(user?.token!)
                    .patch(`${SERVER_URI}/subcategory/${subcategory.id}`, {
                      isArchived: true,
                    })
                    .then(() => router.refresh());
                  toast.promise(promise, {
                    loading: "Trashing the subcategory",
                    success: "Successfully trash",
                    error: "Error in trashing",
                  });
                }}
              >
                <div className="w-full flex gap-2 text-sm items-center justify-start p-2 rounded-md hover:bg-secondary cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </div>
              </ConfirmModal>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const productColumns: ColumnDef<Product>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "bannerImage",
      header: "Banner Image",
      cell: ({ row }) => (
        <Image
          src={row.getValue("bannerImage")}
          alt="banner image"
          height={100}
          width={100}
          className=" object-contain"
        />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "sellingPrice",
      header: "Selling Price",
      cell: ({ row }) => (
        <div className=" text-center w-[100px]">
          $ {row.getValue("sellingPrice")}
        </div>
      ),
    },
    {
      accessorKey: "actualPrice",
      header: "Actual Price",
      cell: ({ row }) => (
        <div className=" text-center w-[100px]">
          $ {row.getValue("actualPrice")}
        </div>
      ),
    },
    {
      accessorKey: "Tags",
      header: "Tags",
      cell: ({ row }) => (
        <div className="flex space-x-1">
          {(row.getValue("Tags") as string[]).map((e) => (
            <Badge variant="outline">{e}</Badge>
          ))}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <CassetteTape className="h-4 w-4 mr-2" />
                show more
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <ConfirmModal
                onConfirm={() => {
                  const promise = axiosBase(user?.token!)
                    .patch(`${SERVER_URI}/products/${product.id}`, {
                      isArchived: true,
                    })
                    .then(() => router.refresh());
                  toast.promise(promise, {
                    loading: "Trashing the product",
                    success: "Successfully Trash",
                    error: "Error in trashing",
                  });
                }}
              >
                <div className="w-full flex gap-2 text-sm items-center justify-start p-2 rounded-md hover:bg-secondary cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </div>
              </ConfirmModal>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const projectColumns: ColumnDef<Project>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "technology",
      header: "Technology",
      cell: ({ row }) => (
        <div className="flex space-x-1">
          {(row.getValue("technology") as string[]).map((e) => (
            <Badge variant="outline">{e}</Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "client",
      header: "Client",
      cell: ({ row }) => (
        <div className="flex space-x-1">
          {(row.getValue("client") as string[]).map((e) => (
            <Badge variant="outline">{e}</Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "manager",
      header: "Manager",
      cell: ({ row }) => (
        <div className="flex space-x-1">
          {(row.getValue("manager") as User).UserName}
        </div>
      ),
    },
    {
      accessorKey: "tasks",
      header: "Tasks no.",
      cell: ({ row }) => (
        <div className="">{(row.getValue("tasks") as Task[]).length}</div>
      ),
    },
    {
      accessorKey: "participants",
      header: "Participants no.",
      cell: ({ row }) => (
        <div className="">
          {(row.getValue("participants") as User[]).length}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`/projects/${project.id}`)}
              >
                <CassetteTape className="h-4 w-4 mr-2" />
                show more
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProjectEdit(project.id)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <ConfirmModal
                onConfirm={() => {
                  const promise = axiosBase(user?.token!)
                    .patch(`${SERVER_URI}/projects/${project.id}`, {
                      isArchived: true,
                    })
                    .then(() => router.refresh());
                  toast.promise(promise, {
                    loading: "Trashing the project",
                    success: "Successfully trash!",
                    error: "Error in Trashing",
                  });
                }}
              >
                <div className="w-full flex gap-2 text-sm items-center justify-start p-2 rounded-md hover:bg-secondary cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </div>
              </ConfirmModal>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const taskColumns: ColumnDef<Task>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "project",
      header: "Project",
      cell: ({ row }) => (
        <div className="">{(row.getValue("project") as Project).name}</div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = statusList.find(
          (status) => status.value === row.getValue("status")
        );

        if (!status) {
          return null;
        }

        return (
          <div className="flex w-[100px] items-center">
            {status.icon && (
              <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
            )}
            <span>{status.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },

    {
      accessorKey: "members",
      header: "Members",
      cell: ({ row }) => (
        <div className="grid grid-cols-1 gap-1">
          {(row.getValue("members") as User[]).map((user) => (
            <Badge key={user.id} variant="outline">
              <ImProfile className=" size-3 mr-2" />
              {user.UserName}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const task = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`/projects/${task.project.id}`)}
              >
                <CassetteTape className="h-4 w-4 mr-2" />
                show project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTaskEdit(task)}>
                <ChefHatIcon className="h-4 w-4 mr-2" />
                change Status
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <ConfirmModal
                onConfirm={() => {
                  const promise = axiosBase(user?.token!)
                    .patch(`${SERVER_URI}/tasks/${task.id}`, {
                      isArchived: true,
                    })
                    .then(() => router.refresh());
                  toast.promise(promise, {
                    loading: "Trashing the task",
                    success: "Successfully trash",
                    error: "Error in trashing",
                  });
                }}
              >
                <div className="w-full flex gap-2 text-sm items-center justify-start p-2 rounded-md hover:bg-secondary cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </div>
              </ConfirmModal>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const userColumns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "UserName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            UserName
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" capitalize">{row.getValue("UserName")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <div className="">{(row.getValue("role") as Role).name}</div>
      ),
    },
    {
      accessorKey: "emailVerified",
      header: "Verified",
      cell: ({ row }) => (
        <div className="">
          {row.getValue("emailVerified") ? "True" : "False"}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(`/users/${product.id}`)}
              >
                show more
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleUserRoleEdit(product.id)}>
                <Edit className="h-4 w-4 mr-2" />
                change Role
              </DropdownMenuItem>
              <ConfirmModal
                onConfirm={() => {
                  const promise = axiosBase(user?.token!)
                    .patch(`${SERVER_URI}/users/${product.id}`, {
                      isArchive: true,
                    })
                    .then(() => router.refresh());
                  toast.promise(promise, {
                    loading: "Trashing the user...",
                    success: "Successfully trash",
                    error: "Error in trashing",
                  });
                }}
              >
                <div className="w-full flex gap-2 text-sm items-center justify-start p-2 rounded-md hover:bg-secondary cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </div>
              </ConfirmModal>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const roleColumns: ColumnDef<Role>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
    },
    {
      accessorKey: "user",
      header: "Users",
      cell: ({ row }) => (
        <div className="">{(row.getValue("user") as User[]).length}</div>
      ),
    },
  ];

  switch (table) {
    case TableType.CATEGORY:
      return categoryColumns;
    case TableType.SUBCATEGORY:
      return subCategoryColumns;
    case TableType.PRODUCT:
      return productColumns;
    case TableType.PROJECT:
      return projectColumns;
    case TableType.TASK:
      return taskColumns;
    case TableType.USER:
      return userColumns;
    case TableType.ROLE:
      return roleColumns;
    default:
      return categoryColumns;
  }
};
