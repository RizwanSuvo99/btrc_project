import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import roleServices from "../../../apiServices/RoleServices/RoleServices";
import userServices from "../../../apiServices/UserServices/UserServices.js";
import UserManagementModal2 from "./UserManagementModal2";

const UserManagenent2 = () => {
  // Initial Form Data
  const initialFormData = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    userStatus: "",
    roles: [],
  };
  const [formData, setFormData] = useState(initialFormData);

  const [openModal, setOpenModal] = useState({
    isOpen: false,
    openType: "",
  });

  // Handle Modal Open
  const handleOpenModal = (openType) => {
    console.log(openType);
    if (openType === "ADD") {
      setOpenModal({
        isOpen: true,
        openType: "ADD",
      });
    } else {
      setOpenModal({
        isOpen: true,
        openType: "UPDATE",
      });
    }
  };

  // Handle Modal Close
  const handleCloseModal = () => {
    setOpenModal({
      ...openModal,
      isOpen: false,
    });
    setFormData(initialFormData);
  };

  // Handle Change Form Data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  // Handle Modal Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
  };

  // Custom CSS for Modal
  const customStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "900px",
    backgroundColor: "#fff",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
    padding: 4,
  };

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchUsers = async () => {
    try {
      const data = await userServices.fetchAllUsers(userInfo.token);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await roleServices.fetchRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const roleOptions = roles.map((role) => ({
    value: role.name,
    label: role.name,
  }));

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  console.log(users);
  return (
    <>
      <UserManagementModal2
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        customStyle={customStyle}
        roleOptions={roleOptions}
      />
      <Card>
        <Card.Body>
          <Card.Title>
            <h4 className="border-bottom pb-4">User Management 2</h4>
          </Card.Title>
          <div className="container-fluid mt-4">
            <div className="row mb-3">
              <div className="col-xl-4 col-lg-6 col-sm-8 col-md-mt-5">
                <Form>
                  <h6>Find User : </h6>
                  <div className="d-flex align-items-center">
                    <Form.Control type="text" placeholder="Search..." />
                    <Button
                      variant="primary"
                      style={{ padding: "7px 30px", marginLeft: "10px" }}
                    >
                      Find
                    </Button>
                  </div>
                </Form>
              </div>
              <div
                className="col-xl-8 col-lg-6 col-sm-4 d-flex justify-content-end align-items-end"
                style={{ marginTop: "23px" }}
              >
                <Button
                  onClick={() => handleOpenModal("ADD")}
                  variant="primary"
                  style={{ padding: "7px 30px" }}
                >
                  Add User
                </Button>
              </div>
            </div>
          </div>
          <div className="customTableCss">
            <Table bordered>
              <thead style={{ backgroundColor: "#1e98b0" }}>
                <tr>
                  <th>Serial</th>
                  <th>User Name</th>
                  <th>Role</th>
                  <th>Created On</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "14px", fontWeight: "500" }}>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>Edit</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>@fat</td>
                  <td>Edit</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                  <td>@twitter</td>
                  <td>Edit</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserManagenent2;
