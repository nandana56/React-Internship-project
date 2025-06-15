import React from "react";
import Image1 from "../../assets/hero/men.png";
import Image2 from "../../assets/hero/shopping.png";
import Image3 from "../../assets/hero/sale.png";
import Slider from "react-slick";
import "./Hero.css"; // ✅ Import custom CSS

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Upto 50% off on all Men's Wear",
    
  },
  {
    id: 2,
    img: Image2,
    title: "30% off on all Women's Wear",
    
  },
  {
    id: 3,
    img: Image3,
    title: "70% off on all Products Sale",
    
  },
];

const Hero = ({ handleOrderPopup }) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    accessibility: false, 
    pauseOnHover: true,
    pauseOnFocus: true,
  };

  return (
    <div className="hero-container">
      <div className="hero-bg-pattern"></div>
      <div className="container pb-5">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div key={data.id}>
              <div className="hero-slide align-items-center">
                {/* Text Section */}
                <div className="hero-text order-2 order-sm-1">
                  <h1
                    data-aos="zoom-out"
                    data-aos-duration="500"
                    data-aos-once="true"
                    className="hero-title"
                  >
                    {data.title}
                  </h1>
                  <p
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="100"
                    className="text-muted"
                  >
                    {data.description}
                  </p>
                  <div data-aos="fade-up" data-aos-duration="500" data-aos-delay="300">
                    
                  </div>
                </div>

                {/* Image Section */}
                <div className="hero-image order-1 order-sm-2">
                  <div data-aos="zoom-in" data-aos-once="true">
                    <img src={data.img} alt="Offer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
