import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const viewFundraise = () => {
  const [funds, setFunds] = useState([]);
  
  
 
  const navigate = useNavigate()

 

  const fetchFunds = async () => {
    const res = await axios.post('http://localhost:5000/api/getallfund');
    setFunds(res.data.data);
    // toast.success("all fund get successfully")
  };

  useEffect(() => {
    fetchFunds();
  }, []);


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
      <main className="p-5 bg-white" style={{ marginLeft: '250px', minHeight: '100vh' }}>
      <div className="container mt-4">
        <div className="shadow p-4 rounded bg-light">
          

         

          <hr className="my-4" />
          <h4 className="text-center text-danger">Fund List</h4>

          <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
            <table className="table table-bordered text-center">
              <thead className="table-danger">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                
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

export default viewFundraise;
