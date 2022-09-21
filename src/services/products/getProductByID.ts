import { useQuery } from "react-query";
import { api } from "../api";

export function getProductByID({ id }: { id: string | undefined }) {
  const productIdNumber = Number(id);
  return useQuery(["product", productIdNumber], async () => {
    const queryString = `query {
      getProductByID(id: ${productIdNumber}) {
        id
        name
        code
        createdAt
        category {
          id
          name
        }
      }
    }`;

    const response = await api(queryString);

    return response.data;
  });
}
