# CattleSense Backend API Documentation

## Overview
CattleSense is a livestock management system focusing on Antimicrobial Usage (AMU) tracking, prescription management, and compliance monitoring. The backend is built with Flask, SQLAlchemy, and Firebase Authentication.

**Base URL:** `http://localhost:5000`  
**API Prefix:** `/api`

---

## Tech Stack
- **Framework:** Flask 3.0.0
- **Database:** MySQL with SQLAlchemy ORM
- **Authentication:** Firebase Admin SDK
- **CORS:** Enabled for `localhost:3000`, `localhost:5173`, `localhost:5500`
- **Encryption:** Cryptography (Fernet) for Aadhaar numbers

---

## Authentication System

### Firebase Token Verification
All protected routes require a Firebase ID token in the Authorization header:
```
Authorization: Bearer <firebase_id_token>
```

### Decorators
1. `@verify_firebase_token` - Validates Firebase token, sets `g.firebase_uid`, `g.email`, `g.current_user`
2. `@require_role(*roles)` - Restricts access to specific user roles
3. `@require_profile_complete` - Ensures user completed onboarding

### User Roles
- `farmer` - Farm owners managing livestock
- `veterinary` - Veterinarians prescribing treatments
- `government` - Government officials monitoring compliance
- `researcher` - Researchers requesting anonymized data

---

## Database Models

### User Models
**User** (Base model for all users)
- `id`, `firebase_uid`, `email`, `name`, `role`, `phone`
- `aadhaar_encrypted` (for farmer/veterinary/government)
- `is_profile_complete`, `onboarding_step`

**Farmer** (Extends User)
- `farm_name`, `farm_address`, `region`, `state`, `district`, `pincode`
- `farm_size_acres`, `farm_type`, `registration_number`
- `primary_veterinarian_id` (FK to Veterinarian)

**Veterinarian** (Extends User)
- `license_number`, `specialization`, `qualification`, `years_of_experience`
- `clinic_hospital_name`, `clinic_address`, `consultation_fee`
- `verification_status` (pending/verified/rejected)

**GovernmentOfficial** (Extends User)
- `government_id`, `department_name`, `designation`
- `jurisdiction_state`, `jurisdiction_district`, `jurisdiction_regions`

**Researcher** (Extends User)
- `institution_name`, `institution_type`, `project_name`, `research_area`

### Livestock Models
**Livestock**
- `rfid_tag` (unique identifier), `farmer_id`, `species`, `breed`, `name`, `gender`
- `date_of_birth`, `age_months`, `health_status`, `current_stage`
- `weight_kg`, `production_type`, `milk_production_liters_daily`
- **Health Status:** healthy, sick, under_treatment, quarantine, deceased
- **Species:** cattle, buffalo, goat, sheep, pig, poultry

**HealthRecord**
- `livestock_id`, `record_date`, `recorded_by`
- `weight_kg`, `temperature_celsius`, `symptoms`, `diagnosis`, `treatment_given`

### AMU Models
**AntimicrobialRecord**
- `livestock_id`, `prescription_id`, `drug_name`, `drug_category`, `active_ingredient`
- `dosage`, `unit`, `administration_route`, `start_date`, `end_date`, `duration_days`
- `reason`, `prescribed_by`, `is_verified`, `withdrawal_end_date`

**Prescription**
- `veterinarian_id`, `farmer_id`, `livestock_id`, `prescription_number`
- `prescription_date`, `diagnosis`, `drugs_prescribed` (JSON), `notes`
- `follow_up_date`, `status` (active/completed/cancelled)

**WithdrawalPeriod**
- `drug_name`, `active_ingredient`, `species`, `withdrawal_period_days`
- `mrl_value`, `tissue_type` (meat/milk/eggs/honey)

### Request Models
**ConsultationRequest**
- `farmer_id`, `veterinarian_id`, `livestock_id`
- `request_type` (routine_checkup/emergency/vaccination/prescription/other)
- `description`, `preferred_date`, `status`, `response_notes`

