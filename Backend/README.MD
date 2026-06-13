# Highshine Visitor Analytics API

REST API for tracking and analyzing visitor events on highshine.in

## Tech Stack
- Node.js + Express
- MongoDB Atlas + Mongoose
- Deployed on Render

## Setup

1. Clone the repository
2. Navigate to /backend
3. Install dependencies:
   npm install

4. Create .env file :
   PORT=5000 || 3000
   MONGO_URI=mongodb+srv://aarthib875:sri3107@cluster0.zaefnp5.mongodb.net/highshine?retryWrites=true&w=majority&appName=Cluster0
   API_KEY=highshine_secret_key_123

5. Seed the database:
   npm run seed

6. Start development server:
   npm run dev

## API Endpoints

### POST /api/visitor
Log a visitor event. No authentication required.

Request body:
{
   "visitorId":"456789",
  "page": "/services",
  "referrer": "google",
  "country": "India"
}

postman example:
Method & URL: POST http://localhost:5000/api/visitor \
Header: "Content-Type: application/json" \
Body: '{"page": "/services", "referrer": "google", "country": "India"}'

---

### GET /api/visitors/summary
Aggregated visit counts by page and country.
Requires: x-api-key header

postman example:
Method & URL:Get http://localhost:5000/api/visitors/summary \
Authorization:"x-api-key: highshine_secret_key_123"

---

### GET /api/visitors/trend
Daily visit counts for the last 30 days.
Requires: x-api-key header
postman example:
Method & URL: http://localhost:5000/api/visitors/trend \
Authorization: highshine_secret_key_2024"

## Environment Variables
| Variable  | Description              |
|-----------|--------------------------|
| PORT      | Server port (default 5000)|
| MONGO_URI | MongoDB Atlas connection  |
| API_KEY   | Secret key for GET routes |