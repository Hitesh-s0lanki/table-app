"use client";

import {
  Category,
  columnsType,
  dataTableColumnType,
  Product,
  Profile,
  Project,
  SubCategory,
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
import { axiosBase, SERVER_URI } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEditCategoryModal } from "@/hooks/use-edit-category";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEditSubCategoryModal } from "@/hooks/use-edit-subcategory";
import Image from "next/image";
import { useEditTaskModal } from "@/hooks/use-edit-tasks";
import ProfileImage from "./common/profile-image";

export const Columns: (
  table: TableType,
  data?: dataTableColumnType
) => columnsType = (table: TableType, data?: dataTableColumnType) => {
  const router = useRouter();
  const user = useCurrentUser();
  const { onOpen: handleCategoryEdit } = useEditCategoryModal();
  const { onOpen: handleSubCategoryEdit } = useEditSubCategoryModal();
  const { onOpen: handleTaskEdit } = useEditTaskModal();

  const categoryColumns: ColumnDef<Category>[] = [
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
      accessorKey: "subcategories",
      header: "SubCategories",
      cell: ({ row }) => (
        <div className=" text-center w-[100px]">
          {row.getValue("subcategories")
            ? (row.getValue("subcategories") as SubCategory[]).length
            : 0}
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
                <CassetteTape className="h-4 w-4 mr-2" />
                SubCategories
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleCategoryEdit(category)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <ConfirmModal
                onConfirm={() => {
                  const promise = axiosBase(user?.token!)
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

  const subCategoryColumns: ColumnDef<SubCategory>[] = [
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
      accessorKey: "category",
      header: "Category",
      cell: ({ row }: any) => (
        <div className=" text-center w-[100px]">
          {(row.getValue("category") as Category)
            ? (row.getValue("category") as Category).name
            : (data as Category)?.name}
        </div>
      ),
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => (
        <div className=" text-center w-[100px]">
          {row.getValue("products")
            ? (row.getValue("products") as SubCategory[]).length
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
                <ShoppingCart className="h-4 w-4 mr-2" />
                Products
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
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className=" text-center w-[100px]">$ {row.getValue("price")}</div>
      ),
    },
    {
      accessorKey: "Tags",
      header: "Tags",
      cell: ({ row }) => (
        <div className="">{(row.getValue("Tags") as string[]).join(" , ")}</div>
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
      accessorKey: "tasks",
      header: "Tasks no.",
      cell: ({ row }) => (
        <div className="">{(row.getValue("tasks") as Task[]).length}</div>
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
                onClick={() => router.push(`/projects/${product.id}`)}
              >
                <CassetteTape className="h-4 w-4 mr-2" />
                show more
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <ConfirmModal
                onConfirm={() => {
                  const promise = axiosBase(user?.token!)
                    .patch(`${SERVER_URI}/projects/${product.id}`, {
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
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className=" capitalize">{row.getValue("title")}</div>
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
      header: "Status",
      cell: ({ row }) => <div className="">{row.getValue("status")}</div>,
    },
    {
      accessorKey: "members",
      header: "Members",
      cell: ({ row }) => (
        <div className="flex flex-row gap-1">
          {(row.getValue("members") as User[]).map((user) => (
            <ProfileImage key={user.id} name={user.UserName} />
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
                <CassetteTape className="h-4 w-4 mr-2" />
                show more
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
    default:
      return categoryColumns;
  }
};
