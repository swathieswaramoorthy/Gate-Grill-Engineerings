import React, { useState } from 'react';

const Payment = () => {
    const [amount, setAmount] = useState('');


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

    const handlePayment = (e) => {
        e.preventDefault();
        if (amount === '' || name === '' || email === '' || contact === '' || address === '') {
            alert("Please fill in all the details.");
            return;
        }

        if (amount === '') {
            alert("Please enter an amount");

        }
        else {
            var options = {
                key: "rzp_test_QCZLQtT2M48OsW",
                key_secret: "5KHpjPDi0Zx70TmLMnySPUoK",
                amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 100 = 1 INR
                currency: "INR",
                name: "Shri Balaji Engineerings",
                description: "For confirm your order",
                handler: async function (response) {
                    // Extract necessary data from the Razorpay response
                    const paymentData = {
                        //dummy data for testing
                        razorpay_payment_id: "pay_FhcJ2bpZG5tA4R",
                        razorpay_order_id: "order_F6gKYZgG7F67tZ", 
                        razorpay_signature: "2c85fdb7586cb2746f55aeb7798f8e4a897b4dbbd12c8d993b319244f0edba9d",

                        amount: amount,
                        name: name,
                        email: email,
                        contact: contact,
                        address: address
                    };

                    // Send the payment data to the backend to verify
                    try {
                        const res = await fetch('http://localhost:8000/api/payments/verify-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(paymentData),
                        });

                        const data = await res.json();
                        if (data.success) {
                            alert("Payment successful and verified!");
                        } else {
                            alert("Payment verification failed");
                        }
                    } catch (error) {
                        console.error("Error verifying payment:", error);
                        alert("There was an error verifying your payment.");
                    }
                },
                prefill: {
                    name: name,
                    email: email,
                    contact: contact
                },
                notes: {
                    address: address
                },
                theme: {
                    color: "#3399cc"
                }
            };
            var pay = new window.Razorpay(options);
            pay.open();
        }
    }

    return (
        <div className='payment'>
            <h1>Payment</h1>
            <br />
            <input
                type='text'
                placeholder='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br /><br />

            <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />

            <input
                type='text'
                placeholder='Enter your phone number'
                value={contact}
                onChange={(e) => setContact(e.target.value)}
            />
            <br /><br />

            <textarea
                placeholder='Enter your address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="4"
                cols="50"
            />
            <br /><br />
            <input type='text' placeholder='Enter amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
            <br /><br />
            <button onClick={handlePayment}> Pay </button>

        </div>
    )
}

export default Payment;