import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/getallstaff");
        console.log(res.data.data)
        setStaffList(res.data.data); // Make sure the key matches your backend response
      } catch (err) {
        console.error("Failed to fech staff data", err);
      }
    };

    fetchStaff();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <aside
        className="bg-light p-3 shadow-sm"
        style={{
          width: "250px",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          overflowY: "auto",
        }}
      >
        <div className="d-flex flex-column justify-content-between h-100">
          <div>
            <h4 className="text-center text-danger fw-bold mb-4">
              charity system
            </h4>
            <ul className="nav flex-column">
              {[
                { name: "ADD STAFF", path: "/addstaff" },
                { name: "VIEW STAFF", path: "/viewstaff" },
                { name: "ADD MEMBER TYPE", path: "/addmembertype" },
                { name: "VIEW MEMBER TYPE", path: "/viewmembertype" },
                { name: "ADD MEMBER", path: "/addmember" },
                { name: "VIEW MEMBER", path: "/viewmember" },
                { name: "FUND RAISE", path: "/fundraise" },
                { name: "VIEW FUND RAISE", path: "/viewfundraise" },
                { name: "APPOINTMENT", path: "/appointment" },
                { name: "VIEW FUND BY DONOR", path: "/viewfundbydonor" }
              ].map((item) => (
                <li key={item.name} className="nav-item mb-3">
                  <button
                    onClick={() => navigate(item.path)}
                    className="btn btn-outline-danger w-100 fw-semibold"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="btn btn-danger fw-bold w-100"
            onClick={handleLogout}
          >
            LOG OUT
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="p-5 bg-white"
        style={{
          marginLeft: "250px",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <div className="container mt-5">
          <h3 className="text-center text-danger fw-bold mb-4">All Staff Members</h3>
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-danger">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Address</th>
                  <th>Employee ID</th>
                  <th>Joining Date</th>
                </tr>
              </thead>
              <tbody>
                {staffList.length === 0 ? (
                  <tr>
                    <td colSpan="6">No staff members found.</td>
                  </tr>
                ) : (
                  staffList.map((staff, index) => (
                    <tr key={index}>
                      <td>{staff.name}</td>
                      <td>{staff.email}</td>
                      <td>{staff.role}</td>
                      <td>{staff.address}</td>
                      <td>{staff.employeeId}</td>
                      <td>{new Date(staff.joiningDate).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewStaff;
