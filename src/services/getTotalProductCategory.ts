import { useQuery } from "react-query";
import { api } from "./api";

export function getTotalCategoriesQuery() {
  return useQuery(["totalcategories"], async () => {
    const queryString = `query {
        getAllCategories {
          total
        }
      }`;
    const response = await api(queryString);
    return response.data.data;
  });
}

export function getTotalProductsQuery() {
  return useQuery(["totalproducts"], async () => {
    const queryString = `query {
        getAllProducts {
          total
        }
      }`;
    const response = await api(queryString);
    return response.data;
  });
}