**Alert**
- `livestock_id`, `farmer_id`, `veterinarian_id`
- `alert_type` (excessive_use/withdrawal_period/mrl_breach/health_critical/prescription_expired/consultation_request)
- `severity` (low/medium/high/critical), `title`, `message`
- `status` (unread/read/acknowledged/resolved), `metadata` (JSON)

**TraceabilityLog** (Blockchain-like audit trail)
- `livestock_id`, `event_type`, `event_data`, `performed_by`
- `hash_value`, `previous_hash`, `timestamp`, `ip_address`

### Analytics Models
**RegionalAnalytics**
- `region`, `state`, `district`, `analysis_date`
- `total_farms`, `total_livestock`, `amu_usage_count`, `mrl_violations_count`
- `compliance_rate`, `analytics_data` (JSON), `ai_insights`

**DataRequest**
- `researcher_id`, `request_title`, `request_description`
- `data_type_requested`, `regions_requested`, `species_requested` (all JSON)
- `date_range_start`, `date_range_end`, `status`, `data_access_url`

**InspectionLog**
- `inspector_id`, `farmer_id`, `inspection_date`, `inspection_type`
- `findings`, `compliance_status`, `violations_found` (JSON), `recommendations`

---

## API Endpoints

### 1. Authentication Routes (`/api/auth`)

#### POST `/api/auth/verify`
**Purpose:** Verify Firebase token and check if user exists  
**Auth:** Firebase token required  
**Request:** No body needed  
**Response:**
```json
{
  "firebase_uid": "string",
  "email": "string",
  "user_exists": boolean,
  "user_id": number,
  "name": "string",
  "role": "string",
  "is_profile_complete": boolean,
  "onboarding_step": number
}
```

#### GET `/api/auth/profile`
**Purpose:** Get current user profile with role-specific data  
**Auth:** Firebase token required  
**Response:**
```json
{
  "id": number,
  "name": "string",
  "email": "string",
  "role": "string",
  "phone": "string",
  "is_profile_complete": boolean,
  "farmer": { /* Farmer-specific fields */ },
  "veterinarian": { /* Vet-specific fields */ },
  "government": { /* Gov-specific fields */ },
  "researcher": { /* Researcher-specific fields */ }
}
```

#### PUT `/api/auth/profile`
**Purpose:** Update basic user profile  
**Auth:** Firebase token required  
**Request Body:**
```json
{
  "name": "string",
  "phone": "string",
  "profile_image_url": "string"
}
```

#### POST `/api/auth/logout`
**Purpose:** Logout (client-side should clear Firebase token)  
**Auth:** Firebase token required

---

### 2. Onboarding Routes (`/api/onboarding`)

#### POST `/api/onboarding/initial`
**Purpose:** Create initial user profile (step 1)  
**Auth:** Firebase token required  
**Request Body:**
```json
{
  "name": "string",
  "role": "farmer|veterinary|government|researcher",
  "aadhaar": "string (12 digits, required for farmer/vet/gov)",
  "phone": "string",
  "profile_image_url": "string"
}
```
**Response:**
```json
{
  "message": "Initial profile created",
  "user_id": number,
  "role": "string",
  "onboarding_step": 1
}
```

#### POST `/api/onboarding/farmer`
**Purpose:** Complete farmer profile (step 2)  
**Auth:** Firebase token, role=farmer  
**Request Body:**
```json
{
  "farm_name": "string",
  "farm_address": "string",
  "region": "string",
  "state": "string",
  "district": "string",
  "pincode": "string",
  "latitude": number,
  "longitude": number,
  "registration_number": "string",
  "farm_size_acres": number,
  "farm_type": "dairy|poultry|mixed|goat|sheep|pig"
}
```

