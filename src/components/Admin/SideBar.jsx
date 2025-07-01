import React from "react";
import { ADMIN_NAVIGATION_ITEMS } from "../../constants/constants";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import UserTag from "../../assets/tag-user.png"

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, closeModal, iconsOnly }) => {
  const location = useLocation();

  const handleCloseModal = () => {
    setIsSidebarOpen(false);
    closeModal();
  };

  return (
    <aside
      className={`fixed top-2 left-2 h-screen transition-all duration-100 ${iconsOnly ? "w-10px" : "w-[225px]"
        } max-lg:w-[50%] max-lg:shadow-lg overflow-y-auto rounded-xl py-4 pl-4 bg-white dark:bg-gray-800 z-50 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
    >
      <div className="logo mb-6">
        <img src={Logo} width={50} height={42} alt="Logo" />
      </div>

      <div className={`bg-[#DD2020] py-1 px-2 rounded-md ${iconsOnly ? "mr-0" : "mr-10"} my-3 flex items-center gap-2`}>
        <img src={UserTag} alt="User Tag" />
        <h2 className={`text-[#FEFEFE] text-lg ${iconsOnly ? "hidden" : "block"}`}>Admin Panel</h2>
      </div>

      {ADMIN_NAVIGATION_ITEMS.map((category, index) => (
        <div key={index}>
          <h3
            className={`text-[#A1A1A1] text-[14px] mb-1 ${iconsOnly ? "hidden" : ""
              }`}
          >
            {category.category}
          </h3>
          <ul
            className={`flex flex-col ${iconsOnly ? "gap-5" : ""} gap-1 items-start`}
          >
            {category.items.map((item, idx) => {
              const isActive =
                location.pathname === `/admin/${item.route}` ||
                location.pathname.startsWith(`/admin/${item.route}/`);

              return (
                <Link
                  key={idx}
                  to={`/admin/${item.route}`}
                  className={`pl-3 py-1 w-full ${iconsOnly ? "mb-[5px]" : ""} max-lg:text-sm text-left text-[15px] rounded-tl-lg rounded-bl-lg flex items-center gap-2 font-light ${isActive ? "bg-[#4CACF0] text-[#175682]" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  onClick={handleCloseModal}
                >
                  <span className={`${iconsOnly ? "text-xl text-gray-500" : ""} ${isActive && iconsOnly ? "text-white" : ""}`}>
                    <item.icon />
                  </span>
                  <span className={`${iconsOnly ? "hidden" : ""}`}>{item.name}</span>
                </Link>
              );
            })}

          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
