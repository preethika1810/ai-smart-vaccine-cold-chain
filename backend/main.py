from fastapi import FastAPI
from pydantic import BaseModel
import joblib

import firebase_admin
from firebase_admin import credentials, firestore

app = FastAPI(
    title="AI Smart Vaccine Cold Chain API",
    description="Backend API for AI-based vaccine cold-chain monitoring",
    version="1.0.0"
)

# Initialize Firebase
cred = credentials.Certificate("vaccine-cold-chain321-firebase-adminsdk-fbsvc-99f451deeb.json")
firebase_admin.initialize_app(cred)

db = firestore.client() 

# Load trained AI model
model = joblib.load("models/condition_model.joblib")

CRITICAL_TEMP = 10.0


class SensorData(BaseModel):
    temperature: float
    humidity: float
    temperature_rate: float


def estimate_time_to_failure(current_temp, temperature_rate):
    """Estimate minutes until temperature reaches the critical temperature."""

    if current_temp >= CRITICAL_TEMP:
        return 0

    if temperature_rate <= 0:
        return None

    return round(
        (CRITICAL_TEMP - current_temp) / temperature_rate,
        2
    )


def recommend_action(condition, time_remaining):

    if condition == "Normal":
        return "Continue monitoring"

    if condition == "Warning":

        if time_remaining is not None and time_remaining < 30:
            return "Check cooling system immediately"

        return "Monitor temperature closely"

    if condition == "Critical":
        return "Restore cooling system and protect vaccine stock"

    return "Monitor system"


@app.get("/")
def home():
    return {
        "message": "AI Vaccine Cold Chain Backend is running!",
        "status": "online"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.post("/sensor")
def process_sensor_data(sensor: SensorData):

    # Send sensor readings to the trained AI model
    condition = model.predict([
        [
            sensor.temperature,
            sensor.humidity,
            sensor.temperature_rate
        ]
    ])[0]

    # Calculate time to critical temperature
    time_remaining = estimate_time_to_failure(
        sensor.temperature,
        sensor.temperature_rate
    )

    # Determine recommended action
    action = recommend_action(
        condition,
        time_remaining
    )

        # Save sensor data and AI prediction to Firestore
    db.collection("sensor_readings").add({
        "temperature": sensor.temperature,
        "humidity": sensor.humidity,
        "temperature_rate": sensor.temperature_rate,
        "condition": condition,
        "time_to_critical": time_remaining,
        "recommended_action": action,
        "timestamp": firestore.SERVER_TIMESTAMP
    })

    return {
        "temperature": sensor.temperature,
        "humidity": sensor.humidity,
        "temperature_rate": sensor.temperature_rate,
        "condition": condition,
        "time_to_critical": time_remaining,
        "recommended_action": action
    }