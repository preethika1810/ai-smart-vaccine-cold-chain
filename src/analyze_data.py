import pandas as pd
import matplotlib.pyplot as plt

# Load the dataset
data = pd.read_csv("data/simulated_sensor_data.csv")

# -----------------------------
# Basic dataset information
# -----------------------------
print("Dataset shape:", data.shape)

print("\nMissing values:")
print(data.isnull().sum())

print("\nCondition distribution:")
print(data["condition"].value_counts())

print("\nBasic statistics:")
print(data[["temperature_C", "humidity_percent",
            "temperature_rate_C_per_min"]].describe())

# -----------------------------
# Temperature trend
# -----------------------------
plt.figure(figsize=(12, 5))

plt.plot(
    data["timestamp_min"],
    data["temperature_C"],
    label="Temperature"
)

plt.axhline(
    y=8,
    linestyle="--",
    label="Warning threshold"
)

plt.axhline(
    y=10,
    linestyle="--",
    label="Critical threshold"
)

plt.xlabel("Time (minutes)")
plt.ylabel("Temperature (°C)")
plt.title("Vaccine Cold-Chain Temperature Trend")
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.savefig("data/temperature_trend.png", dpi=300)
plt.show()

# -----------------------------
# Humidity trend
# -----------------------------
plt.figure(figsize=(12, 5))

plt.plot(
    data["timestamp_min"],
    data["humidity_percent"],
    label="Humidity"
)

plt.xlabel("Time (minutes)")
plt.ylabel("Humidity (%)")
plt.title("Vaccine Cold-Chain Humidity Trend")
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.savefig("data/humidity_trend.png", dpi=300)
plt.show()

print("\nAnalysis completed successfully!")