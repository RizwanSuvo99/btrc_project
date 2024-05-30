import React, { useEffect, useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import user1 from "../../../../../assets/img/user1.svg";
import user2 from "../../../../../assets/img/user2.svg";
import capture from "../../../../../assets/img/capture.PNG";
import images1 from "../../../../../assets/img/images1.svg";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import { Drawer } from "antd";
import plusicon from "../../../../../assets/img/plusicon.svg";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import gift from "../../../../../assets/img/gift.PNG";
import cuser1 from "../../../../../assets/img/cuser1.svg";
import user from "../../../../../assets/img/Uapp_fav.png";
import down from "../../../../../assets/img/down.svg";
import camera2 from "../../../../../assets/img/camera2.svg";
import Chart from "react-apexcharts";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
const SuperAdmin = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([40, 20, 20]);
  const [Labels, setLabels] = useState([
    "Total",
    "In single Chats",
    "In Group Chats",
  ]);
  const [count, setCount] = useState({});
  const [applications, setApplications] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const history = useHistory();

  const orderName = [
    { label: "Order", value: 1 },
    { label: "Order 2", value: 2 },
    { label: "Order 3", value: 3 },
    // Add more orders as needed
  ];
  const [intake, setIntake] = useState({});

  const [selectedOrder, setSelectedOrder] = useState({
    label: "Select Country ",
    value: "Country..",
  });

  // useEffect(() => {
  //   get(`SystemAdminDashboard/Counting`).then((res) => {
  //     setCount(res);
  //   });

  //   get(`SystemAdminDashboard/Application`).then((res) => {
  //     setApplications(res);
  //   });

  //   get(`SystemAdminDashboard/GetTransactions`).then((res) => {
  //     setConsultants(res);
  //   });

  //   get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
  //     setIntake(res);
  //   });
  // }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const selectOrder = (label, value) => {
    setSelectedOrder({ label, value });
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap">
        <div>
          <span className="std-dashboard-style1">
            {/* Hello, {currentUser?.displayName}! */}
          </span>
        </div>

        {/* <div className="d-flex flex-wrap">
          <div className="mt-2 mr-4">
            <span style={{ fontWeight: "500" }}>
              Intake Range: {intake?.intakeName}
            </span>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/addStudentRegister`);
            }}
          >
            <div className="std-dashboard-style4"></div>

            <div className="std-dashboard-style5">
              <img src={plusicon} className="img-fluid dashbard-img-style1" />
              <span className="std-dashboard-style3">Add Student</span>
            </div>
          </div>

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style6" onClick={showDrawer}></div>

            <div onClick={function noRefCheck() {}}>
              <img
                src={Vectorbeat}
                className="img-fluid dashbard-img-style2"
                onClick={showDrawer}
              />

              <Drawer placement="right" onClose={onClose} open={open}>
                <div className="">
                  <Card>
                    <CardBody>
                      <span className="consultant-news-feed-style">
                        NEWS FEED
                      </span>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div>
                        <div className="d-flex">
                          <div className="notice-image-style">
                            <img src={user1} />
                          </div>
                          <div className="ml-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              We're delighted to introduce you to our new
                              "Become an Education Consultant...
                              <br />
                              <span
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor: "#878A99",
                                  cursor: "pointer",
                                }}
                              >
                                read more
                              </span>
                            </span>

                            <br />
                            <span className="notice-time-style">
                              02:14 PM Today
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div>
                        <div className="d-flex">
                          <div className="notice-image-style">
                            <img src={user2} />
                          </div>
                          <div className="ml-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              We're delighted to introduce you
                            </span>
                            <br />
                            <img src={capture} className="img-fluid" />
                            <br />
                            <span className="notice-time-style">
                              02:14 PM Today
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div>
                        <div className="d-flex">
                          <div className="notice-image-style">
                            <img src={user2} />
                          </div>
                          <div className="ml-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              We're delighted to introduce you
                            </span>
                            <br />
                            <div className="d-flex justify-content-around my-2">
                              <img src={images1} className="img-fluid" />
                              <img src={images1} className="img-fluid" />
                              <img src={images1} className="img-fluid" />
                            </div>

                            <span className="notice-time-style">
                              02:14 PM Today
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <div>
                    <Card>
                      <CardBody>
                        <span className="consultant-news-feed-style">
                          NOTICE
                        </span>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <div className="">
                          <div className="notice-image-stylemb-2">
                            <span className="notice-user-name">
                              Super Admin
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              University of Suffolk admissions open for
                              September 2022 intake.
                              <br />
                              <span
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor: "#878A99",
                                  cursor: "pointer",
                                }}
                              >
                                View
                              </span>
                            </span>
                          </div>

                          <div className="mt-2">
                            <span className="notice-time-style">
                              02:14 PM 19/07/22
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <div>
                          <div className="notice-image-stylemb-2">
                            <span className="notice-user-name">
                              Super Admin
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              University of Suffolk admissions open for
                              September 2022 intake.
                              <br />
                              <span
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor: "#878A99",
                                  cursor: "pointer",
                                }}
                              >
                                View
                              </span>
                            </span>
                          </div>

                          <div className="mt-2">
                            <span className="notice-time-style">
                              02:14 PM 19/07/22
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  <Card>
                    <CardBody>
                      <div>
                        <img src={gift} className="img-fluid" />
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Drawer>
            </div>
          </div>
        </div> */}
      </div>

      {/* Status */}

      <Card>
        <CardBody>
          <h2 className="mb-4">Real time statistic</h2>
          <div className="row">
            <div className="col-md-3 mb-3">
              <div className="count-card count-primary counter-h-112 bg-gray shadow border-0">
                <div className="count-card-title">Total Users</div>
                <div
                  className="count-card-value"
                  onClick={() => {
                    history.push(`/applications`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {count?.totalApplication}
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="count-card count-primary counter-h-112 bg-gray shadow border-0">
                <span className="pvdadmin-span-style1">Online Users</span>

                <span
                  className="pvdadmin-span-style2"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/applicationsByStatus/${2}/${1}`);
                  }}
                >
                  {count?.totalApplicationInProgress}
                </span>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div
                className="count-card counter-h-112 bg-gray shadow border-0"
                style={{ border: "0.5px solid #AE75F8" }}
              >
                <span className="pvdadmin-span-style1">Lives Call</span>

                <span
                  className="pvdadmin-span-style2"
                  style={{ color: "#AE75F8", cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/applicationsByStatus/${2}/${2}`);
                  }}
                >
                  {count?.totalUnconditionalOffer}
                </span>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div
                className="count-card counter-h-112 bg-gray shadow border-0"
                style={{ border: "0.5px solid #F7BD12 " }}
              >
                <span className="pvdadmin-span-style1">
                  Live Out / In Calls
                </span>

                <span
                  className="pvdadmin-span-style2"
                  style={{ color: "#F7BD12", cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/applicationsByStatus/${2}/${3}`);
                  }}
                >
                  {count?.totalRegistered}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <div>
        <Card>
          <CardBody>
            <p style={{ textAlign: "center", fontWeight: "700" }}>
              Application
            </p>
            <h3 className="mb-4">User Registations</h3>

            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <Select
                      className="mr-md-2 mr-sm-0"
                      options={orderName}
                      value={{
                        label: selectedOrder.label,
                        value: selectedOrder.value,
                      }}
                      onChange={(opt) => selectOrder(opt.label, opt.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <Select
                      className="mr-md-2 mr-sm-0"
                      options={orderName}
                      value={{
                        label: selectedOrder.label,
                        value: selectedOrder.value,
                      }}
                      onChange={(opt) => selectOrder(opt.label, opt.value)}
                    />
                  </div>
                </div>
                {/* table */}
                <table class="table mt-5">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">COUNTRY</th>
                      <th scope="col">REGISTERED</th>
                      <th scope="col">NOT VARIFIED</th>
                      <th scope="col">FAIL %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Bangladesh</td>
                      <td>2169</td>
                      <td>909</td>
                      <td>2.8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6">
                <h1>hiiiiii</h1>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <section>
        <Card>
          <CardBody>
            <p style={{ textAlign: "center", fontWeight: "700" }}>Total</p>
          </CardBody>
        </Card>
      </section>
      {/* message section */}
      <section className="row">
        <div className="col-md-6">
          <Card>
            <CardBody>
              {/* Message */}
              <div className="border-bottom">
                <h4>Message</h4>
              </div>
              <div className="mt-4">
                <Select
                  className="mr-md-2 mr-sm-0"
                  options={orderName}
                  value={{
                    label: selectedOrder.label,
                    value: selectedOrder.value,
                  }}
                  onChange={(opt) => selectOrder(opt.label, opt.value)}
                />
              </div>
              <table class="table mt-5">
                <thead class="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">COUNTRY</th>
                    <th scope="col">MESSAGE - COUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Bangladesh</td>
                    <td>2169</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-6">
          <Card>
            <CardBody>
              {/* Message by types */}
              <div className="border-bottom">
                <h4>Message by Types</h4>
              </div>
              <Card>
                <CardBody>
                  <div className="row my-4">
                    <div className="col-md-3">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="custom-conslt-div1"></div>
                          <p
                            style={{
                              fontWeight: "500",
                              position: "relative",
                              top: "4px",
                            }}
                          >
                            Total
                          </p>
                        </div>

                        <div>
                          <span style={{ position: "relative", top: "4px" }}>
                            40
                          </span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="custom-conslt-div2"></div>
                          <p
                            style={{
                              fontWeight: "500",
                              position: "relative",
                              top: "4px",
                            }}
                          >
                            In Single Chats{" "}
                          </p>
                        </div>

                        <div>
                          <span style={{ position: "relative", top: "4px" }}>
                            20
                          </span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="custom-conslt-div4"></div>
                          <p
                            style={{
                              fontWeight: "500",
                              position: "relative",
                              top: "4px",
                            }}
                          >
                            In Group Chats
                          </p>
                        </div>

                        <div>
                          <span style={{ position: "relative", top: "4px" }}>
                            20
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <Chart
                        options={options}
                        series={series}
                        type="donut"
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </div>
      </section>
      {/* call section */}
      <section className="row">
        <div className="col-md-6">
          <Card>
            <CardBody>
              {/* Message */}
              <div className="border-bottom">
                <h4>Calls</h4>
              </div>
              <div className="mt-4">
                <Select
                  className="mr-md-2 mr-sm-0"
                  options={orderName}
                  value={{
                    label: selectedOrder.label,
                    value: selectedOrder.value,
                  }}
                  onChange={(opt) => selectOrder(opt.label, opt.value)}
                />
              </div>
              <table class="table mt-5">
                <thead class="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">COUNTRY</th>
                    <th scope="col">Internal Call - COUNT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Bangladesh</td>
                    <td>2169</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
        <div className="col-md-6">
          <Card>
            <CardBody>
              {/* call by types */}
              <div className="border-bottom">
                <h4>Calls by Types</h4>
              </div>
              <div className="row mt-3" style={{ fontSize: "18px" }}>
                <div className="col-md-4  border-right">
                  <div className="d-flex justify-content-around">
                    {" "}
                    <div>
                      <p className="mb-1">0.0</p>
                      <p>Internal calls</p>
                    </div>
                    <div>
                      <p className="mb-1">0.0</p>
                      <p>Duration (min)</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 border-right">
                  <div className="d-flex justify-content-around">
                    {" "}
                    <div>
                      <p className="mb-1">0.0</p>
                      <p>Out calls</p>
                    </div>
                    <div>
                      <p className="mb-1">0.0</p>
                      <p>Duration (min)</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-around">
                    {" "}
                    <div>
                      <p className="mb-1">0.0</p>
                      <p>In calls</p>
                    </div>
                    <div>
                      <p className="mb-1">0.0</p>
                      <p>Duration (min)</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <Card>
                <CardBody>
                  <div className="row my-4">
                    <div className="col-md-3">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="custom-conslt-div1"></div>
                          <p
                            style={{
                              fontWeight: "500",
                              position: "relative",
                              top: "4px",
                            }}
                          >
                            Total
                          </p>
                        </div>

                        <div>
                          <span style={{ position: "relative", top: "4px" }}>
                            40
                          </span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="custom-conslt-div2"></div>
                          <p
                            style={{
                              fontWeight: "500",
                              position: "relative",
                              top: "4px",
                            }}
                          >
                            In Single Chats{" "}
                          </p>
                        </div>

                        <div>
                          <span style={{ position: "relative", top: "4px" }}>
                            20
                          </span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="custom-conslt-div4"></div>
                          <p
                            style={{
                              fontWeight: "500",
                              position: "relative",
                              top: "4px",
                            }}
                          >
                            In Group Chats
                          </p>
                        </div>

                        <div>
                          <span style={{ position: "relative", top: "4px" }}>
                            20
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <Chart
                        options={options}
                        series={series}
                        type="donut"
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </CardBody>
              </Card> */}
            </CardBody>
          </Card>
        </div>
      </section>
      <section>
        <Card>
          <CardBody>
            <div className="border-bottom d-flex justify-content-between">
              <h4>Monthly Active Users</h4>
              <button type="button" className="btn btn-light mb-1">
                <FontAwesomeIcon icon={faArrowRotateRight} />
                Refresh
              </button>
            </div>
          </CardBody>
        </Card>
      </section>
      <div>
        <Card>
          <CardBody>
            <span className="app-style-const">Consultant Transaction List</span>

            {consultants?.length > 0 ? (
              <div style={{ height: "300px", overflowY: "scroll" }}>
                <Table borderless responsive className="mt-3">
                  <thead style={{ backgroundColor: "#EEF3F4" }}>
                    <tr>
                      <th>Consultant ID</th>
                      <th>Consultant Name</th>
                      <th>Total In Flow</th>
                      <th>Total Out Flow</th>
                      <th>Total Balance</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultants?.map((con, i) => (
                      <tr key={i}>
                        <td className="cursor-pointer hyperlink-hover">
                          <span
                            onClick={() => {
                              history.push(
                                `accountTransactionByConsultant/${con?.consultantId}`
                              );
                            }}
                          >
                            {con?.consultantViewId}
                          </span>
                        </td>
                        <td>{con?.consultantName}</td>
                        <td>{con?.credit}</td>
                        <td>{con?.debit}</td>
                        <td>{con?.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p style={{ textAlign: "center", fontWeight: "700" }}>
                No Transaction
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      {/* consultant transaction list table end */}
    </React.Fragment>
  );
};

export default SuperAdmin;
