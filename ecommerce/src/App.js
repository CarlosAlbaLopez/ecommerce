import Inicio from "./pages/Inicio";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Articulo from "./pages/Articulo";

function App() {
  return (
    <Router>
      <div className="App"></div>
      <Switch>
        <Route exact path="/">
          <Inicio />
        </Route>
        <Route path="/articles/:id">
          <Articulo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
