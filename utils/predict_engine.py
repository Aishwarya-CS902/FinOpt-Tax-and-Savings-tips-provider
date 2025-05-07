# # utils/predict_engine.py

# import joblib
# import os
# import numpy as np
# from utils.tax_calculator import calculate_tax

# # Load models once
# savings_model = joblib.load('models/savings_model_stacked.pkl')

# # Load all expense models
# expense_models = {}
# for file in os.listdir('models'):
#     if file.startswith('expense_model_') and file.endswith('.pkl'):
#         col_name = file.replace('expense_model_', '').replace('.pkl', '')
#         expense_models[col_name] = joblib.load(f'models/{file}')


# def predict_financials(user_input: dict) -> dict:
#     """
#     Predict expenses, calculate disposable income, suggest potential savings and recommendations.
#     """

#     # Extract CTC and expenses
#     ctc = user_input.get("CTC")
#     expenses_input = {k: user_input.get(k, 0) for k in [
#         "Rent", "Utilities", "Groceries", "Transport", 
#         "Eating_Out", "Entertainment", "Healthcare", "Miscellaneous"
#     ]}
    
#     # Calculate tax
#     tax_amount = calculate_tax(ctc)
#     disposable_income = ctc - tax_amount

#     # Predict expenses
#     predicted_expenses = {}
#     X_features = {k: [v] for k, v in user_input.items() if k not in ['CTC']}
    
#     for category, model in expense_models.items():
#         try:
#             prediction = model.predict(np.array(list(X_features.values())).T)[0]
#             predicted_expenses[category] = max(prediction, expenses_input.get(category, 0))
#         except Exception:
#             predicted_expenses[category] = expenses_input.get(category, 0)
    
#     # Total expenses
#     total_expenses = sum(predicted_expenses.values())
    
#     # Potential Savings Suggestions
#     saving_suggestions = {}
#     recommended_expenses = {}
    
#     for category, expense in predicted_expenses.items():
#         if category in ['Rent', 'Healthcare']:
#             recommended_expenses[category] = expense  # No change
#             saving_suggestions[category] = "Fixed cost. No recommendation."
#         elif category in ['Eating_Out', 'Entertainment']:
#             reduced_expense = expense * 0.85  # Suggest 15% reduction
#             recommended_expenses[category] = reduced_expense
#             saving_suggestions[category] = "Consider reducing discretionary spending by 15%."
#         elif category in ['Groceries', 'Transport', 'Miscellaneous']:
#             reduced_expense = expense * 0.90  # Suggest 10% reduction
#             recommended_expenses[category] = reduced_expense
#             saving_suggestions[category] = "Optimize spending by around 10% with smart choices."
#         else:
#             recommended_expenses[category] = expense
#             saving_suggestions[category] = "No major optimization suggested."
    
#     # New Total Expenses after suggestions
#     new_total_expenses = sum(recommended_expenses.values())
    
#     # New Potential Savings
#     potential_savings = disposable_income - new_total_expenses
#     potential_savings = max(potential_savings, 0)

#     # Tax-saving tips
#     tax_tips = [
#         "Invest in 80C schemes like ELSS, PPF, or Life Insurance.",
#         "Contribute to NPS (National Pension Scheme) to save more tax.",
#         "Utilize HRA benefits correctly if you live in a rented house.",
#         "Claim deductions under 80D for Health Insurance premiums."
#     ]
    
#     return {
#         "CTC": ctc,
#         "Tax_Payable": round(tax_amount, 2),
#         "Disposable_Income": round(disposable_income, 2),
#         "Predicted_Expenses": {k: round(v, 2) for k, v in predicted_expenses.items()},
#         "Total_Expenses": round(total_expenses, 2),
#         "Potential_Savings_Next_Year": round(potential_savings, 2),
#         "Recommended_Expenses": {k: round(v, 2) for k, v in recommended_expenses.items()},
#         "Saving_Suggestions": saving_suggestions,
#         "Tax_Tips": tax_tips
#     }

