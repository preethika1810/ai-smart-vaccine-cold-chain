import pandas as pd
import joblib
import time

CRITICAL_TEMP = 10.0

# Load dataset
data = pd.read_csv("data/simulated_sensor_data.csv")

# Load trained AI model
model = joblib.load("models/condition_model.joblib")


def estimate_time_to_failure(current_temp, temperature_rate):
    """Estimate minutes until temperature reaches critical limit."""

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


print("\n==========================================")
print("   AI VACCINE COLD CHAIN LIVE MONITOR")
print("==========================================")
print("Starting simulated sensor stream...\n")

# Simulate continuous sensor readings
for _, row in data.head(30).iterrows():

    temperature = row["temperature_C"]
    humidity = row["humidity_percent"]
    temperature_rate = row["temperature_rate_C_per_min"]

    # AI prediction
    condition = model.predict([
        [temperature, humidity, temperature_rate]
    ])[0]

    # Time-to-failure prediction
    time_remaining = estimate_time_to_failure(
        temperature,
        temperature_rate
    )

    # Recommended action
    action = recommend_action(
        condition,
        time_remaining
    )

    print("------------------------------------------")
    print(f"Temperature      : {temperature:.2f} °C")
    print(f"Humidity         : {humidity:.2f} %")
    print(f"Temperature rate : {temperature_rate:.3f} °C/min")
    print(f"Condition        : {condition}")

    if time_remaining is None:
        print("Time to critical : Not currently rising")
    else:
        print(f"Time to critical : {time_remaining:.2f} minutes")

    print(f"Action           : {action}")

    # Wait 1 second to simulate live readings
    time.sleep(1)

print("\n==========================================")
print("Simulated live monitoring completed!")
print("==========================================")