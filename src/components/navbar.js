import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { RiArrowLeftDownLine, RiArrowLeftLine, RiArrowLeftSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white text-white fixed top-0 left-0 right-0 z-10 p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          
            <Link to="/"><button className="mr-2 text-gray-400">        <RiArrowLeftSLine size={36} />
          </button></Link>
  
           
        </div>
        <div style={{marginLeft: "-30px"}} className="text-center">
          <span className="text-3xl sm:text-xl md:text-xl lg:text-2xl xl:text-3xl text-gray-900">
            <strong>SHAH</strong> Drywall Ltd.
          </span>
        </div>
        <div></div>
      </div>
    </nav>
  );
}
