import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    userType: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, address, userType } = formData;
    if (!name || !email || !password || !phone || !address || !userType) {
      toast.warn("All fields are required");
      return;
    }
   
    try {
      const res = await axios.post("http://localhost:5000/api/createuser", formData);
      if(res.data.success ===false || res.data.message === "user already exist"){
        toast.error("User already exist");
        return
      }
      toast.success(res.data.message || "user is created successfully");
      console.log(res.data.message)
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Registration failed");
    }
  };
  console.log(formData)
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667EEA, #764BA2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "30px",
          maxWidth: "1000px",
          width: "100%",
          display: "flex",
          boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        {/* Left Form Section */}
        <div style={{ flex: 1, padding: "40px" }}>
          <h2 style={{ color: "#333", marginBottom: "20px" }}>Register Now</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ ...inputStyle, paddingRight: "80px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#667EEA",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
              style={{ ...inputStyle, color: formData.userType ? "#333" : "#999" }}
            >
              <option value="">Select Role</option>
            
              <option value="user">user</option>
              <option value="donor">donor</option>
            </select>
            <button type="submit" style={submitStyle}>Sign Up</button>

            <button onClick={()=>navigate("/")} style={submitStyle}>Log out</button>
            <p style={{ marginTop: "15px", textAlign: "center", color: "#666" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#667EEA", fontWeight: "bold" }}>
                Login
              </Link>
            </p>
          </form>
        </div>
        {/* Right Illustration Section */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(to top right, #667EEA, #764BA2)",
            padding: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://marketplace.canva.com/EAFQ2PnDmVk/1/0/1600w/canva-simple-black-and-turquoise-welcome-instagram-post-_L7k8MOUlNE.jpg"
            alt="Form Art"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};
const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  margin: "10px 0",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none",
};
const submitStyle = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(90deg, #667EEA, #764BA2)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
};
export default Signup