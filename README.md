# Perfect Pet Matcher 🐾

A smart web application that matches potential pet owners with their ideal companion from local shelters and rescue organizations.

## Overview

Perfect Pet Matcher helps families find the right pet by:
- Collecting detailed information about household, lifestyle, and preferences
- Using an intelligent matching algorithm to calculate compatibility scores
- Presenting ranked results from multiple partner shelters
- Providing detailed match explanations

## Partner Organizations

- RSPCA
- Dogs Trust
- R.A.T.S.
- Rescue Remedies Dog Rescue
- Blue Cross
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

## Project Structure

```
pet-matcher-app/
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
