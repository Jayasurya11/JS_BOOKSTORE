import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Logout = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleLogout = () => {
    logout()
      .then(() => {
        
        toast.error("Logged Out",{
          className:"toast-message"
        })
        navigate(from, { replace: true });
      })
      .catch((error) => {});
  };
  return (
    <div className="h-screen bg-teal-100 flex items-center justify-center">
      <button
        onClick={handleLogout}
        className="bg-red-700 px-8 rounded  text-white py-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
