/* eslint-disable no-unused-vars */
import Table from "@mui/material/Table";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { CardBody } from "reactstrap";

import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import RatePlanForm from "./RatePlanForm";

const RatePlan = () => {
  // Service Family Option States
  const [serviceList, setServiceList] = useState([
    {
      name: "Active",
      id: 0,
    },
    {
      name: "Suspended",
      id: 1,
    },
  ]);
  const serviceFamilyOptions = serviceList?.map((srv) => ({
    label: srv?.name,
    value: srv?.id,
  }));

  const [serviceLabel, setServiceLabel] = useState("Select Service Family");
  const [serviceValue, setServiceValue] = useState(0);

  const selectedServiceFamily = (label, value) => {
    setServiceLabel(label);
    setServiceValue(value);
  };

  // Default Billing Option States
  const [billingList, setBillingLIst] = useState([
    {
      name: "Option 1",
      id: 0,
    },
    {
      name: "Option 2",
      id: 1,
    },
  ]);
  const billingOptions = billingList?.map((srv) => ({
    label: srv?.name,
    value: srv?.id,
  }));

  const [billingLabel, setBillingLabel] = useState("Select Default Billing");
  const [billingValue, setBillingValue] = useState(0);

  const selectedBilling = (label, value) => {
    setBillingLabel(label);
    setBillingValue(value);
  };

  // Default Category Option States
  const [categoryList, setCategoryList] = useState([
    {
      name: "Option 1",
      id: 0,
    },
    {
      name: "Option 2",
      id: 1,
    },
  ]);
  const categoryOptions = categoryList?.map((srv) => ({
    label: srv?.name,
    value: srv?.id,
  }));

  const [categoryLabel, setCategoryLabel] = useState("Select Default Category");
  const [categoryValue, setCategoryValue] = useState(0);

  const selectedCategory = (label, value) => {
    setCategoryLabel(label);
    setCategoryValue(value);
  };

  const dropdownFunctions = {
    serviceFamilyOptions,
    selectedServiceFamily,
    billingOptions,
    selectedBilling,
    categoryOptions,
    selectedCategory,
    serviceLabel,
    serviceValue,
    billingLabel,
    billingValue,
    categoryLabel,
    categoryValue,
  };

  // dropdown show or disable
  const [editMode, setEditMode] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 900,
    backgroundColor: "background.paper",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
    padding: 4,
    overflowY: "scroll",
    maxHeight: "98%",
  };

  // Initial Form Data
  const initialFormData = {
    id: crypto.randomUUID(),
    planName: "",
    serviceFamily: {
      label: serviceLabel,
      value: serviceValue,
    },
    currency: "",
    timeZone: "",
    createdOn: "",
    techPrefix: "",
    description: "",
    defaultPulse: "",
    defaultRoundDigitsAfterDecimalForRateAmount: "",
    minDurationSec: "",
    referenceRatePlanforLCR: "",
    ambiguousDateHandlingBy: "",
    defaultFixedChargeDurationSec: "",
    defaultFixedChargeAmount: "",
    defaultBillingSpan: "",
    defaultCategory: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [ratePlanData, setRatePlanData] = useState([
    {
      id: crypto.randomUUID(),
      planName: "Domestic",
      serviceFamily: "",
      currency: "BDT",
      timeZone: "GMT +6",
      createdOn: "Dummy Data",
      techPrefix: "00",
      description: "Dummy Data",
      defaultPulse: "1",
      defaultRoundDigitsAfterDecimalForRateAmount: "0",
      minDurationSec: "0.1",
      referenceRatePlanforLCR: "No",
      ambiguousDateHandlingBy: "Month First, Then Day",
      defaultFixedChargeDurationSec: "0",
      defaultFixedChargeAmount: "0.00000",
      defaultBillingSpan: "",
      defaultCategory: "",
    },
  ]);
  const [openModal, setOpenModal] = useState({
    open: false,
    openType: "",
  });

  // Modal Open
  const handleOpenModal = (openType) => {
    if (openType === "ADD") {
      setOpenModal({
        open: true,
        openType: "ADD",
      });
    } else {
      setOpenModal({
        open: true,
        openType: "UPDATE",
      });
    }
  };

  // Modal Close and Form Reset
  const handleClose = () => {
    setOpenModal({
      ...openModal,
      open: false,
    });
    setFormData(initialFormData);
  };

  // Change RatePlan Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  // Submit RatePlan Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (openModal.openType === "ADD") {
      setRatePlanData([...ratePlanData, formData]);
    } else {
      const updatedRatePlanData = ratePlanData.map((ratePlan) => {
        if (ratePlan.id === formData.id) {
          return {
            ...formData,
          };
        }
        return ratePlan;
      });
      setRatePlanData([...updatedRatePlanData]);
    }
    handleClose();
  };

  // Delete RatePlan Handler
  const handleDelete = (id) => {
    const filteredRatePlan = ratePlanData.filter(
      (rateplan) => rateplan.id !== id
    );
    setRatePlanData([...filteredRatePlan]);
  };

  // Update RatePlan Handler
  const handleUpdate = (id) => {
    handleOpenModal("UPDATE");
    const dataToUpdate = ratePlanData.find((data) => data.id === id);
    setFormData(dataToUpdate);
  };

  /**
    const initalData = (data) => {
    const newData = {
      planName: data.planName,
      serviceFamily: data.serviceFamily,
      currency: data.currency,
      timeZone: data.timeZone,
      createdOn: data.createdOn,
      techPrefix: data.techPrefix,
      description: data.description,
      defaultPulse: data.defaultPulse,
      defaultRoundDigitsAfterDecimalForRateAmount:
        data.defaultRoundDigitsAfterDecimalForRateAmount,
      minDurationSec: data.minDurationSec,
      referenceRatePlanforLCR: data.referenceRatePlanforLCR,
      ambiguousDateHandlingBy: data.ambiguousDateHandlingBy,
      defaultFixedChargeDurationSec: data.defaultFixedChargeDurationSec,
      defaultFixedChargeAmount: data.defaultFixedChargeAmount,
      defaultBillingSpan: data.defaultBillingSpan,
      defaultCategory: data.defaultCategory,
    };
    return newData;
  };

  update
  const handleUpdateOpen = async (id) => {
    // setUserId(id);
    setUpdateOpen(true);
    // await fetchUserData(id);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    setRatePlanData(initialFormData);
  };

  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();
    const updateRatePlanData = initalData(ratePlanData);
    console.log(updateRatePlanData);
    handleClose();
     try {
       await userServices.updateUser(id, updateUserData, userInfo.token);
       handleClose();
       fetchUsers();
     } catch (error) {
       console.error("Error updating user:", error);
       // Handle error
     }
  };
  */

  return (
    <div>
      {/* Modal */}
      <RatePlanForm
        openModal={openModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        formData={formData}
        style={style}
        setFormData={setFormData}
        dropdownFunctions={dropdownFunctions}
      />
      {/* Modal End */}
      <Card>
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">Role Management</h4>
          </div>
          <div className="mt-4 container-fluid">
            <div className="row mb-3">
              <div className="col-md-4">
                <h6>Service : </h6>
                <form style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control
                    placeholder="Search..."
                    style={{ marginRight: "10px" }}
                  />
                  <Button style={{ padding: "7px 30px" }} type="submit">
                    Find
                  </Button>
                </form>
              </div>
              <div className="col-md-4">
                <h6>Rate Plan Name Having : </h6>
                <form style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control
                    placeholder="Search..."
                    style={{ marginRight: "10px" }}
                  />
                  <Button style={{ padding: "7px 30px" }} type="submit">
                    Find
                  </Button>
                </form>
              </div>
              <div
                className="col-md-4 d-flex justify-content-end"
                style={{ marginTop: "23px" }}
              >
                <Button
                  style={{ padding: "7px 30px" }}
                  onClick={() => handleOpenModal("ADD")}
                >
                  Add Rate Plan
                </Button>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: "100%", overflowX: "scroll" }}>
            <Table id="table-to-xls" className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th>Plan Name</th>
                  <th style={{ minWidth: "350px" }}>Service Family</th>
                  <th>Currency</th>
                  <th>TimeZone</th>
                  <th>Created On</th>
                  <th>
                    Tech
                    <br />
                    Prefix
                  </th>
                  <th>Description</th>
                  <th>
                    Default <br /> Pulse
                  </th>
                  <th style={{ minWidth: "180px" }}>
                    Default Round Digits <br /> after Decimal for <br /> Rate
                    Amount
                  </th>
                  <th>Min Duration (Sec)</th>
                  <th>
                    Reference Rate Plan <br></br> for LCR
                  </th>
                  <th style={{ minWidth: "220px" }}>
                    Ambiguous Date Handling by
                  </th>
                  <th style={{ minWidth: "180px" }}>
                    Default Fixed Charge <br /> Duration (Sec)
                  </th>
                  <th style={{ minWidth: "180px" }}>
                    Default Fixed Charge <br /> Amount
                  </th>
                  <th style={{ minWidth: "150px" }}>
                    Default <br /> Billing Span
                  </th>
                  <th style={{ minWidth: "150px" }}>Default Category</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ratePlanData?.map((rateData) => (
                  <tr key={rateData.id}>
                    <td>{rateData.planName}</td>
                    <td>
                      <Select
                        value={{
                          label: serviceLabel,
                          value: serviceValue,
                        }}
                        isDisabled={!editMode}
                      />
                    </td>
                    <td>{rateData.currency}</td>
                    <td>{rateData.timeZone}</td>
                    <td>{rateData.createdOn}</td>
                    <td>{rateData.techPrefix}</td>
                    <td>{rateData.description}</td>
                    <td>{rateData.defaultPulse}</td>
                    <td>
                      {rateData.defaultRoundDigitsAfterDecimalForRateAmount}
                    </td>
                    <td>{rateData.minDurationSec}</td>
                    <td>{rateData.referenceRatePlanforLCR}</td>
                    <td>{rateData.ambiguousDateHandlingBy}</td>
                    <td>{rateData.defaultFixedChargeDurationSec}</td>
                    <td>{rateData.defaultFixedChargeAmount}</td>
                    <td>
                      <Select
                        value={{
                          label: billingLabel,
                          value: billingValue,
                        }}
                        isDisabled={!editMode}
                      />
                    </td>
                    <td>
                      <Select
                        value={{
                          label: categoryLabel,
                          value: categoryValue,
                        }}
                        isDisabled={!editMode}
                      />
                    </td>
                    <td
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => handleUpdate(rateData.id)}
                    >
                      Edit
                    </td>
                    <td
                      onClick={() => {
                        handleDelete(rateData.id);
                      }}
                    >
                      Delete
                    </td>
                    <td>Task</td>
                    <td>Rates</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RatePlan;
