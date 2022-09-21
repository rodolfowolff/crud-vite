import { useQuery } from "react-query";
import { api } from "../api";

export function getCategoriesQuery() {
  return useQuery(["categories"], async () => {
    const queryString = `query {
        getAllCategories {
          categories {
            id
            name
          }
          total
        }
      }`;

    const response = await api(queryString);

    return response.data.data.getAllCategories;
  });
}
