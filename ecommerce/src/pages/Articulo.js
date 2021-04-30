import { useParams } from "react-router-dom";
import useRemoteArticlesById from "../hooks/useRemoteArticlesById";

export default function Articulo() {
  const props = useParams();
  const [article] = useRemoteArticlesById(props.id);
  console.log(article);
  console.log(article.foto);
  console.log(article.foto1);
  return (
    <div>
      {article.map((articulo) => {
        return (
          <div key={articulo.id} className="fullContainer">
            <div className="gridContainer">
              <img src={articulo.foto1} alt="foto"></img>
            </div>
            <div>{articulo.titulo}</div>
            <div>{articulo.precio}</div>
          </div>
        );
      })}
    </div>
  );
}
