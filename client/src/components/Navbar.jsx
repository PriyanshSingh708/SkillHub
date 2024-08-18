import React, { useContext } from 'react';
import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(GeneralContext);

  if (!logout) {
    console.error("Context 'logout' function is not defined");
    return null;
  }

  const usertype = localStorage.getItem('usertype');

  return (
    <>
      {usertype === 'freelancer' && (
        <div className="navbar">
          <h3>SkillHub</h3>
          <div className="nav-options">
            <p onClick={() => navigate('/freelancer')}>Dashboard</p>
            <p onClick={() => navigate('/all-projects')}>All Projects</p>
            <p onClick={() => navigate('/my-projects')}>My Projects</p>
            <p onClick={() => navigate('/myApplications')}>Applications</p>
            <p onClick={() => logout()}>Logout</p>
          </div>
        </div>
      )}
      
      {usertype === 'client' && (
        <div className="navbar">
          <h3>SkillHub</h3>
          <div className="nav-options">
            <p onClick={() => navigate('/client')}>Dashboard</p>
            <p onClick={() => navigate('/new-project')}>New Project</p>
            <p onClick={() => navigate('/project-applications')}>Applications</p>
            <p onClick={() => logout()}>Logout</p>
          </div>
        </div>
      )}
      
      {usertype === 'admin' && (
        <div className="navbar">
          <h3>SkillHub (admin)</h3>
          <div className="nav-options">
            <p onClick={() => navigate('/admin')}>Home</p>
            <p onClick={() => navigate('/all-users')}>All users</p>
            <p onClick={() => navigate('/admin-projects')}>Projects</p>
            <p onClick={() => navigate('/admin-applications')}>Applications</p>
            <p onClick={() => logout()}>Logout</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
