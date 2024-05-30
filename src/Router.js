import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import Spinner from "./components/core/spinner/Loading-spinner";
import { history } from "./history";
import { ContextLayout } from "./utility/context/Layout";

import { ToastProvider } from "react-toast-notifications";
import "./assets/CoustomStyle/pageView.css";
import "./assets/CoustomStyle/style.css";

// Authentication Checking
const token = localStorage.getItem("userInfo");
const isAuth = token != null ? true : false;

// Route-based code splitting
const analyticsDashboard = lazy(() =>
  import("./views/dashboard/analytics/AnalyticsDashboard")
);

const forgotPassword = lazy(() =>
  import("./views/pages/authentication/ForgotPassword")
);
// const lockScreen = lazy(() =>
//   import("./views/pages/authentication/LockScreen")
// );
// const resetPassword = lazy(() =>
//   import("./views/pages/authentication/ResetPassword")
// );
// const StudentRegister = lazy(() =>
//   import("./views/pages/authentication/register/StudentRegister")
// );
// const ConsultantRegister = lazy(() =>
//   import("./views/pages/authentication/register/ConsultantRegister")
// );
// const ProviderRegister = lazy(() =>
//   import("./views/pages/authentication/register/ProviderRegister")
// );

const notFound = lazy(() => import("./views/pages/misc/error/404"));
const BadRequest = lazy(() => import("./views/pages/misc/error/400"));

const BTRCLogin = lazy(() =>
  import("./views/pages/authentication/login/BTRCLogin")
);

const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      <>
        {isAuth ? (
          <>
            <Router history={history}>
              <ToastProvider autoDismiss={true}>
                <Switch>
                  <AppRoute exact path="/" component={analyticsDashboard} />
                  <AppRoute path="/400" component={BadRequest} fullLayout />
                  <AppRoute component={notFound} fullLayout />
                </Switch>
              </ToastProvider>
            </Router>
          </>
        ) : (
          <>
            <Router history={history}>
              <ToastProvider autoDismiss={true}>
                <Switch>
                  <AppRoute exact path="/" component={BTRCLogin} fullLayout />
                  {/* 
                  <AppRoute
                    path="/studentRegister"
                    component={StudentRegister}
                    fullLayout
                  />
                  <AppRoute
                    path="/consultantRegister"
                    component={ConsultantRegister}
                    fullLayout
                  />
                  <AppRoute
                    path="/providerRegister"
                    component={ProviderRegister}
                    fullLayout
                  /> */}

                  <AppRoute
                    path="/pages/forgot-password"
                    component={forgotPassword}
                    fullLayout
                  />
                  {/* <AppRoute
                    path="/pages/lock-screen"
                    component={lockScreen}
                    fullLayout
                  />
                  <AppRoute
                    path="/pages/reset-password"
                    component={resetPassword}
                    fullLayout
                  />

                  <AppRoute
                    path="*"
                    exact
                    component={() => <Redirect to="/" />}
                  /> */}
                </Switch>
              </ToastProvider>
            </Router>
          </>
        )}
      </>
    );
  }
}

export default AppRouter;
