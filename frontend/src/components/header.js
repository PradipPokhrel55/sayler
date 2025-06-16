import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchAppBar from "./searchbar";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import sayler from '../logo/images.png';
import MenuIcon from '@mui/icons-material/Menu';
import Categories from "./categories";

const Header = ({ setSearchQuery }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <header className="bg-customOrange flex items-center justify-between h-30 px-4 md:px-10 sticky top-0 z-50">
            <div className="flex flex-col items-center">
                <img src={sayler} alt="sayler" className="w-24 h-16" />
                {/* Categories positioned directly below the logo */}
                <Categories />
            </div>

            {/* Adjusted Search Bar Width */}
            <div className="flex-grow mx-4 md:w-1/2 lg:w-1/3">
                <SearchAppBar setSearchQuery={setSearchQuery} />
            </div>

            <div className="md:hidden flex items-center px-4">
                <MenuIcon onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none mr-4">
                    <svg className="w-6 h-6 text-white" style={{ color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </MenuIcon>
            </div>

            <nav
                ref={menuRef}
                className={`absolute top-16 right-0 bg-white rounded shadow-md p-4 md:flex md:items-center md:static md:bg-transparent md:shadow-none ${menuOpen ? 'block' : 'hidden'}`}
                style={{ zIndex: 1000 }}
            >
                <button onClick={() => navigate('')} className="block px-4 py-2 text-black hover:bg-gray-200">Login</button>
                <button onClick={() => navigate('/registration')} className="block px-4 py-2 text-black hover:bg-gray-200">Sign up</button>
                <button onClick={() => navigate('/help')} className="block px-4 py-2 text-black hover:bg-gray-200">Help</button>
            </nav>
            <span className="block mt-2 md:mt-0 md:ml-4" onClick={() => navigate('/cart')}>
                <ShoppingCartOutlinedIcon className="text-black hover:text-gray-500 " />
            </span>
        </header>
    );
}

export default Header;
