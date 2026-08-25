var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");

// src/utils/mockData.ts
var INITIAL_BATCHES = [
  {
    id: "BATCH-2026-COV-01",
    vaccineName: "Spikevax bivalent (mRNA-1273)",
    manufacturer: "Moderna Therapeutics",
    minTemp: 2,
    maxTemp: 8,
    idealTemp: 4.5,
    minHumidity: 30,
    maxHumidity: 65,
    maxAllowedExcursionMinutes: 120,
    criticalExcursionMinutes: 45,
    criticalUpperTemp: 14,
    quantity: 4800,
    unitCost: 32.5,
    expiryDate: "2027-04-15",
    storageUnitId: "COLD-ROOM-ALPHA",
    storageUnitName: "Central Vaccine Cold Vault #1",
    deviceId: "SHT33-EDGE-01",
    currentStatus: "SAFE",
    isTransport: false
  },
  {
    id: "BATCH-2026-MMR-88",
    vaccineName: "M-M-R II (Live Attenuated)",
    manufacturer: "Merck & Co.",
    minTemp: 2,
    maxTemp: 8,
    idealTemp: 5,
    minHumidity: 25,
    maxHumidity: 60,
    maxAllowedExcursionMinutes: 90,
    criticalExcursionMinutes: 30,
    criticalUpperTemp: 12,
    quantity: 1250,
    unitCost: 45,
    expiryDate: "2026-11-30",
    storageUnitId: "REEFER-TRUCK-T12",
    storageUnitName: "Reefer Transport Carrier T-12",
    deviceId: "SHT33-EDGE-02",
    currentStatus: "SAFE",
    isTransport: true,
    transportJourneyId: "TR-JOURNEY-904"
  },
  {
    id: "BATCH-2026-POL-34",
    vaccineName: "IPOL (Inactivated Poliomyelitis)",
    manufacturer: "Sanofi Pasteur",
    minTemp: 2,
    maxTemp: 8,
    idealTemp: 4,
    minHumidity: 35,
    maxHumidity: 70,
    maxAllowedExcursionMinutes: 180,
    criticalExcursionMinutes: 60,
    criticalUpperTemp: 15,
    quantity: 3200,
    unitCost: 28,
    expiryDate: "2027-08-20",
    storageUnitId: "STORAGE-DEPOT-WEST",
    storageUnitName: "West District Mobile Distribution Hub",
    deviceId: "SHT33-EDGE-03",
    currentStatus: "SAFE",
    isTransport: false
  },
  {
    id: "BATCH-2026-HPV-19",
    vaccineName: "Gardasil 9 (Recombinant 9-valent)",
    manufacturer: "Merck Sharp & Dohme",
    minTemp: 2,
    maxTemp: 8,
    idealTemp: 4.8,
    minHumidity: 30,
    maxHumidity: 65,
    maxAllowedExcursionMinutes: 72,
    criticalExcursionMinutes: 35,
    criticalUpperTemp: 13,
    quantity: 950,
    unitCost: 180,
    expiryDate: "2027-01-10",
    storageUnitId: "CLINIC-FRIDGE-04",
    storageUnitName: "Community Clinic Pharmacy Chiller 4",
    deviceId: "SHT33-EDGE-04",
    currentStatus: "SAFE",
    isTransport: false
  }
];
var INITIAL_DEVICES = [
  {
    id: "SHT33-EDGE-01",
    name: "SHT33 Edge Node Alpha (Cold Vault 1)",
    model: "Sensirion SHT33 High-Precision (\xB10.15\xB0C, \xB11.5% RH)",
    assignedBatchId: "BATCH-2026-COV-01",
    assignedStorageUnit: "Central Vaccine Cold Vault #1",
    connectivity: "ONLINE",
    bufferCount: 0,
    batteryPct: 98,
    firmwareVersion: "v2.4.1-echelon",
    lastSync: (/* @__PURE__ */ new Date()).toISOString(),
    samplingIntervalSec: 5
  },
  {
    id: "SHT33-EDGE-02",
    name: "SHT33 Edge Node Mobile (Reefer T-12)",
    model: "Sensirion SHT33 + Quectel BG95 Cellular Gateway",
    assignedBatchId: "BATCH-2026-MMR-88",
    assignedStorageUnit: "Reefer Transport Carrier T-12",
    connectivity: "ONLINE",
    bufferCount: 0,
    batteryPct: 87,
    firmwareVersion: "v2.4.1-echelon",
    lastSync: (/* @__PURE__ */ new Date()).toISOString(),
    samplingIntervalSec: 5
  },
  {
    id: "SHT33-EDGE-03",
    name: "SHT33 Edge Node West (Depot Hub)",
    model: "Sensirion SHT33 High-Precision",
    assignedBatchId: "BATCH-2026-POL-34",
    assignedStorageUnit: "West District Mobile Distribution Hub",
    connectivity: "ONLINE",
    bufferCount: 0,
    batteryPct: 94,
    firmwareVersion: "v2.4.0-echelon",
    lastSync: (/* @__PURE__ */ new Date()).toISOString(),
    samplingIntervalSec: 5
  },
  {
    id: "SHT33-EDGE-04",
    name: "SHT33 Edge Node Clinic #4",
    model: "Sensirion SHT33 High-Precision",
    assignedBatchId: "BATCH-2026-HPV-19",
    assignedStorageUnit: "Community Clinic Pharmacy Chiller 4",
    connectivity: "ONLINE",
    bufferCount: 0,
    batteryPct: 91,
    firmwareVersion: "v2.4.1-echelon",
    lastSync: (/* @__PURE__ */ new Date()).toISOString(),
    samplingIntervalSec: 5
  }
];
var INITIAL_TRANSPORTS = [
  {
    id: "TR-JOURNEY-904",
    batchId: "BATCH-2026-MMR-88",
    batchName: "M-M-R II (1,250 doses)",
    driverName: "Marcus Vance (Certified Cold-Chain Courier)",
    driverPhone: "+1 (555) 438-9921",
    vehicleId: "REEFER-TRUCK-T12",
    vehicleType: "Carrier Transicold Supra 850 Climate Truck",
    origin: { name: "State Bio-Repository Central", lat: 37.7749, lng: -122.4194 },
    destination: { name: "St. Jude Regional Healthcare Center", lat: 37.3382, lng: -121.8863 },
    currentLocation: { lat: 37.5485, lng: -122.2711, locationName: "Highway 101 Southbound (San Mateo Corridor)" },
    routeCoordinates: [
      [37.7749, -122.4194],
      [37.7021, -122.4712],
      [37.6213, -122.379],
      [37.5485, -122.2711],
      [37.4419, -122.143],
      [37.3688, -122.0363],
      [37.3382, -121.8863]
    ],
    currentWaypointIndex: 3,
    departureTime: new Date(Date.now() - 45 * 60 * 1e3).toISOString(),
    estimatedArrival: new Date(Date.now() + 35 * 60 * 1e3).toISOString(),
    handoverLocation: "Bay 3 Biomedical Receiving Dock",
    arrivalCondition: "PENDING",
    status: "IN_TRANSIT",
    speedKmH: 88
  }
];
function generateInitialTelemetryHistory(batch, count = 25) {
  const readings = [];
  const now = Date.now();
  const stepMs = 5e3;
  for (let i = count - 1; i >= 0; i--) {
    const timestamp = new Date(now - i * stepMs).toISOString();
    const jitter = Math.sin(i * 0.4) * 0.3 + (Math.random() * 0.2 - 0.1);
    const temperature = Number((batch.idealTemp + jitter).toFixed(2));
    const humidity = Number((50 + Math.cos(i * 0.3) * 5 + (Math.random() * 2 - 1)).toFixed(1));
    readings.push({
      id: `TEL-${batch.id}-${now - i * stepMs}`,
      deviceId: batch.deviceId,
      batchId: batch.id,
      storageUnitId: batch.storageUnitId,
      timestamp,
      temperature,
      humidity,
      isValid: true,
      rawStatus: "NORMAL",
      edgeBuffered: false,
      gps: batch.isTransport ? { lat: 37.5485, lng: -122.2711, locationName: "Highway 101 Southbound", speed: 85 } : { lat: 37.7749, lng: -122.4194, locationName: "Central Depot Vault" },
      batteryLevel: 98,
      signalRssi: -65
    });
  }
  return readings;
}
var INITIAL_AUDIT_LOGS = [
  {
    id: "AUD-001",
    timestamp: new Date(Date.now() - 3600 * 1e3).toISOString(),
    userName: "Director Arthur Sterling",
    userRole: "ADMINISTRATOR",
    action: "SYSTEM_INITIALIZATION",
    entityType: "DEVICE",
    entityId: "SHT33-EDGE-01",
    details: "ECHELON Cold-Chain Engine calibrated with Sensirion SHT33 sensor array. Base safe boundaries (2.0\xB0C - 8.0\xB0C) locked."
  },
  {
    id: "AUD-002",
    timestamp: new Date(Date.now() - 2400 * 1e3).toISOString(),
    userName: "Dr. Elena Rostova, PharmD",
    userRole: "HEALTHCARE_WORKER",
    action: "BATCH_RECEIPT_VERIFICATION",
    entityType: "BATCH",
    entityId: "BATCH-2026-COV-01",
    details: "Ingested 4,800 doses of Spikevax bivalent into Central Vaccine Cold Vault #1. Initial temperature verified at 4.2\xB0C."
  },
  {
    id: "AUD-003",
    timestamp: new Date(Date.now() - 1800 * 1e3).toISOString(),
    userName: "Marcus Vance",
    userRole: "TRANSPORT_PERSONNEL",
    action: "TRANSPORT_DISPATCH",
    entityType: "BATCH",
    entityId: "BATCH-2026-MMR-88",
    details: "Loaded 1,250 doses of M-M-R II onto Reefer Transport Carrier T-12. Active pre-cooling verified at 4.8\xB0C."
  }
];

