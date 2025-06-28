# The Black Box Challenge 🔒

A reverse-engineering challenge featuring mysterious API endpoints with hidden behaviors, secrets, and patterns waiting to be discovered.

## 🎯 Challenge Overview

You are dropped into a malfunctioning system filled with mysterious API endpoints. With no documentation or hints, each endpoint behaves in unpredictable ways. Your goal is to reverse-engineer what each API does by crafting inputs, analyzing outputs, and documenting your discoveries.

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- API testing tool (Postman, curl, or included testing script)

### Installation

1. Clone this repository
```bash
git clone <your-repo-url>
cd black-box-challenge
```

2. Install dependencies
```bash
npm install express axios
```

3. Start the server
```bash
node server.js
```

4. Server will be running on `http://localhost:3000`

### Testing the APIs

#### Option 1: Use the automated testing script
```bash
node test-blackbox.js
```

#### Option 2: Manual testing with curl
```bash
# Example: Test the enigma endpoint
curl -X POST http://localhost:3000/api/enigma \
  -H "Content-Type: application/json" \
  -d '{"data": "hello"}'
```

#### Option 3: Use Postman
Import the endpoints and start experimenting with different inputs.

## 🕵️ Discovered Endpoints

Through systematic testing and reverse engineering, the following endpoints were discovered:

### 1. `/api/enigma` - Length-Based Behavior
**Behavior:** Response changes based on input string length

**Discovery Process:**
- Tested various string lengths
- Found critical thresholds at 5, 10, and 20 characters
- Different response codes indicate different states

**Test Cases:**
```javascript
// Short input (< 5 chars)
{"data": "hi"} → {"result": "short", "code": 100, "message": "Brevity is key"}

// Medium input (5-9 chars)  
{"data": "hello"} → {"result": "medium", "code": 200, "message": "Getting warmer"}

// Long input (10-19 chars)
{"data": "hello world"} → {"result": "long", "code": 300, "message": "Almost there"}

// Very long input (20+ chars)
{"data": "this is a very long string"} → {"result": "decoded", "code": 400, "secret": "Length matters in mysterious ways"}
```

**Secret Unlocked:** 🔓 "Length matters in mysterious ways"

### 2. `/api/sequence` - Mathematical Pattern Recognition
**Behavior:** Responds differently to Fibonacci numbers and prime numbers

**Discovery Process:**
- Tested sequential numbers and found special responses for certain values
