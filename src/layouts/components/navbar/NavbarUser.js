import axios from "axios";
import React from "react";
import * as Icon from "react-feather";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import user from "../../../assets/img/Uapp_fav.png";
import { rootUrl } from "../../../constants/constants";
import { userTypes } from "../../../constants/userTypeConstant";
import { history } from "../../../history";

const handleNavigation = (e, path) => {
  e.preventDefault();
  history.push(path);
};

const userInfo = JSON.parse(localStorage.getItem("current_user"));
const AuthStr = localStorage.getItem("token");

// const redirectToProfile = () => {

//   if ( userInfo?.userTypeId == userTypes?.AccountManager ||
//     userInfo?.userTypeId == userTypes?.Editor ||
//     userInfo?.userTypeId == userTypes?.AccountOfficer ||
//     userInfo?.userTypeId == userTypes?.ComplianceManager ||
//     userInfo?.userTypeId == userTypes?.FinanceManager) {
//     history.push(`/staffProfile/${userInfo?.referenceId}`);
//   }
//   else if (userInfo?.userTypeId == userTypes?.AdmissionManager) {
//     history.push(`/admissionManagerProfile/${userInfo?.referenceId}`);
//   }
//   else if (userInfo?.userTypeId == userTypes?.AdmissionOfficer) {
//     history.push(`/admissionOfficerDetails/${userInfo?.referenceId}`);
//   }
//   else if (userInfo?.userTypeId == userTypes?.ProviderAdmin) {
//     history.push(`/providerAdminProfile/${userInfo?.referenceId}`);
//   }
//   else if (userInfo?.userTypeId == userTypes?.BranchManager) {
//     history.push(`/branchManagerProfile/${userInfo?.referenceId}`);//TODO
//   }
//   else if (userInfo?.userTypeId == userTypes?.Consultant) {
//     history.push(`/consultantProfile/${userInfo?.referenceId}`);
//   }
//   else if (userInfo?.userTypeId == userTypes?.Student) {
//     history.push(`/studentProfile/${userInfo?.referenceId}`);//TODO
//   }
//   else if (userInfo?.userTypeId == userTypes?.Provider) {
//     history.push(`/providerDetails/${userInfo?.referenceId}`);//TODO
//   }
//   else {
//     history.push('/');
//   }

// }

const handleDate = (e) => {
  var datee = e;
  var utcDate = new Date(datee);
  var localeDate = utcDate.toLocaleString("en-CA");
  const x = localeDate.split(",")[0];
  return x;
};

const handleLogOut = (e) => {
  e.preventDefault();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userInfo);

  axios
    .post(
      `${rootUrl}logOut`,
      {},
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    )
    .then((res) => {
      localStorage.removeItem("userInfo");
      // history.push("/");
      window.localStorage.clear();
      window.location.reload();
    });
};
// const handleLogOut = (e) => {
//   e.preventDefault();

//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   console.log(userInfo);

//   // Assuming `logOut` is your logout endpoint
//   axios
//     .post(
//       logOut,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`, // Fix the formatting here
//         },
//       }
//     )
//     .then((res) => {
//       localStorage.removeItem("userInfo");
//       window.location.href = "/"; // Redirect to the home page
//     })
//     .catch((error) => {
//       console.error("Logout failed:", error);
//     });
// };
const convertAccount = (e) => {
  axios
    .get(`${rootUrl}AccountSwitch/SwitchToConsultant`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response?.status == 200) {
        if (response?.data?.isSuccess == true) {
          localStorage.removeItem("token");
          localStorage.removeItem("permissions");

          localStorage.setItem("token", "Bearer " + response?.data?.message);
          localStorage.setItem(
            "permissions",
            JSON.stringify(response?.data?.permissions)
          );
          const AuthStr = "Bearer " + response?.data?.message;
          axios
            .get(`${rootUrl}Account/GetCurrentUser`, {
              headers: {
                authorization: AuthStr,
              },
            })
            .then((res) => {
              if (res?.status == 200) {
                if (res?.data?.isActive == true) {
                  localStorage.setItem(
                    "current_user",
                    JSON.stringify(res?.data)
                  );
                  localStorage.setItem("userType", res?.data?.userTypeId);
                  localStorage.setItem("referenceId", res?.data?.referenceId);
                  window.location.reload();
                }
              }
            });

          history.push("/");
        }
      }
    })
    .catch();
};

