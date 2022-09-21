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

  const MenuItemLink = styled("a")(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: "7px 16px",
    color: theme.palette.text.primary,
  }));

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
        <MenuItem sx={{ p: 0 }}>
          <Link to={`/products/${id}`}>
            <MenuItemLink>
              <Visibility fontSize="small" sx={{ mr: 2 }} />
              View
            </MenuItemLink>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose}>
          <Edit fontSize="small" sx={{ mr: 2 }} />
          Edit
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
