import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2>Pagina incial</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
