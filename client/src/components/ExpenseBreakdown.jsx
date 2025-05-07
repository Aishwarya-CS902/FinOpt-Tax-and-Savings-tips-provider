// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57"];

// const ExpenseBreakdown = ({ data }) => {
//   const chartData = Object.entries(data.Predicted_Expenses).map(([k, v]) => ({
//     name: k,
//     value: v
//   }));

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-2">Expense Breakdown</h2>
//       <PieChart width={400} height={300}>
//         <Pie
//           dataKey="value"
//           data={chartData}
//           cx="50%"
//           cy="50%"
//           outerRadius={100}
//           fill="#8884d8"
//           label
//         >
//           {chartData.map((_, index) => (
//             <Cell key={index} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// };

// export default ExpenseBreakdown;



















// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57"];

// const ExpenseBreakdown = ({ predicted = {} }) => {
//   const chartData = Object.entries(predicted).map(([k, v]) => ({
//     name: k,
//     value: v,
//   }));

//   if (chartData.length === 0) {
//     return <p className="text-gray-500">No expense data available.</p>;
//   }

//   return (
//     <div className="bg-white p-4 rounded-xl shadow-md">
//       <h2 className="text-lg font-semibold mb-4">Expense Breakdown</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             dataKey="value"
//             data={chartData}
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             label
//           >
//             {chartData.map((_, index) => (
//               <Cell key={index} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ExpenseBreakdown;





import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
  const radius = outerRadius * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const isLeft = x < cx; // Check if the label is on the left side

  // Adjust textAnchor based on the side and add a small offset for the right side
  const textAnchor = isLeft ? 'end' : 'start';
  const offsetX = isLeft ? 0 : -20; // Move right-side labels 20 pixels to the left

  return (
    <text x={x + offsetX} y={y} fill="black" textAnchor={textAnchor} dominantBaseline="central" style={{ fontSize: '0.8em' }}>
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const ExpenseBreakdown = ({ predicted = {} }) => {
  const chartData = Object.entries(predicted).map(([k, v]) => ({
    name: k,
    value: v,
  }));

  if (chartData.length === 0) {
    return <p className="text-gray-500">No expense data available.</p>;
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Expense Breakdown</h2>
      <ResponsiveContainer width="100%" height={400}> {/* Increased height */}
        <PieChart>
          <Pie
            dataKey="value"
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={120} // You can also try increasing the outerRadius
            label={renderCustomizedLabel}
            labelLine={false} // Try removing the label lines for a cleaner look
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBreakdown;

