import { useState } from "react";
import { Link } from "react-router-dom";
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
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import { Close, ArrowForward } from "@mui/icons-material";

interface AddProductDrawerType {
  open: boolean;
  toggle: () => void;
  categories: any;
}

interface ProductData {
  selectCategory: number | string;
  name: string;
  quantity: number | string;
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
  quantity: yup
    .number()
    .min(1, (obj) => showErrors("Nome", obj.value.length, obj.min))
    .required(),
  name: yup
    .string()
    .min(3, (obj) => showErrors("Nome", obj.value.length, obj.min))
    .required(),
});

const defaultValues = {
  selectCategory: "",
  name: "",
  quantity: "",
};

const AddProductDrawer = (props: AddProductDrawerType) => {
  const { open, toggle, categories } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [selectCategory, setSelectCategory] = useState<number | string>("");

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
        createProduct(name: "${values.name}", quantity: ${values.quantity}, categoryId: ${selectCategory})
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
      setSelectCategory("");
      setValue("name", "");
      setValue("quantity", "");
    }
  };

  const handleClose = () => {
    toggle();
    setSelectCategory("");
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
        {categories.length >= 1 ? (
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
                    placeholder="Insira o nome do produto"
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

            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name="quantity"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label="Quantidade"
                    onChange={onChange}
                    placeholder="Insira o nome do produto"
                    error={Boolean(errors.quantity)}
                  />
                )}
              />
              {errors.quantity && (
                <FormHelperText sx={{ color: "error.main" }}>
                  Quantidade não pode ser vazia ou menor que 1
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
                {categories?.map((cat: { id: number; name: string }) => (
                  <MenuItem
                    key={`category-${cat?.name}-${cat?.id}`}
                    value={cat?.id}
                  >
                    {cat?.name}
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
        ) : (
          <>
            <Box sx={{ pl: 1 }}>
              <Typography variant="h6">Nenhuma categoria cadastrada</Typography>
            </Box>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <Link to="/categories" style={{ textDecoration: "none" }}>
                <IconButton
                  size="small"
                  aria-label="redirect"
                  sx={{ color: "text.secondary", mt: 5 }}
                >
                  <Typography variant="h6" sx={{ mr: 1 }}>
                    Criar categoria
                  </Typography>

                  <ArrowForward />
                </IconButton>
              </Link>
            </div>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default AddProductDrawer;
