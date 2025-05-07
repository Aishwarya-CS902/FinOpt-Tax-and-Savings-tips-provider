
//-----------------------------------------------------------------------------------------


// // src/components/FinancialDashboard.jsx
// import React, { useState } from "react";
// import InputForm from "./InputForm";
// import TaxSummary from "./TaxSummary";
// import ExpenseBreakdown from "./ExpenseBreakdown";
// import PotentialSavingsChart from "./PotentialSavingsChart";
// import SuggestionsList from "./SuggestionsList";

// const FinancialDashboard = () => {
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (formData) => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://127.0.0.1:8000/analyze", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error("Backend error");

//       const data = await response.json();
//       setResult(data);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong. Check if the backend is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
//         Financial Dashboard
//       </h1>

//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <InputForm onSubmit={handleSubmit} />
//       </div>

//       {loading && <p className="text-center mt-4 text-blue-600">Analyzing...</p>}

//       {result && (
//         <div className="mt-8 space-y-6">
//           <TaxSummary result={result} />
//           <div className="grid md:grid-cols-2 gap-6">
//           <ExpenseBreakdown predicted={result.Predicted_Expenses} />
//           <PotentialSavingsChart
//                 predicted={result.Predicted_Expenses}
//                 recommended={result.Recommended_Expenses}
//           />

//           </div>
//           <SuggestionsList
//             suggestions={result.Saving_Suggestions}
//             tips={result.Tax_Tips}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FinancialDashboard;

//-------------------------------------------------------------------------------------------------

// FinancialDashboard.jsx
// import React, { useState } from "react";
// import InputForm from "./InputForm";
// import TaxSummary from "./TaxSummary";
// import ExpenseBreakdown from "./ExpenseBreakdown";
// import PotentialSavingsChart from "./PotentialSavingsChart";
// import SuggestionsList from "./SuggestionsList";

// const FinancialDashboard = () => {
//   const [result, setResult] = useState(null);

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {!result ? (
//         <InputForm onSubmit={setResult} />
//       ) : (
//         <div className="mt-8 space-y-6">
//           <TaxSummary result={result} />
//           {/* <TaxSummary result={resultData} /> */}

//           <div className="grid md:grid-cols-2 gap-6">
//             <ExpenseBreakdown predicted={result.Predicted_Expenses} />
//             <PotentialSavingsChart
//               predicted={result.Predicted_Expenses}
//               recommended={result.Recommended_Expenses}
//             />
//           </div>

//           <SuggestionsList data={result} />


//           <div className="text-center mt-6">
//             <button
//               onClick={() => setResult(null)}
//               className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
//             >
//               Back to Input
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FinancialDashboard;









// FinancialDashboard.jsx
import React, { useState } from "react";
import InputForm from "./InputForm";
import TaxSummary from "./TaxSummary";
import ExpenseBreakdown from "./ExpenseBreakdown";
import PotentialSavingsChart from "./PotentialSavingsChart";
import SuggestionsList from "./SuggestionsList";
import YoYSummary from "./YoYSummary"; // ⬅️ New import

const FinancialDashboard = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {!result ? (
        <InputForm onSubmit={setResult} />
      ) : (
        <div className="mt-8 space-y-6">
          <TaxSummary result={result} />

          {/* 💡 Add Year-over-Year Summary Card here */}
          <YoYSummary
            currentExpense={result.Total_Expenses}
            predictedExpense={Object.values(result.Recommended_Expenses).reduce((sum, val) => sum + val, 0)}
            currentSavings={result.Disposable_Income - result.Total_Expenses}
            potentialSavings={result.Potential_Savings_Next_Year}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <ExpenseBreakdown predicted={result.Predicted_Expenses} />
            <PotentialSavingsChart
              predicted={result.Predicted_Expenses}
              recommended={result.Recommended_Expenses}
            />
          </div>

          <SuggestionsList data={result} />

          <div className="text-center mt-6">
            <button
              onClick={() => setResult(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
            >
              Back to Input
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialDashboard;









// // FinancialDashboard.jsx
// import React, { useState } from "react";
// import InputForm from "./InputForm";
// import TaxSummary from "./TaxSummary";
// import ExpenseBreakdown from "./ExpenseBreakdown";
// import PotentialSavingsChart from "./PotentialSavingsChart";
// import SuggestionsList from "./SuggestionsList";
// import YoYSummary from "./YoYSummary"; // ⬅️ New import

// const FinancialDashboard = () => {
//   const [result, setResult] = useState(null);

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {!result ? (
//         <InputForm onSubmit={setResult} />
//       ) : (
//         <div className="mt-8 space-y-6">
//           <TaxSummary result={result} />

//           <YoYSummary
//             currentExpense={result.Total_Expenses}
//             predictedExpense={Object.values(result.Recommended_Expenses).reduce((sum, val) => sum + val, 0)}
//             currentSavings={result.Disposable_Income - result.Total_Expenses}
//             potentialSavings={result.Potential_Savings_Next_Year}
//           />

//           <div className="grid md:grid-cols-2 gap-6">
//             <ExpenseBreakdown predicted={result.Predicted_Expenses} />
//             <PotentialSavingsChart
//               predicted={result.Predicted_Expenses}
//               recommended={result.Recommended_Expenses}
//             />
//           </div>

//           <SuggestionsList data={result} />

//           <div className="text-center mt-6">
//             <button
//               onClick={() => setResult(null)}
//               className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-200"
//             >
//               Back to Input
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FinancialDashboard;
