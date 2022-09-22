import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar, VariantType } from "notistack";

import { api } from "../../services/api";
import { getProductByID } from "../../services/products/getProductByID";
import { getCategoriesQuery } from "../../services/categories/getAllCategories";

import {
  Box,
  Button,
  DialogActions,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FallbackSpinner from "../../components/Spinner";

interface ProductData {
  categoryId: string;
  name: string;
  quantity: string | number;
}

export default function PageProductEdit() {
  let { id } = useParams<"id">();
  const { enqueueSnackbar } = useSnackbar();
  const { data: dataProduct, isLoading, isError } = getProductByID({ id });
  const {
    data: dataCategoriesQuery,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = getCategoriesQuery();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [values, setValues] = useState<ProductData>({
    categoryId: "",
    name: "",
    quantity: "",
  });

  const {
    control,
    setValue: setFormValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      categoryId: dataProduct?.data?.getProductByID?.category?.name,
      name: dataProduct?.data?.getProductByID?.name,
      quantity: dataProduct?.data?.getProductByID?.quantity,
    },
  });

  const handleEnqueueSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  const queryClient = useQueryClient();

  const updateProductMutation = useMutation(
    async (data: ProductData) => {
      const queryString = `mutation{
        updateProduct(id: ${id}, name: "${data.name}", quantity: ${data.quantity}, categoryId: ${data.categoryId})
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

  const onSubmitEditProduct = async (data: {
    name: string;
    quantity: string | number;
  }) => {
    const { name, quantity } = data;
    const { categoryId } = values;
    const formData = { name, quantity, categoryId };
    try {
      const dataRegister = await updateProductMutation.mutateAsync(formData);
      if (dataRegister.errors) {
        let message = "";
        dataRegister.errors.forEach((error: any) => {
          message += error.message;
        });
        handleEnqueueSnackbar(message, "warning");
        return;
      }
      handleEnqueueSnackbar("Produto atualizado", "success");
    } catch {
      handleEnqueueSnackbar("Erro tente novamente mais tarde", "error");
    } finally {
      setFormValue("name", "");
      setFormValue("quantity", "");
      navigate("/products");
    }
  };

  useEffect(() => {
    if (!isErrorCategories && !isLoadingCategories) {
      setCategoryData(dataCategoriesQuery?.getAllCategories?.categories);
    }
  }, [isLoadingCategories, isErrorCategories, dataCategoriesQuery]);

  if (isLoading || isLoadingCategories) return <FallbackSpinner />;
  if (isError || isErrorCategories) return <>Error(:</>;

  return (
    <Box
      sx={{
        p: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ mb: 2, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Editar produto
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Produto: {dataProduct?.data?.getProductByID?.name}
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Categoria: {dataProduct?.data?.getProductByID?.category?.name}
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Quantidade: {dataProduct?.data?.getProductByID?.quantity}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmitEditProduct)} autoComplete="off">
        <>
          <Grid item sm={6} xs={12}>
            <FormControl sx={{ mb: 6, width: "100%" }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    label="Nome"
                    value={value}
                    onChange={onChange}
                    placeholder={dataProduct?.data?.getProductByID?.name}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormControl sx={{ mb: 6, width: "100%" }}>
              <Controller
                name="quantity"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    label="Quantidade"
                    value={value}
                    onChange={onChange}
                    placeholder={`${dataProduct?.data?.getProductByID?.quantity}`}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormControl sx={{ mb: 6, width: "100%" }}>
              <InputLabel id="categoryId">Categoria</InputLabel>
              <Select
                required={true}
                label="Categoria"
                labelId="categoryId"
                value={values.categoryId}
                onChange={(e) =>
                  setValues({ ...values, categoryId: e.target.value })
                }
              >
                {categoryData?.map((cat: any) => (
                  <MenuItem key={cat.name} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </>

        <DialogActions
          sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: "center" }}
        >
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button
              size="large"
              variant="outlined"
              sx={{ mr: 1 }}
              color="inherit"
            >
              Cancelar
            </Button>
          </Link>
          <Button size="large" type="submit" variant="contained">
            Atualizar
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
}
