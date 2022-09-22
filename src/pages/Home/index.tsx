import CardStats from "../../components/CardStats";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import {
  getTotalCategoriesQuery,
  getTotalProductsQuery,
} from "../../services/getTotalProductCategory";

export default function Home() {
  const {
    data: totalCategoriesQuery,
    isLoading,
    isError,
  } = getTotalCategoriesQuery();
  const {
    data: totalProductsQuery,
    isLoading: isLoadingTotalProducts,
    isError: isErrorTotalProducts,
  } = getTotalProductsQuery();

  if (isLoading || isLoadingTotalProducts) return <>Loading...</>;
  if (isError || isErrorTotalProducts) return <>Error(:</>;

  return (
    <>
      <Card
        sx={{
          position: "relative",
          overflow: "visible",
          mt: { xs: 0, sm: 7.5, md: 0 },
        }}
      >
        <CardContent
          sx={{
            p: (theme) => `${theme.spacing(8.25, 7.5, 6.25, 7.5)} !important`,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" sx={{ mb: 6.5 }}>
                Seja bem vindo{" "}
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  ao sistema de produtos
                </Box>
                ! 🎉🎉🎉
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Grid
        container
        spacing={4}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 5,
        }}
      >
        <Grid item xs={12} sm={6} md={3} sx={{ order: 0 }}>
          <CardStats
            stats={totalProductsQuery?.data?.getAllProducts?.total}
            title="PRODUTOS"
            to="/products"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ order: 0 }}>
          <CardStats
            stats={totalCategoriesQuery?.getAllCategories?.total}
            title="CATEGORIAS"
            to="/categories"
          />
        </Grid>
      </Grid>
    </>
  );
}
