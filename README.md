# CattleSense

A Digital Farm Management Portal for Monitoring Maximum Residue Limits (MRL) and Antimicrobial Usage (AMU) in Livestock

## Overview

**CattleSense** is a digital platform designed to monitor and manage **Antimicrobial Usage (AMU)** and ensure compliance with **Maximum Residue Limits (MRL)** in livestock systems.
By enabling farmers, veterinarians, regulators, and consumers to collaboratively track and validate livestock health data, CattleSense promotes **responsible antimicrobial stewardship**, **food safety**, and **traceability from farm to fork**.

This project aims to strengthen India’s compliance with global **AMR (Antimicrobial Resistance)** mitigation strategies and enhance consumer confidence in animal-derived food products such as milk, meat, and eggs.

## Table of Contents

1. [Background](#background)
2. [Problem Statement](#problem-statement)
3. [Proposed Solution](#proposed-solution)
4. [System Architecture](#system-architecture)
5. [Technical Stack](#technical-stack)
6. [Core Features](#core-features)
7. [Implementation Workflow](#implementation-workflow)
8. [Development Roadmap](#development-roadmap)
9. [Impact and Benefits](#impact-and-benefits)
10. [Challenges and Mitigation Strategies](#challenges-and-mitigation-strategies)
11. [Future Enhancements](#future-enhancements)
12. [Research and References](#research-and-references)

## Background

Antimicrobials are essential in maintaining livestock health and productivity. However, **unregulated or excessive use** of these drugs leads to:

* Residues in animal products (milk, meat, eggs)
* Development of **antimicrobial resistance (AMR)**
* Public health risks and trade restrictions

Monitoring antimicrobial usage (AMU) and maintaining compliance with **Maximum Residue Limits (MRL)** are therefore critical to ensuring **food safety** and **sustainable livestock farming**.

## Problem Statement

Current livestock management systems in India provide limited capability for:

* Tracking real-time antimicrobial usage
* Ensuring MRL compliance before product processing or sale
* Enabling transparent data sharing between farmers, veterinarians, and regulators

There is a **need for a unified digital platform** that integrates health records, drug usage logs, veterinary approvals, and real-time alerts to ensure **responsible antimicrobial use** and **traceable livestock management**.

## Proposed Solution

**CattleSense** is a centralized **digital farm management portal** that enables:

* End-to-end monitoring of antimicrobial usage (AMU)
* Real-time compliance tracking with Maximum Residue Limits (MRL)
* Traceability from animal birth to consumer purchase

### Key Users

* **Farmers:** Record drug usage and receive alerts for withdrawal periods.
* **Veterinarians:** Verify prescriptions and monitor dosage trends.
* **Regulators:** Access real-time dashboards for compliance analytics.
* **Consumers:** Trace food origin and verify safety compliance.

## System Architecture

```bash
+--------------------------------------------------------------+
|                       CattleSense Portal                     |
+--------------------------------------------------------------+
|                        Frontend (ReactJS)                    |
|    - Farmer/Vet/Regulator Dashboards                         |
|    - Mobile-first UI for data entry & alerts                 |
+--------------------------------------------------------------+
|                         Backend (Flask API)                  |
|    - Data ingestion & validation                             |
|    - Prescription & dosage management                        |
|    - Alert and compliance engine                             |
+--------------------------------------------------------------+
|                   Database Layer (PostgreSQL + TimescaleDB)  |
|    - Time-series tracking of AMU data                        |
|    - Animal, owner, and vet profiling                        |
|    - MRL compliance history                                  |
+--------------------------------------------------------------+
|                    IoT Layer (RFID & Smart Collars)          |
|    - Animal identification & health metrics                  |
|    - Integration with farm IoT systems                       |
+--------------------------------------------------------------+
|            Analytics & Visualization (AWS + ML)              |
|    - Trend analysis and anomaly detection                    |
|    - Predictive insights on AMU patterns                     |
+--------------------------------------------------------------+
```

## Technical Stack

| Component             | Technology                                              |
| --------------------- | ------------------------------------------------------- |
| Frontend              | ReactJS                                                 |
| Backend               | Flask (Python)                                          |
| Database              | PostgreSQL + TimescaleDB (for time-series AMU tracking) |
| Authentication        | JWT-based authentication                                |
| IoT Integration       | RFID tags, Smart Collars                                |
| Cloud Services        | AWS (EC2, S3, Lambda)                                   |
| ML/Analytics (Future) | Anomaly detection for AMU patterns                      |

## Core Features

### 1. Livestock Profiling

* RFID-based unique identification
* Health record and prescription history
* Parent-offspring lineage tracking

### 2. Antimicrobial Usage Tracking

* Record dosage, frequency, and duration
* Vet verification for prescriptions
* Automated detection of overuse or misuse

### 3. MRL Compliance Monitoring

* Alerts for withdrawal periods before product sale
* Auto-flagging of non-compliant entries

### 4. Data Visualization & Reporting

* Interactive dashboards for regulators and veterinarians
* Regional and species-level AMU trends
* Exportable reports for audits and policy planning

### 5. Traceability & Transparency

* Complete farm-to-fork tracking
* Public trace portal for consumer verification

## Implementation Workflow

1. **Setup Phase:**

   * Livestock tagging using RFID
   * Initial registration and health profiling

2. **Data Collection Phase:**

   * Farmers log dosage and treatment data
   * Vets validate and approve usage

3. **Monitoring & Alerts:**

   * Automatic flagging of non-compliance
   * Notification system for withdrawal period alerts

4. **Data Analytics:**

   * Trend visualization and compliance metrics
   * Regional AMU/MLR heatmaps

## Development Roadmap

| Phase   | Description                                  | Status          |
| ------- | -------------------------------------------- | --------------- |
| Phase 1 | Portal architecture and database design      | ✅ In Progress   |
| Phase 2 | RFID-based livestock registration            | 🔜 Planned      |
| Phase 3 | Real-time AMU logging and vet approval       | 🔜 Planned      |
| Phase 4 | Dashboard visualization and ML integration   | 🔜 Future Phase |
| Phase 5 | Alpha testing with pilot farms (10–15 users) | 🔜 Future Phase |

## Impact and Benefits

| Stakeholder    | Benefits                                                  |
| -------------- | --------------------------------------------------------- |
| **Farmers**    | Improved herd health, reduced costs, easy compliance      |
| **Regulators** | Transparent audits, faster decisions, data-backed policy  |
| **Consumers**  | Safer food, restored trust in livestock products          |
| **Industry**   | Better export potential, sustainable livestock management |

## Challenges and Mitigation Strategies

| Challenge                     | Strategy                                                  |
| ----------------------------- | --------------------------------------------------------- |
| Data accuracy & consistency   | Integration with trusted data sources (ICAR, IoT sensors) |
| User adaptability & awareness | Multilingual, intuitive UI and demo sessions for farmers  |
| Risk of data manipulation     | Blockchain-backed data validation (future enhancement)    |

## Future Enhancements

* Integration with **machine learning models** for anomaly detection in AMU patterns
* Blockchain-based audit trails for **immutable record-keeping**
* Mobile-first **progressive web app (PWA)** for offline data capture
* Expansion to **dairy and poultry farms** beyond cattle

## Research and References

1. [PMC – Antimicrobial Usage and Resistance in Food Animals](https://pmc.ncbi.nlm.nih.gov/articles/PMC10740745/)
2. [ICAR Journal – AMR Monitoring in Livestock](https://epubs.icar.org.in/index.php/IJAnS/article/view/122074)
3. [ARC Journal – Antimicrobial Stewardship in Dairy](https://www.arcjournals.org/pdfs/ijrsb/v8-i4/3.pdf)
4. [PMC – Antimicrobial Residue Risks](https://pmc.ncbi.nlm.nih.gov/articles/PMC7346624/)

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
