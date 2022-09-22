import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getProductsQuery } from "../../services/products/getAllProducts";
import { getCategoriesQuery } from "../../services/categories/getAllCategories";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import TableHeader from "../../components/TableHeader";
import AddProductDrawer from "../../components/Drawer/AddProductDrawer";
import RowOptions from "../../components/Table/RowOptions";
import FallbackSpinner from "../../components/Spinner";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ProductProps {
  id: number;
  name: string;
  code: string;
  category: {
    name: string;
  };
  createdAt: string;
}

interface CellType {
  row: ProductProps;
}

export default function PageProducts() {
  const { data: dataProductsQuery, isLoading, isError } = getProductsQuery();
  const {
    data: dataCategoriesQuery,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = getCategoriesQuery();
  const [columns, setColumns] = useState<any>([]);
  const [rows, setRows] = useState<GridColDef[]>();
  const [addProductOpen, setAddProductOpen] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState([]);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    if (!isLoading && !isError) {
      if (dataProductsQuery.data.getAllProducts.total >= 1) {
        const getProduct = dataProductsQuery.data.getAllProducts.products.map(
          (prod: any) => prod
        );

        const productColName = Object.keys(getProduct[0]).map((col) => {
          return {
            field: col,
            headerName: col[0].toUpperCase() + col.slice(1),
            width: col.length * 30,
            flex: 0.1,
            minWidth: 30,
          };
        });
        productColName.push({
          flex: 0.1,
          width: 30,
          minWidth: 30,
          //@ts-ignore
          sortable: false,
          field: "actions",
          headerName: "Actions",
          renderCell: ({ row }: CellType) => <RowOptions id={row.id} />,
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
        setColumns(productColName);
        setRows(rows1);
      } else {
        setColumns([]);
        setRows([]);
      }
    }
  }, [isLoading, isError, dataProductsQuery]);

  useEffect(() => {
    if (!isLoadingCategories && !isErrorCategories) {
      setCategoryData(dataCategoriesQuery.getAllCategories.categories);
    }
  }, [isLoadingCategories, isErrorCategories, dataCategoriesQuery]);

  const toggleAddProductDrawer = () => setAddProductOpen(!addProductOpen);

  if (isLoading || isLoadingCategories) return <FallbackSpinner />;
  if (isError || isErrorCategories) return <>Error(:</>;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TableHeader toggle={toggleAddProductDrawer} />
        <AddProductDrawer
          open={addProductOpen}
          toggle={toggleAddProductDrawer}
          categories={categoryData || []}
        />

        {columns?.length && rows?.length ? (
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            sx={{
              m: 2,
            }}
            disableSelectionOnClick
            pageSize={pageSize}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50]}
          />
        ) : (
          <Box sx={{ pl: 9 }}>
            <Typography variant="h6">Nenhum produto cadastrado</Typography>
          </Box>
        )}

        <Box
          sx={{
            alignItems: "center",
            justifyItems: "center",
            paddingX: 9,
            mt: 5,
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "purple",
            }}
          >
            <ArrowBackIcon
              sx={{
                cursor: "pointer",
              }}
            />
            Retornar a pagina inicial
          </Link>
        </Box>
      </Box>
    </>
  );
}
