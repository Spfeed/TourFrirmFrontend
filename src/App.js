import {
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom";
import Home from "./pages/Home";
import Country from "./pages/Country";
import City from "./pages/City";
import About from "./pages/About";
import TourOpers from "./pages/Touropers";
import Registration from "./pages/Registration";
import Tour from "./pages/Tour";
import ToastEvent from "./components/UI/ToastEvent";
import TourCreation from "./pages/TourCreation";
import Cabinet from "./pages/Cabinet";
import History from "./pages/History";
import TourBids from "./pages/TourBids";
import { useSelector, useDispatch } from "react-redux";
import { toastActions } from "./store/toastSlice";
import { authActions } from "./store/authSlice";
import { useEffect } from "react";
import Forbidden from "./pages/Forbidden";
import NotFound from "./pages/NotFound";
import ChatButton from "./components/chatbot/ChatButton";
import Users from "./pages/Users";
import Crud from "./pages/Crud";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    dispatch(authActions.restoreSession());
  }, [dispatch]);

  const checkAuth = (Component) => {
    return (props) => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        return <Component {...props} />;
      } else {
        dispatch(
          toastActions.showToast({
            toastTitle: "Ошибка",
            toastMessage:
              "Войдите в учетную запись для доступа к этой странице",
          })
        );
        return <Redirect to="/home" />;
      }
    };
  };

  const checkAuthAndRedirect = (Component) => {
    return (props) => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userIdFromStorage = JSON.parse(storedUser).id;
        const userIdFromUrl = Number(props.match.params.userId);

        console.log("User ID from storage:", userIdFromStorage);
        console.log("User ID from URL:", userIdFromUrl);

        if (userIdFromStorage === userIdFromUrl) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/forbidden" />;
        }
      } else {
        dispatch(
          toastActions.showToast({
            toastTitle: "Ошибка",
            toastMessage:
              "Войдите в учетную запись для доступа к этой странице",
          })
        );
        return <Redirect to="/home" />;
      }
    };
  };

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
          <ChatButton />
        </Route>
        <Route path="/country/:countryName">
          <Country />
          <ChatButton />
        </Route>
        <Route path="/city/:cityName">
          <City />
          <ChatButton />
        </Route>
        <Route path="/touroperators">
          <TourOpers />
          <ChatButton />
        </Route>
        <Route path="/about">
          <About />
          <ChatButton />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/tour/:tourId">
          <Tour />
        </Route>
        <Route path="/tourcreation" render={checkAuth(TourCreation)} />
        <Route
          path="/cabinet/main/:userId"
          render={checkAuthAndRedirect(Cabinet)}
        />
        <Route
          path="/cabinet/history/:userId"
          render={checkAuthAndRedirect(History)}
        />
        <Route
          path="/cabinet/bids/:userId"
          render={checkAuthAndRedirect(TourBids)}
        />
        <Route
          path="/cabinet/users/:userId"
          render={checkAuthAndRedirect(Users)}
        />
        <Route
          path="/cabinet/crud/:userId"
          render={checkAuthAndRedirect(Crud)}
        />
        <Route path="/:type/create">
          <Create />
        </Route>
        <Route path="/:type/edit/:id">
          <Edit />
        </Route>
        <Route path="/forbidden">
          <Forbidden />
        </Route>
        {/* Добавляем Route для NotFound */}
        <Route path="*">
          {" "}
          {/* Ловим все остальные пути */}
          <NotFound />
        </Route>
      </Switch>
      <ToastEvent />
    </>
  );
}

export default App;
