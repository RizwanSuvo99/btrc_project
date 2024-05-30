import React from "react";
import { Link } from "react-router-dom";
import { CardBody, Form, FormGroup, Input, Label } from "reactstrap";
// import { loginWithJWT } from "../../../../redux/actions/auth/loginActions"
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { rootUrl } from "../../../../constants/constants";
import { history } from "../../../../history";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    remember: false,
    error: "",
    emailerror: "",
    passwordError: "",
    canNavigate: true,
    progress: false,
    IpAddress: "",
    GeoLocationInfo: "",
  };

  antIcon = (
    <LoadingOutlined
      style={{ fontSize: 35, color: "white", fontWeight: "bold" }}
      spin
    />
  );

  // now working
  handleLogin = (e) => {
    e.preventDefault();
    this.setState({ progress: true });

    const userDetails = {
      email: this.state.email,
      password: this.state.password,
    };

    if (localStorage.getItem("userInfo") == null) {
      axios
        .post(`${rootUrl}auth/login`, userDetails)
        .then((response) => {
          console.log("Response:", response.data);

          localStorage.setItem("userInfo", JSON.stringify(response.data));

          window.location.reload();

          history.push("/");
          // console.log("Expiration Date:", now);
        })
        .catch((error) => {
          console.error("Error:", error.message);
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            window.alert(error.response.data.message);
          } else {
            window.alert("An error occurred while processing your request.");
          }
          this.setState({ progress: false });
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form
            action="/"
            onSubmit={this.handleLogin}
            className=""
            style={{ marginTop: "30px" }}
          >
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) =>
                  this.setState({ email: e.target.value, emailerror: "" })
                }
                style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
                required
              />
              <div className="form-control-position"></div>
              <Label
                style={{ fontSize: "18px", fontWeight: "600", top: "-35px" }}
              >
                Email
              </Label>
              {this.state.emailerror && (
                <span className="text-danger">{this.state.emailerror}</span>
              )}
            </FormGroup>
            <FormGroup
              className="form-label-group position-relative has-icon-left"
              style={{ marginTop: "30px" }}
            >
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) =>
                  this.setState({ password: e.target.value, passwordError: "" })
                }
                style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
                required
              />
              <div className="form-control-position"></div>
              <Label
                style={{ fontSize: "18px", fontWeight: "600", top: "-32px" }}
              >
                Password
              </Label>
              {this.state.passwordError && (
                <span className="text-danger">{this.state.passwordError}</span>
              )}
            </FormGroup>
            <div className="text-danger">
              <span>{this.state.error}</span>
            </div>
            <div className="row d-flex justify-content-space-between">
              <div className="col-md-6">
                <div>
                  <button className="login-btn-style" type="submit">
                    {this?.state?.progress ? (
                      <Spin indicator={this.antIcon} />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mt-3 float-right">
                  <Link
                    to="/pages/forgot-password"
                    style={{
                      textDecoration: "none",
                      color: "#db2c2a",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
          </Form>
          <br />
        </CardBody>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    values: state.auth.login,
  };
};
export default connect(mapStateToProps)(Login);
