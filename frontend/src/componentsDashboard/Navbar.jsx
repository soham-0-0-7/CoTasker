import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Eventform from './Eventform';
import Successpopup from '../errorMessage/Successpopup';

function Navbar({ user, onEventAdded }) {
  const [showEventForm, setShowEventForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("user_email");
    // setUserEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("jwt_token");
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="fixed top-0 w-full bg-white shadow-md h-16 flex items-center px-4 md:px-8 z-10">
      <div className="text-xl md:text-2xl font-bold text-gray-800">
        Hello {user}
      </div>

      <button
        className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        onClick={() => setShowEventForm(true)}
      >
        + Add Event
      </button>

      <div className="ml-4 flex gap-2">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {showEventForm && (
        <Eventform
          onClose={() => {
            setShowEventForm(false);
            onEventAdded();
          }}
        />
      )}

      {showSuccess && (
        <Successpopup
          message="Logged out successfully!"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}

export default Navbar;