// src/utils/riskEngine.ts
function calculateAIRiskPrediction(batch, recentReadings) {
  if (!recentReadings || recentReadings.length === 0) {
    return {
      batchId: batch.id,
      riskScore: 10,
      riskClassification: "SAFE",
      estimatedExposureDurationMinutes: 0,
      estimatedTimeUntilSpoilageSeconds: null,
      predictedSpoilageTime: null,
      temperatureTrend: "STABLE",
      rateOfChangeCPerMin: 0,
      recoveryTimeRemainingMinutes: null,
      repeatedExcursionsCount: 0,
      maxRecordedTemp: batch.idealTemp,
      minRecordedTemp: batch.idealTemp,
      explainabilityFactors: ["Insufficient telemetry data - defaulting to nominal baseline."],
      earlyWarningMessage: "Initializing sensor stream from SHT33 edge unit."
    };
  }
  const sorted = [...recentReadings].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  const latest = sorted[sorted.length - 1];
  const currentTemp = latest.temperature;
  const temps = sorted.map((r) => r.temperature);
  const maxRecordedTemp = Math.max(...temps);
  const minRecordedTemp = Math.min(...temps);
  let rateOfChangeCPerMin = 0;
  const sampleWindow = sorted.slice(-10);
  if (sampleWindow.length >= 2) {
    const firstInWindow = sampleWindow[0];
    const lastInWindow = sampleWindow[sampleWindow.length - 1];
    const timeDiffMinutes = (new Date(lastInWindow.timestamp).getTime() - new Date(firstInWindow.timestamp).getTime()) / (1e3 * 60);
    if (timeDiffMinutes > 0.05) {
      rateOfChangeCPerMin = Number(
        ((lastInWindow.temperature - firstInWindow.temperature) / timeDiffMinutes).toFixed(3)
      );
    }
  }
  let temperatureTrend = "STABLE";
  if (rateOfChangeCPerMin > 0.25) temperatureTrend = "RISING_FAST";
  else if (rateOfChangeCPerMin > 0.04) temperatureTrend = "RISING_SLOW";
  else if (rateOfChangeCPerMin < -0.25) temperatureTrend = "FALLING_FAST";
  else if (rateOfChangeCPerMin < -0.04) temperatureTrend = "FALLING_SLOW";
  let consecutiveUnsafeCount = 0;
  let excursionType = "NONE";
  for (let i = sorted.length - 1; i >= 0; i--) {
    const t = sorted[i].temperature;
    if (t > batch.maxTemp) {
      if (excursionType === "NONE") excursionType = "HIGH";
      if (excursionType === "HIGH") consecutiveUnsafeCount++;
      else break;
    } else if (t < batch.minTemp) {
      if (excursionType === "NONE") excursionType = "LOW";
      if (excursionType === "LOW") consecutiveUnsafeCount++;
      else break;
    } else {
      break;
    }
  }
  const estimatedExposureDurationMinutes = Math.round(consecutiveUnsafeCount * 5 / 60);
  let excursionCount = 0;
  let inExcursion = false;
  for (const r of sorted) {
    if (r.temperature > batch.maxTemp || r.temperature < batch.minTemp) {
      if (!inExcursion) {
        excursionCount++;
        inExcursion = true;
      }
    } else {
      inExcursion = false;
    }
  }
  let rawScore = 12;
  const explainability = [];
  const isHighExcursion = currentTemp > batch.maxTemp;
  const isLowExcursion = currentTemp < batch.minTemp;
  if (!isHighExcursion && !isLowExcursion) {
    if (temperatureTrend === "RISING_FAST" && currentTemp > batch.maxTemp - 1) {
      rawScore = 38;
      explainability.push(`Temperature is within range (${currentTemp.toFixed(1)}\xB0C) but rising rapidly (+${rateOfChangeCPerMin.toFixed(2)}\xB0C/min) toward the ${batch.maxTemp}\xB0C limit.`);
    } else if (temperatureTrend === "FALLING_FAST" && currentTemp < batch.minTemp + 1) {
      rawScore = 35;
      explainability.push(`Temperature is within range (${currentTemp.toFixed(1)}\xB0C) but dropping rapidly towards freezing risks.`);
    } else {
      rawScore = 15;
      explainability.push(`Temperature (${currentTemp.toFixed(1)}\xB0C) and humidity are within optimal storage parameters (${batch.minTemp}\xB0C to ${batch.maxTemp}\xB0C).`);
    }
  } else if (isHighExcursion) {
    const deltaOver = currentTemp - batch.maxTemp;
    const tempSeverity = Math.min(50, deltaOver * 8);
    const durationSeverity = Math.min(35, estimatedExposureDurationMinutes / batch.criticalExcursionMinutes * 35);
    const rateSeverity = rateOfChangeCPerMin > 0 ? Math.min(15, rateOfChangeCPerMin * 50) : -5;
    rawScore = 35 + tempSeverity + durationSeverity + rateSeverity;
    explainability.push(`Temperature (${currentTemp.toFixed(1)}\xB0C) has exceeded the safe ceiling (${batch.maxTemp.toFixed(1)}\xB0C) by +${deltaOver.toFixed(1)}\xB0C.`);
    if (estimatedExposureDurationMinutes > 0) {
      explainability.push(`Continuous unsafe exposure duration is approximately ${estimatedExposureDurationMinutes} minutes (Critical limit: ${batch.criticalExcursionMinutes} min).`);
    }
    if (rateOfChangeCPerMin > 0) {
      explainability.push(`Thermal climb rate is +${rateOfChangeCPerMin.toFixed(2)}\xB0C/min without active thermal resistance.`);
    } else if (rateOfChangeCPerMin < -0.05) {
      explainability.push(`Temperature is trending downward (-${Math.abs(rateOfChangeCPerMin).toFixed(2)}\xB0C/min) indicating cooling recovery.`);
    }
  } else if (isLowExcursion) {
    const deltaUnder = batch.minTemp - currentTemp;
    const subZeroPenalty = currentTemp < 0 ? 30 : 0;
    rawScore = 40 + deltaUnder * 15 + subZeroPenalty + Math.min(25, estimatedExposureDurationMinutes * 1.5);
    explainability.push(`Temperature (${currentTemp.toFixed(1)}\xB0C) is below recommended minimum (${batch.minTemp.toFixed(1)}\xB0C) \u2014 freeze risk detected.`);
    if (currentTemp < 0) {
      explainability.push(`CRITICAL: Sub-zero freezing condition (<0.0\xB0C) may irreversibly denature protein/adjuvant structure.`);
    }
  }
  if (excursionCount > 1) {
    rawScore += Math.min(15, (excursionCount - 1) * 5);
    explainability.push(`Historical cumulative fatigue: Batch has experienced ${excursionCount} separate temperature excursions.`);
  }
  const riskScore = Math.max(0, Math.min(100, Math.round(rawScore)));
  let riskClassification = "SAFE";
  if (riskScore >= 71) {
    riskClassification = "CRITICAL";
  } else if (riskScore >= 31) {
    riskClassification = "WARNING";
  }
  let estimatedTimeUntilSpoilageSeconds = null;
  let predictedSpoilageTime = null;
  let recoveryTimeRemainingMinutes = null;
  if (riskClassification === "CRITICAL" || isHighExcursion && rateOfChangeCPerMin > 0) {
    const criticalTemp = batch.criticalUpperTemp || batch.maxTemp + 4;
    let minutesToCritTemp = 999;
    if (rateOfChangeCPerMin > 0.01) {
      const remainingTempMargin = criticalTemp - currentTemp;
      if (remainingTempMargin <= 0) {
        minutesToCritTemp = 2;
      } else {
        minutesToCritTemp = remainingTempMargin / rateOfChangeCPerMin;
      }
    }
    const remainingExposureMinutes = Math.max(1, batch.criticalExcursionMinutes - estimatedExposureDurationMinutes);
    const predictedMinutes = Math.max(1, Math.min(minutesToCritTemp, remainingExposureMinutes));
    estimatedTimeUntilSpoilageSeconds = Math.round(predictedMinutes * 60);
    const now = new Date(latest.timestamp);
    const targetDate = new Date(now.getTime() + estimatedTimeUntilSpoilageSeconds * 1e3);
    predictedSpoilageTime = targetDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    explainability.push(`Predicted critical degradation condition in approximately ${Math.round(predictedMinutes)} minutes (${predictedSpoilageTime}) if unmitigated.`);
  } else if (isHighExcursion && rateOfChangeCPerMin < -0.05) {
    const tempToRecover = currentTemp - batch.idealTemp;
    recoveryTimeRemainingMinutes = Math.max(1, Math.round(tempToRecover / Math.abs(rateOfChangeCPerMin)));
    explainability.push(`Active thermal stabilization detected: Projected full recovery to ${batch.idealTemp}\xB0C in ~${recoveryTimeRemainingMinutes} minutes.`);
  }
  let earlyWarningMessage = "\u{1F7E2} Temperature is within the recommended safe storage range.";
  if (riskClassification === "CRITICAL") {
    earlyWarningMessage = `\u{1F534} Critical risk detected: Immediate intervention required. Continued exposure may compromise batch potency. Estimated critical threshold in ${estimatedTimeUntilSpoilageSeconds ? formatSeconds(estimatedTimeUntilSpoilageSeconds) : "under 10 minutes"}.`;
  } else if (riskClassification === "WARNING" && isHighExcursion) {
    earlyWarningMessage = `\u{1F7E0} High Risk: Vaccine batch is in an active temperature excursion. Estimated time to critical risk: ${estimatedTimeUntilSpoilageSeconds ? formatSeconds(estimatedTimeUntilSpoilageSeconds) : "24 minutes"}.`;
  } else if (riskClassification === "WARNING") {
    earlyWarningMessage = `\u{1F7E1} Early Warning: Temperature trend indicates anomalous rise (+${rateOfChangeCPerMin.toFixed(2)}\xB0C/min). Unsafe exposure may occur in ~45 minutes if trend continues.`;
  }
  return {
    batchId: batch.id,
    riskScore,
    riskClassification,
    estimatedExposureDurationMinutes,
    estimatedTimeUntilSpoilageSeconds,
    predictedSpoilageTime,
    temperatureTrend,
    rateOfChangeCPerMin,
    recoveryTimeRemainingMinutes,
    repeatedExcursionsCount: excursionCount,
    maxRecordedTemp: Number(maxRecordedTemp.toFixed(1)),
    minRecordedTemp: Number(minRecordedTemp.toFixed(1)),
    explainabilityFactors: explainability,
    earlyWarningMessage
  };
}
function generatePreventiveRecommendations(batch, prediction, currentTemp, isTransport) {
  const actions = [];
  if (prediction.riskClassification === "CRITICAL") {
    if (isTransport) {
      actions.push({
        id: "ACT-CRIT-TR-1",
        priority: "IMMEDIATE",
        title: "Emergency Cold-Depot Reroute & Inspection",
        description: "Divert transport to nearest validated cold-storage hub immediately. Inspect secondary dry ice/phase-change coolant packs and record container integrity.",
        actionType: "TRANSFER_STORAGE",
        suggestedTargetUnit: "REGIONAL-HUB-COLD-VAULT",
        requiresQuarantine: true
      });
      actions.push({
        id: "ACT-CRIT-TR-2",
        priority: "IMMEDIATE",
        title: "Notify Logistics Coordinator & Transport Supervisor",
        description: "Dispatch urgent deviation alert to the central cold-chain command and initiate transport chain-of-custody excursion audit.",
        actionType: "CONTACT_SUPERVISOR"
      });
    } else {
      actions.push({
        id: "ACT-CRIT-ST-1",
        priority: "IMMEDIATE",
        title: "Transfer Batch to Approved Backup Cold-Storage Unit",
        description: `Immediately transfer all ${batch.quantity.toLocaleString()} doses of ${batch.vaccineName} into secondary validated storage (Target: 2.0\xB0C - 8.0\xB0C).`,
        actionType: "TRANSFER_STORAGE",
        suggestedTargetUnit: "BACKUP-COLD-ROOM-B2",
        requiresQuarantine: true
      });
      actions.push({
        id: "ACT-CRIT-ST-2",
        priority: "IMMEDIATE",
        title: "Engage Auxiliary Backup Cooling / Generator",
        description: "Switch storage unit power circuit to tertiary backup generator or activate emergency CO2 / liquid N2 injection cooling.",
        actionType: "ACTIVATE_BACKUP_COOLING"
      });
      actions.push({
        id: "ACT-CRIT-ST-3",
        priority: "URGENT",
        title: "Execute Formal Vaccine Excursion SOP & Quarantine Tagging",
        description: "Apply electronic quarantine lock in ECHELON and document degree-minute exposure for manufacturer stability assessment before any clinical use.",
        actionType: "RECORD_EXCURSION_SOP"
      });
    }
  } else if (prediction.riskClassification === "WARNING") {
    if (currentTemp > batch.maxTemp) {
      actions.push({
        id: "ACT-WARN-1",
        priority: "URGENT",
        title: "Verify Door Seals & Minimize Access",
        description: "Check magnetic gasket seals, inspect for latch obstruction, and enforce strict temporary access freeze on the refrigeration compartment.",
        actionType: "CHECK_SEAL_AND_DOOR"
      });
      actions.push({
        id: "ACT-WARN-2",
        priority: "URGENT",
        title: "Prepare Backup Storage & Monitor Rate of Climb",
        description: `Pre-chill backup transport containers or verify secondary cold-room availability. Pre-stage transport coolers if temp crosses ${batch.maxTemp + 2}\xB0C.`,
        actionType: "TRANSFER_STORAGE",
        suggestedTargetUnit: "AUX-CHILLER-01"
      });
      actions.push({
        id: "ACT-WARN-3",
        priority: "PREVENTIVE",
        title: "Calibrate Digital Thermostat Settings",
        description: `Inspect compressor duty cycle and adjust setpoint to ${batch.idealTemp}\xB0C nominal.`,
        actionType: "ADJUST_THERMOSTAT"
      });
    } else if (currentTemp < batch.minTemp) {
      actions.push({
        id: "ACT-WARN-LOW-1",
        priority: "IMMEDIATE",
        title: "Reposition Away from Evaporator / Cold Plate",
        description: "Move vaccine packages away from the cooling coil blower to avoid localized freeze spots. Freezing destroys aluminum-adjuvant vaccines.",
        actionType: "INSPECT_FREEZING"
      });
      actions.push({
        id: "ACT-WARN-LOW-2",
        priority: "URGENT",
        title: "Perform Shake Test Protocol Before Re-release",
        description: "Inspect vials for flocculation or sedimentation precipitate per WHO freeze-damage guidance before returning to active dispensing.",
        actionType: "RECORD_EXCURSION_SOP"
      });
    } else {
      actions.push({
        id: "ACT-WARN-TREND-1",
        priority: "PREVENTIVE",
        title: "Investigate Thermal Drift Anomaly",
        description: "Telemetry indicates steady upward thermal drift (+0.12\xB0C/min). Inspect condenser coils for dust accumulation or ambient airflow blockage.",
        actionType: "CONTINUE_MONITORING"
      });
    }
  } else {
    actions.push({
      id: "ACT-NORM-1",
      priority: "NORMAL",
      title: "Nominal Operations - Continue Routine Telemetry",
      description: "Storage conditions are fully compliant with manufacturer stability monographs. Maintain standard 5-second SHT33 edge sampling and daily audit verification.",
      actionType: "CONTINUE_MONITORING"
    });
  }
  return actions;
}
function formatSeconds(seconds) {
  if (seconds < 0) return "00:00:00";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor(seconds % 3600 / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// server.ts
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var batches = [...INITIAL_BATCHES];
var devices = [...INITIAL_DEVICES];
var transports = [...INITIAL_TRANSPORTS];
var auditLogs = [...INITIAL_AUDIT_LOGS];
var alerts = [];
var correctiveActions = [];
var activeBatchId = "BATCH-2026-COV-01";
var activeScenario = "SAFE";
var deviceConnectivityMode = "ONLINE";
var offlineBuffer = [];
var telemetryStore = /* @__PURE__ */ new Map();
batches.forEach((b) => {
  telemetryStore.set(b.id, generateInitialTelemetryHistory(b, 30));
});
function getGeminiClient() {
  if (process.env.GEMINI_API_KEY) {
    try {
      return new import_genai.GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
    } catch (e) {
      console.warn("Failed to initialize GoogleGenAI client:", e);
    }
  }
  return null;
}
var simTick = 0;
setInterval(() => {
  simTick++;
  const activeBatch = batches.find((b) => b.id === activeBatchId) || batches[0];
  const history = telemetryStore.get(activeBatch.id) || [];
  const lastReading = history[history.length - 1] || {
    temperature: activeBatch.idealTemp,
    humidity: 50
  };
  let targetTemp = activeBatch.idealTemp;
  let targetHumidity = 50;
  if (activeScenario === "SAFE") {
    targetTemp = activeBatch.idealTemp + Math.sin(simTick * 0.2) * 0.4;
    targetHumidity = 48 + Math.cos(simTick * 0.2) * 3;
  } else if (activeScenario === "WARNING") {
    const progress = Math.min(1, simTick * 0.05);
    targetTemp = 7.2 + progress * 1.8 + Math.random() * 0.2;
    targetHumidity = 58 + Math.random() * 4;
  } else if (activeScenario === "CRITICAL") {
    const progress = Math.min(1, simTick * 0.08);
    targetTemp = 9 + progress * 3.5 + Math.random() * 0.3;
    targetHumidity = 68 + Math.random() * 5;
  } else if (activeScenario === "RECOVERY") {
    const cur = lastReading.temperature;
    targetTemp = Math.max(activeBatch.idealTemp, cur - 0.4 + (Math.random() * 0.1 - 0.05));
    targetHumidity = 52 + Math.random() * 2;
  }
  const newReading = {
    id: `TEL-${activeBatch.id}-${Date.now()}`,
    deviceId: activeBatch.deviceId,
    batchId: activeBatch.id,
    storageUnitId: activeBatch.storageUnitId,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    temperature: Number(targetTemp.toFixed(2)),
    humidity: Number(targetHumidity.toFixed(1)),
    isValid: true,
    rawStatus: targetTemp > activeBatch.maxTemp || targetTemp < activeBatch.minTemp ? "OUT_OF_RANGE" : "NORMAL",
    edgeBuffered: deviceConnectivityMode === "OFFLINE",
    gps: activeBatch.isTransport ? { lat: 37.5485 + Math.sin(simTick * 0.1) * 0.01, lng: -122.2711 + simTick * 2e-3, locationName: "Highway 101 Corridor", speed: 82 } : { lat: 37.7749, lng: -122.4194, locationName: "Central Depot Vault" },
    batteryLevel: Math.max(15, 98 - Math.floor(simTick / 20)),
    signalRssi: deviceConnectivityMode === "OFFLINE" ? -110 : -64
  };
  if (deviceConnectivityMode === "OFFLINE") {
    offlineBuffer.push(newReading);
    const dev = devices.find((d) => d.id === activeBatch.deviceId);
    if (dev) {
      dev.bufferCount = offlineBuffer.length;
      dev.connectivity = "OFFLINE";
    }
  } else if (deviceConnectivityMode === "SYNCHRONIZING") {
    if (offlineBuffer.length > 0) {
      history.push(...offlineBuffer);
      offlineBuffer = [];
    }
    history.push(newReading);
    deviceConnectivityMode = "ONLINE";
    const dev = devices.find((d) => d.id === activeBatch.deviceId);
    if (dev) {
      dev.bufferCount = 0;
      dev.connectivity = "ONLINE";
      dev.lastSync = (/* @__PURE__ */ new Date()).toISOString();
    }
  } else {
    history.push(newReading);
    if (history.length > 100) history.shift();
  }
  telemetryStore.set(activeBatch.id, history);
  const prediction = calculateAIRiskPrediction(activeBatch, history);
  if (prediction.riskClassification === "CRITICAL" && activeBatch.currentStatus !== "QUARANTINED") {
    activeBatch.currentStatus = "CRITICAL";
    const existingActiveAlert = alerts.find(
      (a) => a.batchId === activeBatch.id && !a.resolved && a.severity === "CRITICAL"
    );
    if (!existingActiveAlert) {
      const newAlert = {
        id: `ALT-${Date.now()}`,
        batchId: activeBatch.id,
        batchName: activeBatch.vaccineName,
        deviceId: activeBatch.deviceId,
        severity: "CRITICAL",
        title: `CRITICAL: Spoilage Risk on ${activeBatch.vaccineName}`,
        message: `Current temp is ${newReading.temperature}\xB0C (Safe range: ${activeBatch.minTemp}-${activeBatch.maxTemp}\xB0C). Risk Score: ${prediction.riskScore}/100. Predicted critical threshold in ${prediction.estimatedTimeUntilSpoilageSeconds ? Math.round(prediction.estimatedTimeUntilSpoilageSeconds / 60) : 10} minutes.`,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        acknowledged: false,
        resolved: false,
        currentTemp: newReading.temperature,
        riskScore: prediction.riskScore,
        timeToCriticalExposureMinutes: prediction.estimatedTimeUntilSpoilageSeconds ? Math.round(prediction.estimatedTimeUntilSpoilageSeconds / 60) : 10,
        recommendedAction: "Transfer the batch to an approved temperature-controlled storage unit immediately.",
        notificationChannels: { dashboard: true, smsSent: true, emailSent: true }
      };
      alerts.unshift(newAlert);
      auditLogs.unshift({
        id: `AUD-${Date.now()}`,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        userName: "ECHELON AI Risk Engine",
        userRole: "ADMINISTRATOR",
        action: "CRITICAL_ALERT_TRIGGERED",
        entityType: "ALERT",
        entityId: newAlert.id,
        details: `Dispatched multi-channel alert for batch ${activeBatch.id} (Temp: ${newReading.temperature}\xB0C, Risk: ${prediction.riskScore}).`
      });
    }
  } else if (prediction.riskClassification === "WARNING" && activeBatch.currentStatus === "SAFE") {
    activeBatch.currentStatus = "EARLY_WARNING";
  } else if (prediction.riskClassification === "SAFE" && (activeBatch.currentStatus === "CRITICAL" || activeBatch.currentStatus === "EARLY_WARNING")) {
    activeBatch.currentStatus = "STABILIZED";
  }
}, 4e3);
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString(), activeScenario });
});
app.get("/api/state", (req, res) => {
  const activeBatch = batches.find((b) => b.id === activeBatchId) || batches[0];
  const history = telemetryStore.get(activeBatch.id) || [];
  const latestTelemetry = history[history.length - 1] || null;
  const prediction = calculateAIRiskPrediction(activeBatch, history);
  const recommendations = generatePreventiveRecommendations(
    activeBatch,
    prediction,
    latestTelemetry ? latestTelemetry.temperature : activeBatch.idealTemp,
    activeBatch.isTransport
  );
  res.json({
    batches,
    activeBatchId,
    activeBatch,
    latestTelemetry,
    prediction,
    recommendations,
    devices,
    transports,
    alerts,
    correctiveActions,
    auditLogs: auditLogs.slice(0, 50),
    activeScenario,
    deviceConnectivityMode,
    offlineBufferCount: offlineBuffer.length,
    recentTelemetry: history.slice(-40)
  });
});
app.post("/api/batch/select", (req, res) => {
  const { batchId } = req.body;
  if (batchId && batches.some((b) => b.id === batchId)) {
    activeBatchId = batchId;
  }
  res.json({ success: true, activeBatchId });
});
app.post("/api/simulation/scenario", (req, res) => {
  const { scenario, customTemp } = req.body;
  activeScenario = scenario;
  simTick = 0;
  const activeBatch = batches.find((b) => b.id === activeBatchId) || batches[0];
  if (scenario === "SAFE") {
    activeBatch.currentStatus = "SAFE";
  } else if (scenario === "WARNING") {
    activeBatch.currentStatus = "EARLY_WARNING";
  } else if (scenario === "CRITICAL") {
    activeBatch.currentStatus = "CRITICAL";
  } else if (scenario === "RECOVERY") {
    activeBatch.currentStatus = "STABILIZED";
  }
  auditLogs.unshift({
    id: `AUD-${Date.now()}`,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    userName: req.body.userName || "System Operator",
    userRole: "ADMINISTRATOR",
    action: "SIMULATION_SCENARIO_CHANGED",
    entityType: "SIMULATION",
    entityId: scenario,
    details: `Simulation shifted to scenario [${scenario}] for demonstration testing.`
  });
  res.json({ success: true, activeScenario });
});
app.post("/api/simulation/toggle-connectivity", (req, res) => {
  const { mode } = req.body;
  if (["ONLINE", "OFFLINE", "SYNCHRONIZING"].includes(mode)) {
    deviceConnectivityMode = mode;
    const activeBatch = batches.find((b) => b.id === activeBatchId) || batches[0];
    const dev = devices.find((d) => d.id === activeBatch.deviceId);
    if (dev) {
      dev.connectivity = mode;
      if (mode === "SYNCHRONIZING") {
        const history = telemetryStore.get(activeBatch.id) || [];
        history.push(...offlineBuffer);
        offlineBuffer = [];
        dev.bufferCount = 0;
        dev.lastSync = (/* @__PURE__ */ new Date()).toISOString();
        deviceConnectivityMode = "ONLINE";
        dev.connectivity = "ONLINE";
      }
    }
    auditLogs.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userName: req.body.userName || "Edge Node Gateway",
      userRole: "ADMINISTRATOR",
      action: "DEVICE_CONNECTIVITY_CHANGED",
      entityType: "DEVICE",
      entityId: activeBatch.deviceId,
      details: `Hardware SHT33 link state switched to [${mode}]. Edge buffer depth: ${offlineBuffer.length} records.`
    });
  }
  res.json({ success: true, deviceConnectivityMode, bufferCount: offlineBuffer.length });
});
app.post("/api/alerts/:id/ack", (req, res) => {
  const { id } = req.params;
  const { userName, userRole } = req.body;
  const alert = alerts.find((a) => a.id === id);
  if (alert) {
    alert.acknowledged = true;
    alert.acknowledgedBy = userName || "Dr. Elena Rostova";
    alert.acknowledgedAt = (/* @__PURE__ */ new Date()).toISOString();
    auditLogs.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userName: userName || "Dr. Elena Rostova",
      userRole: userRole || "HEALTHCARE_WORKER",
      action: "ALERT_ACKNOWLEDGED",
      entityType: "ALERT",
      entityId: id,
      details: `User acknowledged excursion alert on ${alert.batchName}. Initiating clinical response protocol.`
    });
  }
  res.json({ success: true, alert });
});
app.post("/api/corrective-actions", (req, res) => {
  const {
    batchId,
    alertId,
    actionType,
    notes,
    performedBy,
    newStatus,
    targetTemp
  } = req.body;
  const batch = batches.find((b) => b.id === batchId);
  const history = telemetryStore.get(batchId) || [];
  const latest = history[history.length - 1];
  const prevPrediction = batch ? calculateAIRiskPrediction(batch, history) : { riskScore: 85 };
  if (batch) {
    batch.currentStatus = newStatus || "UNDER_ASSESSMENT";
  }
  const recheckedTemp = targetTemp || (batch ? batch.idealTemp + 0.3 : 4.8);
  const newReading = {
    id: `TEL-${batchId}-${Date.now()}`,
    deviceId: batch?.deviceId || "SHT33-EDGE-01",
    batchId,
    storageUnitId: batch?.storageUnitId || "COLD-ROOM-ALPHA",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    temperature: recheckedTemp,
    humidity: 50,
    isValid: true,
    rawStatus: "NORMAL",
    edgeBuffered: false,
    gps: { lat: 37.7749, lng: -122.4194, locationName: "Post-Action Recheck" },
    batteryLevel: 95,
    signalRssi: -60
  };
  history.push(newReading);
  telemetryStore.set(batchId, history);
  const newLog = {
    id: `ACT-LOG-${Date.now()}`,
    batchId,
    alertId,
    actionType,
    notes: notes || "Executed standard cold-chain excursion mitigation SOP.",
    actionTime: (/* @__PURE__ */ new Date()).toISOString(),
    performedBy: performedBy || "Dr. Elena Rostova, PharmD",
    previousRiskScore: prevPrediction.riskScore,
    newRiskScore: 18,
    previousStatus: batch?.currentStatus || "CRITICAL",
    newStatus: newStatus || "UNDER_ASSESSMENT",
    recheckedTemp
  };
  correctiveActions.unshift(newLog);
  if (alertId) {
    const al = alerts.find((a) => a.id === alertId);
    if (al) {
      al.resolved = true;
    }
  }
  activeScenario = "RECOVERY";
  auditLogs.unshift({
    id: `AUD-${Date.now()}`,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    userName: performedBy || "Dr. Elena Rostova, PharmD",
    userRole: "HEALTHCARE_WORKER",
    action: "CORRECTIVE_ACTION_LOGGED",
    entityType: "CORRECTIVE_ACTION",
    entityId: newLog.id,
    details: `SOP Action [${actionType}] executed on ${batchId}. Batch status updated to [${newStatus}]. Rechecked temperature: ${recheckedTemp}\xB0C.`
  });
  res.json({ success: true, log: newLog });
});
app.post("/api/batches", (req, res) => {
  const newBatch = {
    ...req.body,
    id: req.body.id || `BATCH-${Date.now().toString().slice(-6)}`,
    currentStatus: "SAFE"
  };
  batches.push(newBatch);
  telemetryStore.set(newBatch.id, generateInitialTelemetryHistory(newBatch, 20));
  auditLogs.unshift({
    id: `AUD-${Date.now()}`,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    userName: "Director Arthur Sterling",
    userRole: "ADMINISTRATOR",
    action: "VACCINE_BATCH_REGISTERED",
    entityType: "BATCH",
    entityId: newBatch.id,
    details: `Registered new batch ${newBatch.vaccineName} (${newBatch.quantity} doses). Safe limits: ${newBatch.minTemp}\xB0C - ${newBatch.maxTemp}\xB0C.`
  });
  res.json({ success: true, batch: newBatch });
});
app.patch("/api/batches/:id/status", (req, res) => {
  const { id } = req.params;
  const { status, userName, userRole, notes } = req.body;
  const batch = batches.find((b) => b.id === id);
  if (batch) {
    const oldStatus = batch.currentStatus;
    batch.currentStatus = status;
    auditLogs.unshift({
      id: `AUD-${Date.now()}`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      userName: userName || "Dr. Elena Rostova",
      userRole: userRole || "HEALTHCARE_WORKER",
      action: "BATCH_STATUS_UPDATED",
      entityType: "BATCH",
      entityId: id,
      details: `Status transitioned from [${oldStatus}] -> [${status}]. Assessment notes: ${notes || "Clinical protocol review completed."}`
    });
    return res.json({ success: true, batch });
  }
  res.status(404).json({ error: "Batch not found" });
});
app.post("/api/ai/deep-analysis", async (req, res) => {
  const { batchId } = req.body;
  const batch = batches.find((b) => b.id === batchId) || batches[0];
  const history = telemetryStore.get(batch.id) || [];
  const prediction = calculateAIRiskPrediction(batch, history);
  const latest = history[history.length - 1];
  const genAI = getGeminiClient();
  if (genAI) {
    try {
      const prompt = `You are ECHELON's Lead Clinical Cold-Chain AI Pharmacist and Thermostability Expert.
Analyze the following real-time vaccine thermal excursion telemetry and provide a structured, high-stakes, explainable clinical assessment.

Vaccine Profile:
- Vaccine: ${batch.vaccineName} (${batch.manufacturer})
- Batch ID: ${batch.id}
- Quantity: ${batch.quantity.toLocaleString()} doses ($${(batch.quantity * batch.unitCost).toLocaleString()} value)
- Standard Safe Storage: ${batch.minTemp}\xB0C to ${batch.maxTemp}\xB0C
- Maximum Allowable Excursion Budget: ${batch.maxAllowedExcursionMinutes} minutes
- Critical Degradation Threshold: ${batch.criticalExcursionMinutes} minutes at >${batch.criticalUpperTemp}\xB0C

Current Telemetry:
- Current Temperature: ${latest ? latest.temperature : batch.idealTemp}\xB0C
- Current Humidity: ${latest ? latest.humidity : 50}%
- Rate of Thermal Change: ${prediction.rateOfChangeCPerMin}\xB0C/min (${prediction.temperatureTrend})
- Cumulative Unsafe Exposure Duration: ${prediction.estimatedExposureDurationMinutes} minutes
- Current Risk Score: ${prediction.riskScore}/100 (${prediction.riskClassification})
- Estimated Time Remaining to Irreversible Protein Denaturation: ${prediction.estimatedTimeUntilSpoilageSeconds ? Math.round(prediction.estimatedTimeUntilSpoilageSeconds / 60) : "N/A"} minutes

Please provide:
1. Executive Root-Cause Assessment (Why is this excursion dangerous for this specific biological mechanism?)
2. Kinetic Thermal Budget Analysis (How much allowable molecular stability margin remains?)
3. Operational Action Roadmap (Numbered priority steps for the on-site clinical or courier team)
4. Regulatory & Release Guidance (Clear disclaimer that final release requires physical inspection/shake test and manufacturer monograph compliance).

Keep your response structured, precise, professional, and directly actionable.`;
      const response = await genAI.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt
      });
      return res.json({
        success: true,
        analysis: response.text,
        generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        model: "gemini-3.7-flash"
      });
    } catch (err) {
      console.error("Gemini call error:", err);
    }
  }
  const fallbackAnalysis = `### Executive Cold-Chain Assessment: ${batch.vaccineName} (${batch.id})

**1. Thermostability Risk Profile**
Current sensor telemetry shows the batch at **${latest ? latest.temperature : batch.idealTemp}\xB0C**, which ${latest && latest.temperature > batch.maxTemp ? `exceeds the recommended upper threshold (${batch.maxTemp}\xB0C) by +${(latest.temperature - batch.maxTemp).toFixed(1)}\xB0C` : "is currently within acceptable kinetic limits"}. With a thermal climb rate of **${prediction.rateOfChangeCPerMin > 0 ? "+" : ""}${prediction.rateOfChangeCPerMin}\xB0C/min**, cumulative degree-minute thermal stress is accelerating molecular entropy.

**2. Kinetic Degradation Budget Analysis**
- **Calculated Exposure Duration:** ${prediction.estimatedExposureDurationMinutes} minutes of cumulative thermal excursion.
- **Remaining Critical Margin:** ${prediction.estimatedTimeUntilSpoilageSeconds ? `${Math.round(prediction.estimatedTimeUntilSpoilageSeconds / 60)} minutes` : "Nominal buffer available"}.
- **Risk Index:** ${prediction.riskScore}/100 [${prediction.riskClassification}].

**3. Actionable Mitigation Roadmap**
1. **Immediate Transfer:** Move all ${batch.quantity.toLocaleString()} doses to auxiliary validated cold-storage (2.0\xB0C \u2013 8.0\xB0C).
2. **Lockout & Quarantine:** Mark batch as "Under Assessment" in ECHELON to prevent premature clinical administration.
3. **Monograph Audit:** Document exact start/peak/recovery timestamps for manufacturer stability consultation.

*Note: ECHELON recommendations provide operational guidance. Final vaccine release must follow manufacturer monographs and applicable public health protocols.*`;
  return res.json({
    success: true,
    analysis: fallbackAnalysis,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    model: "ECHELON-Algorithmic-RuleEngine"
  });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ECHELON Cold-Chain Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