#### POST `/api/onboarding/veterinary`
**Purpose:** Complete veterinarian profile  
**Auth:** Firebase token, role=veterinary  
**Request Body:**
```json
{
  "license_number": "string (required)",
  "specialization": "string",
  "qualification": "string",
  "alma_mater": "string",
  "years_of_experience": number,
  "age": number,
  "clinic_hospital_name": "string",
  "clinic_address": "string",
  "state": "string",
  "district": "string",
  "consultation_fee": number,
  "available_for_emergency": boolean
}
```

#### POST `/api/onboarding/government`
**Purpose:** Complete government official profile  
**Auth:** Firebase token, role=government  
**Request Body:**
```json
{
  "government_id": "string (required)",
  "department_name": "string (required)",
  "department_id": "string",
  "designation": "string",
  "jurisdiction_state": "string",
  "jurisdiction_district": "string",
  "jurisdiction_regions": ["string"],
  "office_address": "string"
}
```

#### POST `/api/onboarding/researcher`
**Purpose:** Complete researcher profile  
**Auth:** Firebase token, role=researcher  
**Request Body:**
```json
{
  "institution_name": "string (required)",
  "institution_type": "university|research_institute|government_lab|private_org",
  "role_designation": "string",
  "project_name": "string (required)",
  "research_area": "string"
}
```

#### POST `/api/onboarding/complete-livestock`
**Purpose:** Mark farmer onboarding as complete (step 3)  
**Auth:** Firebase token, role=farmer

#### GET `/api/onboarding/status`
**Purpose:** Get current onboarding status  
**Auth:** Firebase token required

---

### 3. Livestock Routes (`/api/livestock`)

#### POST `/api/livestock/add`
**Purpose:** Register new livestock  
**Auth:** Firebase token, role=farmer, profile complete  
**Request Body:**
```json
{
  "rfid_tag": "string (required, unique)",
  "species": "cattle|buffalo|goat|sheep|pig|poultry (required)",
  "breed": "string",
  "name": "string",
  "gender": "male|female",
  "date_of_birth": "YYYY-MM-DD",
  "age_months": number,
  "parent_id": number,
  "health_status": "healthy|sick|under_treatment|quarantine|deceased",
  "current_stage": "calf|juvenile|adult|breeding|production",
  "weight_kg": number,
  "production_type": "milk|meat|eggs|breeding|dual_purpose",
  "milk_production_liters_daily": number,
  "egg_production_daily": number,
  "image_url": "string"
}
```
**Response:**
```json
{
  "message": "Livestock added successfully",
  "livestock_id": number,
  "rfid_tag": "string"
}
```

#### GET `/api/livestock/list`
**Purpose:** List livestock (farmer: own livestock, vet: by farmer_id, gov: all)  
**Auth:** Firebase token, profile complete  
**Query Params:** `page` (default: 1), `per_page` (default: 20), `farmer_id` (for vets)  
**Response:**
```json
{
  "livestock": [
    {
      "id": number,
      "rfid_tag": "string",
      "species": "string",
      "breed": "string",
      "name": "string",
      "gender": "string",
      "age_months": number,
      "health_status": "string",
      "weight_kg": number,
      "production_type": "string",
      "milk_production_liters_daily": number,
      "image_url": "string"
    }
  ],
  "total": number,
  "page": number,
  "pages": number
}
```

#### GET `/api/livestock/<livestock_id>`
**Purpose:** Get detailed livestock information  
**Auth:** Firebase token, profile complete (farmers can only access their own)

#### PUT `/api/livestock/<livestock_id>/update`
**Purpose:** Update livestock details  
**Auth:** Firebase token, role=farmer|veterinary, profile complete  
**Request Body:** (any of the updatable fields)
```json
{
  "breed": "string",
  "name": "string",
  "health_status": "string",
  "current_stage": "string",
  "weight_kg": number,
  "milk_production_liters_daily": number,
  "egg_production_daily": number,
  "image_url": "string"
}
```

#### GET `/api/livestock/<livestock_id>/trace`
**Purpose:** Get complete traceability log for livestock  
**Auth:** Firebase token  
**Response:**
```json
{
  "livestock_id": number,
  "rfid_tag": "string",
  "species": "string",
  "trace_log": [
    {
      "id": number,
      "event_type": "string",
      "event_data": {},
      "timestamp": "ISO string",
      "hash": "string"
    }
  ]
}
```