#--------------------------------------------------------------------------------------------------- 

# utils/predict_engine.py

# import os
# import numpy as np
# import joblib
# from utils.tax_calculator import calculate_tax

# # Load all expense models
# expense_models = {}
# for fn in os.listdir("models"):
#     if fn.startswith("expense_model_") and fn.endswith(".pkl"):
#         cat = fn.replace("expense_model_", "").replace(".pkl", "")
#         expense_models[cat] = joblib.load(f"models/{fn}")

# # Load savings model (if later needed)
# savings_model = joblib.load("models/savings_model_stacked.pkl")


# def predict_financials(user_input: dict) -> dict:
#     """
#     1. Compute tax & disposable income
#     2. Predict each expense (never below user-entered)
#     3. Calculate personalized savings suggestions per category
#     4. Return full dashboard JSON
#     """

#     # 1. Tax & Disposable Income
#     ctc = user_input["CTC"]
#     tax_amount = calculate_tax(ctc)
#     disposable_income = ctc - tax_amount

#     # 2. Predicted Expenses (or use user values)
#     predicted = {}
#     # Prepare feature array for ML models (exclude CTC)
#     feat_keys = [k for k in user_input if k != "CTC"]
#     X = np.array([[user_input[k] for k in feat_keys]])
    
#     for cat, model in expense_models.items():
#         try:
#             p = model.predict(X)[0]
#             # use max(predicted, actual) so we don't understate
#             predicted[cat] = max(p, user_input.get(cat, 0))
#         except Exception:
#             predicted[cat] = user_input.get(cat, 0)

#     total_expenses = sum(predicted.values())

#     # 3. Personalized Suggestions
#     recommended = {}
#     suggestions = {}
#     # Define reduction rates by category
#     rates = {
#         "Rent": 0.05,
#         "Healthcare": 0.05,
#         "Eating_Out": 0.15,
#         "Entertainment": 0.15,
#         # all others get 10%
#     }
#     for cat, amt in predicted.items():
#         rate = rates.get(cat, 0.10)
#         new_amt = amt * (1 - rate)
#         saved = amt - new_amt
#         recommended[cat] = new_amt
#         suggestions[cat] = (
#             f"By reducing your {cat.replace('_',' ')} "
#             f"from ₹{amt:,.0f} to ₹{new_amt:,.0f}, "
#             f"you save ₹{saved:,.0f} next year."
#         )

#     new_total = sum(recommended.values())
#     potential_savings = max(disposable_income - new_total, 0)

#     # 4. Tax‐saving Tips
#     tax_tips = [
#         "Invest in 80C schemes (ELSS, PPF, etc.).",
#         "Contribute to NPS for extra deduction.",
#         "Leverage HRA exemptions if renting.",
#         "Claim 80D deduction on health insurance."
#     ]

#     # Final JSON payload
#     return {
#         "CTC": ctc,
#         "Tax_Payable": round(tax_amount, 2),
#         "Disposable_Income": round(disposable_income, 2),
#         "Predicted_Expenses": {k: round(v, 2) for k, v in predicted.items()},
#         "Total_Expenses": round(total_expenses, 2),
#         "Potential_Savings_Next_Year": round(potential_savings, 2),
#         "Recommended_Expenses": {k: round(v, 2) for k, v in recommended.items()},
#         "Saving_Suggestions": suggestions,
#         "Tax_Tips": tax_tips
#     }


# ------------------------------------------------------------------------------------------------------


import os
import numpy as np
import joblib
from utils.tax_calculator import calculate_tax

# Load all expense models
expense_models = {}
for fn in os.listdir("models"):
    if fn.startswith("expense_model_") and fn.endswith(".pkl"):
        cat = fn.replace("expense_model_", "").replace(".pkl", "")
        expense_models[cat] = joblib.load(f"models/{fn}")

# Load savings model (optional / unused in new logic)
savings_model = joblib.load("models/savings_model_stacked.pkl")


