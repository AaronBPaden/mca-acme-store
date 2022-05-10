import { Link, Outlet } from 'react-router-dom';
const Footer = () => {
    return(
        <footer className="footer">
            <span className="colophon">©2022 Aaron Paden <a className="footer-link" href="mailto:aaronbpaden@gmail.com">&lt;aaronbpaden@gmail.com&gt;</a></span>
            <div className="footer-links">
                <Link className="footer-link" to="/items">Full Product Catalog</Link> | <Link className="footer-link" to="/about">About</Link>
            </div>
        </footer>
    );
}

export default Footer;
