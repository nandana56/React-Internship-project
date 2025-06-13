import React from "react";
import "./Banner.css"; // Custom styles
import BannerImg from "../../assets/women/women2.jpg";
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";

const Banner = () => {
  return (
    <div className="banner-section d-flex align-items-center py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Image Section */}
          <div className="col-12 col-sm-6 text-center" data-aos="zoom-in">
            <img
              src={BannerImg}
              alt="Banner"
              className="banner-img img-fluid shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="col-12 col-sm-6">
            <div className="d-flex flex-column gap-3">
              <h1 className="fw-bold display-6" data-aos="fade-up">
                Winter Sale up to 50% Off
              </h1>
              <p className="text-muted small" data-aos="fade-up">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                reiciendis inventore iste ratione ex alias quis magni at optio
              </p>

              <div className="d-flex flex-column gap-3 mt-3">
                <div className="d-flex align-items-center gap-3" data-aos="fade-up">
                  <div className="icon-box bg-purple text-white">
                    <GrSecure size={24} />
                  </div>
                  <p className="mb-0">Quality Products</p>
                </div>

                <div className="d-flex align-items-center gap-3" data-aos="fade-up">
                  <div className="icon-box bg-orange text-white">
                    <IoFastFood size={24} />
                  </div>
                  <p className="mb-0">Fast Delivery</p>
                </div>

                <div className="d-flex align-items-center gap-3" data-aos="fade-up">
                  <div className="icon-box bg-success text-white">
                    <GiFoodTruck size={24} />
                  </div>
                  <p className="mb-0">Easy Payment Method</p>
                </div>

                <div className="d-flex align-items-center gap-3" data-aos="fade-up">
                  <div className="icon-box bg-warning text-white">
                    <GiFoodTruck size={24} />
                  </div>
                  <p className="mb-0">Get Offers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
