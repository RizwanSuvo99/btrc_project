import React from "react";
import { Col, Row } from "reactstrap";
import UappLogo from "../../../../assets/img/Asset 12Icon.svg";
import "../../../../assets/scss/pages/authentication.scss";
import BTRCLoginJWT from "./BTRCLoginJWT";

class BTRCLogin extends React.Component {
  state = {
    activeTab: "1",
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };
  render() {
    return (
      <div className="top-style">
        <div className="" style={{ backgroundColor: "#fff" }}>
          <div className="responsive-top">
            <Row className="m-0 ">
              <Col
                lg="6"
                md="6"
                className=" px-1 py-0 hide-responsive-left-side"
              >
                <div className="flexbox-container login-img">
                  <div>
                    <img src={UappLogo} className=" w-50 mt-5" />
                  </div>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className=" mt-md-5 ml-md-4">
                  <h4
                    className=""
                    style={{
                      color: "#111111",
                      fontSize: "38px",
                      fontWeight: "500",
                    }}
                  >
                    Login
                  </h4>
                  <span
                    style={{
                      color: "#7f7f7f",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    Log in to continue in our website
                  </span>
                </div>

                <div className="col-right">
                  <div className="text-center hide-responsive-right-side">
                    <img src={UappLogo} className="w-50" />
                  </div>
                  <div
                    className="flexbox-container2"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <BTRCLoginJWT />
                  </div>
                </div>
                
              </Col>
            </Row>
          </div>
        </div>

        {/* <Footer></Footer> */}
      </div>
    );
  }
}
export default BTRCLogin;