---

### 4. AMU (Antimicrobial Usage) Routes (`/api/amu`)

#### POST `/api/amu/record`
**Purpose:** Record antimicrobial usage  
**Auth:** Firebase token, role=farmer|veterinary, profile complete  
**Request Body:**
```json
{
  "livestock_id": number (required),
  "prescription_id": number,
  "drug_name": "string (required)",
  "drug_category": "string",
  "active_ingredient": "string",
  "dosage": number (required),
  "unit": "string (required)",
  "administration_route": "oral|injection|topical|feed|water",
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "frequency": "string",
  "duration_days": number,
  "reason": "string",
  "prescribed_by": number
}
```
**Response:**
```json
{
  "message": "AMU record created successfully",
  "record_id": number,
  "withdrawal_end_date": "YYYY-MM-DD or null"
}
```
**Side Effects:**
- Creates `excessive_use` alert if drug used 3+ times in 30 days
- Creates `withdrawal_period` alert if withdrawal period exists for drug

#### GET `/api/amu/livestock/<livestock_id>`
**Purpose:** Get AMU history for specific livestock  
**Auth:** Firebase token, profile complete  
**Query Params:** `page`, `per_page`  
**Response:**
```json
{
  "livestock_id": number,
  "rfid_tag": "string",
  "amu_records": [
    {
      "id": number,
      "drug_name": "string",
      "drug_category": "string",
      "dosage": number,
      "unit": "string",
      "administration_route": "string",
      "start_date": "YYYY-MM-DD",
      "end_date": "YYYY-MM-DD",
      "frequency": "string",
      "duration_days": number,
      "reason": "string",
      "is_verified": boolean,
      "withdrawal_end_date": "YYYY-MM-DD",
      "created_at": "ISO string"
    }
  ],
  "total": number,
  "page": number,
  "pages": number
}
```

#### PUT `/api/amu/verify/<record_id>`
**Purpose:** Veterinarian verifies AMU record  
**Auth:** Firebase token, role=veterinary, profile complete  
**Note:** Only prescribing veterinarian can verify

#### GET `/api/amu/analytics/farmer`
**Purpose:** Get farmer's AMU analytics  
**Auth:** Firebase token, role=farmer, profile complete  
**Response:**
```json
{
  "total_amu_records": number,
  "recent_amu_30_days": number,
  "active_withdrawal_periods": number,
  "top_drugs_used": [
    {"drug_name": "string", "count": number}
  ]
}
```

#### GET `/api/amu/analytics/regional`
**Purpose:** Regional AMU analytics for government officials  
**Auth:** Firebase token, role=government, profile complete  
**Query Params:** `district`, `state`, `days` (default: 90)  
**Response:**
```json
{
  "region": "string",
  "period_days": number,
  "total_amu_records": number,
  "drug_category_distribution": [
    {"category": "string", "count": number}
  ],
  "species_distribution": [
    {"species": "string", "count": number}
  ]
}
```

#### GET `/api/amu/withdrawal/active`
**Purpose:** Get active withdrawal periods for farmer's livestock  
**Auth:** Firebase token, role=farmer, profile complete  
**Response:**
```json
{
  "active_withdrawal_periods": [
    {
      "livestock_id": number,
      "rfid_tag": "string",
      "species": "string",
      "drug_name": "string",
      "start_date": "YYYY-MM-DD",
      "withdrawal_end_date": "YYYY-MM-DD",
      "days_remaining": number
    }
  ],
  "total": number
}
```

---

### 5. Prescription Routes (`/api/prescription`)

