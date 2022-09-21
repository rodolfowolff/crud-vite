import { Link } from "react-router-dom";

export default function NoMatch() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>404, Pagina não encontrada!</h2>
      <p>
        <Link to="/">Voltar para pagina inicial</Link>
      </p>
    </div>
  );
}
