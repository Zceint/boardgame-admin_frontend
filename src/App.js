import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
