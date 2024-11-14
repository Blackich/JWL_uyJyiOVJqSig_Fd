import "./Table.css";
import { FC, useState } from "react";
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
import { Button, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  tableData: RowData[];
  columnsSetup: ColumnDef<RowData>[];
  navigateUrl: string;
};

export const Table: FC<Props> = ({ tableData, navigateUrl, columnsSetup }) => {
  const navigate = useNavigate();
  const [columnFilters, setColumnFilters] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  
  const handleClickСell = (id: number) => {
    navigate(`${navigateUrl}/${id}`);
  };

  const table = useReactTable({
    data: tableData || [],
    columns: columnsSetup,
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
        <Input
          type="search"
          className="table-extra__search"
          style={{ marginBottom: "15px" }}
          value={columnFilters}
          onChange={(e) => setColumnFilters(e.target.value)}
        />

        <div className="table-extra__pagination">
          Станица {table.getState().pagination.pageIndex + 1} из{" "}
          {table.getPageCount()}
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
        </div>
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
              <div
                key={cell.id}
                className="td"
                id="td"
                onClick={() =>
                  //@ts-expect-error Id will be from tableData
                  handleClickСell(cell.getContext().row?.original?.id)
                }
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
