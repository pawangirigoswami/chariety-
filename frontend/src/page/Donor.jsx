import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Donor = () => {
  
  const navigate = useNavigate();

  

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {/* Fixed Sidebar */}
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
        <h2 className="fw-bold text-danger text-center">Welcome to Donor Dashboard</h2>
        <hr />
        <div
          style={{
            backgroundImage:
              'url("https://ngofeed.com/blog/wp-content/uploads/2024/07/Fundraiser-vs-Donor-1024x597.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "75vh",
            borderRadius: "10px",
          }}
        ></div>
      </main>
    </div>
  );
};

export default Donor