#### POST `/api/prescription/create`
**Purpose:** Create prescription (by veterinarian)  
**Auth:** Firebase token, role=veterinary, profile complete  
**Request Body:**
```json
{
  "livestock_id": number (required),
  "prescription_date": "YYYY-MM-DD",
  "diagnosis": "string (required)",
  "drugs_prescribed": [
    {
      "drug_name": "string",
      "dosage": "string",
      "frequency": "string",
      "duration": "string"
    }
  ],
  "notes": "string",
  "follow_up_date": "YYYY-MM-DD"
}
```
**Response:**
```json
{
  "message": "Prescription created successfully",
  "prescription_id": number,
  "prescription_number": "string (e.g., RX20250109123456)"
}
```
**Side Effects:**
- Creates traceability log
- Creates alert for farmer

#### GET `/api/prescription/<prescription_id>`
**Purpose:** Get prescription details  
**Auth:** Firebase token, profile complete (farmer/vet access control)  
**Response:**
```json
{
  "id": number,
  "prescription_number": "string",
  "prescription_date": "YYYY-MM-DD",
  "livestock": {
    "id": number,
    "rfid_tag": "string",
    "species": "string",
    "name": "string"
  },
  "diagnosis": "string",
  "drugs_prescribed": [],
  "notes": "string",
  "follow_up_date": "YYYY-MM-DD",
  "status": "active|completed|cancelled",
  "created_at": "ISO string"
}
```

#### GET `/api/prescription/list`
**Purpose:** List prescriptions (farmer: received, vet: issued)  
**Auth:** Firebase token, profile complete  
**Query Params:** `page`, `per_page`, `status`

#### PUT `/api/prescription/<prescription_id>/update-status`
**Purpose:** Update prescription status (vet only)  
**Auth:** Firebase token, role=veterinary, profile complete  
**Request Body:**
```json
{
  "status": "active|completed|cancelled"
}
```

#### GET `/api/prescription/<prescription_id>/amu-records`
**Purpose:** Get AMU records linked to prescription  
**Auth:** Firebase token, profile complete

#### GET `/api/prescription/livestock/<livestock_id>`
**Purpose:** Get all prescriptions for specific livestock  
**Auth:** Firebase token, profile complete

---

### 6. Consultation Routes (`/api/consultation`)

#### POST `/api/consultation/request`
**Purpose:** Farmer requests consultation from veterinarian  
**Auth:** Firebase token, role=farmer, profile complete  
**Request Body:**
```json
{
  "veterinarian_id": number,
  "livestock_id": number,
  "request_type": "routine_checkup|emergency|vaccination|prescription|other",
  "description": "string",
  "preferred_date": "YYYY-MM-DD"
}
```
**Side Effects:**
- Creates alert for veterinarian

#### GET `/api/consultation/list`
**Purpose:** List consultations (farmer: requested, vet: received)  
**Auth:** Firebase token, profile complete  
**Query Params:** `page`, `per_page`, `status`

#### GET `/api/consultation/<consultation_id>`
**Purpose:** Get consultation details  
**Auth:** Firebase token, profile complete

#### PUT `/api/consultation/<consultation_id>/accept`
**Purpose:** Veterinarian accepts consultation  
**Auth:** Firebase token, role=veterinary, profile complete  
**Request Body:**
```json
{
  "response_notes": "string"
}
```

#### PUT `/api/consultation/<consultation_id>/complete`
**Purpose:** Veterinarian marks consultation as completed  
**Auth:** Firebase token, role=veterinary, profile complete  
**Request Body:**
```json
{
  "response_notes": "string"
}
```

#### PUT `/api/consultation/<consultation_id>/cancel`
**Purpose:** Cancel consultation (farmer or vet)  
**Auth:** Firebase token, profile complete

#### GET `/api/consultation/veterinarians/search`
**Purpose:** Search for verified veterinarians  
**Auth:** Firebase token, role=farmer, profile complete  
**Query Params:** `state`, `district`, `specialization`, `available_for_emergency`  
**Response:**
```json
{
  "veterinarians": [
    {
      "id": number,
      "name": "string",
      "license_number": "string",
      "specialization": "string",
      "clinic_name": "string",
      "district": "string",
      "state": "string",
      "years_of_experience": number,
      "consultation_fee": number,
      "available_for_emergency": boolean
    }
  ],
  "total": number
}
```

