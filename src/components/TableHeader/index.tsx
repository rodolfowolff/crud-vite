import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface TableHeaderProps {
  toggle: () => void;
}

const TableHeader = (props: TableHeaderProps) => {
  const { toggle } = props;

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "end",
        width: "100%",
      }}
    >
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
