import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
from sklearn.utils.class_weight import compute_class_weight

# -----------------------------------
# 1. Load the simulated sensor data
# -----------------------------------
data = pd.read_csv("data/simulated_sensor_data.csv")

# -----------------------------------
# 2. Select AI input features
# -----------------------------------
features = [
    "temperature_C",
    "humidity_percent",
    "temperature_rate_C_per_min"
]

X = data[features]
y = data["condition"]

# -----------------------------------
# 3. Split data into training/testing
# -----------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# -----------------------------------
# 4. Handle class imbalance
# -----------------------------------
classes = y_train.unique().to_numpy()

weights = compute_class_weight(
    class_weight="balanced",
    classes=classes,
    y=y_train
)

class_weights = dict(zip(classes, weights))

print("Class weights:")
print(class_weights)

# -----------------------------------
# 5. Create the AI model
# -----------------------------------
model = RandomForestClassifier(
    n_estimators=200,
    class_weight=class_weights,
    random_state=42
)

# -----------------------------------
# 6. Train the model
# -----------------------------------
model.fit(X_train, y_train)

# -----------------------------------
# 7. Test the model
# -----------------------------------
predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("\nModel Accuracy:", round(accuracy * 100, 2), "%")

print("\nClassification Report:")
print(classification_report(y_test, predictions))

# -----------------------------------
# 8. Save the trained model
# -----------------------------------
model_path = "models/condition_model.joblib"

joblib.dump(model, model_path)

print("\nModel saved successfully!")
print("Location:", model_path)