const convertToConsultantAccount = (e) => {
  axios
    .get(`${rootUrl}AccountSwitch/SwitchToStudent`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response?.status == 200) {
        if (response?.data?.isSuccess == true) {
          localStorage.removeItem("token");
          localStorage.removeItem("permissions");

          localStorage.setItem("token", "Bearer " + response?.data?.message);
          localStorage.setItem(
            "permissions",
            JSON.stringify(response?.data?.permissions)
          );
          const AuthStr = "Bearer " + response?.data?.message;
          axios
            .get(`${rootUrl}Account/GetCurrentUser`, {
              headers: {
                authorization: AuthStr,
              },
            })
            .then((res) => {
              if (res?.status == 200) {
                if (res?.data?.isActive == true) {
                  localStorage.setItem(
                    "current_user",
                    JSON.stringify(res?.data)
                  );
                  localStorage.setItem("userType", res?.data?.userTypeId);
                  localStorage.setItem("referenceId", res?.data?.referenceId);
                  window.location.reload();
                }
              }
            });

          history.push("/");
        }
      }
    })
    .catch();
};
const UserDropdown = (props) => {
  return (
    <DropdownMenu right>
      <DropdownItem divider />

      {userInfo?.userTypeId == userTypes?.Student ? (
        <>
          {props?.switch ? (
            <DropdownItem
              tag="a"
              onClick={(e) => {
                convertAccount(e);
              }}
            >
              <Icon.Repeat size={14} className="mr-1 align-middle" />
              <span className="align-middle">Switch To Consultant</span>
            </DropdownItem>
          ) : null}
        </>
      ) : userInfo?.userTypeId == userTypes?.Consultant ? (
        <>
          {props?.switch ? (
            <DropdownItem
              tag="a"
              onClick={(e) => {
                convertToConsultantAccount(e);
              }}
            >
              <Icon.Repeat size={14} className="mr-1 align-middle" />
              <span className="align-middle">Switch To Student</span>
            </DropdownItem>
          ) : null}
        </>
      ) : null}

      <DropdownItem
        tag="a"
        onClick={(e) => {
          handleLogOut(e);
        }}
      >
        <Icon.Power size={14} className="mr-1 align-middle" />
        <span className="align-middle">Log Out</span>
      </DropdownItem>
    </DropdownMenu>
  );
};

class NavbarUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      navbarSearch: false,
      langDropdown: false,
      suggestions: [],
      connection: [],
      chat: "",
      notificationCount: 0,
      notificationData: [],
      canSwitch: false,
    };
  }

  componentDidMount() {
    if (userInfo?.userTypeId == userTypes?.Student) {
      axios
        .get(
          `${rootUrl}Student/CheckIfStudentIsConsultant/${userInfo?.displayEmail}`,
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.setState({ canSwitch: res?.data?.result });
        });
    }

    if (userInfo?.userTypeId == userTypes?.Consultant) {
      axios
        .get(
          `${rootUrl}Consultant/CheckIfConsultantIsStudent/${userInfo?.displayEmail}`,
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.setState({ canSwitch: res?.data?.result });
        });
    }

    //Emon Comment//
    // axios.get(`${rootUrl}Notification/UserNotificationCount`,{
    //   headers: {
    //     authorization: AuthStr
    //   }
    // })
    // .then(res => {

    //   this.setState({notificationCount : res?.data})
    // })

    // axios.get(`${rootUrl}Notification/GetInitial`,{
    //   headers: {
    //     authorization: AuthStr
    //   }
    // })
    // .then(res => {

    //   this.setState({notificationData: res?.data?.result});

    // })

    // const newConnection = new HubConnectionBuilder()
    //   .withUrl(`${rootUrl}notificationHub`)
    //   .withAutomaticReconnect()
    //   .build();

    //  this.setState = {connection : newConnection};

    // if (newConnection) {
    //   newConnection.start().then((result) => {
    //     newConnection.on("notificationHub", (message) => {
    //       //  const updatedChat = [...latestChat.current];
    //       // updatedChat.push(message);
    //       if (message) {
    //         this.countFunction();

    //         this.initialFunction();
    //       }
    //       // this.setState = {chat: message}
    //     });
    //   });
    // }
    // Emon comment end//
  }

  //  Code testing start

  //  const [ connection, setConnection ] = useState(null);
  //  const [ chat, setChat ] = useState('');
  //  const latestChat = useRef(null);

  //  latestChat.current = chat;

  countFunction = () => {
    axios
      .get(`${rootUrl}Notification/UserNotificationCount`, {
        headers: {
          authorization: AuthStr,
        },
      })
      .then((res) => {
        this.setState({ notificationCount: res?.data });
      });
  };

  initialFunction = () => {
    axios
      .get(`${rootUrl}Notification/GetInitial`, {
        headers: {
          authorization: AuthStr,
        },
      })
      .then((res) => {
        this.setState({ notificationData: res?.data?.result });
      });
  };

  allNotifications = () => {
    history.push(`/allNotifications`);
  };

  notificationByIdFunction = (data) => {
    axios
      .get(`${rootUrl}Notification/ViewNotification/${data}`, {
        headers: {
          authorization: AuthStr,
        },
      })
      .then((res) => {});
  };

  redirect = (data) => {
    this.notificationByIdFunction(data?.id);
    history.push(data?.targetUrl);
  };

  // Code testing end

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch,
    });
  };

  handleLangDropdown = () =>
    this.setState({ langDropdown: !this.state.langDropdown });

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name text-bold-600">
                {userInfo?.displayName}
              </span>
              <span className="user-status">{userInfo?.roleName}</span>
            </div>
            <span data-tour="user">
              <img
                src={
                  userInfo?.displayImage == null
                    ? user
                    : rootUrl + userInfo?.displayImage
                }
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown switch={this?.state?.canSwitch} />
        </UncontrolledDropdown>
      </ul>
    );
  }
}
export default NavbarUser;
