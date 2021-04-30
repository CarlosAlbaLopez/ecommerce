import { Link } from "react-router-dom";

export default function ShowArticles(props) {
  return (
    <Link to={`/articles/${props.id}`} params={props}>
      <div className="fullContainer">
        <div className="gridContainer">
          <img src={props.foto1} alt="foto"></img>
        </div>
        <div>{props.titulo}</div>
        <div>{props.precio}</div>
      </div>
    </Link>
  );
}
