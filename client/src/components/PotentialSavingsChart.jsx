// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// const PotentialSavingsChart = ({ data }) => {
//   const chartData = Object.keys(data.Predicted_Expenses).map((key) => ({
//     category: key,
//     current: data.Predicted_Expenses[key],
//     recommended: data.Recommended_Expenses[key]
//   }));

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-2">Potential Savings (Recommended vs Current)</h2>
//       <BarChart width={600} height={300} data={chartData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="category" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="current" fill="#8884d8" />
//         <Bar dataKey="recommended" fill="#82ca9d" />
//       </BarChart>
//     </div>
//   );
// };

// export default PotentialSavingsChart;






// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const PotentialSavingsChart = ({ predicted = {}, recommended = {} }) => {
//   const keys = Object.keys(predicted);
//   const chartData = keys.map((key) => ({
//     category: key,
//     current: predicted[key],
//     recommended: recommended[key],
//   }));

//   if (chartData.length === 0) {
//     return <p className="text-gray-500">No savings data available.</p>;
//   }

//   return (
//     <div className="bg-white p-4 rounded-xl shadow-md">
//       <h2 className="text-lg font-semibold mb-4">Potential Savings</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="category" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="current" fill="#8884d8" name="Current" />
//           <Bar dataKey="recommended" fill="#82ca9d" name="Recommended" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PotentialSavingsChart;





import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PotentialSavingsChart = ({ predicted = {}, recommended = {} }) => {
  const keys = Object.keys(predicted);
  const chartData = keys.map((key) => ({
    category: key,
    current: predicted[key],
    recommended: recommended[key],
  }));

  if (chartData.length === 0) {
    return <p className="text-gray-500">No savings data available.</p>;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Potential Savings</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" angle={-45} textAnchor="end" tick={{ fontSize: 12 }} height={80} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="current" fill="#8884d8" name="Current" />
          <Bar dataKey="recommended" fill="#82ca9d" name="Recommended" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PotentialSavingsChart;