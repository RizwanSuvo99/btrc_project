import React from "react";
import { CardBody, Form, FormGroup, Input } from "reactstrap";
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
        <CardBody className="p-0">
          <Form
            action="/"
            onSubmit={this.handleLogin}
            className=""
            style={{ marginTop: "30px" }}
          >
            <FormGroup className="form-label-group has-icon-left">
              <p style={{ fontSize: "18px", color: "#333" }}>Email Address</p>
              <Input
                type="email"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={(e) =>
                  this.setState({ email: e.target.value, emailerror: "" })
                }
                style={{
                  height: "52px",
                  background: "#e6e6e6",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
                required
              />
            </FormGroup>
            <FormGroup
              className="form-label-group has-icon-left"
              style={{ marginTop: "30px" }}
            >
              <p style={{ fontSize: "18px", color: "#333" }}>Password</p>
              <Input
                type="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={(e) =>
                  this.setState({ password: e.target.value, passwordError: "" })
                }
                style={{
                  height: "52px",
                  background: "#e6e6e6",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
                required
              />
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
                      "Login Now"
                    )}
                  </button>
                </div>
              </div>

              {/* <div className="col-md-6">
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
              </div> */}
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
