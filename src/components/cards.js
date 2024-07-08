import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaCog, FaChartBar, FaCalculator, FaFileInvoice } from 'react-icons/fa';
import Navbar from './navbar';

const Card = ({ icon, text, link }) => {
  return (
    <Link
      to={link}
      style={{padding: "65px"}}
      className="group flex flex-col items-center mr-6 mb-3 mt-1  justify-center rounded-lg shadow-md bg-white  m-4 md:m-8 hover:bg-gray-100 transition duration-300"
    >
      <div className="mb-4 text-4xl text-gray-500 group-hover:text-blue-500 transition duration-300">
        {icon}
      </div>
      <div className="text-center">
        <p className="text-xl font-medium text-gray-800">{text}</p>
      </div>
    </Link>
  );
};

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen my-10">
      <div style={{marginTop: "70px"}} className="flex flex-col md:flex-row mt-10 ">
        <Card icon={<FaCalculator />} text="Area Calculator" link="/calculator" />
        <Card icon={<FaFileInvoice />} text="Invoice Generator" link="/invoice" />
        <Card icon={<FaChartBar />} text="Analytics" link="/analytics" />
      </div>
    </div>
    {/* Footer */}
    <footer className="bg-gray-200 text-center p-4">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Shah Drywall Ltd. All rights reserved.
        </p>
      </footer>
    </>
    
  );
};

export default HomePage;
