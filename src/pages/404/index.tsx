import { Link } from "react-router-dom";

export default function NoMatch() {
  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>404, Pagina não encontrada!</h2>

      <div>
        <Link
          to="/"
          onClick={preventDefault}
          style={{ textDecoration: "none" }}
        >
          Voltar a pagina inicial
        </Link>
      </div>
    </div>
  );
}
