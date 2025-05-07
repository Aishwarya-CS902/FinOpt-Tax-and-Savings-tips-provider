import pandas as pd
import numpy as np
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor, StackingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import r2_score, root_mean_squared_error
import joblib
from xgboost import XGBRegressor

# Ensure model directory exists
os.makedirs('models', exist_ok=True)

# Load dataset
df = pd.read_csv('D:/server/yearly_financial_data.csv')

# Print dataset info
print("Dataset loaded with shape:", df.shape)
print("Columns in dataset:", df.columns.tolist())

# Explicitly define expense categories
expense_categories = [
    'Groceries', 'Transport', 'Eating_Out', 'Entertainment', 
    'Utilities', 'Healthcare', 'Education', 'Miscellaneous'
]

# Define non-reducible categories (these won't be modeled for expense reduction)
non_reducible = ['Education', 'Rent', 'Healthcare', 'Insurance', 'Loan_Repayment']

# Filter expense categories to remove non-reducible ones
expense_categories_to_model = [cat for cat in expense_categories if cat not in non_reducible]

print("\nExpense categories to model:", expense_categories_to_model)
print("Non-reducible expenses (excluded from modeling):", non_reducible)

# Define features - include both reducible and non-reducible expenses as features
# but exclude the target variables (Desired_Savings, Disposable_Income)
exclude_from_features = ['Desired_Savings', 'Disposable_Income']
X = df.drop(columns=exclude_from_features)

# Define savings target
y_savings = df['Desired_Savings']

# Define expense targets - only the reducible ones
y_expenses = df[expense_categories_to_model]

# Print debug info
print("\nFeature columns:", X.columns.tolist())
print("Number of features:", len(X.columns))
print("Expense categories to model:", y_expenses.columns.tolist())
print("Number of expense categories:", len(y_expenses.columns))

# Identify column types
categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
numerical_cols = X.select_dtypes(exclude=['object']).columns.tolist()

print("\nCategorical columns:", categorical_cols)
print("Numerical columns:", numerical_cols)

# Preprocessor
preprocessor = ColumnTransformer(
    transformers=[('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)],
    remainder='passthrough'
)

###  Ensemble for Desired_Savings
print("\n Training Stacked Ensemble for Savings Model...")

# Base regressors
base_learners = [
    ('rf', RandomForestRegressor(n_estimators=150, max_depth=10, random_state=42)),
    ('gb', GradientBoostingRegressor(n_estimators=150, max_depth=5, random_state=42)),
    ('xgb', XGBRegressor(n_estimators=150, max_depth=6, learning_rate=0.1, random_state=42))
]

# Meta-learner
stacked_model = StackingRegressor(
    estimators=base_learners,
    final_estimator=LinearRegression(),
    passthrough=True,
    cv=5
)

# Pipeline
savings_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('stacked', stacked_model)
])

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y_savings, test_size=0.2, random_state=42)

# Fit model
savings_pipeline.fit(X_train, y_train)

# Evaluate
y_pred = savings_pipeline.predict(X_test)
rmse = root_mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(" Savings Ensemble Evaluation:")
print(f"   - RMSE: {rmse:.2f}")
print(f"   - R² Score: {r2:.4f}")

# Save model
model_path = 'models/savings_model_stacked.pkl'
joblib.dump(savings_pipeline, model_path)
print(f" Savings model saved to: {model_path}")

###  Train Expense Models
print("\n Training Expense Models...")
print(f"Number of expense categories to model: {len(expense_categories_to_model)}")

if len(expense_categories_to_model) == 0:
    print("ERROR: No expense categories found to model!")
else:
    for col in expense_categories_to_model:
        print(f"\n→ Starting training for: {col}")
        
        pipeline = Pipeline(steps=[
            ('preprocessor', preprocessor),
            ('model', GradientBoostingRegressor(n_estimators=150, learning_rate=0.1, max_depth=5, random_state=42))
        ])

        y = df[col]
        X_train_exp, X_test_exp, y_train_exp, y_test_exp = train_test_split(X, y, test_size=0.2, random_state=42)
        pipeline.fit(X_train_exp, y_train_exp)

        y_pred_exp = pipeline.predict(X_test_exp)
        rmse_exp = root_mean_squared_error(y_test_exp, y_pred_exp)
        r2_exp = r2_score(y_test_exp, y_pred_exp)

        print(f"   - RMSE: {rmse_exp:.2f}")
        print(f"   - R² Score: {r2_exp:.4f}")

        model_path = f'models/expense_model_{col}.pkl'
        joblib.dump(pipeline, model_path)
        print(f"→ Model for {col} saved to: {model_path}")

# Verify which models were saved
print("\n Checking saved models in models directory:")
saved_models = os.listdir('models')
print(f"Total models saved: {len(saved_models)}")
for model in saved_models:
    print(f" - {model}")

print("\n All models trained and saved successfully.")