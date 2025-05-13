// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './login.css';

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if (!email || !password) {
//             alert("Please fill in all fields.");
//             return;
//         }

//         try {
//             const response = await fetch("http://localhost:8000/api/v1/auth/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ email, password })
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 alert(data.message || "Login successful!");
//                 const role = data.user?.role; // Extract role

//                 // Optional: store token or user info
//                 // localStorage.setItem("user", JSON.stringify(data.user));

//                 if (role === "admin") {
//                     navigate("/admin/dashboard");
//                 } else if (role === "user") {
//                     navigate("/user/dashboard");
//                 } else {
//                     alert("Unknown user role. Contact admin.");
//                 }

//             } else {
//                 alert(data.message || "Login failed.");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             alert("An error occurred during login.");
//         }
//     };

//     return (
//         <div className='sign login-page'>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin} className="signform">
//                 <input 
//                     type="email" 
//                     placeholder="Email" 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)} 
//                     required 
//                 />
//                 <input 
//                     type="password" 
//                     placeholder="Password" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)} 
//                     required 
//                 />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");
        
        // Form validation
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setIsLoading(true);
        
        // Simulate login process
        setTimeout(() => {
            // Check if email is admin@gmail.com for admin access
            if (email.toLowerCase() === "admin@gmail.com") {
                // Store basic user info in localStorage
                const adminUser = {
                    email: email,
                    role: "admin",
                    name: "Admin User"
                };
                localStorage.setItem("user", JSON.stringify(adminUser));
                localStorage.setItem("isLoggedIn", "true");
                
                // Redirect to admin dashboard
                navigate("/admindashboard");
            } else {
                // For any other email, treat as regular user
                const regularUser = {
                    email: email,
                    role: "user",
                    name: "Regular User"
                };
                localStorage.setItem("user", JSON.stringify(regularUser));
                localStorage.setItem("isLoggedIn", "true");
                
                // Redirect to user dashboard
                navigate("/home");
            }
            
            setIsLoading(false);
        }, 1000); // Simulate network delay for better UX
    };

    return (
        <div className="sign login-page">
            <h2>Login to Your Account</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleLogin} className="signform">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className={isLoading ? "btn-loading" : ""}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
                
                <div className="additional-links">
                    <a href="/forgot-password">Forgot Password?</a>
                    <a href="/register">Create an Account</a>
                </div>
            </form>
        </div>
    );
}

export default Login