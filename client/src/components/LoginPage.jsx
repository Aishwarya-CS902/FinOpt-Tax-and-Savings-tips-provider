// // src/LoginPage.jsx
// import React, { useState } from "react";

// const LoginPage = ({ onLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simple hardcoded check — for demo only
//     if (username === "admin" && password === "1234") {
//       onLogin();
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-green-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
//           Login
//         </h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;









// import React, { useState } from "react";

// const LoginPage = ({ onLogin }) => {
//   const [username, setUsername] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (username.trim()) {
//       localStorage.setItem("dashboard_user", username.trim());
//       onLogin(username.trim());
//     }
//   };

//   return (
//     <div className="min-h-screen bg-green-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
//           Welcome to the Financial Dashboard
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="username" className="block text-green-700 mb-1 font-medium">
//               Enter Your Name
//             </label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="e.g. Riya, Akash..."
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
//           >
//             Log In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




// import React, { useState, useEffect } from "react";

// const LoginPage = ({ onLogin }) => {
//   const [username, setUsername] = useState("");
  
//   // Debugging - log when component renders
//   useEffect(() => {
//     console.log("LoginPage component mounted");
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted with username:", username.trim());
//     if (username.trim()) {
//       localStorage.setItem("dashboard_user", username.trim());
//       onLogin(username.trim());
//     }
//   };

//   return (
//     <div className="min-h-screen bg-green-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
//           Welcome to the FinOpt
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="username" className="block text-green-700 mb-1 font-medium">
//               Enter Your Name
//             </label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="e.g. Riya, Akash..."
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
//           >
//             Log In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState, useEffect } from "react";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Debugging - log when component renders
  useEffect(() => {
    console.log("LoginPage component mounted");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with username:", username.trim(), "and password:", password);

    // Basic authentication check (replace with your actual authentication logic)
    if (username.trim() && password) {
      // For demonstration purposes, we'll just check if both fields are non-empty
      localStorage.setItem("dashboard_user", username.trim());
      onLogin(username.trim());
    } else {
      setLoginError("Please enter both username and password.");
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Welcome to the FinOpt
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{loginError}</span>
            </div>
          )}
          <div>
            <label htmlFor="username" className="block text-green-700 mb-1 font-medium">
              Enter Your Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. riya123"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-green-700 mb-1 font-medium">
              Enter Your Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your secure password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;





// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const LoginPage = ({ onLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginError, setLoginError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     console.log("LoginPage component mounted");
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setLoginError("");

//     try {
//       const response = await axios.post("YOUR_BACKEND_LOGIN_ENDPOINT", {
//         username: username.trim(),
//         password: password,
//       });

//       // Assuming your backend returns a success status and potentially user data/token
//       if (response.status === 200) {
//         const userData = response.data; // Adjust based on your backend response
//         localStorage.setItem("dashboard_user", userData.username || username.trim()); // Store relevant user info
//         // Optionally store an authentication token in localStorage or a cookie
//         // localStorage.setItem("authToken", userData.token);
//         onLogin(userData.username || username.trim());
//       } else {
//         // Handle other successful but non-200 responses if needed
//         setLoginError("Login failed. Invalid credentials.");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       if (error.response && error.response.data && error.response.data.message) {
//         setLoginError(error.response.data.message); // Display backend error message
//       } else {
//         setLoginError("Login failed. Please check your network or server.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-green-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
//           Welcome to the FinOpt
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {loginError && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//               <strong className="font-bold">Error!</strong>
//               <span className="block sm:inline">{loginError}</span>
//             </div>
//           )}
//           <div>
//             <label htmlFor="username" className="block text-green-700 mb-1 font-medium">
//               Enter Your Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="e.g. riya123"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-green-700 mb-1 font-medium">
//               Enter Your Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Your secure password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Logging In..." : "Log In"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;