---

### 7. Alerts Routes (`/api/alerts`)

#### GET `/api/alerts/list`
**Purpose:** List user's alerts  
**Auth:** Firebase token, profile complete  
**Query Params:** `page`, `per_page`, `status`, `type`, `severity`  
**Response:**
```json
{
  "alerts": [
    {
      "id": number,
      "alert_type": "string",
      "severity": "low|medium|high|critical",
      "title": "string",
      "message": "string",
      "status": "unread|read|acknowledged|resolved",
      "livestock_id": number,
      "metadata": {},
      "created_at": "ISO string"
    }
  ],
  "total": number,
  "page": number,
  "pages": number
}
```

#### GET `/api/alerts/<alert_id>`
**Purpose:** Get alert details with livestock info  
**Auth:** Firebase token, profile complete

#### PUT `/api/alerts/<alert_id>/acknowledge`
**Purpose:** Mark alert as acknowledged  
**Auth:** Firebase token, profile complete

#### PUT `/api/alerts/<alert_id>/resolve`
**Purpose:** Mark alert as resolved  
**Auth:** Firebase token, profile complete

#### PUT `/api/alerts/<alert_id>/mark-read`
**Purpose:** Mark alert as read  
**Auth:** Firebase token, profile complete

#### GET `/api/alerts/summary`
**Purpose:** Get alert summary counts  
**Auth:** Firebase token, profile complete  
**Response (Farmer):**
```json
{
  "unread_count": number,
  "critical_count": number,
  "high_count": number,
  "withdrawal_alerts": number,
  "excessive_use_alerts": number
}
```
**Response (Veterinary):**
```json
{
  "unread_count": number,
  "consultation_requests": number
}
```

#### PUT `/api/alerts/bulk-acknowledge`
**Purpose:** Acknowledge multiple alerts  
**Auth:** Firebase token, profile complete  
**Request Body:**
```json
{
  "alert_ids": [number]
}
```

---

### 8. Dashboard Routes (`/api/dashboard`)

#### GET `/api/dashboard/farmer`
**Purpose:** Get farmer dashboard data  
**Auth:** Firebase token, role=farmer, profile complete  
**Response:**
```json
{
  "farm_name": "string",
  "farm_type": "string",
  "total_livestock": number,
  "healthy_livestock": number,
  "under_treatment": number,
  "active_alerts": number,
  "recent_amu_count": number,
  "ai_insights": "string (from Gemini AI)"
}
```

#### GET `/api/dashboard/veterinary`
**Purpose:** Get veterinary dashboard data  
**Auth:** Firebase token, role=veterinary, profile complete  
**Response:**
```json
{
  "clinic_name": "string",
  "specialization": "string",
  "assigned_farms": number,
  "pending_consultations": number,
  "recent_prescriptions": number,
  "pending_requests": [
    {
      "id": number,
      "farmer_id": number,
      "livestock_id": number,
      "request_type": "string",
      "description": "string",
      "preferred_date": "YYYY-MM-DD",
      "created_at": "ISO string"
    }
  ]
}
```

#### GET `/api/dashboard/government`
**Purpose:** Get government official dashboard  
**Auth:** Firebase token, role=government, profile complete  
**Response:**
```json
{
  "jurisdiction": "string",
  "department": "string",
  "total_farms": number,
  "total_livestock": number,
  "recent_violations": number,
  "compliance_rate": number,
  "species_distribution": {
    "cattle": number,
    "buffalo": number,
    "goat": number
  },
  "ai_insights": "string (from Gemini AI)"
}
```

#### GET `/api/dashboard/researcher`
**Purpose:** Get researcher dashboard  
**Auth:** Firebase token, role=researcher, profile complete  
**Response:**
```json
{
  "institution": "string",
  "project": "string",
  "pending_requests": number,
  "approved_requests": number,
  "fulfilled_requests": number,
  "recent_requests": [
    {
      "id": number,
      "title": "string",
      "status": "string",
      "created_at": "ISO string",
      "approved_at": "ISO string"
    }
  ]
}
```

