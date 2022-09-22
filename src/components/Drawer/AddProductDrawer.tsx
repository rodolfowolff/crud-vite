import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar, VariantType } from "notistack";

import { api } from "../../services/api";

import {
  Drawer,
  Select,
  Button,
  MenuItem,
  TextField,
  InputLabel,
  Typography,
  FormControl,
  FormHelperText,
  Grid,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import Close from "@mui/icons-material/Close";

interface AddProductDrawerType {
  open: boolean;
  toggle: () => void;
  categories: any;
}

interface ProductData {
  selectCategory: string;
  name: string;
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} é obrigatório`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} no mínimo ${min} letras`;
  } else {
    return "";
  }
};

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(3, 4),
  justifyContent: "space-between",
  backgroundColor: theme.palette.primary.main,
}));

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, (obj) => showErrors("Nome", obj.value.length, obj.min))
    .required(),
});

const defaultValues = {
  selectCategory: "",
  name: "",
};

const AddProductDrawer = (props: AddProductDrawerType) => {
  const { open, toggle, categories } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [selectCategory, setSelectCategory] = useState(1);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  const createProductMutation = useMutation(
    async (values: ProductData) => {
      const queryString = `mutation{
        createProduct(name: "${values.name}", categoryId: ${selectCategory})
      }`;
      const response = await api(queryString);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    }
  );

  const handleEnqueueSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  const onSubmitAddProduct = async (data: ProductData) => {
    try {
      const dataRegister = await createProductMutation.mutateAsync(data);
      if (dataRegister.errors) {
        let message = "";
        dataRegister.errors.forEach((error: any) => {
          message += error.message;
        });
        handleEnqueueSnackbar(message, "warning");
        return;
      }
      handleEnqueueSnackbar(dataRegister.data.createProduct, "success");
    } catch {
      handleEnqueueSnackbar("Erro tente novamente mais tarde", "error");
    } finally {
      toggle();
      setSelectCategory(1);
      setValue("name", "");
    }
  };

  const handleClose = () => {
    toggle();
    setSelectCategory(0);
  };

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": { width: { xs: 300, sm: 400 } },
      }}
      PaperProps={{
        sx: {
          backgroundColor: "whitesmoke",
          color: "primary",
        },
      }}
    >
      <Header>
        <Typography variant="h6" color="white">
          Adicionar produto
        </Typography>
        <Close
          onClick={handleClose}
          sx={{ cursor: "pointer", color: "white" }}
        />
      </Header>
      <Box sx={{ p: 5 }}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitAddProduct)}
        >
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label="Nome"
                  onChange={onChange}
                  placeholder="Teclado"
                  error={Boolean(errors.name)}
                />
              )}
            />
            {errors.name && (
              <FormHelperText sx={{ color: "error.main" }}>
                Nome não pode ser vazio e no minimo 3 letras
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id="selectCategory">Selecione a categoria</InputLabel>
            <Select
              fullWidth
              value={selectCategory}
              id="selectCategory"
              label="Selecione a categoria"
              labelId="selectCategory"
              onChange={(e) => setSelectCategory(e.target.value as number)}
              inputProps={{ placeholder: "Selecione a categoria" }}
            >
              {categories.map((cat: any) => (
                <MenuItem key={cat.name} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button
              size="large"
              variant="contained"
              color="inherit"
              onClick={handleClose}
              sx={{ mr: 5 }}
            >
              Cancelar
            </Button>
            <Button size="large" type="submit" variant="contained">
              Adicionar
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddProductDrawer;
