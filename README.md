<<<<<<< HEAD
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
=======
# Perfect Pet Matcher 🐾

A smart web application that matches potential pet owners with their ideal companion from local shelters and rescue organizations.

## Overview

Perfect Pet Matcher helps families find the right pet by:
- Collecting detailed information about household, lifestyle, and preferences
- Using an intelligent matching algorithm to calculate compatibility scores
- Presenting ranked results from multiple partner shelters
- Providing detailed match explanations

## Partner Organizations

>>>>>>> fa21544d1688636641149f185748f47df6eed2fe
- RSPCA
- Dogs Trust
- R.A.T.S.
- Rescue Remedies Dog Rescue
- Blue Cross
<<<<<<< HEAD
- ADCH

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
=======
- ADCH (Association of Dogs and Cats Homes)

## Features

### User Journey
- Welcome screen introducing partner organizations
- Comprehensive questionnaire covering:
  - Family composition and children's ages
  - Property type and security
  - Living arrangements (indoor/outdoor)
  - Time availability and walking capacity
  - Travel frequency
  - Pet experience level
- Smart matching algorithm with weighted criteria
- Results page with compatibility scores
- Detailed pet profiles with match reasoning

### Matching Algorithm

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
>>>>>>> fa21544d1688636641149f185748f47df6eed2fe

## Project Structure

```
pet-matcher-app/
<<<<<<< HEAD
├── server/                    # Backend API
│   ├── server.js             # Main server file
│   ├── package.json          # Backend dependencies
│   └── .env.example          # Environment template
├── src/
│   ├── components/
│   │   ├── PetMatchingApp.jsx    # Main pet matching app
│   │   ├── Login.jsx              # Login component
│   │   ├── Register.jsx           # Registration component
│   │   └── EmailVerification.jsx # Email verification handler
│   ├── contexts/
│   │   └── AuthContext.js         # Authentication state management
│   ├── App.js                     # Main app with auth routing
│   └── index.js
├── public/
│   └── index.html
├── package.json              # Frontend dependencies
└── README.md
```

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

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

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

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

MIT

## Support

For issues or questions:
1. Check the DEPLOYMENT_GUIDE.md
2. Check the AUTHENTICATION_GUIDE.md
3. Open an issue on GitHub

## Acknowledgments

- Partner rescue organizations
- The pet adoption community
- All contributors

---

**Made with ❤️ for pets and their future families**
=======
├── src/
│   ├── components/
│   │   ├── PetMatchingApp.jsx          # Main application
│   │   ├── UserJourneyMap.jsx          # User journey concept map
│   │   ├── SystemArchitecture.jsx      # System architecture map
│   │   └── MatchingAlgorithm.jsx       # Algorithm concept map
│   ├── App.jsx
│   └── index.js
├── public/
│   └── index.html
├── package.json
└── README.md
```

## Technology Stack

### Frontend
- React.js for UI components
- Tailwind CSS for styling
- Lucide React for icons

### Planned Backend (Future Development)
- Node.js/Python API services
- PostgreSQL for user profiles
- MongoDB for pet catalog
- Redis for caching
- Elasticsearch for search

### Planned Integrations
- Partner shelter APIs
- Geocoding service for location matching
- Notification service for new matches

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pet-matcher-app.git
cd pet-matcher-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Click "Start Your Journey" on the welcome screen
2. Complete the questionnaire about your household and preferences
3. Click "Find My Match" to see compatible pets
4. Browse results ranked by compatibility score
5. Click on any pet to view detailed information and match reasoning
6. Contact the shelter directly to arrange a visit

## Development Roadmap

### Phase 1 (Current - Demo)
- ✅ User questionnaire interface
- ✅ Matching algorithm implementation
- ✅ Results display with ranking
- ✅ Sample pet data

### Phase 2 (Next Steps)
- [ ] Backend API development
- [ ] Database integration
- [ ] Real shelter API integrations
- [ ] User authentication
- [ ] Save favorites and search history

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] Email notifications for new matches
- [ ] Advanced filters and preferences
- [ ] Adoption tracking
- [ ] Success stories and testimonials
- [ ] Machine learning to improve matching

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or suggestions, please open an issue on GitHub.

## Acknowledgments

- All partner rescue organizations for their vital work
- Pet owners and adopters who inspired this project
- The rescue community for their continued support
>>>>>>> fa21544d1688636641149f185748f47df6eed2fe
