import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { getCategoriesQuery } from "../../services/categories/getAllCategories";
import { Category } from "@mui/icons-material";

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
      const getCategories = dataCategoriesQuery.getAllCategories.categories.map(
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: 10,
        }}
      >
        <Typography
          variant="body1"
          sx={{ mr: 2, fontWeight: 600, color: "text.primary" }}
        >
          {`Total de categoria:  ${dataCategoriesQuery?.getAllCategories?.total}`}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => {
            console.log("toggle");
          }}
          endIcon={<Category />}
          sx={{ mb: 2, width: 320, height: 60 }}
        >
          Adicionar categoria
        </Button>
      </Box>

      <Box sx={{ mt: 1, display: "flex", alignItems: "center", paddingX: 10 }}>
        <List dense sx={{ mb: 1 }}>
          {dataCategoriesQuery?.getAllCategories?.categories?.map(
            (cat: { id: number; name: string }) => {
              return (
                <ListItem
                  key={cat.name}
                  sx={{ px: 0, py: 2, display: "flex", flexWrap: "wrap" }}
                >
                  <ListItemText
                    sx={{ m: 0 }}
                    primary={cat.id}
                    secondary={cat.name}
                  />
                </ListItem>
              );
            }
          )}
        </List>
      </Box>
    </div>
  );
}
