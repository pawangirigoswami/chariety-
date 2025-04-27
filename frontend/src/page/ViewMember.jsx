import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ViewMember = () => {
  const [memberList, setMemberList] = useState([]);
  const navigate = useNavigate();

  const fetchMembers = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/getallmember");
      setMemberList(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch members");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.post("http://localhost:5000/api/deletememberbyid", { id });
        toast.success("Member deleted successfully");
        fetchMembers();
      } catch (err) {
        toast.error("Failed to delete member");
      }
    }
  };

  const handleEdit = (id) => {
    // Navigate to add member and pass the edit ID (you can modify AddMember to support editing via route if needed)
    navigate(`/addmember?id=${id}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetchMembers();
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
      <main className="p-5 bg-white" style={{ marginLeft: "250px", minHeight: "100vh",width:"85%" }}>
        <div className="container mt-4">
          <div className="shadow p-4 rounded bg-light">
            <h3 className="text-center text-danger fw-bold mb-4">Member List</h3>

            <div className="table-responsive shadow-sm rounded"  style={{ maxHeight: "600px", overflowY: "auto" }}>
              <table className="table table-bordered table-hover text-center">
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
                   
                  </tr>
                </thead>
                <tbody>
                  {memberList.map((member) => (
                    <tr key={member._id}>
                      <td>{member.membertype?.memberType}</td>
                      <td>{member.name}</td>
                      <td>
                        {member.image && (
                          <img
                            src={`http://localhost:5000/uploads/${member.image}`}
                            alt="Member"
                            width="50"
                          />
                        )}
                      </td>
                      <td>{member.address}</td>
                      <td>{member.contact}</td>
                      <td>
                        {member.addressProof && (
                          <a
                            href={`http://localhost:5000/uploads/${member.addressProof}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View
                          </a>
                        )}
                      </td>
                      <td>
                        {member.idProof && (
                          <a
                            href={`http://localhost:5000/uploads/${member.idProof}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View
                          </a>
                        )}
                      </td>
                      <td>{member.description}</td>
                      <td>{member.status}</td>
                      
                    </tr>
                  ))}
                  {memberList.length === 0 && (
                    <tr>
                      <td colSpan="10">No members found.</td>
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

export default ViewMember;
