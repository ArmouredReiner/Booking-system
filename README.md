# Coffee Shop Order Application

A full-stack coffee shop web application where users can browse products, add items to cart, and place orders.

## Project Structure

```
bookjing orders/
├── client/              # React frontend (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── App.jsx     # Main React component
│   │   ├── main.jsx    # Entry point
│   │   └── index.css   # Tailwind styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/             # Express backend
│   ├── server.js       # Express server with email
│   ├── package.json
│   ├── .env            # Environment variables
│   └── .env.example    # Example env file
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Gmail account with App Password

## Setup Instructions

### 1. Server Setup

```bash
cd server
npm install
```

Create your `.env` file with Gmail credentials:

**Important:** Gmail requires an App Password, not your regular password.

To generate an App Password:
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to "App Passwords" (under "Signing in to Google")
4. Select "Mail" and "Other (Custom name)"
5. Enter "Coffee Shop" and click Generate
6. Copy the 16-character password

Edit `.env`:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### 2. Client Setup

```bash
cd client
npm install
```

### 3. Run the Application

**Terminal 1 - Start the backend:**
```bash
cd server
node server.js
```

**Terminal 2 - Start the frontend:**
```bash
cd client
npm run dev
```

### 4. Access the Application

Open your browser and go to: `http://localhost:5173`

## Usage

1. Browse the coffee menu on the homepage
2. Select quantities and click "Add" to add items to cart
3. Review your cart on the right side
4. Fill in your name, email, and optional notes
5. Click "Place Order" to submit

You'll receive an email at Aaron.topendpanels@gmail.com with the order details.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Email:** Nodemailer with Gmail SMTP
