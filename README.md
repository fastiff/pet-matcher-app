# Best Fit Pets 🐾

A smart web application that matches potential pet owners with their ideal companion from local shelters and rescue organizations, featuring secure authentication and email verification.

## Features

### 🔐 Authentication System
- User registration with email verification
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes (must verify email to access app)
- Beautiful verification emails

### 🐕 Pet Matching
- Smart questionnaire collecting household info
- Intelligent matching algorithm with weighted criteria
- Results ranked by compatibility score
- Detailed match explanations
- Support for cats and dogs

### 🏢 Partner Organizations
- RSPCA
- Dogs Trust
- R.A.T.S.
- Rescue Remedies Dog Rescue
- Blue Cross
- ADCH (Association of Dogs and Cats Homes)

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Gmail account (for sending verification emails)

### 1. Install Dependencies

**Backend:**
```bash
cd pet-matcher-app/server
npm install
```

**Frontend:**
```bash
cd pet-matcher-app
npm install
```

### 2. Configure Email (Backend)

Create `/server/.env`:
```env
JWT_SECRET=your-random-secret-key-123456789
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
FRONTEND_URL=http://localhost:3000
```

**Get Gmail App Password:**
1. Enable 2-Step Verification in Google Account
2. Go to: https://myaccount.google.com/apppasswords
3. Create app password for "Mail"
4. Copy the 16-character password
5. Use as EMAIL_PASS (no spaces)

### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm start
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd pet-matcher-app
npm start
# Runs on http://localhost:3000
```

### 4. Test the Flow

1. Open http://localhost:3000
2. Click "Register here"
3. Fill in name, email, password
4. Check your email for verification link
5. Click verification link
6. Login with your credentials
7. Start matching pets!

## Matching Algorithm

The algorithm evaluates pets across multiple weighted factors:

1. **Time Availability (25%)** - Match daily time with pet needs
2. **Activity Level (20%)** - Match exercise capacity with pet energy
3. **Trainability (15%)** - Match experience level with training needs
4. **Space Compatibility (15%)** - Match property with pet size/needs
5. **Travel Impact (10%)** - Consider separation anxiety vs travel frequency
6. **Age Compatibility (10%)** - Match pet age with household dynamics
7. **Special Needs (5%)** - Consider medical/behavioral requirements

Results are ranked by compatibility score (0-100):
- 90-100: Excellent Match
- 75-89: Great Match
- 60-74: Good Match
- Below 60: Fair Match

## Project Structure

```
pet-matcher-app/
├── server/                    # Backend API
│   ├── server.js             # Main server file
│   ├── package.json          # Backend dependencies
│   └── .env.example          # Environment template
├── src/
│   ├── components/
│   │   ├── PetMatchingApp.jsx        # Main pet matching app
│   │   ├── Login.jsx                 # Login component
│   │   ├── Register.jsx              # Registration component
│   │   ├── EmailVerification.jsx     # Email verification handler
│   │   ├── UserJourneyMap.jsx        # User journey concept map
│   │   ├── SystemArchitecture.jsx    # System architecture map
│   │   └── MatchingAlgorithm.jsx     # Algorithm concept map
│   ├── contexts/
│   │   └── AuthContext.js            # Authentication state management
│   ├── App.js                        # Main app with auth routing
│   └── index.js
├── public/
│   └── index.html
├── package.json              # Frontend dependencies
└── README.md
```

## Technology Stack

**Frontend:**
- React.js
- Tailwind CSS
- Lucide React (icons)
- Context API (state management)

**Backend:**
- Node.js
- Express.js
- JWT authentication
- Bcrypt password hashing
- Nodemailer (email)
- Express Validator

**For Production:**
- PostgreSQL/MongoDB (database)
- SendGrid/AWS SES (email service)
- Railway/Heroku (backend hosting)
- Vercel (frontend hosting)

## Environment Variables

### Backend (.env)
```env
JWT_SECRET=your-secret-key
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-backend-url/api
```

## Security Features

- ✅ Email verification required
- ✅ JWT token authentication
- ✅ Password hashing (bcrypt)
- ✅ Protected API routes
- ✅ Token expiration (24 hours for verification, 7 days for session)
- ✅ Input validation

## Deployment

### Backend (Railway)
1. Push code to GitHub
2. Go to railway.app
3. Deploy from GitHub repo
4. Set root directory to `/server`
5. Add environment variables
6. Get Railway URL

### Frontend (Vercel)
1. Deploy to Vercel from GitHub
2. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend.railway.app/api
   ```
3. Connect bestfitpets.com domain

## Known Limitations

⚠️ **Current Version:**
- Uses in-memory storage (Map objects)
- Data lost on server restart
- Not production-ready without database

✅ **For Production:**
- Add PostgreSQL or MongoDB
- Use SendGrid for emails
- Implement rate limiting
- Add password reset feature
- Add user profile management

## Development Roadmap

### Phase 1 (Current)
- ✅ User questionnaire interface
- ✅ Matching algorithm implementation
- ✅ Results display with ranking
- ✅ User authentication with email verification

### Phase 2 (Next Steps)
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real shelter API integrations
- [ ] Save favourites and search history
- [ ] Password reset feature

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] Email notifications for new matches
- [ ] Advanced filters and preferences
- [ ] Adoption tracking
- [ ] Machine learning to improve matching

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Partner rescue organizations for their vital work
- The pet adoption community
- All contributors

---

**Made with ❤️ for pets and their future families**
