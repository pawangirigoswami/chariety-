import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const FundRaise = () => {
  const [funds, setFunds] = useState([]);
  const [formData, setFormData] = useState({
    tittle: '',
    description: '',
    startDate: '',
    endDate: '',
    amount: '',
    status: '',
  });

  const token = localStorage.getItem("token");
  console.log(token);

  // if (token) {
  //   const decoded = jwt_decode(token); // Using the default export function
  //   console.log(decoded);
  // }
  
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchFunds = async () => {
    const res = await axios.post('http://localhost:5000/api/getallfund');
    setFunds(res.data.data);
    // toast.success("all fund get successfully")
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  // if(funds){
  //   console.log(funds)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        
       const updated =  await axios.post("http://localhost:5000/api/updatefund",{id:editingId,...formData});
       toast.success("fund updated successfully")
      } else {
        const add =   await axios.post('http://localhost:5000/api/addfund', formData);
        toast.success("fund is added successfully")
      }
      setFormData({ tittle: '', description: '', startDate: '', endDate: '', amount: '', status: '' });
      setEditMode(false);
      setEditingId(null);
      fetchFunds();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (fund) => {
    const formattedStartDate = new Date(fund.startDate).toISOString().split('T')[0]; // Format to 'yyyy-MM-dd'
    const formattedEndDate = new Date(fund.endDate).toISOString().split('T')[0]; // Format to 'yyyy-MM-dd'
  
    setFormData({
      ...fund,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
    setEditMode(true);
    setEditingId(fund._id);
  };

  // console.log(editingId)
  

  const handleDelete = async (id) => {
    const deleteUser =  await axios.post("http://localhost:5000/api/deletefund",{id});
    fetchFunds();
    toast.success("fund deleted successfully")
  };


  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
// console.log(funds.data)

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
      <main className="p-5 bg-white" style={{ marginLeft: '250px', minHeight: '100vh' }}>
      <div className="container mt-4">
        <div className="shadow p-4 rounded bg-light">
          <h3 className="text-center text-danger fw-bold mb-4">
            {editMode ? 'Edit Fund' : 'Add Fund'}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {[{ label: 'Title', name: 'tittle' }, { label: 'Description', name: 'description' },
                { label: 'Start Date', name: 'startDate', type: 'date' },
                { label: 'End Date', name: 'endDate', type: 'date' },
                { label: 'Amount', name: 'amount', type: 'number' },
                { label: 'Status', name: 'status' }].map(({ label, name, type = 'text' }) => (
                <div className="col-md-6 mb-3" key={name}>
                  <label className="form-label">{label}</label>
                  <input
                    type={type}
                    name={name}
                    className="form-control"
                    value={formData[name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>

            <button type="submit" className="btn btn-danger w-100 fw-bold">
              {editMode ? 'Update Fund' : 'Add Fund'}
            </button>
          </form>

          <hr className="my-4" />
          <h4 className="text-center text-danger">Fund List</h4>

          <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
            <table className="table table-bordered text-center">
              <thead className="table-danger">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {funds.map((fund) => (
                  <tr key={fund._id}>
                    <td>{fund.tittle}</td>
                    <td>{fund.description}</td>
                    <td>{fund.startDate}</td>
                    <td>{fund.endDate}</td>
                    <td>{fund.amount}</td>
                    <td>{fund.status}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(fund)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(fund._id)}>Delete</button>
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

export default FundRaise;
