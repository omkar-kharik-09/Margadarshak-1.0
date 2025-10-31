# 🎓 Margadarshak

<div align="center">

**Your Trusted Guide to MHT-CET College Success**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.4-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-green?style=for-the-badge&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-teal?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)

*Comprehensive college guidance platform for Maharashtra MHT-CET students*

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Tech Stack](#-tech-stack)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Platform Statistics](#-platform-statistics)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Application Routes](#-application-routes)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Overview

**Margadarshak** is a comprehensive college guidance platform designed specifically for Maharashtra MHT-CET (Maharashtra Health and Technical Common Entrance Test) students. It provides intelligent college comparison, AI-powered counseling, personalized recommendations, and detailed analytics to help students make informed college decisions.

### Key Highlights

- ✅ **700+ Colleges** - Comprehensive database of Maharashtra engineering colleges
- ✅ **Personalized Recommendations** - Based on reservation category, budget, and preferences
- ✅ **AI Counselor** - 24/7 instant answers to college-related queries
- ✅ **Real-time Comparison** - Side-by-side comparison of multiple colleges
- ✅ **83-87% Accuracy** - Reliable college prediction based on historical data

---

## ✨ Features

### 🎯 College Comparator

Compare multiple colleges simultaneously with:

- **700+ Colleges Database** - Comprehensive list of Maharashtra engineering colleges
- **Personalized Scoring** - Get recommendations based on your reservation category, budget, and preferences
- **Smart Analysis** - Detailed insights on:
  - Facilities and infrastructure
  - Student-faculty ratios
  - Campus size and total students
  - College type (Government, Private, Aided, Autonomous)
- **Quota-Specific Insights** - Personalized information for SC, ST, OBC, EWS, General, and other categories
- **Location & Budget Filters** - Find colleges matching your exact preferences
- **Google Maps Integration** - Direct links to college locations

### 🤖 AI College Counselor

Get instant answers about:

- College cutoffs and admission chances
- Reservation quota benefits
- Scholarship opportunities
- Admission procedures
- Career paths after engineering
- And much more!

**Features:**
- **24/7 Availability** - Instant responses anytime
- **Natural Language** - Ask questions in plain English
- **Context-Aware** - Understands Maharashtra college admission system
- **Comprehensive Coverage** - Covers all aspects of college admissions

### 👤 User Profiles & Personalization

Complete your profile with:

- **Personal Information** - Name, email, phone
- **Reservation Category** - General, SC, ST, OBC, EWS, SEBC, NT-A, NT-B, NT-C, NT-D, VJ-A, SBC
- **Budget Preferences** - Minimum and maximum annual fees
- **Location Preferences** - Mumbai, Pune, Nagpur, Nashik, Aurangabad, or Any
- **College Type Preferences** - Government, Private, Aided, Autonomous, or Any
- **Additional Preferences** - Hostel required, faculty-student ratio preferences, government college priority

**Benefits:**
- Tailored college recommendations
- Quota-specific cutoff information
- Budget-filtered results
- Location-prioritized suggestions

### 📊 College Predictor

Predict your college options based on:

- **MHT-CET Rank** - Enter your rank to find eligible colleges
- **Historical Data** - Based on previous year cutoffs and trends
- **83-87% Accuracy** - Reliable predictions
- **Comprehensive Results** - See all colleges within your rank range

---

## 📊 Platform Statistics

| Metric | Value |
|--------|-------|
| 🏫 **Colleges in Database** | 700+ |
| 📈 **Positive Responses** | 90% |
| 🎯 **Prediction Accuracy** | 83-87% |
| 👥 **Reservation Categories** | 12+ |
| ⚡ **Response Time** | Instant |
| 📱 **Mobile Responsive** | 100% |

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Python](https://www.python.org/) (version 3.8 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- Firebase account (for authentication and database)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/margadarshak.git
cd margadarshak
```

2. **Install frontend dependencies**

```bash
npm install
```

3. **Install backend dependencies**

```bash
cd backend
pip install -r requirements.txt
cd ..
```

4. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
```

5. **Start the backend server**

```bash
cd backend
python main.py
```

The backend will run on `http://localhost:8000`

6. **Start the frontend development server**

In a new terminal:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.0 | React framework with App Router |
| [React](https://reactjs.org/) | 19.2 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.0 | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com/) | 4.0 | Utility-first CSS framework |
| [Lucide React](https://lucide.dev/) | Latest | Icon library |
| [Firebase](https://firebase.google.com/) | 12.4 | Authentication and Database |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| [FastAPI](https://fastapi.tiangolo.com/) | Latest | Python web framework |
| [Python](https://www.python.org/) | 3.8+ | Programming language |
| [Pandas](https://pandas.pydata.org/) | Latest | Data processing |

### Database & Services

- **Firebase Firestore** - NoSQL database for user profiles and preferences
- **Firebase Authentication** - User authentication and authorization
- **Vercel** - Recommended hosting platform for frontend

---

## 📦 Project Structure

```
margadarshak/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── comparator/        # College comparator page
│   │   ├── chatbot/           # AI counselor page
│   │   ├── profile/           # User profile page
│   │   └── signin/            # Authentication page
│   ├── components/            # React components
│   │   ├── CollegeComparator.tsx
│   │   ├── ComparisonResults.tsx
│   │   ├── UserMenu.tsx
│   │   └── ProfileForm.tsx
│   ├── contexts/              # React contexts
│   │   └── AuthContext.tsx    # Authentication context
│   ├── services/              # API services
│   │   └── profileService.ts  # Profile management
│   ├── hooks/                 # Custom React hooks
│   │   └── useRequireAuth.ts  # Auth protection hook
│   ├── lib/                   # Utility functions
│   │   └── firebase.ts        # Firebase configuration
│   └── types/                 # TypeScript definitions
│       └── profile.ts         # Profile type definitions
├── backend/                   # FastAPI backend
│   ├── main.py               # FastAPI application
│   └── requirements.txt      # Python dependencies
├── public/                    # Static assets
├── .env.local                # Environment variables (create this)
├── package.json             # Node.js dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

---

## 📱 Application Routes

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Homepage with features overview | No |
| `/comparator` | College comparison tool | No |
| `/predict` | College predictor based on MHT-CET rank | No |
| `/chatbot` | AI-powered college counselor | No |
| `/profile` | User profile management | **Yes** |
| `/signin` | Sign in / Sign up page | No |

---

## 🔐 Authentication

The platform uses **Firebase Authentication** with multiple sign-in options:

- ✅ **Email/Password** - Traditional sign up and sign in
- ✅ **Google Sign-In** - Quick authentication with Google account
- ✅ **Secure Sessions** - Automatic session management
- ✅ **Protected Routes** - Profile and personalized features require authentication

### Setting up Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore Database
3. Add your web app and copy the configuration
4. Paste the configuration in `.env.local` file

---

## 📝 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> ⚠️ **Important**: Never commit `.env.local` to version control. It's already included in `.gitignore`.

---

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**

```bash
npm i -g vercel
```

2. **Deploy**

```bash
vercel
```

3. **Set Environment Variables**

Add all environment variables in Vercel dashboard under Project Settings → Environment Variables

### Backend Deployment

Deploy FastAPI backend to any Python hosting service:

- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Heroku](https://www.heroku.com/)
- [PythonAnywhere](https://www.pythonanywhere.com/)

**Important**: Update `NEXT_PUBLIC_API_URL` in frontend environment variables with your backend URL.

---

## 🐛 Troubleshooting

### Common Issues

<details>
<summary><b>Firebase Authentication Not Working</b></summary>

- Verify all Firebase environment variables are set correctly
- Check Firebase console for API restrictions
- Ensure Firebase Authentication is enabled in Firebase Console
- Verify Firestore Database rules allow read/write access

</details>

<details>
<summary><b>Backend API Errors</b></summary>

- Ensure Python backend is running on port 8000
- Check backend logs for errors
- Verify API endpoints match in frontend code
- Check CORS settings if accessing from different domains

</details>

<details>
<summary><b>Build Errors</b></summary>

- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- Check Node.js version (requires 18+): `node --version`
- Verify all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run lint`

</details>

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to Margadarshak, please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

---

## 📄 License

This project is built for **educational purposes**.

---

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/)
- Powered by [Firebase](https://firebase.google.com/)
- Data sourced from official Maharashtra college databases
- Icons provided by [Lucide](https://lucide.dev/)

---

## 📞 Support

For support, please open an issue on [GitHub Issues](https://github.com/your-username/margadarshak/issues).

---

<div align="center">

**Margadarshak** - Helping Maharashtra students make informed college decisions 🎓✨

*Your trusted guide to college success*

Made with ❤️ for MHT-CET students

[⬆ Back to Top](#-margadarshak)

</div>
