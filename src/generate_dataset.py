import numpy as np
import pandas as pd

# Reproducible results
np.random.seed(42)

# Number of sensor readings
N = 3000

# Time in minutes
time = np.arange(N)

# -----------------------------
# Simulated temperature profile
# -----------------------------
temperature = np.zeros(N)
humidity = np.zeros(N)

# Start near normal vaccine-storage temperature
temperature[0] = 5.0
humidity[0] = 60.0

for i in range(1, N):
    # Small natural sensor variation
    temp_change = np.random.normal(0, 0.08)
    humidity_change = np.random.normal(0, 0.25)

    temperature[i] = temperature[i - 1] + temp_change
    humidity[i] = humidity[i - 1] + humidity_change

    # Keep normal operation within a realistic range
    temperature[i] = np.clip(temperature[i], 2.5, 8.0)
    humidity[i] = np.clip(humidity[i], 40, 80)

# --------------------------------
# Add simulated cooling-failure events
# --------------------------------
failure_starts = [500, 1200, 1900, 2600]

for start in failure_starts:
    for i in range(start, min(start + 120, N)):
        minutes_after_failure = i - start

        # Temperature rises progressively after cooling failure
        temperature[i] = 5.5 + (minutes_after_failure * 0.06) + np.random.normal(0, 0.08)

        # Humidity also changes during the event
        humidity[i] = 62 + (minutes_after_failure * 0.05) + np.random.normal(0, 0.4)

# --------------------------------
# Calculate temperature rate
# --------------------------------
temperature_rate = np.gradient(temperature)

# --------------------------------
# Assign condition labels
# --------------------------------
condition = []

for temp in temperature:
    if temp <= 8:
        condition.append("Normal")
    elif temp <= 10:
        condition.append("Warning")
    else:
        condition.append("Critical")

# --------------------------------
# Estimate time to critical state
# --------------------------------
time_to_failure = []

for i in range(N):
    current_temp = temperature[i]
    rate = temperature_rate[i]

    if current_temp >= 10:
        time_to_failure.append(0)

    elif rate > 0:
        estimated_minutes = (10 - current_temp) / rate
        estimated_minutes = max(0, estimated_minutes)
        time_to_failure.append(round(estimated_minutes, 2))

    else:
        time_to_failure.append(np.nan)

# --------------------------------
# Create dataset
# --------------------------------
data = pd.DataFrame({
    "timestamp_min": time,
    "temperature_C": np.round(temperature, 2),
    "humidity_percent": np.round(humidity, 2),
    "temperature_rate_C_per_min": np.round(temperature_rate, 4),
    "condition": condition,
    "time_to_critical_min": time_to_failure
})

# Save dataset
output_path = "data/simulated_sensor_data.csv"
data.to_csv(output_path, index=False)

print("Dataset generated successfully!")
print(f"Rows: {len(data)}")
print(f"Saved to: {output_path}")
print("\nCondition distribution:")
print(data["condition"].value_counts())