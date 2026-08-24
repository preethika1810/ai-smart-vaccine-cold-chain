import pandas as pd
import numpy as np

# -----------------------------------
# Load sensor data
# -----------------------------------
data = pd.read_csv("data/simulated_sensor_data.csv")

CRITICAL_TEMP = 10.0  # °C

# -----------------------------------
# Function to estimate time to failure
# -----------------------------------
def estimate_time_to_failure(current_temp, temperature_rate):
    """
    Estimate how many minutes remain before
    temperature reaches the critical threshold.
    """

    # Already critical
    if current_temp >= CRITICAL_TEMP:
        return 0

    # Temperature is not currently rising
    if temperature_rate <= 0:
        return None

    # Estimate time using current heating rate
    time_remaining = (
        CRITICAL_TEMP - current_temp
    ) / temperature_rate

    return round(max(time_remaining, 0), 2)


# -----------------------------------
# Test the prediction on sensor data
# -----------------------------------
results = []

for _, row in data.iterrows():

    current_temp = row["temperature_C"]
    rate = row["temperature_rate_C_per_min"]

    estimated_time = estimate_time_to_failure(
        current_temp,
        rate
    )

    results.append(estimated_time)


# Add predictions to dataset
data["estimated_time_to_failure_min"] = results


# -----------------------------------
# Generate recommended action
# -----------------------------------
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


data["recommended_action"] = [
    recommend_action(condition, time_remaining)
    for condition, time_remaining
    in zip(
        data["condition"],
        data["estimated_time_to_failure_min"]
    )
]


# -----------------------------------
# Display important results
# -----------------------------------
print("\nTIME-TO-FAILURE PREDICTION")
print("=" * 40)

print(
    data[
        [
            "timestamp_min",
            "temperature_C",
            "temperature_rate_C_per_min",
            "condition",
            "estimated_time_to_failure_min",
            "recommended_action"
        ]
    ].tail(20).to_string(index=False)
)


# -----------------------------------
# Save results
# -----------------------------------
output_path = "data/prediction_results.csv"

data.to_csv(output_path, index=False)

print("\nPrediction completed successfully!")
print("Results saved to:", output_path)