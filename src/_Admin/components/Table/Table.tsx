import "./Table.css";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowData,
  useReactTable,
} from "@tanstack/react-table";

type Props = {
  tableData: RowData[];
  columnsSetup: ColumnDef<RowData>[];
  navigateUrl?: string;
  initialSort?: { id: string; desc: boolean }[];
};

export const Table: FC<Props> = ({
  tableData,
  navigateUrl,
  columnsSetup,
  initialSort,
}) => {
  const [columnFilters, setColumnFilters] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: tableData || [],
    columns: columnsSetup,
    initialState: {
      sorting: initialSort || [],
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      pagination: pagination,
      globalFilter: columnFilters,
    },
  });

  return (
    <>
      <div className="table-extra">
        <div className="table-extra__pagination">
          <Button
            style={{ border: "1px solid black" }}
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            style={{ border: "1px solid black" }}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            style={{ border: "1px solid black" }}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            style={{ border: "1px solid black" }}
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
          Станица {table.getState().pagination.pageIndex + 1} из{" "}
          {table.getPageCount()}
        </div>
        <TextField
          label="Поиск"
          variant="outlined"
          className="table-extra__search"
          value={columnFilters}
          onChange={(e) => setColumnFilters(e.target.value)}
        />
      </div>
      <div className="table-list">
        {table.getHeaderGroups().map((headerGroup) => (
          <div key={headerGroup.id} className="t-head">
            {headerGroup.headers.map((header) => (
              <div key={header.id} className="th">
                {String(header.column.columnDef.header)}
                {header.column.getCanSort() && (
                  <>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ padding: "0", float: "right", minWidth: "25px" }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <p>
                        {header.column.getIsSorted() === "asc"
                          ? "↑"
                          : header.column.getIsSorted() === "desc"
                          ? "↓"
                          : "↔"}
                      </p>
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
        {table.getRowModel().rows.map((row) => (
          <div key={row.id} className="tr">
            {row.getVisibleCells().map((cell) => (
              <Link
                key={cell.id}
                className="td"
                id="td"
                to={
                  navigateUrl
                    ? //@ts-expect-error Id will be from tableData
                      `${navigateUrl}/${cell.getContext().row?.original?.id}`
                    : ""
                }
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
