import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { useSnackbar, VariantType } from "notistack";

import { api } from "../../services/api";
import { getProductByID } from "../../services/products/getProductByID";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface ProductData {
  selectCategory: string;
  name: string;
}

export default function PageProductEdit() {
  let { id } = useParams<"id">();
  const { enqueueSnackbar } = useSnackbar();
  const { data: dataProduct, isLoading, isError } = getProductByID({ id });
  const [selectCategory, setSelectCategory] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleEnqueueSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  const queryClient = useQueryClient();

  const updateProductMutation = useMutation(
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

  const onSubmitEditProduct = async (data: ProductData) => {
    console.log("data: ", data);
    // try {
    //   const dataRegister = await updateProductMutation.mutateAsync(data);
    //   if (dataRegister.errors) {
    //     let message = "";
    //     dataRegister.errors.forEach((error: any) => {
    //       message += error.message;
    //     });
    //     handleEnqueueSnackbar(message, "warning");
    //     return;
    //   }
    //   handleEnqueueSnackbar("Produto atualizado", "success");
    // } catch {
    //   handleEnqueueSnackbar("Erro tente novamente mais tarde", "error");
    // }
  };

  const handleCancelUpdate = () => {
    console.log("retornar a pagina de produtos");
  };

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error(:</>;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>Detalhes do produto {id}</h2>
      {/* 
      <p>{dataProduct.data.getProductByID.name}</p>
      <p>{dataProduct.data.getProductByID.code}</p>
      <p>{dataProduct.data.getProductByID.createdAt}</p>
      <p>{dataProduct.data.getProductByID.category.name}</p>
      <p>
        <Link to="/products">Retornar a lista de produtos</Link>
      </p> */}

      <Box sx={{ p: 5 }}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitEditProduct)}
        >
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <TextField
                  value={dataProduct.data.getProductByID.name}
                  label="Nome"
                  onChange={onChange}
                  placeholder="Teclado"
                  error={Boolean(errors.name)}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name="selectCategory"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <TextField
                  value={dataProduct.data.getProductByID.category.name}
                  label="Nome"
                  onChange={onChange}
                  placeholder="Teclado"
                  error={Boolean(errors.selectCategory)}
                />
              )}
            />
          </FormControl>

          {/* <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id="selectCategory">Selecione a categoria</InputLabel>
            <Select
              fullWidth
              value={selectCategory}
              id="selectCategory"
              label="Selecione a categoria"
              labelId="selectCategory"
              onChange={(e) => setSelectCategory(e.target.value)}
              inputProps={{ placeholder: "Selecione a categoria" }}
              // defaultValue='admin'
            >
              {categories.map((cat: any) => (
                <MenuItem key={cat.name} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                size="large"
                variant="contained"
                color="inherit"
                sx={{ mr: 5 }}
              >
                Cancelar
              </Button>
            </Link>
            <Button size="large" type="submit" variant="contained">
              Adicionar
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
}
