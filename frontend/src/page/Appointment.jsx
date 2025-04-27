import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    appointmentfor: "",
    reasonforappointment: "",
    appointmentdate: "",
    appointmenttime: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/addappointment", formData);
    
      toast.success("Appointment requested successfully!");
      setFormData({
        appointmentfor: "",
        reasonforappointment: "",
        appointmentdate: "",
        appointmenttime: "",
      });
    } catch (err) {
      // console.error("Error adding appointment:", err);
      toast.error("Failed to request appointment.");
    }
  };

  return (
    <div>
      {/* Fixed Sidebar */}
      <ToastContainer/>
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
              charity system
            </h4>
            <ul className="nav flex-column">
              {[
                { name: "FUND RAISER", path: "/fundraiser" },
                { name: "APPOINTMENT", path: "/donor/appointment" },
                {name:"VIEW APPOINTMENT",path:"/view/appointment"}
                
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
          minHeight: "100vh",
        }}
      >
        <h2 className="fw-bold text-danger text-center">Request Appointment</h2>
        <hr />
        <form
          onSubmit={handleSubmit}
          className="bg-light p-4 rounded shadow-sm"
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <div className="mb-3">
            <label className="form-label fw-semibold">Appointment For</label>
            <input
              type="text"
              className="form-control"
              name="appointmentfor"
              value={formData.appointmentfor}
              onChange={handleChange}
              required
              placeholder="e.g. Blood Donation"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Reason For Appointment</label>
            <textarea
              className="form-control"
              name="reasonforappointment"
              rows="3"
              value={formData.reasonforappointment}
              onChange={handleChange}
              required
              placeholder="Describe your reason"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Appointment Date</label>
            <input
              type="date"
              className="form-control"
              name="appointmentdate"
              value={formData.appointmentdate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Appointment Time</label>
            <input
              type="time"
              className="form-control"
              name="appointmenttime"
              value={formData.appointmenttime}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100 fw-bold">
            Request Appointment
          </button>
        </form>
      </main>
    </div>
  );
};

export default Appointment;
