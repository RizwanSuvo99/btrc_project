import "@fortawesome/fontawesome-free/css/all.min.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import config from "./authServices/auth0/auth0Config.json";
import { Auth0Provider } from "./authServices/auth0/auth0Service";
import Spinner from "./components/core/spinner/Fallback-spinner";
import "./index.scss";
import { store } from "./redux/storeConfig/store";
import * as serviceWorker from "./serviceWorker";
import { Layout } from "./utility/context/Layout";
// const LazyApp = lazy(() => import("./App"))
import App from "./App";

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin + process.env.REACT_APP_PUBLIC_PATH}
  >
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <Layout>
          <App />
        </Layout>
      </Suspense>
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
