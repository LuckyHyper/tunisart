import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import './Admin.css';

function Admin() {
  return (
    <div id="admin">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Admin;
