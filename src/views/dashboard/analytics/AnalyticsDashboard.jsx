import React from "react";
import Card from "react-bootstrap/Card";
// import "../../../assets/scss/pages/dashboard-analytics.scss";
// import SuperAdmin from "../../services/Dashboard/Pages/SuperAdmin/Index";
import "../../../assets/scss/pages/analytics-dashboard.scss";
import AnalyticsTable from "./AnlyticsTable";

const AnalyticsDashboard = () => {
  // const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  return (
    <>
      {/* <SuperAdmin /> */}
      
      <Card className="analyticsDashboard">
        <Card.Body>
          <Card.Title>
            <h4
              style={{ textTransform: "capitalize" }}
              className="border-bottom"
            >
              Welcome to our BTRC Dashboard
            </h4>
          </Card.Title>
          <div className="analyticsTables">
            <h5>E1 Utilization Dashboard (Last Update: 2024-04-02 16:23:09)</h5>
            <div className="singleTable">
              <h6>BDCOM Core E1</h6>
              <AnalyticsTable />
            </div>
            <div className="singleTable">
              <h6>333 -a2i E1</h6>
              <AnalyticsTable />
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default AnalyticsDashboard;
