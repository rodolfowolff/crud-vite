import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import FallbackSpinner from "../../components/Spinner";
import { getProductByID } from "../../services/products/getProductByID";

export default function PageProductDetail() {
  let { id } = useParams<"id">();
  const { data: dataProduct, isLoading, isError } = getProductByID({ id });

  if (isLoading) return <FallbackSpinner />;
  if (isError) return <>Error(:</>;

  return (
    <>
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
          variant="h6"
          sx={{ mr: 2, fontWeight: 600, color: "text.primary" }}
        >
          {`Detalhes do produto`}
        </Typography>
      </Box>

      <Box sx={{ mt: 1, display: "flex", alignItems: "center", paddingX: 10 }}>
        <List
          sx={{
            width: "100%",
            maxWidth: 660,
            position: "relative",
            overflow: "auto",
          }}
        >
          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="body2">Nome</Typography>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="h6"
                  >
                    {dataProduct.data.getProductByID.name}
                  </Typography>
                </>
              }
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="body2">Código</Typography>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="h6"
                  >
                    {dataProduct.data.getProductByID.code}
                  </Typography>
                </>
              }
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="body2">Categoria</Typography>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="h6"
                  >
                    {dataProduct.data.getProductByID.category.name}
                  </Typography>
                </>
              }
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="body2">Data de criação</Typography>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="h6"
                  >
                    {format(
                      new Date(dataProduct.data.getProductByID.createdAt),
                      "dd/MM/yyyy"
                    )}
                  </Typography>
                </>
              }
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
            />
          </ListItem>
        </List>
      </Box>
      <Link to="/products">Retornar a lista de produtos</Link>
    </>
  );
}
