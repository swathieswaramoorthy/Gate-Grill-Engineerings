import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { QRCodeCanvas } from 'qrcode.react';

const Cart = ({ cartItems, setCartItems }) => {
  const [complete, setComplete] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const increaseQty = (item) => {
    if (item.product.stock === item.qty) return;
    const updatedItems = cartItems.map(i =>
      i.product._id === item.product._id ? { ...i, qty: i.qty + 1 } : i
    );
    setCartItems(updatedItems);
  };

  const decreaseQty = (item) => {
    if (item.qty === 1) return;
    const updatedItems = cartItems.map(i =>
      i.product._id === item.product._id ? { ...i, qty: i.qty - 1 } : i
    );
    setCartItems(updatedItems);
  };

  const removeItem = (item) => {
    const updatedItems = cartItems.filter(i => i.product._id !== item.product._id);
    setCartItems(updatedItems);
  };

  const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    const items = cartItems.map(item => ({
      productName: item.product.name,
      quantity: item.qty
    }));

    const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items,
        customerName,
        customerEmail
      })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Failed to place order");

    setOrderData(data);
    setCartItems([]);
    setComplete(true);
    setShowForm(false);
    toast.success("Order placed successfully!");
  } catch (error) {
    console.error("Error placing order:", error);
    toast.error("Failed to place order");
  }
};


  const placeOrderHandler = () => {
    setShowForm(true); // Show the form before placing order
  };

  if (cartItems.length === 0) {
    return (
      <div className="container container-fluid mt-5">
        {complete && orderData ? (
          <div>
            <h2>Order Completed!</h2>
            <p>Your order has been placed successfully.</p>
            <h5>Scan QR to track your order:</h5>
            <QRCodeCanvas value={JSON.stringify(orderData)} size={200} />
          </div>
        ) : (
          <h2>Your Cart is Empty!</h2>
        )}
      </div>
    );
  }

  return (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart: <b>{cartItems.length} items</b>
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems.map((item, index) => (
              <Fragment key={index}>
                <hr />
                <div className="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.product.images[0].image}
                        alt={item.product.name}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={`/product/${item.product._id}`}>
                        {item.product.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">₹{item.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() => decreaseQty(item)}
                        >
                          -
                        </span>

                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.qty}
                          readOnly
                        />

                        <span
                          className="btn btn-primary plus"
                          onClick={() => increaseQty(item)}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        onClick={() => removeItem(item)}
                        className="fa fa-trash btn btn-danger"
                      ></i>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)} (Units)
                </span>
              </p>
              <p>
                Est. total:{" "}
                <span className="order-summary-values">
                  ₹{cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)}
                </span>
              </p>
              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="popup-form">
          <div className="form-box">
            <h3>Enter your details</h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-success">Submit & Place Order</button>

            </form>
            
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
