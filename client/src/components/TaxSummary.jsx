// import React from "react";

// const TaxSummary = ({ data }) => {
//   return (
//     <div className="bg-gray-100 p-4 rounded shadow">
//       <h2 className="text-lg font-bold mb-2">Tax & Savings Summary</h2>
//       <p>CTC: ₹{data.CTC}</p>
//       <p>Tax Payable: ₹{data.Tax_Payable}</p>
//       <p>Disposable Income: ₹{data.Disposable_Income}</p>
//       <p>Total Predicted Expenses: ₹{data.Total_Expenses}</p>
//       <p>Potential Savings Next Year: ₹{data.Potential_Savings_Next_Year}</p>
//     </div>
//   );
// };

// export default TaxSummary;




// import React from "react";

// const TaxSummary = ({ data }) => {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md border">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tax & Savings Summary</h2>
//       <div className="space-y-2 text-gray-700">
//         <p><strong>CTC:</strong> ₹{data.CTC}</p>
//         <p><strong>Tax Payable:</strong> ₹{data.Tax_Payable}</p>
//         <p><strong>Disposable Income:</strong> ₹{data.Disposable_Income}</p>
//         <p><strong>Total Predicted Expenses:</strong> ₹{data.Total_Expenses}</p>
//         <p className="text-green-700 font-medium">
//           <strong>Potential Savings Next Year:</strong> ₹{data.Potential_Savings_Next_Year}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TaxSummary;





// import React from "react";

// const TaxSummary = ({ result }) => {
//   if (
//     !result ||
//     result.CTC === undefined ||
//     result.Tax_Payable === undefined ||
//     result.Disposable_Income === undefined ||
//     result.Total_Expenses === undefined ||
//     result.Recommended_Expenses === undefined
//   ) {
//     return null; // or show a fallback message
//   }

//   const {
//     CTC,
//     Tax_Payable,
//     Disposable_Income,
//     Total_Expenses,
//     Potential_Savings_Next_Year,
//     Recommended_Expenses,
//   } = result;

//   const predictedNextYear = Object.values(Recommended_Expenses).reduce(
//     (sum, val) => sum + val,
//     0
//   );

//   const savedThisYear = Disposable_Income - Total_Expenses;

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Tax & Savings Summary</h2>
//       <p><strong>CTC:</strong> ₹{CTC.toLocaleString()}</p>
//       <p><strong>Tax Payable:</strong> ₹{Tax_Payable.toLocaleString()}</p>
//       <p><strong>Disposable Income:</strong> ₹{Disposable_Income.toLocaleString()}</p>
//       <p><strong>Total Expense This Year:</strong> ₹{Total_Expenses.toLocaleString()}</p>
//       <p><strong>Total Amount Saved This Year:</strong> ₹{(savedThisYear).toLocaleString()}</p>
//       <p><strong>Predicted Expense for Next Year:</strong> ₹{predictedNextYear.toLocaleString()}</p>
//       <p><strong>Potential Savings Next Year:</strong> ₹{Potential_Savings_Next_Year.toLocaleString()}</p>
//     </div>
//   );
// };

// export default TaxSummary;




// import React from "react";

// const TaxSummary = ({ result }) => {
//   if (!result) return null;

//   const {
//     CTC = 0,
//     Tax_Payable = 0,
//     Disposable_Income = 0,
//     Total_Expenses = 0,
//     Potential_Savings_Next_Year = 0,
//     Recommended_Expenses = {}
//   } = result;

//   // Predicted expense next year (from reduced categories)
//   const predictedNextYear = Object.values(Recommended_Expenses).reduce(
//     (sum, val) => sum + val,
//     0
//   );

//   // Current year savings
//   const savedThisYear = Disposable_Income - Total_Expenses;

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Tax & Savings Summary</h2>
//       <p><strong>CTC:</strong> ₹{CTC.toLocaleString("en-IN")}</p>
//       <p><strong>Tax Payable:</strong> ₹{Tax_Payable.toLocaleString("en-IN")}</p>
//       <p><strong>Disposable Income:</strong> ₹{Disposable_Income.toLocaleString("en-IN")}</p>
//       <p><strong>Total Expense This Year:</strong> ₹{Total_Expenses.toLocaleString("en-IN")}</p>
//       <p><strong>Total Amount Saved This Year:</strong> ₹{savedThisYear.toLocaleString("en-IN")}</p>
//       <p><strong>Predicted Expense for Next Year:</strong> ₹{predictedNextYear.toLocaleString("en-IN")}</p>
//       <p><strong>Potential Savings Next Year:</strong> ₹{Potential_Savings_Next_Year.toLocaleString("en-IN")}</p>
//     </div>
//   );
// };

// export default TaxSummary;



//------------------------------------------------------



import React from "react";

const TaxSummary = ({ result }) => {
  if (!result) return null;

  const {
    CTC = 0,
    Tax_Payable = 0,
    Disposable_Income = 0,
    Total_Expenses = 0,
    Potential_Savings_Next_Year = 0,
    Recommended_Expenses = {}
  } = result;

  // Predicted expense next year (from reduced categories)
  const predictedNextYear = Object.values(Recommended_Expenses).reduce(
    (sum, val) => sum + val,
    0
  );

  // Current year savings
  const savedThisYear = Disposable_Income - Total_Expenses;

  return (
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
      <h2 className="text-xl font-bold text-green-700">Tax & Savings Summary</h2>
      <p><strong>CTC:</strong> ₹{CTC.toLocaleString("en-IN")}</p>
      <p><strong>Tax Payable:</strong> ₹{Tax_Payable.toLocaleString("en-IN")}</p>
      <p><strong>Disposable Income:</strong> ₹{Disposable_Income.toLocaleString("en-IN")}</p>
      <p><strong>Total Expense This Year:</strong> ₹{Total_Expenses.toLocaleString("en-IN")}</p>
      <p><strong>Total Amount Saved This Year:</strong> ₹{savedThisYear.toLocaleString("en-IN")}</p>
      <p><strong>Predicted Expense for Next Year:</strong> ₹{predictedNextYear.toLocaleString("en-IN")}</p>
      <p><strong>Potential Savings Next Year:</strong> ₹{Potential_Savings_Next_Year.toLocaleString("en-IN")}</p>
    </div>
  );
};

export default TaxSummary;