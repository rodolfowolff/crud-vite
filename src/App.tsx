import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import CustomMenu from "./components/Menu";
import Home from "./pages/Home";
import PageProducts from "./pages/Products";
import PageProductDetail from "./pages/PageProductDetail";
import PageCategories from "./pages/Categories";
import NoMatch from "./pages/404";
import PageProductEdit from "./pages/PageProductEdit";

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <CustomMenu>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<PageProducts />} />
          <Route path="products/:id" element={<PageProductDetail />} />
          <Route path="products/edit/:id" element={<PageProductEdit />} />
          <Route path="categories" element={<PageCategories />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </CustomMenu>
    </SnackbarProvider>
  );
}
