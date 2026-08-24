import joblib

CRITICAL_TEMP = 10.0

# Load trained condition model
model = joblib.load("models/condition_model.joblib")


def estimate_time_to_failure(current_temp, temperature_rate):
    """Estimate minutes until temperature reaches 10°C."""

    if current_temp >= CRITICAL_TEMP:
        return 0

    if temperature_rate <= 0:
        return None

    return round(
        (CRITICAL_TEMP - current_temp) / temperature_rate,
        2
    )


def predict_condition(current_temp, humidity, temperature_rate):
    """Predict vaccine storage condition."""

    prediction = model.predict([
        [current_temp, humidity, temperature_rate]
    ])

    return prediction[0]


def recommend_action(condition, time_remaining):
    """Give an action based on predicted condition."""

    if condition == "Normal":
        return "Continue monitoring"

    if condition == "Warning":
        if time_remaining is not None and time_remaining < 30:
            return "Check cooling system immediately"
        return "Monitor temperature closely"

    if condition == "Critical":
        return "Restore cooling system and protect vaccine stock"

    return "Monitor system"


print("\n======================================")
print("   AI VACCINE COLD CHAIN MONITOR")
print("======================================")

# Get live sensor values
temperature = float(input("Enter temperature (°C): "))
humidity = float(input("Enter humidity (%): "))
temperature_rate = float(
    input("Enter temperature rise rate (°C/min): ")
)

# AI condition prediction
condition = predict_condition(
    temperature,
    humidity,
    temperature_rate
)

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

print("\n----------- PREDICTION -----------")
print(f"Temperature       : {temperature:.2f} °C")
print(f"Humidity          : {humidity:.2f} %")
print(f"Temperature rate  : {temperature_rate:.3f} °C/min")
print(f"Condition         : {condition}")

if time_remaining is None:
    print("Time to critical  : Not currently rising")
else:
    print(f"Time to critical  : {time_remaining:.2f} minutes")

print(f"Recommended action: {action}")
print("----------------------------------")