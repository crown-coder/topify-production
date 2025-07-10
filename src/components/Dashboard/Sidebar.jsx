import { useState, useEffect } from "react";
import axios from "axios";
import { NAVIGATION_ITEMS } from "../../constants/constants";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Sidebar = ({
    isSidebarOpen,
    setIsSidebarOpen,
    closeModal,
    iconsOnly,
    onLogout
}) => {
    const location = useLocation();

    const handleCloseModal = () => {
        setIsSidebarOpen(false);
        if (closeModal) closeModal();
    };

    const [isAdmin, setIsAdmin] = useState(false);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/api2/user', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });

            if (response?.data?.is_admin !== undefined) {
                setIsAdmin(response.data.is_admin);
            } else {
                console.warn('is_admin not found in response:', response.data);
            }

        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);


    return (
        <aside
            className={`fixed top-2 left-2 h-screen transition-all duration-100 ${iconsOnly ? "w-10px" : "w-[225px]"
                } max-lg:w-[50%] max-lg:shadow-lg overflow-y-auto rounded-xl py-4 pl-4 bg-white dark:bg-gray-800 z-50 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
        >
            <div className="logo mb-6">
                <img src={Logo} width={50} height={42} alt="Logo" />
            </div>

            {/* Admin Button */}
            <button
                onClick={() => window.location.href = 'https://app.topify.ng/admin/dashboard'}
                className={`py-1 px-3 rounded-md bg-red-500 text-white items-center gap-2 hover:bg-red-600 duration-75 mb-2 ${isAdmin ? 'flex' : 'hidden'}`}
            >
                <MdOutlineAdminPanelSettings className="text-xl" />
                <span className={`${iconsOnly ? 'hidden' : ''}`}>Admin Panel</span>
            </button>


            {NAVIGATION_ITEMS.map((category, index) => (
                <div key={index}>
                    <h3 className={`text-[#A1A1A1] text-[14px] mb-1 ${iconsOnly ? "hidden" : ""}`}>
                        {category.category}
                    </h3>
                    <ul className={`flex flex-col ${iconsOnly ? "gap-5" : ""} gap-1 items-start`}>
                        {category.items.map((item, idx) => {
                            const isActive =
                                location.pathname === `/dashboard/${item.route}` ||
                                location.pathname.startsWith(`/dashboard/${item.route}/`);

                            // Special handling for logout button
                            if (item.route === "logout") {
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            handleCloseModal();
                                            onLogout();
                                        }}
                                        className={`pl-3 py-1 w-full ${iconsOnly ? "mb-[5px]" : ""} 
                                            max-lg:text-sm text-left text-[15px] rounded-tl-lg rounded-bl-lg 
                                            flex items-center gap-2 font-light hover:bg-gray-100 dark:hover:bg-gray-700`}
                                    >
                                        <span className={`${iconsOnly ? "text-xl " : ""}`}>
                                            <item.icon className="text-red-500" />
                                        </span>
                                        <span className={`${iconsOnly ? "hidden" : ""} text-red-500`}>{item.name}</span>
                                    </button>
                                );
                            }

                            // Regular navigation items
                            return (
                                <Link
                                    key={idx}
                                    to={`/dashboard/${item.route}`}
                                    className={`pl-3 py-1 w-full ${iconsOnly ? "mb-[5px]" : ""
                                        } max-lg:text-sm text-left text-[15px] rounded-tl-lg rounded-bl-lg flex items-center gap-2 font-light ${isActive
                                            ? "bg-[#4CACF0] text-[#175682]"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                    onClick={handleCloseModal}
                                >
                                    <span
                                        className={`${iconsOnly ? "text-xl text-gray-500" : ""} ${isActive && iconsOnly ? "text-white" : ""
                                            }`}
                                    >
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