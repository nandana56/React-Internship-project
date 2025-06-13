import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import "./Popup.css"; // Make sure to create this CSS file

const Popup = ({ orderPopup, setOrderPopup }) => {
  return (
    <>
      {orderPopup && (
        <div className="popup">
          <div className="popup-overlay">
            <div className="popup-box">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Order Now</h5>
                <IoCloseOutline
                  size={24}
                  className="popup-close"
                  onClick={() => setOrderPopup(false)}
                />
              </div>

              {/* Form Section */}
              <form>
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control mb-3 popup-input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control mb-3 popup-input"
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="form-control mb-3 popup-input"
                />
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn popup-btn"
                  >
                    Order Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
