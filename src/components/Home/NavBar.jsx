import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/logo.png';
import MenuIcon from '../../assets/home/Menu.png';

const NavBar = () => {
    const [isNavBarOpen, setIsNavBarOpen] = useState(false);

    const toggleMenu = () => {
        setIsNavBarOpen(!isNavBarOpen);
    };

    return (
        <header className='w-[70%] max-lg:w-[95%] mt-7 bg-white shadow-lg shadow-[#FAFAFA] flex justify-between items-center p-3 rounded-lg relative z-50'>
            <Link to="/">
                <img src={Logo} alt="Logo" />
            </Link>

            {/* Mobile Nav with Animation */}
            <AnimatePresence>
                {isNavBarOpen && (
                    <motion.div
                        initial={{ scaleY: 0, opacity: 0, transformOrigin: "top" }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden flex flex-col-reverse absolute top-20 left-0 p-4 bg-white shadow-sm shadow-[#057DD126] w-full rounded-lg"
                    >
                        <nav>
                            <ul className='flex flex-col gap-7 text-sm font-bold text-[#BDBDBD]'>
                                <li className='text-[#057DD1]'><Link to="/" onClick={() => setIsNavBarOpen(false)}>Home</Link></li>
                                <li><Link to="/about" onClick={() => setIsNavBarOpen(false)}>About Us</Link></li>
                                <li><Link to="/contact" onClick={() => setIsNavBarOpen(false)}>Contact</Link></li>
                                <li><Link to="/help" onClick={() => setIsNavBarOpen(false)}>Help</Link></li>
                            </ul>
                        </nav>
                        <div className="flex gap-3 mb-4">
                            <Link to="/login" className='py-2 px-4 rounded-lg border border-[#057DD126] shadow-sm text-[#057DD1] w-[50%]' onClick={() => setIsNavBarOpen(false)}>
                                Login
                            </Link>
                            <Link to="/signup" className='py-2 px-4 rounded-lg border border-[#057DD1] shadow-sm bg-[#057DD1] text-white w-[50%]' onClick={() => setIsNavBarOpen(false)}>Register</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-40">
                <nav>
                    <ul className='flex gap-7 text-sm font-bold text-[#BDBDBD]'>
                        <li className='text-[#057DD1]'><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/help">Help</Link></li>
                    </ul>
                </nav>
                <div className="flex items-center gap-3">
                    <Link to="/login" className='py-1 px-3 rounded-lg border border-[#057DD126] shadow-sm text-[#057DD1]' >Login</Link>
                    <Link to="/signup" className='py-1 px-3 rounded-lg border border-[#057DD1] shadow-sm bg-[#057DD1] text-white'>Register</Link>
                </div>
            </div>

            {/* Menu Button for Mobile */}
            <button onClick={toggleMenu} className='block lg:hidden'>
                <img src={MenuIcon} alt="Menu Icon" />
            </button>
        </header>
    );
};

export default NavBar;
