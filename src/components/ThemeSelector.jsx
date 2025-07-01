import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const ThemeSelector = () => {
    const colors = [
        { name: "Blue", hex: "#3B82F6" },
        { name: "Red", hex: "#EF4444" },
        { name: "Green", hex: "#10B981" },
        { name: "Yellow", hex: "#FACC15" },
        { name: "Purple", hex: "#8B5CF6" },
    ];

    const [selectedColor, setSelectedColor] = useState(colors[0].hex);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        document.body.style.backgroundColor = color; // Apply background color
        setDropdownOpen(false); // Close dropdown after selection
    };

    return (
        <div className="relative w-full">
            {/* Selected Color Display (Dropdown Button) */}
            <div
                className='w-full p-1 rounded-lg border text-[#989898] text-sm font-light cursor-pointer flex items-center justify-between'
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <div
                    className="w-[90%] h-3 rounded-full"
                    style={{ backgroundColor: selectedColor }}
                ></div>
                <span className="ml-2">
                    <IoIosArrowDown size={25} />
                </span>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div className="absolute left-0 w-full mt-2 bg-white shadow-lg border border-gray-200 rounded">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleColorSelect(color.hex)}
                        >
                            <div
                                className="w-5 h-5 rounded-full mr-2"
                                style={{ backgroundColor: color.hex }}
                            ></div>
                            <span>{color.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;
