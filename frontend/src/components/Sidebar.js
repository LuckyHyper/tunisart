import React from 'react';
import admin_icon from '../assets/admin-icon.png';
import poste_icon from '../assets/poste-icon.png';
import list_icon from '../assets/user-list-icon.png';
import domains_icon from '../assets/domains-icon.png';
import left_arrow from '../assets/left-arrow.png';
import { Link } from 'react-router-dom';

function Sidebar() {
  const admin = localStorage.getItem('email');
  return (
    <div>
      <div id="sidebar">
        <Link to="/" className="left-arrow">
          <img src={left_arrow} alt="" width="35px" height="35px" />
        </Link>
        <div className="admin-profile">
          <img src={admin_icon} alt="" width="100px" height="100px" />
          <h5 style={{ color: '#eeeeee' }}>{admin}</h5>
        </div>
        <ul>
          <Link to="" className="admin-pages">
            <img src={poste_icon} alt="" width="36px" height="36px" />
            <h4>Postes</h4>
          </Link>
          <Link to="condidates" className="admin-pages">
            <img src={list_icon} alt="" width="38px" height="38px" />
            <h4>Users List</h4>
          </Link>
          <Link to="domains" className="admin-pages">
            <img src={domains_icon} alt="" width="35px" height="35px" />
            <h4>Domains</h4>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
