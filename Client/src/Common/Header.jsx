import './Header.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0); // If scrollY > 0, user has scrolled
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`header ${(isScrolled) ? 'scrolled' : '' }`}>
            <div className="logo">
                Site Name
            </div>
            <div className="headerEleDiv">
                <Link className="headerEle" to={'/'}>Home</Link>
                <Link className="headerEle" to={'/blog'}>Blog</Link>
                <Link className="headerEle" to={'/about'}>About</Link>
                <Link className="headerEle" to={'/support'}>Support</Link>
            </div>
            <div className="accountActionDiv">
                <Link className="acountAction" to={'/'}>Help</Link>
                <Link className="acountAction" to={'/login'}>LogIn</Link>
                <Link className="acountAction" to={'/register'}>Register</Link>
            </div>
        </div>
    )
}

export default Header;