import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BackdropSimple from "./components/BackdropSimple";
import Header from "./components/Header";
import VerifyEmail from "./components/VerifyEmail";
import PrivateRouter from "./Layouts/PrivateRouter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Register from "./pages/Register";
import { checkToken } from "./redux/action";
import history from "./utils/history";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkToken(token));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/verify-email" component={VerifyEmail} exact />

          <PrivateRouter path="/post" component={Post} exact />
        </Switch>
      </Router>
      <BackdropSimple />
      <ToastContainer />
    </div>
  );
}

export default App;
