import useRemoteArticles from "../hooks/useRemoteArticles";
import ShowArticles from "../pages/ShowArticles";

function Inicio() {
  const [articles] = useRemoteArticles([]);

  return (
    <div>
      <nav>
        <img alt="logo"></img>
        <div className="menu-icons">
          <ul>
            <li>Inicio</li>
            <li>Contacto</li>
            <li>Iniciar Sesión</li>
            <li>Registro</li>
          </ul>
        </div>
      </nav>

      <div className="filtros"></div>

      <div className="galeria">
        <div className="listOfArticles">
          {articles.map((articulo) => {
            return (
              <ShowArticles
                key={articulo.id}
                id={articulo.id}
                descripcion={articulo.descripcion}
                titulo={articulo.titulo}
                precio={articulo.precio}
                foto1={articulo.foto1}
                // idUsuario={usuario.id}
              />
            );
          })}
        </div>
      </div>

      <div className="footer"></div>
    </div>
  );
}
export default Inicio;
