import CardStats from "../../components/CardStats";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

export default function Home() {
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
        spacing={1}
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Grid item xs={12} sm={6} md={3} sx={{ order: 0 }}>
          <CardStats
            stats="12"
            title="PRODUTOS"
            subtitle="Total de produtos"
            to="/products"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ order: 0 }}>
          <CardStats
            stats="95"
            title="CATEGORIAS"
            subtitle="Total de categorias"
            to="/categories"
          />
        </Grid>
      </Grid>
    </>
  );
}
