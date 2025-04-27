import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/getallappointment");
      console.log(res)
      setAppointments(res.data.data);

    } catch (error) {
      toast.error("Failed to fetch appointments");
    }
  };

  // Update appointment status (approve or reject)
  const updateAppointmentStatus = async (id, status) => {
    try {
      const res = await axios.post("http://localhost:5000/api/updateappointment", {
        id,
        status,
      });
      toast.success(`Appointment ${status}`);
      fetchAppointments(); // Refresh list
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Logout and redirect
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Fetch appointments when component mounts
  useEffect(() => {
    fetchAppointments();
  }, []);

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
            <h4 className="text-center text-danger fw-bold mb-4">Charity System</h4>
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
          <button className="btn btn-danger fw-bold w-100" onClick={handleLogout}>
            LOG OUT
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="p-5 bg-white" style={{ marginLeft: "250px", minHeight: "100vh" }}>
        <div className="container mt-4">
          <div className="shadow p-4 rounded bg-light">
            <h4 className="mb-4 text-danger">All Appointments</h4>
            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                      <tr key={appointment._id}>
                        <td>{index + 1}</td>
                        <td>{appointment.appointmentdate}</td>
                        <td>{appointment.appointmentfor}</td>
                        <td>{appointment.appointmenttime}</td>
                        <td>{appointment.reasonforappointment}</td>
                        <td>
                          <span
                            className={`badge ${
                              appointment.status === "approved"
                                ? "bg-success"
                                : appointment.status === "rejected"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {appointment.status || "pending"}
                          </span>
                        </td>
                        <td>
                          {appointment.status === "pending" ? (
                            <>
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() =>
                                  updateAppointmentStatus(appointment._id, "approved")
                                }
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  updateAppointmentStatus(appointment._id, "rejected")
                                }
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No appointments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAppointment;
