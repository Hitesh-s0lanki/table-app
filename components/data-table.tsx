"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { dataTableColumnType, dataTableType, TableType } from "@/types";
import TrashComponent from "./trash-component";
import { useCreateCategoryModal } from "@/hooks/use-create-category";
import { useCreateSubCategoryModal } from "@/hooks/use-create-subcategory";
import { Columns } from "./colums";
import { DataTablePagination } from "./data-table-components/data-table-pagination";
import { DataTableToolbar } from "./data-table-components/data-table-toolbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface DataTableProps {
  model?: dataTableColumnType;
  data: any | dataTableType;
  title: string;
  filterColumnName: string;
  createHref: string;
  apiLink: string;
  tableType: TableType;
  description?: string;
  history?: string[];
}

export function DataTable({
  data,
  title,
  filterColumnName,
  createHref,
  apiLink,
  model,
  tableType,
  description,
  history,
}: DataTableProps) {
  const router = useRouter();
  const { onOpen: handleCategoryCreate } = useCreateCategoryModal();
  const { onOpen: handleSubCategoryCreate } = useCreateSubCategoryModal();

  const columns: any = Columns(tableType, model);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="h-full w-full flex flex-col gap-5 p-20">
      <h1 className=" text-xl font-semibold">{title}</h1>
      <div className="w-full space-y-4">
        <DataTableToolbar
          table={table}
          tableType={tableType}
          filterColumnName={filterColumnName}
          onClick={() => {
            if (createHref === "/subcategory/create") {
              handleSubCategoryCreate();
            } else if (createHref === "/category/create") {
              handleCategoryCreate();
            } else {
              router.push(createHref);
            }
          }}
        />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
        <TrashComponent apiLink={apiLink} />
        {description && (
          <Card className="p-2">
            <CardHeader className="p-3">
              <CardTitle className="text-md">Description</CardTitle>
              <CardDescription className="text-sm">
                {description}
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {history && (
          <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
              <CardDescription>
                last five update history of Category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="ml-2 space-y-2">
                {history.slice(-5).map((his, index) => (
                  <p className="text-sm font-normal">
                    {index + 1}. {his}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
