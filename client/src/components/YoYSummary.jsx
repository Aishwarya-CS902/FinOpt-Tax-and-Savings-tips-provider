// // YoYSummary.jsx
// import React from "react";

// const YoYSummary = ({ currentExpense, predictedExpense, currentSavings, potentialSavings }) => {
//   const expenseChange = (((predictedExpense - currentExpense) / currentExpense) * 100).toFixed(1);
//   const savingsGrowth = (((potentialSavings - currentSavings) / currentSavings) * 100).toFixed(1);

//   return (
//     <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow-md">
//       <h3 className="text-lg font-semibold text-yellow-800 mb-2">📊 Year-over-Year Summary</h3>
//       <p className="text-yellow-900">
//         📉 <strong>Projected Expense Change:</strong> {expenseChange}% {expenseChange < 0 ? "reduction" : "increase"}
//       </p>
//       <p className="text-yellow-900">
//         📈 <strong>Projected Savings Growth:</strong> {savingsGrowth}% increase
//       </p>
//     </div>
//   );
// };

// export default YoYSummary;







// YoYSummary.jsx
import React from "react";

const YoYSummary = ({ currentExpense, predictedExpense, currentSavings, potentialSavings }) => {
  const expenseChange = (((predictedExpense - currentExpense) / currentExpense) * 100).toFixed(1);
  const savingsGrowth = (((potentialSavings - currentSavings) / currentSavings) * 100).toFixed(1);

  return (
    <div className="bg-green-100 rounded p-4 border border-green-300 mt-4">
      <h3 className="font-bold text-green-700 text-lg">📊 Year-over-Year Summary</h3>
      <p className={`font-semibold mt-2 ${expenseChange < 0 ? 'text-red-600' : 'text-gray-700'}`}>
        📉 Projected Expense Change: {expenseChange}% {expenseChange < 0 ? "reduction" : "increase"}
      </p>
      <p className="text-green-700 font-semibold">
        📈 Projected Savings Growth: {savingsGrowth}% increase
      </p>
    </div>
  );
};

export default YoYSummary;