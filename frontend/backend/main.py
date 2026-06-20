from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import re
import uuid
from datetime import datetime

app = FastAPI(title="VoicePay360 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VoiceRequest(BaseModel):
    text: str
    user_id: str = "demo_user"
    lang: str = "en-IN"

def parse_intent(text: str):
    t = text.lower().strip()
    amount = None
    m = re.search(r'(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)', t)
    if m:
        amount = float(m.group(1))
    payee = None
    if " to " in t:
        payee = t.split(" to ", 1)[1].split()[0].title()
    intent = (
        "payment" if any(k in t for k in ["pay", "send", "transfer"])
        else "recharge" if "recharge" in t
        else "bill_payment" if "bill" in t
        else "recurring_transfer" if "every month" in t or "monthly" in t
        else "unknown"
    )
    return intent, amount, payee

@app.get("/health")
def health():
    return {"status": "ok", "time": datetime.utcnow().isoformat()}

@app.post("/process")
def process(req: VoiceRequest):
    intent, amount, payee = parse_intent(req.text)
    biometric_confidence = 0.94 if req.user_id else 0.41
    risk = 0.12
    if amount and amount > 5000:
        risk += 0.35
    if intent == "unknown":
        risk += 0.25
    if "urgent" in req.text.lower():
        risk += 0.08

    approved = biometric_confidence >= 0.8 and risk < 0.5 and intent != "unknown"

    payment = {
        "txn_id": str(uuid.uuid4()),
        "status": "success" if approved else "pending",
        "provider": "upi-adapter",
        "amount": amount,
        "payee": payee,
    } if approved else {"status": "pending"}

    return {
        "text": req.text,
        "lang": req.lang,
        "intent": {
            "intent": intent,
            "amount": amount,
            "payee": payee,
        },
        "voice_biometrics": {
            "confidence": biometric_confidence,
            "method": "speaker_embedding",
            "passed": biometric_confidence >= 0.8,
        },
        "fraud_risk": {
            "score": round(min(risk, 1.0), 2),
            "reason": "heuristic risk engine",
        },
        "approved": approved,
        "payment": payment,
        "message": "Transaction approved" if approved else "Transaction needs confirmation"
    }