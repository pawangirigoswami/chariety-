import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddMember = () => {
  const [formData, setFormData] = useState({
    memberType: "",
    name: "",
    address: "",
    contact: "",
    description: "",
    status: "",
  });

  const [memberType, setMemberType] = useState([]);
  const [memberList, setMemberList] = useState([]);

  const [image, setImage] = useState(null);
  const [addressProof, setAddressProof] = useState(null);
  const [idProof, setIdProof] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  const fetchMembers = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/getallmember");
      setMemberList(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch members");
    }
  };

  const fetchMemberType = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/getallmembertype");
      setMemberType(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch member types");
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchMemberType();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    const selectedMemberType = memberType.find((type) => type.memberType === formData.memberType);
    if (!selectedMemberType) {
      toast.error("Invalid member type");
      return;
    }
    form.append("membertype", selectedMemberType._id);
    form.append("name", formData.name);
    form.append("address", formData.address);
    form.append("contact", formData.contact);
    form.append("description", formData.description);
    form.append("status", formData.status);
    if (image) form.append("image", image);
    if (addressProof) form.append("addressProof", addressProof);
    if (idProof) form.append("idProof", idProof);
    if (editMode) form.append("id", editId);

    try {
      const url = editMode
        ? "http://localhost:5000/api/updatemember"
        : "http://localhost:5000/api/createmember";
      const res = await axios.post(url, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(editMode ? "Member updated" : "Member added successfully");
      } else {
        toast.error(res.data.message);
      }

      setFormData({
        memberType: "",
        name: "",
        address: "",
        contact: "",
        description: "",
        status: "",
      });
      setImage(null);
      setAddressProof(null);
      setIdProof(null);
      setEditMode(false);
      setEditId(null);
      fetchMembers();
    } catch (err) {
      toast.error("Error saving member");
    }
  };

  const handleEdit = (member) => {
    setFormData({
      memberType: member.membertype.memberType,
      name: member.name,
      address: member.address,
      contact: member.contact,
      description: member.description,
      status: member.status,
    });
    setEditId(member._id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.post("http://localhost:5000/api/deletememberbyid", { id });
        toast.success("Member deleted");
        fetchMembers();
      } catch (err) {
        toast.error("Failed to delete");
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
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
            <h3 className="text-center text-danger fw-bold mb-4">
              {editMode ? "Edit Member" : "Add Member"}
            </h3>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Member Type</label>
                  <select
                    name="memberType"
                    className="form-control"
                    value={formData.memberType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Member Type</option>
                    {memberType.map((type) => (
                      <option key={type._id} value={type.memberType}>
                        {type.memberType}
                      </option>
                    ))}
                  </select>
                </div>

                {[
                  { label: "Name", name: "name" },
                  { label: "Address", name: "address" },
                  { label: "Contact", name: "contact" },
                  { label: "Description", name: "description" },
                  { label: "Status", name: "status" },
                ].map(({ label, name }) => (
                  <div className="col-md-6 mb-3" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                      type="text"
                      name={name}
                      className="form-control"
                      value={formData[name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <div className="col-md-4 mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleFileChange(e, setImage)}
                    accept="image/*"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Address Proof</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleFileChange(e, setAddressProof)}
                    accept="image/*,application/pdf"
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">ID Proof</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleFileChange(e, setIdProof)}
                    accept="image/*,application/pdf"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-danger w-100 fw-bold">
                {editMode ? "Update Member" : "Add Member"}
              </button>
            </form>

            <hr className="my-4" />
            <h4 className="text-center text-danger">Member List</h4>

            {/* Scrollable Container */}
            <div style={{ maxHeight: "150px", overflowY: "auto" }}>
              <table className="table table-bordered text-center">
                <thead className="table-danger">
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Address</th>
                    <th>Contact</th>
                    <th>Address Proof</th>
                    <th>ID Proof</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {memberList.map((member) => (
                    <tr key={member._id}>
                      <td>{member.membertype?.memberType}</td>
                      <td>{member.name}</td>
                      <td>
                        {member.image && (
                          <img src={`http://localhost:5000/uploads/${member.image}`} alt="img" width="50" />
                        )}
                      </td>
                      <td>{member.address}</td>
                      <td>{member.contact}</td>
                      <td>
                        {member.addressProof && (
                          <a href={`http://localhost:5000/uploads/${member.addressProof}`} target="_blank" rel="noreferrer">
                            View
                          </a>
                        )}
                      </td>
                      <td>
                        {member.idProof && (
                          <a href={`http://localhost:5000/uploads/${member.idProof}`} target="_blank" rel="noreferrer">
                            View
                          </a>
                        )}
                      </td>
                      <td>{member.description}</td>
                      <td>{member.status}</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(member)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(member._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AddMember;
