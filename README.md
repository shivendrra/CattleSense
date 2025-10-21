# CattleSense

A Digital Farm Management Portal for Monitoring Maximum Residue Limits (MRL) and Antimicrobial Usage (AMU) in Livestock

also a big FUCK YOU in the face of those two professors for rejecting us!!

## Overview

CattleSense is a centralized digital portal for monitoring & manging **Anti-Microbial Usage (AMU)** to ensure its compliance with **Maximum Residue Limits (MRL)**. Simply a place where any one, a consumer, farmer, vet or a government entity could log in & check compliance, livestock health, & other necessary metrics.
pretty simple

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

## Tech Stack

| Component             | Tech                                              |
| --------------------- | ------------------------------------------------------- |
| Frontend              | ReactJS                                                 |
| Backend               | Flask (Python)                                          |
| Database              | PostgreSQL + TimescaleDB (for time-series AMU tracking) |
| Authentication        | JWT-based authentication                                |
| IoT Integration       | RFID tags, Smart Collars                                |
| Cloud Services        | AWS (EC2, S3, Lambda)                                   |
| ML/Analytics (Future) | Anomaly detection for AMU patterns                      |

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

## Research and References

1. [PMC – Antimicrobial Usage and Resistance in Food Animals](https://pmc.ncbi.nlm.nih.gov/articles/PMC10740745/)
2. [ICAR Journal – AMR Monitoring in Livestock](https://epubs.icar.org.in/index.php/IJAnS/article/view/122074)
3. [ARC Journal – Antimicrobial Stewardship in Dairy](https://www.arcjournals.org/pdfs/ijrsb/v8-i4/3.pdf)
4. [PMC – Antimicrobial Residue Risks](https://pmc.ncbi.nlm.nih.gov/articles/PMC7346624/)

a work in progress by Shivendra
