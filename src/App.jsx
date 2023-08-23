import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Home from "./components/Home";
import Login from "./components/Login";
import Error404 from "./components/Error404";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

export const UserContext = React.createContext({ isLogged: false });

function App() {
  const [isLogged, setIsLogged] = useState(false);
  function setAuth() {
    setIsLogged(!isLogged);
  }
  return (
    <UserContext.Provider value={{ isLogged, setAuth }}>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto px-4 mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link text-white fw-bold fs-2" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white fw-bold fs-2"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="*" component={Error404}></Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
