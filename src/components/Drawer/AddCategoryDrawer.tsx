import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar, VariantType } from "notistack";

import { api } from "../../services/api";

import {
  Drawer,
  Button,
  TextField,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import Close from "@mui/icons-material/Close";

interface AddCategoryDrawerType {
  open: boolean;
  toggle: () => void;
  // categories: any;
}

interface CategoryData {
  category: string;
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
  category: yup
    .string()
    .min(3, (obj) => showErrors("Categoria", obj.value.length, obj.min))
    .required(),
});

const defaultValues = {
  category: "",
};

const AddCategoryDrawer = (props: AddCategoryDrawerType) => {
  const { open, toggle } = props;
  const { enqueueSnackbar } = useSnackbar();

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

  const createCategoryMutation = useMutation(
    async (values: CategoryData) => {
      const queryString = `mutation{
        createCategory(name: "${values.category}")
      }`;
      const response = await api(queryString);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
      },
    }
  );

  const handleEnqueueSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  const onSubmitAddCategory = async (data: CategoryData) => {
    try {
      const dataRegister = await createCategoryMutation.mutateAsync(data);
      if (dataRegister.errors) {
        let message = "";
        dataRegister.errors.forEach((error: any) => {
          message += error.message;
        });
        handleEnqueueSnackbar(message, "warning");
        return;
      }
      handleEnqueueSnackbar(dataRegister.data.createCategory, "success");
    } catch {
      handleEnqueueSnackbar("Erro tente novamente mais tarde", "error");
    } finally {
      toggle();
    }
  };

  const handleClose = () => {
    toggle();
    setValue("category", "");
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
          Adicionar categoria
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
          onSubmit={handleSubmit(onSubmitAddCategory)}
        >
          <FormControl fullWidth sx={{ mb: 4 }}>
            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label="Nome"
                  onChange={onChange}
                  placeholder="Insira o nome da categoria"
                  error={Boolean(errors.category)}
                />
              )}
            />
            {errors.category && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.category.message}
              </FormHelperText>
            )}
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

export default AddCategoryDrawer;
