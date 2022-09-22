import { useState, MouseEvent, memo } from "react";
import { Link } from "react-router-dom";
import { useSnackbar, VariantType } from "notistack";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Delete, Visibility, MoreVert, Edit } from "@mui/icons-material";
import { useMutation, useQueryClient } from "react-query";
import { api } from "../../services/api";

function RowOptions({ id }: { id: number | string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const rowOptionsOpen = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleEnqueueSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation(
    async () => {
      const queryString = `mutation{
        deleteProduct(id: ${id})
      }`;
      console.log("queryString: ", queryString);
      const response = await api(queryString);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    }
  );

  const handleDelete = async () => {
    try {
      const dataRegister = await deleteProductMutation.mutateAsync();
      if (dataRegister.errors) {
        let message = "";
        dataRegister.errors.forEach((error: any) => {
          message += error.message;
        });
        handleEnqueueSnackbar(message, "warning");
        return;
      }
      handleEnqueueSnackbar("Produto desativado", "success");
    } catch {
      handleEnqueueSnackbar("Erro tente novamente mais tarde", "error");
    } finally {
      handleRowOptionsClose();
    }
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
