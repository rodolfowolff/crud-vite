import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Card, Grid, Typography } from "@mui/material";
import { getCategoriesQuery } from "../../services/categories/getAllCategories";

interface CategoryProps {
  name: string;
}

export default function PageCategories() {
  const {
    data: dataCategoriesQuery,
    isLoading,
    isError,
  } = getCategoriesQuery();
  const [columns, setColumns] = useState<GridColDef[]>();
  const [rows, setRows] = useState<GridColDef[]>();

  useEffect(() => {
    if (!isLoading && !isError) {
      const getCategories = dataCategoriesQuery.categories.map(
        (cat: CategoryProps) => cat
      );

      const column = [
        {
          flex: 0.2,
          minWidth: 250,
          field: "name",
          headerName: "Nome",
          renderCell: ({ row }: any) => {
            return (
              <Typography noWrap variant="body2">
                {row.name}
              </Typography>
            );
          },
        },
      ];

      const rows1 = getCategories.map((row: CategoryProps, index: number) => {
        return {
          id: index,
          name: row.name,
        };
      });
      setColumns(column);
      setRows(rows1);
    }
  }, [isLoading, isError, dataCategoriesQuery]);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error(:</>;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          {!isLoading && !isError && columns?.length && rows?.length && (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