---

## Common Response Patterns

### Success Response
```json
{
  "message": "Success message",
  "data": {}
}
```

### Error Responses
```json
{
  "error": "Error message",
  "details": "Optional detailed error"
}
```

**Common Status Codes:**
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing/invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Key Features & Logic

### 1. Withdrawal Period Calculation
When recording AMU:
1. System looks up `WithdrawalPeriod` by `drug_name` and `species`
2. Calculates: `withdrawal_end_date = end_date + withdrawal_period_days`
3. Creates alert if withdrawal period exists
4. Stores `withdrawal_end_date` in `AntimicrobialRecord`

### 2. Excessive Usage Detection
When recording AMU:
1. Counts usage of same drug for same livestock in last 30 days
2. If count >= 3, creates high-severity alert

### 3. Traceability Logs (Blockchain-like)
Every significant event creates a log with:
- Hash of current event data + previous hash
- Chain can be verified by recalculating hashes
- Events: livestock_registered, livestock_updated, amu_recorded, prescription_created

### 4. Alert Types
- `excessive_use` - Drug used 3+ times in 30 days
- `withdrawal_period` - Withdrawal period in effect
- `mrl_breach` - MRL (Maximum Residue Limit) violation
- `health_critical` - Critical health condition
- `prescription_expired` - Prescription needs renewal
- `consultation_request` - New consultation request

### 5. Role-Based Data Access
- **Farmers:** Only access their own livestock/data
- **Veterinarians:** Access farmers they're assigned to + consultation requests
- **Government:** Access all data in their jurisdiction
- **Researchers:** Request anonymized data through approval workflow

---

## Environment Variables Required

```env
# Database
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cattlesenseLocal

# Flask
FLASK_ENV=development
SECRET_KEY=your_secret_key
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/cattlesenseLocal

# Firebase
FIREBASE_CREDENTIALS_PATH=serviceAccountKey.json

# Encryption
AADHAAR_ENCRYPTION_KEY=your_fernet_key

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

---

## Frontend Integration Guide

### 1. Authentication Flow
```javascript
// Step 1: User signs up/in with Firebase
const user = await firebase.auth().signInWithEmailAndPassword(email, password);
const idToken = await user.getIdToken();

// Step 2: Verify token with backend
const response = await fetch('/api/auth/verify', {
  headers: { 'Authorization': `Bearer ${idToken}` }
});
const userData = await response.json();

// Step 3: Check onboarding status
if (!userData.user_exists) {
  // Redirect to onboarding
} else if (!userData.is_profile_complete) {
  // Continue onboarding from onboarding_step
} else {
  // Redirect to dashboard based on role
}
```

### 2. Making API Requests
```javascript
// Get Firebase token
const token = await firebase.auth().currentUser.getIdToken();

