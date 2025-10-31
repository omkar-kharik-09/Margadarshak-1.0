# 🚀 Deployment Guide - Margadarshak to Vercel

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Firebase project configured
- Backend API deployed (Railway, Render, etc.)

## Method 1: Vercel Dashboard (Recommended)

### Step 1: Sign in to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Select **GitHub** as your Git provider
3. Find and select **`Margadarshak-1.0`** repository
4. Click **"Import"**

### Step 3: Configure Project

**Important Settings:**
- **Root Directory**: `margadarshak` ⚠️ (Set this since your Next.js app is in the margadarshak subfolder)
- **Framework Preset**: Next.js (auto-detected)
- **Build Command**: `npm run build` (auto)
- **Output Directory**: `.next` (auto)
- **Install Command**: `npm install` (auto)

### Step 4: Environment Variables

Add these in the **Environment Variables** section:

#### Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

#### API Configuration
```
NEXT_PUBLIC_API_URL=https://your-backend-api.railway.app
```
(Replace with your actual backend URL)

**Select environments:**
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-5 minutes for build
3. Your app will be live at: `https://margadarshak-1-0.vercel.app`

---

## Method 2: Vercel CLI

### Install Vercel CLI
```bash
npm i -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Deploy from Project Directory
```bash
cd margadarshak
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No** (first time)
- Project name? **margadarshak-1-0** (or press Enter)
- Directory? **./** (current directory)
- Override settings? **No**

### Set Environment Variables via CLI
```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
# Enter your value when prompted
# Repeat for each environment variable
```

Or add all at once:
```bash
vercel env pull .env.local
# Edit .env.local with your values
vercel env push
```

### Production Deploy
```bash
vercel --prod
```

---

## Important Configuration Notes

### 1. Root Directory Setting ⚠️

Since your Next.js app is in the `margadarshak/` subfolder, you MUST set:
- **Root Directory**: `margadarshak`

Otherwise, Vercel will try to build from the root directory and fail.

### 2. Build Settings

Vercel auto-detects Next.js, but verify:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Node.js Version**: 18.x or higher

### 3. Environment Variables

All `NEXT_PUBLIC_*` variables are exposed to the browser.
Make sure NOT to include sensitive keys that start with `NEXT_PUBLIC_`.

---

## Backend Deployment

Your FastAPI backend needs to be deployed separately:

### Recommended Platforms:

1. **Railway** (Easy, free tier)
   - Connect GitHub repo
   - Select `backend` folder
   - Auto-deploys on push

2. **Render** (Free tier available)
   - Connect GitHub repo
   - Set build command: `pip install -r requirements.txt`
   - Start command: `python main.py`

3. **PythonAnywhere** (Simple hosting)
   - Upload files via web interface
   - Configure startup script

### Backend Environment Variables

Your backend might need:
- Firebase credentials (if accessing Firestore from backend)
- OpenAI API key (if using OpenAI)
- CORS origins (add your Vercel URL)

Example CORS configuration in FastAPI:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://margadarshak-1-0.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test Firebase authentication
- [ ] Check API endpoints are working
- [ ] Test college comparator
- [ ] Test AI counselor
- [ ] Verify profile creation/editing
- [ ] Check mobile responsiveness
- [ ] Update README with production URL

---

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

---

## Troubleshooting

### Build Fails
- Check Root Directory is set to `margadarshak`
- Verify all dependencies in `package.json`
- Check build logs in Vercel dashboard

### Environment Variables Not Working
- Ensure variables start with `NEXT_PUBLIC_` for client-side
- Check variable names match exactly
- Redeploy after adding new variables

### API Errors
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings in backend
- Ensure backend is deployed and running

### Firebase Errors
- Verify all Firebase env variables are set
- Check Firebase console for API restrictions
- Ensure Firestore rules allow access

---

## Updating After Deployment

### Automatic Deployments
- Every push to `main` branch auto-deploys
- Preview deployments for PRs

### Manual Redeploy
```bash
vercel --prod
```

Or from Vercel Dashboard:
1. Go to Deployments
2. Click "..." on latest deployment
3. Select "Redeploy"

---

## Monitoring

- View logs: Vercel Dashboard → Your Project → Logs
- Check analytics: Vercel Dashboard → Analytics
- Monitor performance: Vercel Dashboard → Speed Insights

---

**Your app is now live! 🎉**

