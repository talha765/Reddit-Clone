import logo from '../assets/backpack.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <header className="fixed top-0 left-0 w-full flex items-center bg-gray-900 p-3 z-50 border-b border-gray-300 ">
            {/* Logo */}
            <div className="mx-4">
                <img src={logo} className="w-10 h-10 mr-20" alt="Logo" />
            </div>

            {/* Search Bar */}
            <form action="" className="relative flex items-center bg-gray-600 rounded-2xl mx-4 ml-10 mr-10" style={{ width: '500px' }}>
                <input
                    type="text"
                    className="bg-gray-600 h-10 w-full text-white pl-10 pr-3 rounded-2xl"
                    placeholder="Search InventSpace"
                />
                <svg
                    className="absolute left-3 w-6 h-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a4 4 0 11-8 0 4 4 0 018 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 18l-4.35-4.35" />
                </svg>
            </form>

            <button className="ml-1 mr-10 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-2 px-2 rounded-lg transition duration-200 ease-in-out" style={{ fontSize: '14px' }}>
                Search Solution
            </button>

            {/* Get App and Login Buttons */}
            <div className="flex items-center space-x-4 ml-auto">
                <Link to="/signup">
                <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out">
                    Sign Up
                </button>
                </Link>
                <Link to="/login">
                    <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out">
                        Login
                    </button>
                </Link>
            </div>
        </header>
    );
};

export default NavBar;
