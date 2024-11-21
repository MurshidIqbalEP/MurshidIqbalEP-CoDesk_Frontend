import React from 'react';
import Logo from "../assets/CoDesk2-removebg-preview.png"
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/userSlice'; 
import { logout } from '../api/auth';


const Header: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    console.log('a');
    
    let res = await logout()
    if(res){
      dispatch(logOut()); 
      navigate('/login'); 
    }
  };

  return (
    <header className="bg-gray-900 text-white ">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="w-[200px]" />

        {/* Buttons */}
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              {/* Display user info and logout button */}
              <span className="text-white">{user?.name}</span>
              <button
                className="bg-transparent border border-white px-4 py-1 rounded hover:bg-gradient-to-r from-purple-700 to-purple-950 hover:border-none hover:text-purple-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Display login and signup buttons if not logged in */}
              <button
                className="bg-transparent border border-white px-4 py-1 rounded hover:bg-gradient-to-r from-purple-700 to-purple-950 hover:border-none hover:text-purple-700 transition"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
