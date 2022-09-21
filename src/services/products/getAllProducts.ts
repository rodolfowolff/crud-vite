import { useQuery } from "react-query";
import { api } from "../api";

export function getProductsQuery() {
  return useQuery(["products"], async () => {
    const queryString = `query {
        getAllProducts {
          products {
            id
            name
            code
            createdAt
            category {
              name
            }
          }
          total
        }
      }`;

    const response = await api(queryString);

    return response.data.data.getAllProducts;
  });
}
