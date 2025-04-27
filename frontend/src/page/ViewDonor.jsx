import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewDonor = () => {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    // Fetch all users from your backend
    axios
      .post("http://localhost:5000/api/getalluser") // 👈 Replace with your actual endpoint
      .then((response) => {
        console.log(response.data.data)
        const donorUsers = response.data.data.filter(
          (user) => user.userType === "donor"
        );
        setDonors(donorUsers);
      })
      .catch((error) => {
        console.error("Error fetching donors:", error);
        toast.error("Failed to fetch donor data");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <ToastContainer />
      {/* Sidebar */}
      <aside
        className="bg-light p-3 shadow-sm"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "250px",
          height: "100vh",
          zIndex: 1000,
          overflowY: "auto",
        }}
      >
        <div className="d-flex flex-column justify-content-between h-100">
          <div>
            <h4 className="text-center text-danger fw-bold mb-4">
              Charity System
            </h4>
            <ul className="nav flex-column">
              <li className="nav-item mb-3">
                <button
                  onClick={() => navigate("/viewdonor")}
                  className="btn btn-outline-danger w-100 fw-semibold"
                >
                  VIEW DONOR
                </button>
              </li>
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
          minHeight: "100vh",
        }}
      >
        <h2 className="fw-bold text-danger text-center">All Donors</h2>
        <hr />

        {donors.length === 0 ? (
          <p className="text-center">No donors found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-danger">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, index) => (
                  <tr key={donor._id}>
                    <td>{index + 1}</td>
                    <td>{donor.name}</td>
                    <td>{donor.email}</td>
                    <td>{donor.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewDonor;
