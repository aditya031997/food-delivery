import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./auth/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./auth/Registration";
import Header from "./admin-panel/Header";
import Home from "./admin-panel/Home";
import PrivateRoutes from "./route/PrivateRouter";
import userData from "./admin-panel/UserData";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Header} />
          <PrivateRoutes path="/home" exact component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoutes path="/users" component={userData} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
