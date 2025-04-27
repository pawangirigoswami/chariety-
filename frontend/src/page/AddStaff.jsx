import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    address: "",
    employeeId: "",
    joiningDate: "",
  });
  const [staffList, setStaffList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/getallstaff");
      setStaffList(response.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch staff list");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // update staff
        const response = await axios.post("http://localhost:5000/api/updatestaff",{
            id:editId,
            ...formData
        }) 
        console.log(response);
        toast.success("Staff updated successfully");
      } else {
        // add staff
        const response = await axios.post("http://localhost:5000/api/addstaff", formData);
        console.log(response);
        toast.success("Staff added successfully");
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        address: "",
        employeeId: "",
        joiningDate: "",
      });
      setEditMode(false);
      setEditId(null);
      fetchStaff();
    } catch (err) {
      console.log(err);
      toast.error("Failed to save staff. Please try again");
    }
  };

  const handleEdit = (staff) => {
    setFormData({
      name: staff.name,
      email: staff.email,
      password: "", // Password usually not prefilled
      role: staff.role,
      address: staff.address,
      employeeId: staff.employeeId,
      joiningDate: staff.joiningDate.split("T")[0], // format date properly
    });
    setEditMode(true);
    setEditId(staff._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      try {
        await axios.post("http://localhost:5000/api/deletestaff",{id});
        toast.success("Staff deleted successfully");
        fetchStaff();
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete staff");
      }
    }
  };

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
          minHeight: "100vh",
        }}
      >
        <div className="container p-4 shadow rounded" style={{ maxWidth: "100%" }}>
          <h3 className="text-center text-danger fw-bold mb-4">
            {editMode ? "Edit Staff" : "Add Staff"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {!editMode && (
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label fw-semibold">Select Role</label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select role</option>
                <option value="staff">Staff</option>
                <option value="supervisor">Supervisor</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                className="form-control"
                rows="2"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Employee ID</label>
              <input
                type="text"
                name="employeeId"
                className="form-control"
                value={formData.employeeId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                className="form-control"
                value={formData.joiningDate}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-danger w-100 fw-bold">
              {editMode ? "Update Staff" : "Add Staff"}
            </button>
          </form>

          {/* Staff List */}
          <hr className="my-5" />
          <h4 className="text-center fw-bold text-danger mb-3">Staff List</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center">
              <thead className="table-danger">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Address</th>
                  <th>Employee ID</th>
                  <th>Joining Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((staff) => (
                  <tr key={staff._id}>
                    <td>{staff.name}</td>
                    <td>{staff.email}</td>
                    <td>{staff.role}</td>
                    <td>{staff.address}</td>
                    <td>{staff.employeeId}</td>
                    <td>{new Date(staff.joiningDate).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleEdit(staff)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(staff._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {staffList.length === 0 && (
                  <tr>
                    <td colSpan="7">No staff found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddStaff;
