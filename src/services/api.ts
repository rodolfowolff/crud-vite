import axios from "axios";

export async function api(query: any) {
  const responseGraphql = await axios({
    url: import.meta.env.VITE_PUBLIC_API,
    method: "post",
    data: {
      query: `${query}`,
    },
  });
  return responseGraphql;
}
