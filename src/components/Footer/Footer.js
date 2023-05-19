import { React } from 'react';
import './Footer.css';
import { FaInstagram, FaFacebookSquare, FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer flexColumn">
            <div className="mw1100 ph-20 flexRow flexBetween flexAlignCenter">
                <h1 className="footer-logo"><a href="/home">Tabber</a></h1>
                <div className="flexRow flexBetween flexAlignCenter">
                    <a href="/about" className="grow2 footer-links">About</a>
                    <a href="/contact" className="grow2 footer-links mh-40">Contact</a>
                    <a href="/terms" className="grow2 footer-links mr-40">T&C</a>
                    <a href="/policy" className="grow2 footer-links mr-40">Privacy Policy</a>
                    <a href="https://www.linkedin.com/company/tabberonline/" className="grow2 footer-links linkedinIcon">
                        <span><FaLinkedin /></span>
                    </a>
                    <a href="https://www.instagram.com/tabber.online/" className="grow2 footer-links instagramIcon">
                        <span><FaInstagram /></span>
                    </a>
                    <a href="https://www.facebook.com/tabberonline/" className="grow2 footer-links facebookIcon">
                        <span><FaFacebookSquare /></span>
                    </a>
                </div>
            </div>
            <div className="copyright">
                <p>Tabber &copy; 2021</p>
            </div>
        </footer>
    );
}

export default Footer;