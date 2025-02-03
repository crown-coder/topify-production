import React from "react";
import { NAVIGATION_ITEMS } from "./constants";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-full p-4">
      <nav>
        {NAVIGATION_ITEMS.map((category, index) => (
          <div key={index} className="mb-6">
            {/* Category Title */}
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
              {category.category}
            </h3>
            <ul className="space-y-2">
              {/* Render Items */}
              {category.items.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.route}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-700"
                  >
                    {/* Replace with actual icons */}
                    <span className={`icon-placeholder ${item.icon} w-5 h-5`}></span>
                    <span className="text-sm">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
