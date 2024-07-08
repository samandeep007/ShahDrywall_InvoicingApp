import React, { useState } from 'react';
import { RiArrowUpSLine, RiHome2Line, RiBuilding2Line, RiCarLine } from 'react-icons/ri';
import Main from './main';
import Navbar from './navbar';

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <Main />;
      case 2:
        return <ServicesContent />;
      case 3:
        return <AboutContent />;
      case 4:
        return <ContactContent />;
      default:
        return null;
    }
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      <div style={{ position: 'fixed', bottom: '0', width: '100%', zIndex: '999' }}>
        <div className="flex justify-center bg-white">
          <TabButton
            tabNumber={1}
            isActive={activeTab === 1}
            onClick={handleTabClick}
          >
            <div className="flex flex-col items-center">
              <RiArrowUpSLine size={24} />
              <span className="text-sm mt-1">Upper</span>
            </div>
          </TabButton>
          <TabSeparator />
          <TabButton
            tabNumber={2}
            isActive={activeTab === 2}
            onClick={handleTabClick}
          >
            <div className="flex flex-col items-center">
              <RiHome2Line size={24} />
              <span className="text-sm mt-1">Main</span>
            </div>
          </TabButton>
          <TabSeparator />
          <TabButton
            tabNumber={3}
            isActive={activeTab === 3}
            onClick={handleTabClick}
          >
            <div className="flex flex-col items-center">
              <RiBuilding2Line size={24} />
              <span className="text-sm mt-1">Basement</span>
            </div>
          </TabButton>
          <TabSeparator />
          <TabButton
            tabNumber={4}
            isActive={activeTab === 4}
            onClick={handleTabClick}
          >
            <div className="flex flex-col items-center">
              <RiCarLine size={24} />
              <span className="text-sm mt-1">Garage</span>
            </div>
          </TabButton>
        </div>
      </div>
      <div>
        <div className="p-4">{renderTabContent()}</div>
      </div>
    </div>
  );
};

const TabButton = ({ tabNumber, isActive, onClick, children }) => {
  return (
    <button
      className={`flex items-center py-4 px-6 ${
        isActive
          ? 'border-b-4 border-indigo-500 text-indigo-500'
          : 'text-gray-800 hover:text-indigo-500'
      }`}
      onClick={() => onClick(tabNumber)}
    >
      {children}
    </button>
  );
};

const TabSeparator = () => {
  return <div className="w-10.5 bg-gray-200"></div>;
};

const HomeContent = () => {
  return <h1>Home Content</h1>;
};

const ServicesContent = () => {
  return <h1>Services Content</h1>;
};

const AboutContent = () => {
  return <h1>About Content</h1>;
};

const ContactContent = () => {
  return <h1>Contact Content</h1>;
};

export default TabNavigation;
