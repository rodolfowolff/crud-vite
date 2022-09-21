import { Link, useParams } from "react-router-dom";
import { getProductByID } from "../../services/products/getProductByID";

export default function PageProductDetail() {
  let { id } = useParams<"id">();
  const { data: dataProduct, isLoading, isError } = getProductByID({ id });

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error(:</>;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>Detalhes do produto {id}</h2>

      <p>{dataProduct.data.getProductByID.name}</p>
      <p>{dataProduct.data.getProductByID.code}</p>
      <p>{dataProduct.data.getProductByID.createdAt}</p>
      <p>{dataProduct.data.getProductByID.category.name}</p>
      <p>
        <Link to="/products">Retornar a lista de produtos</Link>
      </p>
    </div>
  );
}
