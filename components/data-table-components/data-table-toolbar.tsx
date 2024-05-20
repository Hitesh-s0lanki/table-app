"use client";

import { PlusCircle, Trash, X } from "lucide-react";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { status } from "@/lib/utils";
import { TableType } from "@/types";
import { useConfirm } from "@/hooks/use-confirm";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  tableType: TableType;
  filterColumnName: string;
  onClick: () => void;
}

export function DataTableToolbar<TData>({
  table,
  tableType,
  filterColumnName,
  onClick,
}: DataTableToolbarProps<TData>) {
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to perform a bulk delete."
  );
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <ConfirmationDialog />
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter ${filterColumnName}s...`}
          value={
            (table.getColumn(filterColumnName)?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn(filterColumnName)
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {tableType === TableType.TASK && table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={status}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        <DataTableViewOptions table={table} />
        <Button
          onClick={onClick}
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex flex-row gap-2 items-center justify-center"
        >
          <PlusCircle className="h-4 w-4 shrink-0" />
          Create new
        </Button>
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button
            disabled={false}
            size="sm"
            variant="outline"
            className="ml-auto hidden h-8 lg:flex flex-row gap-2 items-center justify-center"
            onClick={async () => {
              const ok = await confirm();

              if (ok) {
                // onDelete(table.getFilteredSelectedRowModel().rows);
                table.resetRowSelection();
              }
            }}
          >
            <Trash className=" size-4 shrink-0" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        )}
      </div>
    </div>
  );
}
