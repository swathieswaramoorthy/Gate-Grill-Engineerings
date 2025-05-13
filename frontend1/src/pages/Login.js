import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "Login successful!");
                const role = data.user?.role; // Extract role

                // Optional: store token or user info
                // localStorage.setItem("user", JSON.stringify(data.user));

                if (role === "admin") {
                    navigate("/admin/dashboard");
                } else if (role === "user") {
                    navigate("/user/dashboard");
                } else {
                    alert("Unknown user role. Contact admin.");
                }

            } else {
                alert(data.message || "Login failed.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login.");
        }
    };

    return (
        <div className='sign login-page'>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="signform">
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
