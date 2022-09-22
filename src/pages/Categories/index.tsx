import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { getCategoriesQuery } from "../../services/categories/getAllCategories";
import { Category } from "@mui/icons-material";
import AddCategoryDrawer from "../../components/Drawer/AddCategoryDrawer";
import FallbackSpinner from "../../components/Spinner";

export default function PageCategories() {
  const {
    data: dataCategoriesQuery,
    isLoading,
    isError,
  } = getCategoriesQuery();
  const [addCategoryOpen, setAddCategoryOpen] = useState<boolean>(false);

  const toggleAddCategoryDrawer = () => setAddCategoryOpen(!addCategoryOpen);

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
          variant="body1"
          sx={{ mr: 2, fontWeight: 600, color: "text.primary" }}
        >
          {`Total de categoria:  ${dataCategoriesQuery?.getAllCategories?.total}`}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={toggleAddCategoryDrawer}
          endIcon={<Category />}
          sx={{ mb: 2, width: 320, height: 60 }}
        >
          Adicionar categoria
        </Button>
      </Box>

      <Box sx={{ mt: 5, display: "flex", alignItems: "center", paddingX: 10 }}>
        <List
          sx={{
            width: "100%",
            maxWidth: 660,
            position: "relative",
            overflow: "auto",
          }}
        >
          {dataCategoriesQuery?.getAllCategories?.categories?.map(
            (cat: { id: number; name: string }) => (
              <Box key={`cat-${cat.name}-${cat.id}`}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="h6"
                      >
                        {cat.id}
                      </Typography>
                    }
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    secondary={
                      <Typography variant="body2">{cat.name}</Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </Box>
            )
          )}
        </List>
      </Box>
      <AddCategoryDrawer
        open={addCategoryOpen}
        toggle={toggleAddCategoryDrawer}
      />
    </>
  );
}
