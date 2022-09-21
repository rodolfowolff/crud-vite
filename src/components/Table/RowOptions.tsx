import { Link } from "react-router-dom";
import { IconButton, Menu, MenuItem, styled } from "@mui/material";
import { useState, MouseEvent, memo } from "react";
import { Delete, Visibility, MoreVert, Edit } from "@mui/icons-material";

function RowOptions({ id }: { id: number | string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // chamar funcao de deletar Produto passando o id
    handleRowOptionsClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleRowOptionsClick}>
        <MoreVert />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{ style: { minWidth: "8rem" } }}
      >
        <MenuItem>
          <Link
            to={`/products/${id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Visibility fontSize="small" sx={{ mr: 2 }} />
            Ver
          </Link>
        </MenuItem>

        <MenuItem onClick={handleRowOptionsClose}>
          <Link
            to={`/products/edit/${id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Edit fontSize="small" sx={{ mr: 2 }} />
            Editar
          </Link>
        </MenuItem>

        <MenuItem onClick={handleDelete}>
          <Delete fontSize="small" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default memo(RowOptions);
