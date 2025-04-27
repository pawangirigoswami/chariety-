import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", userType: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(!formData.userType){
      toast.warn("Please select the user type")
      setLoading(false)
      return
    }

    try {
      const res = await axios.post("http://localhost:5000/api/loginuser", formData);
      const {status,success,message,token,user} = res.data
      // console.log(status)
      // console.log(success)
      // console.log(message)
      // console.log(token)
      // console.log(user)
      // console.log(res)

      if (!success) {
        toast.error(message || "Login failed.");
        setLoading(false);
        return;
      }

      if (formData.userType !== user.userType) {
        toast.error("User type does not match with your account.");
        setLoading(false);
        return;
      }

      
        toast.success("Login successfully")

        localStorage.setItem("token",token);
        localStorage.setItem("userId",user.id);
        localStorage.setItem("userType",user.userType)
        
        

        switch (user.userType) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "user":
            navigate("/user/dashboard");
            break;
          case "donor":
            navigate("/donor/dashboard");
            break;
          default:
            toast.warn("Invalid user type.");
        }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error occurred during login.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://shaligram.com/product-img/donation-for-charity-OPS-17-2-Zoom.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          borderRadius: "15px",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <ToastContainer />
        <h2 style={{ marginBottom: "20px", color: "#fff" }}>User Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            autoFocus
            style={inputStyle}
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              style={{ ...inputStyle, paddingRight: "70px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "#00f",
                cursor: "pointer",
                fontWeight: "bold",
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
            style={{ ...inputStyle, backgroundColor: "#fff", color: "#000" }}
          >
            <option value="">Select User Type</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="donor">Donor</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            style={{
              ...buttonStyle,
              backgroundColor: loading ? "#999" : "#1E90FF",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={{ ...buttonStyle, backgroundColor: "crimson", marginTop: "10px" }}
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  color: "#fff",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.3s ease-in-out",
};

export default Login;
