import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const PublicLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      {/* Main Content Area */}
      <main className="flex-grow-1">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicLayout;
