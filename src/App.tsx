import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import CustomMenu from "./components/Menu";
import PageProducts from "./pages/Products";
import PageCategories from "./pages/Categories";

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <CustomMenu>
        <Routes>
          <Route path="/products" element={<PageProducts />} />
          <Route path="/categories" element={<PageCategories />} />
        </Routes>
      </CustomMenu>
    </SnackbarProvider>
  );
}
