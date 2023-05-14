import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home/Home';
import axios from 'axios';
import DomainePage from './pages/DomainePage/DomainePage';
import EmailVerif from './pages/EmailVerif/EmailVerif';
import PostePage from './pages/Admin/PostePage';
import Condidates from './pages/Admin/Condidates';
import Admin from './pages/Admin/Admin';
import NavbarSearch from './components/NavbarSearch';
import Domains from './pages/Admin/Domains';
import PrivateRoutes from './components/PrivateRoutes';
import Marketpalce from './components/Marketpalce';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavbarSearch />}>
            <Route path="/" element={<Home />} />
            <Route path="marketplace" element={<Marketpalce />} />
            <Route path="domain" element={<DomainePage />} />
            <Route path="email-verification" element={<EmailVerif />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/admin" element={<Admin />}>
              <Route path="" element={<PostePage />} />
              <Route path="condidates" element={<Condidates />} />
              <Route path="domains" element={<Domains />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
