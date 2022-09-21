import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface TableHeaderProps {
  toggle: () => void;
  categories: any;
}

const TableHeader = (props: TableHeaderProps) => {
  const { toggle, categories } = props;
  const [category, setCategory] = useState("");

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <FormControl sx={{ mb: 2, width: 320 }}>
        <InputLabel id="select-category">Categoria</InputLabel>
        <Select
          labelId="select-category"
          id="select-category"
          value={category}
          label="Categoria"
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="">
            <em>Todas</em>
          </MenuItem>
          {categories?.map((cat: any) => (
            <MenuItem key={cat?.name} value={cat?.id}>
              {cat?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        size="large"
        onClick={toggle}
        endIcon={<AddShoppingCartIcon />}
        sx={{ mb: 2, width: 320, height: 60 }}
      >
        Adicionar produto
      </Button>
    </Box>
  );
};

export default TableHeader;
