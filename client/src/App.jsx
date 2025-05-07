






import React, { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import TaxSummary from "./components/TaxSummary";
import SuggestionsList from "./components/SuggestionsList";
import LoginPage from "./components/LoginPage";
import ExpenseBreakdown from "./components/ExpenseBreakdown";
import PotentialSavingsChart from "./components/PotentialSavingsChart";
import YoYSummary from "./components/YoYSummary";

function App() {
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("dashboard_user");
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("dashboard_user");
    setUser(null);
    setResult(null);
  };

  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-green-100 py-10 px-4 md:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-800">
            Welcome, {user} 👋
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {!result ? (
          <InputForm onSubmit={setResult} />
        ) : (
          <>
            {/* Tax Summary */}
            <TaxSummary result={result} />

            {/* YoY Summary */}
            <YoYSummary
              currentExpense={result.Total_Expenses}
              predictedExpense={Object.values(result.Recommended_Expenses).reduce((sum, val) => sum + val, 0)}
              currentSavings={result.Disposable_Income - result.Total_Expenses}
              potentialSavings={result.Potential_Savings_Next_Year}
            />

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <ExpenseBreakdown predicted={result.Predicted_Expenses} />
              <PotentialSavingsChart
                predicted={result.Predicted_Expenses}
                recommended={result.Recommended_Expenses}
              />
            </div>

            {/* Suggestions */}
            <SuggestionsList data={result} />

            {/* Back button */}
            <div className="text-center mt-6">
              <button
                onClick={() => setResult(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
              >
                Back to Input
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
