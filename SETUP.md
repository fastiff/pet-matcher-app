# 🚀 Quick Setup Guide

## Step-by-Step Installation

### 1. Extract Files
```bash
tar -xzf pet-matcher-app-with-auth.tar.gz
cd pet-matcher-app
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your settings:
# - JWT_SECRET: Any random string
# - EMAIL_USER: Your Gmail address
# - EMAIL_PASS: Gmail App Password (see below)
# - FRONTEND_URL: http://localhost:3000

# Start backend
npm start
```

**Getting Gmail App Password:**
1. Go to Google Account Settings
2. Enable 2-Step Verification
3. Visit: https://myaccount.google.com/apppasswords
4. Create password for "Mail"
5. Copy 16-character code
6. Paste in .env as EMAIL_PASS

### 3. Frontend Setup

Open a **new terminal**:

```bash
cd pet-matcher-app

# Install dependencies
npm install

# Start frontend
npm start
```

Browser opens automatically at http://localhost:3000

### 4. Test Registration

1. Click "Register here"
2. Fill in:
   - Name: Test User
   - Email: your-email@gmail.com
   - Password: test12345
   - Confirm Password: test12345
3. Click "Create Account"
4. Check email (including spam folder!)
5. Click verification link
6. Login with your credentials
7. You're in! 🎉

## Troubleshooting

**"Failed to send verification email"**
- Check EMAIL_USER and EMAIL_PASS in .env
- Make sure you're using App Password, not regular password
- Verify 2FA is enabled on Google account

**Backend won't start**
- Port 5000 might be in use
- Run: `lsof -i :5000` (Mac/Linux)
- Kill process or change PORT in .env

**Frontend won't connect to backend**
- Make sure backend is running on port 5000
- Check proxy setting in package.json
- Clear browser cache

**Email goes to spam**
- Normal in development
- In production, use SendGrid
- Check spam folder during testing

## Next Steps

Once working locally:
1. ✅ Test the full registration → verification → login flow
2. ✅ Try matching some pets
3. ✅ Push to GitHub
4. ✅ Deploy backend to Railway
5. ✅ Deploy frontend to Vercel
6. ✅ Connect bestfitpets.com

## File Structure Check

Make sure you have:
```
pet-matcher-app/
├── server/
│   ├── server.js ✓
│   ├── package.json ✓
│   └── .env (create this)
├── src/
│   ├── components/ ✓
│   ├── contexts/ ✓
│   └── App.js ✓
├── public/ ✓
├── package.json ✓
└── README.md ✓
```

## Important Notes

⚠️ **In-Memory Storage:**
- Current version stores users in memory
- Data lost on server restart
- Fine for testing, NOT for production

✅ **For Production:**
- Add database (PostgreSQL/MongoDB)
- Use SendGrid for emails
- Deploy to Railway + Vercel

## Getting Help

- README.md - Overview and features
- DEPLOYMENT_GUIDE.md - Production deployment
- AUTHENTICATION_GUIDE.md - Detailed auth setup

**You're all set! Start matching pets! 🐾**
