// import React from "react";

// const SuggestionsList = ({ data }) => {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold">Saving Suggestions</h2>
//       <ul className="list-disc list-inside">
//         {Object.entries(data.Saving_Suggestions).map(([key, suggestion]) => (
//           <li key={key}>
//             <strong>{key}:</strong> {suggestion}
//           </li>
//         ))}
//       </ul>
//       <h2 className="text-xl font-bold mt-4">Tax Saving Tips</h2>
//       <ul className="list-disc list-inside">
//         {data.Tax_Tips.map((tip, idx) => (
//           <li key={idx}>{tip}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SuggestionsList;







import React from "react";

const SuggestionsList = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2 text-blue-700">Saving Suggestions</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {Object.entries(data.Saving_Suggestions).map(([key, suggestion]) => (
            <li key={key}>
              <strong>{key}:</strong> {suggestion}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2 text-blue-700">Tax Saving Tips</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {data.Tax_Tips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuggestionsList;






// import React from "react";

// const SuggestionsList = ({ suggestions }) => {
//   if (!suggestions || suggestions.length === 0) return null;

//   return (
//     <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-md mt-6">
//       <h2 className="text-2xl font-bold text-green-800 mb-4">📌 Suggestions</h2>
//       <ul className="list-disc list-inside text-green-900 space-y-2">
//         {suggestions.map((suggestion, index) => (
//           <li key={index} className="leading-snug">{suggestion}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SuggestionsList;
