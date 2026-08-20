import { useState } from "react";
import "../styles/checkoutForm.css";

function CheckoutForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    paymentMethod: "Cash On Delivery",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Order Placed Successfully!");
  };

  return (
    <div className="checkout-form-container">
      <h2>Shipping Details</h2>

      <form onSubmit={handleSubmit}>

        <div className="row">

          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="row">

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="+92 3001234567"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="input-group">
          <label>Address</label>
          <textarea
            rows="4"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">

          <div className="input-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="row">

          <div className="input-group">
            <label>ZIP Code</label>
            <input
              type="text"
              name="zipCode"
              placeholder="54000"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Payment Method</label>

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option>Cash On Delivery</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Stripe</option>
              <option>PayPal</option>
            </select>

          </div>

        </div>

        <button type="submit" className="place-order-btn">
          Place Order
        </button>

      </form>
    </div>
  );
}

export default CheckoutForm;