// Make request
const response = await fetch('/api/livestock/list', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

### 3. Onboarding Flow
```javascript
// Step 1: Initial profile
POST /api/onboarding/initial
{ name, role, aadhaar, phone }

// Step 2: Role-specific profile
POST /api/onboarding/farmer  // or veterinary/government/researcher
{ farm_name, state, district, ... }

// Step 3 (Farmer only): Complete
POST /api/onboarding/complete-livestock
```

### 4. Pagination Handling
```javascript
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

const fetchData = async () => {
  const response = await fetch(`/api/livestock/list?page=${page}&per_page=20`);
  const data = await response.json();
  setTotalPages(data.pages);
  return data.livestock;
};
```

### 5. Real-time Alerts
```javascript
// Poll for new alerts
useEffect(() => {
  const interval = setInterval(async () => {
    const response = await fetch('/api/alerts/summary');
    const summary = await response.json();
    if (summary.unread_count > 0) {
      // Show notification
    }
  }, 30000); // Every 30 seconds
  
  return () => clearInterval(interval);
}, []);
```

---

## Database Schema Notes

### Indexes
Key indexes for performance:
- `users.firebase_uid`, `users.email`
- `livestock.rfid_tag`, `livestock.farmer_id`
- `antimicrobial_records.livestock_id`, `antimicrobial_records.start_date`
- `alerts.farmer_id`, `alerts.status`, `alerts.created_at`
- `traceability_logs.livestock_id`, `traceability_logs.timestamp`

### Cascading Deletes
- Deleting `User` cascades to role-specific tables
- Deleting `Farmer` cascades to `Livestock`
- Deleting `Livestock` cascades to `AntimicrobialRecord`, `HealthRecord`, `TraceabilityLog`

---

## Error Handling Best Practices

### Backend (Current Implementation)
- Uses `db.session.rollback()` on 500 errors
- Returns consistent error format: `{"error": "message"}`
- Uses `get_or_404()` for resource lookups

### Frontend (Recommended)
```javascript
try {
  const response = await fetch('/api/endpoint');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly error message
}
```

---

## Testing Checklist

### Authentication Testing
- [ ] Valid Firebase token accepted
- [ ] Invalid token rejected (401)
- [ ] Expired token handled
- [ ] Role-based access enforced

### CRUD Operations Testing
- [ ] Create resources with valid data
- [ ] Validation errors return 400
- [ ] Unauthorized access returns 403
- [ ] Non-existent resources return 404

### Business Logic Testing
- [ ] Withdrawal period calculated correctly
- [ ] Excessive usage alerts triggered
- [ ] Traceability logs chain properly
- [ ] Alerts created on appropriate events

---

## Security Considerations

1. **Sensitive Data:** Aadhaar numbers encrypted with Fernet
2. **Authentication:** All routes except health check require Firebase token
3. **Authorization:** Role-based access control enforced
4. **Data Isolation:** Farmers only access their own data
5. **API Keys:** Firebase credentials in `serviceAccountKey.json` (should be in .gitignore)
6. **CORS:** Limited to specific origins

---

## Future Enhancements (Mentioned in Code)

1. **AI Service:** `services/gemini.py` referenced but not included - for AI insights
2. **File Uploads:** Route has `UPLOAD_FOLDER` and `ALLOWED_EXTENSIONS` configured
3. **Data Export:** Researchers can request data but fulfillment not implemented
4. **MRL Breach Detection:** Alert type exists but detection logic not implemented
5. **Inspection Logs:** Model exists but no API routes yet

---

## Quick Reference: User Journeys

### Farmer Journey
1. Sign up → Initial profile → Farmer profile → Add livestock
2. Record health issues → Request consultation
3. Receive prescription → Record AMU
4. Check alerts for withdrawal periods
5. View dashboard for farm overview

### Veterinarian Journey
1. Sign up → Initial profile → Veterinary profile → Wait for verification
2. Receive consultation requests → Accept
3. Create prescriptions with diagnoses
4. Verify AMU records
5. View assigned farms

### Government Official Journey
1. Sign up → Initial profile → Government profile → Wait for verification
2. View regional analytics
3. Monitor compliance rates
4. Inspect farms → Create inspection logs
5. Generate regional reports

### Researcher Journey
1. Sign up → Initial profile → Researcher profile → Wait for verification
2. Submit data requests with justification
3. Wait for approval
4. Access anonymized datasets
5. Conduct research

---

## Support & Maintenance

**Health Check Endpoint:** `GET /api/health`
```json
{
  "status": "healthy",
  "service": "CattleSense API",
  "version": "1.0.0"
}
```

**Database Initialization:**
```bash
python init_db.py
```

**Run Development Server:**
```bash
python app.py
# Runs on http://0.0.0.0:5000
```

---

## Contact & Resources

- **API Base URL:** http://localhost:5000
- **CORS Allowed:** localhost:3000, localhost:5173, localhost:5500
- **Database:** MySQL on localhost:3306
- **Firebase Project:** cattlesensedemo