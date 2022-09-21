import { useState, useEffect } from "react";

import { getProductsQuery } from "../../services/products/getAllProducts";
import { getCategoriesQuery } from "../../services/categories/getAllCategories";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import TableHeader from "../../components/TableHeader";
import SidebarAddProductDrawer from "../../components/Drawer";

interface ProductProps {
  id: number;
  name: string;
  code: string;
  category: {
    name: string;
  };
  createdAt: string;
}

export default function PageProducts() {
  const { data: dataProductsQuery, isLoading, isError } = getProductsQuery();
  const {
    data: dataCategoriesQuery,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = getCategoriesQuery();
  const [columns, setColumns] = useState<GridColDef[]>();
  const [rows, setRows] = useState<GridColDef[]>();
  const [addProductOpen, setAddProductOpen] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (!isLoading && !isError) {
      const getProduct = dataProductsQuery.products.map((prod: any) => prod);

      const column = Object.keys(getProduct[0]).map((col) => {
        return {
          field: col,
          headerName: col[0].toUpperCase() + col.slice(1),
          width: col.length * 30,
          flex: 0.1,
          minWidth: 150,
        };
      });

      const rows1 = getProduct.map((row: ProductProps) => {
        return {
          id: row.id,
          name: row.name,
          code: row.code,
          createdAt: row.createdAt,
          category: row.category.name,
        };
      });
      setColumns(column);
      setRows(rows1);
    }
  }, [isLoading, isError, dataProductsQuery]);

  useEffect(() => {
    if (!isLoadingCategories && !isErrorCategories) {
      setCategoryData(dataCategoriesQuery.categories);
    }
  }, [isLoadingCategories, isErrorCategories, dataCategoriesQuery]);

  const toggleAddProductDrawer = () => setAddProductOpen(!addProductOpen);

  if (isLoading || isLoadingCategories) return <>Loading...</>;
  if (isError || isErrorCategories) return <>Error(:</>;

  return (
    <>
      {!isLoading && !isError && columns?.length && rows?.length && (
        <Box sx={{ width: "100%" }}>
          <TableHeader
            toggle={toggleAddProductDrawer}
            categories={categoryData}
          />
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            sx={{
              m: 2,
            }}
            disableSelectionOnClick
          />
          {!isLoadingCategories && !isErrorCategories && (
            <SidebarAddProductDrawer
              open={addProductOpen}
              toggle={toggleAddProductDrawer}
              categories={categoryData}
            />
          )}
        </Box>
      )}
    </>
  );
}
