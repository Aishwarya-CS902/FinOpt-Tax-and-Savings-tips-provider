# from fastapi import FastAPI
# from pydantic import BaseModel
# from utils.predict_engine import predict_financials

# app = FastAPI()

# class UserInput(BaseModel):
#     CTC: float
#     Rent: float
#     Utilities: float
#     Groceries: float
#     Transport: float
#     Eating_Out: float
#     Entertainment: float
#     Healthcare: float
#     Miscellaneous: float

# @app.post("/predict_financials/")
# async def get_financial_predictions(input: UserInput):
#     result = predict_financials(input.dict())
#     return result
# -------------------------------------------------------
# # main.py

# from fastapi import FastAPI
# from pydantic import BaseModel
# from utils.predict_engine import predict_financials

# app = FastAPI(
#     title="Financial Dashboard API",
#     description="Combined endpoint for expenses, tax, and savings potential",
#     version="1.0"
# )

# class UserInput(BaseModel):
#     CTC: float
#     Rent: float
#     Utilities: float
#     Groceries: float
#     Transport: float
#     Eating_Out: float
#     Entertainment: float
#     Healthcare: float
#     Miscellaneous: float

# @app.post("/predict_financials/", summary="Get full dashboard prediction")
# async def get_financial_predictions(input: UserInput):
#     """
#     Returns:
#       - predicted expenses
#       - tax payable
#       - disposable income
#       - potential savings next year
#       - personalized saving suggestions
#       - tax-saving tips
#     """
#     result = predict_financials(input.dict())
#     return result
# ------------------------------------------------------------------------------

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils.predict_engine import predict_financials
import joblib
import os

# ===== FastAPI App =====
app = FastAPI(
    title="Financial Dashboard API",
    description="Combined endpoint for expenses, tax, and savings potential",
    version="1.0"
)

# ===== CORS Middleware =====
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== Load Models ONCE during server startup =====
MODELS_DIR = "models"

try:
    print("🔄 Loading models...")
    
    savings_model = joblib.load(os.path.join(MODELS_DIR, "savings_model_stacked.pkl"))
    expense_models = {
        'Eating_Out': joblib.load(os.path.join(MODELS_DIR, 'expense_model_Eating_Out.pkl')),
        'Entertainment': joblib.load(os.path.join(MODELS_DIR, 'expense_model_Entertainment.pkl')),
        # Add other models here
    }
    
    print("✅ Models loaded successfully!")
except Exception as e:
    print(f"❌ Model loading failed: {str(e)}")
    raise e

# ===== Pydantic Schema =====
class UserInput(BaseModel):
    CTC: float
    Rent: float
    Utilities: float
    Groceries: float
    Transport: float
    Eating_Out: float
    Entertainment: float
    Healthcare: float
    Miscellaneous: float

# ===== API Route =====
@app.post("/predict_financials/", summary="Get full dashboard prediction")
async def get_financial_predictions(input: UserInput):
    """
    Returns:
      - predicted expenses
      - tax payable
      - disposable income
      - potential savings next year
      - personalized saving suggestions
      - tax-saving tips
    """
    print("\n🔍 New prediction request received")
    
    try:
        predict_financials.savings_model = savings_model
        predict_financials.expense_models = expense_models
        
        result = predict_financials(user_input=input.dict())
        
        print("✅ Prediction completed successfully")
        return result
        
    except Exception as e:
        print(f"❌ Prediction failed: {str(e)}")
        return {"error": str(e)}


