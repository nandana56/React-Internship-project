import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [txnId, setTxnId] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [useRegisteredAddress, setUseRegisteredAddress] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });
  const [upiId, setUpiId] = useState("");
  const [upiApp, setUpiApp] = useState("Google Pay");
  const [paymentNote, setPaymentNote] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems);
    } else {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    }
  }, [location.state]);

  useEffect(() => {
    if (useRegisteredAddress) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        setForm({
          ...form,
          fullName: `${currentUser.firstName} ${currentUser.lastName}`,
          phone: currentUser.phone,
          address: currentUser.address,
          city: currentUser.city,
          state: currentUser.state,
          pincode: currentUser.zip,
        });
      }
    } else {
      setForm({
        ...form,
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });
    }
  }, [useRegisteredAddress]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    const tempId = Date.now();
    const paymentRef =
      form.paymentMethod === "upi"
        ? `TXN${Math.floor(100000000 + Math.random() * 900000000)}`
        : `COD${Math.floor(100000 + Math.random() * 900000)}`;

    if (
      !form.fullName ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill in all shipping details.");
      return;
    }

    if (form.paymentMethod === "upi") {
      const upiRegex = /^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/;
      const allowedSuffixes = [
        "oksbi",
        "okhdfcbank",
        "okaxis",
        "okicici",
        "upi",
      ];
      const suffix = upiId.split("@")[1];

      if (!upiRegex.test(upiId)) {
        alert("Please enter a valid UPI ID (e.g., name@oksbi)");
        return;
      }

      if (!allowedSuffixes.includes(suffix)) {
        alert("Unsupported UPI provider. Try oksbi, okaxis, etc.");
        return;
      }

      setTxnId(paymentRef);
      setShowPaymentModal(true);
      setIsProcessing(true);

      // Simulate processing with 90% success
      setTimeout(() => {
        setIsProcessing(false);
        const isSuccess = Math.random() > 0.1;

        if (isSuccess) {
          setTimeout(() => {
            alert("Payment successful via UPI!");
            setShowPaymentModal(false);
            if (!location.state?.cartItems) localStorage.removeItem("cart");

            navigate("/user/orders", {
              state: {
                cartItems,
                total,
                form,
                upiId,
                upiApp,
                paymentNote,
                paymentReference: paymentRef,
                tempId,
              },
            });
          }, 1500);
        } else {
          setTimeout(() => {
            alert("Payment failed. Please try again.");
            setShowPaymentModal(false);
          }, 1000);
        }
      }, 3000);
    } else {
      alert("Order placed successfully with Cash on Delivery!");
      if (!location.state?.cartItems) localStorage.removeItem("cart");

      navigate("/user/orders", {
        state: { cartItems, total, form, paymentReference: paymentRef, tempId },
      });
    }
  };

  if (cartItems.length === 0) {
    return <div className="container mt-5 text-center">Your cart is empty.</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Checkout</h2>
      <div className="row g-5">
        <div className="col-md-7">
          <h5>Shipping Details</h5>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="useRegisteredAddress"
              checked={useRegisteredAddress}
              onChange={(e) => setUseRegisteredAddress(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="useRegisteredAddress">
              Use my registered address
            </label>
          </div>

          <form>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                name="address"
                rows={2}
                value={form.address}
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Pin Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h6 className="mt-4">Payment Method</h6>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={form.paymentMethod === "cod"}
                onChange={handleChange}
              />
              <label className="form-check-label">Cash on Delivery (COD)</label>
            </div>

            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={form.paymentMethod === "upi"}
                onChange={handleChange}
              />
              <label className="form-check-label">UPI / Net Banking</label>
            </div>

            {form.paymentMethod === "upi" && (
              <div className="border p-3 rounded bg-light mt-2">
                <label className="form-label">Enter UPI ID</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="example@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />

                <label className="form-label">Select UPI App</label>
                <select
                  className="form-select mb-2"
                  value={upiApp}
                  onChange={(e) => setUpiApp(e.target.value)}
                >
                  <option value="Google Pay">Google Pay</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Paytm">Paytm</option>
                  <option value="BHIM">BHIM</option>
                </select>

                <label className="form-label">Payment Note</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Order #123456"
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                />

                <label className="form-label">Amount</label>
                <input
                  className="form-control"
                  value={`₹${total}`}
                  disabled
                />
              </div>
            )}
          </form>
        </div>

        <div className="col-md-5">
          <h5>Order Summary</h5>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6>{item.name}</h6>
                  <small>Qty: {item.quantity}</small>
                </div>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <strong>Total</strong>
              <strong>₹{total}</strong>
            </li>
          </ul>
          <button className="btn btn-success w-100" onClick={handlePlaceOrder}>
            ✅ Place Order
          </button>
        </div>
      </div>

      {showPaymentModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center">
              <div className="modal-header">
                <h5 className="modal-title">Processing Payment</h5>
              </div>
              <div className="modal-body">
                {isProcessing ? (
                  <>
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-3">Processing UPI Payment via {upiApp}...</p>
                  </>
                ) : (
                  <>
                    <div className="text-success fs-1">✔</div>
                    <p className="mt-2">Payment Complete!</p>
                    <small>Ref ID: {txnId}</small>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