def predict_financials(user_input: dict) -> dict:
    """
    1. Compute tax & disposable income
    2. Predict each expense (never below user-entered)
    3. Lock Rent and Healthcare
    4. Calculate realistic saving recommendations
    5. Return full dashboard JSON
    """

    # 1. Tax & Disposable Income
    ctc = user_input["CTC"]
    tax_amount = calculate_tax(ctc)
    disposable_income = ctc - tax_amount

    # 2. Predict Expenses
    predicted = {}
    feat_keys = [k for k in user_input if k != "CTC"]
    X = np.array([[user_input[k] for k in feat_keys]])

    for cat, model in expense_models.items():
        try:
            model_prediction = model.predict(X)[0]
            predicted[cat] = max(model_prediction, user_input.get(cat, 0))
        except Exception:
            predicted[cat] = user_input.get(cat, 0)

    # 3. Lock Rent and Healthcare to user input
    predicted["Rent"] = user_input["Rent"]
    predicted["Healthcare"] = user_input["Healthcare"]

    total_expenses = sum(predicted.values())

    # 4. Realistic Recommendations (max 20% reduction except fixed categories)
    recommended = {}
    suggestions = {}
    for cat, amt in predicted.items():
        if cat in ["Rent", "Healthcare"]:
            new_amt = amt
            suggestions[cat] = f"{cat.replace('_',' ')} is essential and kept fixed at ₹{amt:,.0f}."
        else:
            # Reduce at most 20% of user's original value for fairness
            max_reduction = 0.20 * user_input.get(cat, amt)
            new_amt = max(amt - max_reduction, 0)
            saved = amt - new_amt
            suggestions[cat] = (
                f"By reducing your {cat.replace('_',' ')} from ₹{amt:,.0f} "
                f"to ₹{new_amt:,.0f}, you save ₹{saved:,.0f} next year."
            )
        recommended[cat] = new_amt

    new_total = sum(recommended.values())
    potential_savings = max(disposable_income - new_total, 0)

    # # 5. Tax‐saving Tips
    # tax_tips = [
    #     "Invest in 80C schemes (ELSS, PPF, etc.).",
    #     "Contribute to NPS for extra deduction.",
    #     "Leverage HRA exemptions if renting.",
    #     "Claim 80D deduction on health insurance."
    # ]
    # 5. Personalized Tax‐saving Tips
    tax_tips = []

    # Tip 1: 80C investments (for mid/high income & non-maximized expenses)
    if ctc > 800000 and total_expenses < 0.9 * disposable_income:
        tax_tips.append("You can save up to ₹1.5L in tax by investing in 80C schemes like ELSS, PPF, or LIC.")

    # Tip 2: NPS contribution (for good disposable income)
    if disposable_income > 200000:
        tax_tips.append("Consider contributing to NPS under 80CCD(1B) to save an additional ₹50,000 in tax.")

    # Tip 3: HRA benefit (if rent is significantly high)
    if user_input.get("Rent", 0) > 180000:
        tax_tips.append("You can claim HRA exemption for your rent payments under Section 10(13A).")

    # Tip 4: Health insurance deduction (if spending low on healthcare)
    if user_input.get("Healthcare", 0) < 25000:
        tax_tips.append("Buy health insurance and claim deductions up to ₹25,000 under 80D (₹50,000 for senior citizens).")

    # Tip 5: Fallback
    if not tax_tips:
        tax_tips.append("Consult a tax advisor to explore deductions under sections 80C, 80D, 80CCD, and HRA benefits.")


    # 6. Final Response
    return {
        "CTC": ctc,
        "Tax_Payable": round(tax_amount, 2),
        "Disposable_Income": round(disposable_income, 2),
        "Predicted_Expenses": {k: round(v, 2) for k, v in predicted.items()},
        "Total_Expenses": round(total_expenses, 2),
        "Potential_Savings_Next_Year": round(potential_savings, 2),
        "Recommended_Expenses": {k: round(v, 2) for k, v in recommended.items()},
        "Saving_Suggestions": suggestions,
        "Tax_Tips": tax_tips
    }
