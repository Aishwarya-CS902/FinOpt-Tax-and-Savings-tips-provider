

// // InputForm.jsx
// import React, { useState } from "react";
// import axios from "axios";

// const InputForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     CTC: "",
//     Rent: "",
//     Utilities: "",
//     Groceries: "",
//     Transport: "",
//     Eating_Out: "",
//     Entertainment: "",
//     Healthcare: "",
//     Miscellaneous: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/predict", {
//         ...Object.fromEntries(
//           Object.entries(formData).map(([k, v]) => [k, Number(v)])
//         )
//       });
//       onSubmit(response.data);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to fetch results. Check backend or inputs.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Financial Dashboard</h2>
//       {Object.keys(formData).map((field) => (
//         <div key={field} className="flex flex-col">
//           <label htmlFor={field} className="text-sm font-medium capitalize">
//             {field.replace("_", " ")} (₹)
//           </label>
//           <input
//             type="number"
//             name={field}
//             value={formData[field]}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 mt-1"
//             required
//           />
//         </div>
//       ))}
//       <button
//         type="submit"
//         className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
//       >
//         Calculate
//       </button>
//     </form>
//   );
// };

// export default InputForm;


//-----------------------------------------------------------






// import React, { useState } from "react";
// import axios from "axios";

// const InputForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     CTC: "",
//     Rent: "",
//     Utilities: "",
//     Groceries: "",
//     Transport: "",
//     Eating_Out: "",
//     Entertainment: "",
//     Healthcare: "",
//     Miscellaneous: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/predict_financials/", {
//         ...Object.fromEntries(
//           Object.entries(formData).map(([k, v]) => [k, Number(v)])
//         )
//       });
//       onSubmit(response.data);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to fetch results. Check backend or inputs.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Financial Dashboard</h2>
//       {Object.keys(formData).map((field) => (
//         <div key={field} className="flex flex-col">
//           <label htmlFor={field} className="text-sm font-medium capitalize">
//             {field.replace("_", " ")} (₹)
//           </label>
//           <input
//             type="number"
//             name={field}
//             value={formData[field]}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 mt-1"
//             required
//           />
//         </div>
//       ))}
//       <button
//         type="submit"
//         className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
//       >
//         Calculate
//       </button>
//     </form>
//   );
// };

// export default InputForm;



//---------------------------------------------------------------------------------------------------







// import React, { useState } from "react";
// import axios from "axios";

// const InputForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     CTC: "",
//     Rent: "",
//     Utilities: "",
//     Groceries: "",
//     Transport: "",
//     Eating_Out: "",
//     Entertainment: "",
//     Healthcare: "",
//     Miscellaneous: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/predict_financials/", {
//         ...Object.fromEntries(
//           Object.entries(formData).map(([k, v]) => [k, Number(v)])
//         )
//       });
//       onSubmit(response.data);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to fetch results. Check backend or inputs.");
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border border-green-200">
//       <h2 className="text-2xl font-bold text-green-700 mb-4">Financial Dashboard</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {["CTC", "Rent", "Utilities", "Groceries", "Transport", "Eating Out", "Entertainment", "Healthcare", "Miscellaneous"].map(label => (
//           <div key={label}>
//             <label className="block text-green-800 font-medium mb-1">{label} (₹)</label>
//             <input
//               type="number"
//               name={label.replace(" ", "_")}
//               className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//               value={formData[label.replace(" ", "_")]}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         ))}
//         <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700">
//           Calculate
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InputForm;



import React, { useState } from "react";
import axios from "axios";

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    CTC: "",
    Rent: "",
    Utilities: "",
    Groceries: "",
    Transport: "",
    Eating_Out: "",
    Entertainment: "",
    Healthcare: "",
    Miscellaneous: ""
  });
  const [zeroFieldsError, setZeroFieldsError] = useState("");
  const [exceedsCTCError, setExceedsCTCError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setZeroFieldsError(""); // Clear error on input change
    setExceedsCTCError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setZeroFieldsError("");
    setExceedsCTCError("");

    const expenditureFields = [
      "Rent",
      "Utilities",
      "Groceries",
      "Transport",
      "Eating_Out",
      "Entertainment",
      "Healthcare",
      "Miscellaneous",
    ];

    let zeroCount = 0;
    expenditureFields.forEach(field => {
      if (Number(formData[field]) === 0) {
        zeroCount++;
      }
    });

    if (zeroCount > 3) {
      setZeroFieldsError("Warning: More than 3 expenditure fields are zero. Please review your entries.");
      return; // Stop submission if error exists
    }

    const totalExpenditure = expenditureFields.reduce((sum, field) => sum + Number(formData[field] || 0), 0);
    const ctcValue = Number(formData.CTC || 0);

    if (!isNaN(ctcValue) && totalExpenditure > ctcValue) {
      setExceedsCTCError("Alert: Total expenditure exceeds your CTC. Please review your entries.");
      return; // Stop submission if error exists
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict_financials/", {
        ...Object.fromEntries(
          Object.entries(formData).map(([k, v]) => [k, Number(v)])
        )
      });
      onSubmit(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to fetch results. Check backend or inputs.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border border-green-200">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Financial Dashboard</h2>
      {zeroFieldsError && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Warning!</strong>
          <span className="block sm:inline">{zeroFieldsError}</span>
        </div>
      )}
      {exceedsCTCError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Alert!</strong>
          <span className="block sm:inline">{exceedsCTCError}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["CTC", "Rent", "Utilities", "Groceries", "Transport", "Eating Out", "Entertainment", "Healthcare", "Miscellaneous"].map(label => (
          <div key={label}>
            <label className="block text-green-800 font-medium mb-1">{label} (₹)</label>
            <input
              type="number"
              name={label.replace(" ", "_")}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              value={formData[label.replace(" ", "_")]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700">
          Calculate
        </button>
      </form>
    </div>
  );
};

export default InputForm;