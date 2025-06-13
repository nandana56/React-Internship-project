import React from "react";
import footerLogo from "../../assets/logo.png";
import Banner from "../../assets/website/footer-pattern.jpg";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import "./Footer.css"; // Make sure this file exists in the same folder

const FooterLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
  
];

const FooterLinks1 = [
  { title: "Top Rated", link: "/topratedproducts" },
  { title: "Top Selling", link: "/topsellingproducts" },
  
  
];


const Footer = () => {
  const bannerStyle = {
    backgroundImage: `url(${Banner})`,
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <div className="footer text-white" style={bannerStyle}>
      <div className="container py-5 px-4 position-relative footer-animate">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-4">
            <h4 className="d-flex align-items-center gap-2">
              <img src={footerLogo} alt="Logo" className="footer-logo" />
              CartCraze
            </h4>
            <p>
              CartCraze – Where Style Meets Convenience!
Discover the latest trends in fashion with top-rated, best-selling, and curated collections for every occasion.
Shop effortlessly with easy navigation, wishlist saving, and a quick-buy checkout all designed just for you!


            </p>
          </div>

          {/* Links Columns */}
          <div className="col-md-5 row">
            <div className="col-6 mb-4">
              <h5>Important Links</h5>
              <ul className="list-unstyled">
                {FooterLinks.map((link) => (
                  <li key={link.title}>
                    <a href={link.link} className="footer-link">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-6 mb-4">
              <h5>Links</h5>
              <ul className="list-unstyled">
                {FooterLinks1.map((link1) => (
                  <li key={link1.title}>
                    <a href={link1.link} className="footer-link">
                      {link1.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="col-md-3 mt-4 mt-md-0">
            <div className="d-flex gap-3 mb-3">
              <a href="#"><FaInstagram size={28} /></a>
              <a href="#"><FaFacebook size={28} /></a>
              <a href="#"><FaLinkedin size={28} /></a>
            </div>
            <div>
              <p className="d-flex align-items-center gap-2">
                <FaLocationArrow /> TVM, Kerala
              </p>
              <p className="d-flex align-items-center gap-2 mt-2">
                <FaMobileAlt /> +91 7876789043
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
