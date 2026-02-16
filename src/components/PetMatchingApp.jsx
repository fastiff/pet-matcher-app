import React, { useState } from 'react';
import { Heart, Home, Users, Clock, MapPin, Dog, Cat, Star, ArrowRight, ArrowLeft, Check, X } from 'lucide-react';

// Sample pet data from partner organizations
const samplePets = [
  {
    id: 1,
    name: "Bella",
    species: "dog",
    breed: "Labrador Mix",
    age: 3,
    size: "large",
    energy: "medium",
    trainability: "high",
    goodWithChildren: true,
    requiresGarden: false,
    exerciseNeeds: 1.5,
    separationAnxiety: false,
    specialNeeds: false,
    shelter: "Dogs Trust",
    location: "Reading",
    distance: 8,
    image: "🦮",
    temperament: "Gentle, friendly, patient",
    description: "Bella is a lovely 3-year-old Labrador mix who loves people and is great with children."
  },
  {
    id: 2,
    name: "Max",
    species: "dog",
    breed: "Border Collie",
    age: 2,
    size: "medium",
    energy: "high",
    trainability: "high",
    goodWithChildren: true,
    requiresGarden: true,
    exerciseNeeds: 3,
    separationAnxiety: false,
    specialNeeds: false,
    shelter: "RSPCA",
    location: "Aylesbury",
    distance: 12,
    image: "🐕",
    temperament: "Energetic, intelligent, loyal",
    description: "Max is a smart and active Border Collie who needs an experienced owner with lots of time for training and exercise."
  },
  {
    id: 3,
    name: "Luna",
    species: "cat",
    breed: "Domestic Shorthair",
    age: 4,
    size: "small",
    energy: "low",
    trainability: "medium",
    goodWithChildren: true,
    requiresGarden: false,
    exerciseNeeds: 0.5,
    separationAnxiety: false,
    specialNeeds: false,
    shelter: "Blue Cross",
    location: "Watford",
    distance: 15,
    image: "🐱",
    temperament: "Calm, affectionate, independent",
    description: "Luna is a sweet, laid-back cat who loves cuddles but is also happy to entertain herself."
  },
  {
    id: 4,
    name: "Charlie",
    species: "dog",
    breed: "Cavalier King Charles Spaniel",
    age: 5,
    size: "small",
    energy: "low",
    trainability: "medium",
    goodWithChildren: true,
    requiresGarden: false,
    exerciseNeeds: 1,
    separationAnxiety: true,
    specialNeeds: false,
    shelter: "Rescue Remedies Dog Rescue",
    location: "Luton",
    distance: 10,
    image: "🐕‍🦺",
    temperament: "Loving, gentle, needs company",
    description: "Charlie is a sweet senior dog who loves being around people and would suit someone who's home often."
  },
  {
    id: 5,
    name: "Rocky",
    species: "dog",
    breed: "German Shepherd",
    age: 4,
    size: "large",
    energy: "high",
    trainability: "high",
    goodWithChildren: false,
    requiresGarden: true,
    exerciseNeeds: 2.5,
    separationAnxiety: false,
    specialNeeds: false,
    shelter: "ADCH",
    location: "St Albans",
    distance: 18,
    image: "🐕",
    temperament: "Protective, loyal, needs experienced owner",
    description: "Rocky is a wonderful dog but needs an experienced owner and a home without young children."
  },
  {
    id: 6,
    name: "Milo",
    species: "cat",
    breed: "Tabby",
    age: 2,
    size: "small",
    energy: "medium",
    trainability: "medium",
    goodWithChildren: true,
    requiresGarden: false,
    exerciseNeeds: 0.5,
    separationAnxiety: false,
    specialNeeds: false,
    shelter: "R.A.T.S.",
    location: "Hemel Hempstead",
    distance: 2,
    image: "🐈",
    temperament: "Playful, friendly, adaptable",
    description: "Milo is a young, energetic cat who loves to play and would be great with an active family."
  },
  {
    id: 7,
    name: "Daisy",
    species: "dog",
    breed: "Beagle",
    age: 6,
    size: "small",
    energy: "medium",
    trainability: "medium",
    goodWithChildren: true,
    requiresGarden: false,
    exerciseNeeds: 1.5,
    separationAnxiety: false,
    specialNeeds: false,
    shelter: "Dogs Trust",
    location: "Berkhamsted",
    distance: 6,
    image: "🐶",
    temperament: "Friendly, curious, food-motivated",
    description: "Daisy is a sweet Beagle who loves walks and treats. She's well-behaved and great with kids."
  },
  {
    id: 8,
    name: "Whiskers",
    species: "cat",
    breed: "Persian Mix",
    age: 7,
    size: "small",
    energy: "low",
    trainability: "low",
    goodWithChildren: false,
    requiresGarden: false,
    exerciseNeeds: 0.3,
    separationAnxiety: false,
    specialNeeds: true,
    shelter: "Blue Cross",
    location: "Tring",
    distance: 9,
    image: "😺",
    temperament: "Quiet, independent, needs special diet",
    description: "Whiskers is a senior cat who needs a quiet home and special dietary care. Very gentle and loving."
  }
];

export default function PetMatchingApp() {
  const [step, setStep] = useState('welcome');
  const [profile, setProfile] = useState({
    familySize: '',
    childrenAges: [],
    propertyType: '',
    propertySecured: '',
    indoorOutdoor: '',
    petType: '',
    sizePreference: '',
    timeAvailable: '',
    walkingTime: '',
    walkingDistance: '',
    travelFrequency: '',
    travelDuration: '',
    experience: ''
  });
  const [matches, setMatches] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

  // Matching algorithm
  const calculateMatch = (pet, userProfile) => {
    let score = 0;
    let reasons = [];

    // Species filter (hard constraint)
    if (pet.species !== userProfile.petType) return null;

    // Size filter
    if (userProfile.sizePreference && pet.size !== userProfile.sizePreference) {
      score -= 30;
    }

    // Children safety (hard constraint)
    if (userProfile.childrenAges.some(age => age < 12) && !pet.goodWithChildren) {
      return null;
    }

    // Property compatibility
    if (userProfile.propertyType === 'flat' && pet.size === 'large' && pet.energy === 'high') {
      score -= 20;
      reasons.push("Large high-energy dog may need more space");
    }

    if (pet.requiresGarden && userProfile.indoorOutdoor === 'indoor') {
      return null;
    }

    if (userProfile.propertySecured === 'no' && pet.species === 'dog' && pet.energy === 'high') {
      score -= 15;
      reasons.push("Unsecured property with energetic dog may be risky");
    }

    // Time availability match (25% weight)
    const timeScore = Math.min(100, (parseFloat(userProfile.timeAvailable) / pet.exerciseNeeds) * 100);
    score += timeScore * 0.25;
    if (timeScore >= 90) {
      reasons.push("Excellent time availability match");
    } else if (timeScore >= 70) {
      reasons.push("Good time availability");
    } else {
      reasons.push("Time may be tight for this pet's needs");
    }

    // Activity level match (20% weight) - for dogs
    if (pet.species === 'dog') {
      const walkingScore = Math.min(100, (parseFloat(userProfile.walkingTime) / pet.exerciseNeeds) * 100);
      score += walkingScore * 0.20;
      if (walkingScore >= 90) {
        reasons.push("Perfect exercise match");
      } else if (walkingScore < 70) {
        reasons.push("May need more walking time");
      }
    } else {
      score += 20; // Cats don't need walks
    }

    // Trainability match (15% weight)
    const experienceScore = userProfile.experience === 'first-time' ? 
      (pet.trainability === 'high' ? 100 : 50) : 100;
    score += experienceScore * 0.15;
    if (experienceScore === 100 && pet.trainability === 'high') {
      reasons.push("Well-trained and perfect for first-time owners");
    }

    // Space compatibility (15% weight)
    let spaceScore = 100;
    if (userProfile.propertyType === 'flat' && pet.size === 'large') {
      spaceScore = 60;
    } else if (userProfile.propertyType === 'house' && pet.size === 'large') {
      spaceScore = 100;
      reasons.push("Great space for this pet");
    }
    score += spaceScore * 0.15;

    // Travel frequency impact (10% weight)
    const travelScore = pet.separationAnxiety && userProfile.travelFrequency === 'often' ? 40 : 100;
    score += travelScore * 0.10;
    if (travelScore < 60) {
      reasons.push("Pet may struggle with frequent absences");
    }

    // Age compatibility (10% weight)
    let ageScore = 100;
    if (userProfile.childrenAges.some(age => age < 5) && pet.age < 2) {
      ageScore = 70;
      reasons.push("Young pet + young children = lots of energy!");
    } else if (userProfile.childrenAges.some(age => age < 12) && pet.age >= 3) {
      reasons.push("Mature pet great with children");
    }
    score += ageScore * 0.10;

    // Special needs (5% weight)
    const specialScore = pet.specialNeeds && userProfile.experience === 'first-time' ? 50 : 100;
    score += specialScore * 0.05;

    // Location bonus
    if (pet.distance <= 10) {
      score += 5;
      reasons.push(`Nearby shelter (${pet.distance}km)`);
    }

    return {
      pet,
      score: Math.round(score),
      reasons: reasons.slice(0, 3)
    };
  };

  const findMatches = () => {
    const results = samplePets
      .map(pet => calculateMatch(pet, profile))
      .filter(match => match !== null)
      .sort((a, b) => b.score - a.score);
    
    setMatches(results);
    setStep('results');
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 75) return 'Great Match';
    if (score >= 60) return 'Good Match';
    return 'Fair Match';
  };

  // Welcome Screen
  if (step === 'welcome') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="max-w-2xl bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Perfect Pet Matcher</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find your ideal companion from local shelters and rescue organizations
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl mb-2">🏠</div>
              <div className="text-sm font-semibold text-gray-700">RSPCA</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl mb-2">🐕</div>
              <div className="text-sm font-semibold text-gray-700">Dogs Trust</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl mb-2">🐱</div>
              <div className="text-sm font-semibold text-gray-700">R.A.T.S.</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-2xl mb-2">❤️</div>
              <div className="text-sm font-semibold text-gray-700">Rescue Remedies</div>
            </div>
            <div className="bg-pink-50 rounded-lg p-4">
              <div className="text-2xl mb-2">🦴</div>
              <div className="text-sm font-semibold text-gray-700">Blue Cross</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-2xl mb-2">🐾</div>
              <div className="text-sm font-semibold text-gray-700">ADCH</div>
            </div>
          </div>
          <button
            onClick={() => setStep('questionnaire')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center mx-auto"
          >
            Start Your Journey <ArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    );
  }

  // Questionnaire
  if (step === 'questionnaire') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-50 to-blue-50 p-4 overflow-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tell Us About Your Home</h2>
          
          <div className="space-y-6">
            {/* Pet Type */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                What type of pet are you looking for?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setProfile({...profile, petType: 'dog'})}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    profile.petType === 'dog' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Dog className="w-12 h-12 mx-auto mb-2 text-blue-500" />
                  <div className="font-semibold">Dog</div>
                </button>
                <button
                  onClick={() => setProfile({...profile, petType: 'cat'})}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    profile.petType === 'cat' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <Cat className="w-12 h-12 mx-auto mb-2 text-purple-500" />
                  <div className="font-semibold">Cat</div>
                </button>
              </div>
            </div>

            {/* Family Size */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                <Users className="inline w-5 h-5 mr-2" />
                How many people live in your household?
              </label>
              <select
                value={profile.familySize}
                onChange={(e) => setProfile({...profile, familySize: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5+">5 or more</option>
              </select>
            </div>

            {/* Children */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Do you have children? If yes, what ages?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['0-4', '5-8', '9-12', '13+'].map(age => (
                  <button
                    key={age}
                    onClick={() => {
                      const ages = profile.childrenAges.includes(age)
                        ? profile.childrenAges.filter(a => a !== age)
                        : [...profile.childrenAges, age];
                      setProfile({...profile, childrenAges: ages});
                    }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      profile.childrenAges.includes(age)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {age} years
                    {profile.childrenAges.includes(age) && <Check className="w-4 h-4 inline ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                <Home className="inline w-5 h-5 mr-2" />
                What type of property do you live in?
              </label>
              <select
                value={profile.propertyType}
                onChange={(e) => setProfile({...profile, propertyType: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="house">House</option>
                <option value="flat">Flat/Apartment</option>
                <option value="bungalow">Bungalow</option>
              </select>
            </div>

            {/* Property Secured (for dogs) */}
            {profile.petType === 'dog' && (
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  Is your property secured to prevent escape onto roads?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setProfile({...profile, propertySecured: 'yes'})}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      profile.propertySecured === 'yes'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <Check className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <div className="font-semibold">Yes</div>
                  </button>
                  <button
                    onClick={() => setProfile({...profile, propertySecured: 'no'})}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      profile.propertySecured === 'no'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <X className="w-8 h-8 mx-auto mb-2 text-red-500" />
                    <div className="font-semibold">No</div>
                  </button>
                </div>
              </div>
            )}

            {/* Indoor/Outdoor */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Will your pet live exclusively indoors, outdoors, or both?
              </label>
              <select
                value={profile.indoorOutdoor}
                onChange={(e) => setProfile({...profile, indoorOutdoor: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="indoor">Indoor only</option>
                <option value="outdoor">Outdoor access</option>
                <option value="both">Both</option>
              </select>
            </div>

            {/* Size Preference */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                What size {profile.petType || 'pet'} do you prefer?
              </label>
              <select
                value={profile.sizePreference}
                onChange={(e) => setProfile({...profile, sizePreference: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">No preference</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            {/* Time Available */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                <Clock className="inline w-5 h-5 mr-2" />
                How many hours per day can you spend with your pet?
              </label>
              <select
                value={profile.timeAvailable}
                onChange={(e) => setProfile({...profile, timeAvailable: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="1">Less than 1 hour</option>
                <option value="2">1-2 hours</option>
                <option value="3">2-3 hours</option>
                <option value="4">3-4 hours</option>
                <option value="6">More than 4 hours</option>
              </select>
            </div>

            {/* Walking Time (for dogs) */}
            {profile.petType === 'dog' && (
              <>
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    How much time can you dedicate to daily walks?
                  </label>
                  <select
                    value={profile.walkingTime}
                    onChange={(e) => setProfile({...profile, walkingTime: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="0.5">30 minutes</option>
                    <option value="1">1 hour</option>
                    <option value="1.5">1.5 hours</option>
                    <option value="2">2 hours</option>
                    <option value="3">3+ hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    How far are you willing to walk daily?
                  </label>
                  <select
                    value={profile.walkingDistance}
                    onChange={(e) => setProfile({...profile, walkingDistance: e.target.value})}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="1">1-2 km</option>
                    <option value="3">3-5 km</option>
                    <option value="5">5+ km</option>
                  </select>
                </div>
              </>
            )}

            {/* Travel Frequency */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                <MapPin className="inline w-5 h-5 mr-2" />
                How often do you travel away from home?
              </label>
              <select
                value={profile.travelFrequency}
                onChange={(e) => setProfile({...profile, travelFrequency: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="rarely">Rarely (1-2 times per year)</option>
                <option value="occasionally">Occasionally (3-5 times per year)</option>
                <option value="often">Often (6+ times per year)</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                What's your experience with pets?
              </label>
              <select
                value={profile.experience}
                onChange={(e) => setProfile({...profile, experience: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="first-time">First-time pet owner</option>
                <option value="experienced">Experienced pet owner</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setStep('welcome')}
              className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all flex items-center justify-center"
            >
              <ArrowLeft className="mr-2" /> Back
            </button>
            <button
              onClick={findMatches}
              disabled={!profile.petType || !profile.familySize || !profile.propertyType || !profile.timeAvailable || !profile.experience}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              Find My Match <Heart className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results
  if (step === 'results') {
    if (selectedPet) {
      const match = matches.find(m => m.pet.id === selectedPet.id);
      return (
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 p-4 overflow-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
            <button
              onClick={() => setSelectedPet(null)}
              className="mb-4 text-blue-600 hover:text-blue-800 flex items-center font-semibold"
            >
              <ArrowLeft className="mr-2" /> Back to Results
            </button>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-8xl mb-4 text-center">{selectedPet.image}</div>
                <div className={`${getScoreColor(match.score)} text-white rounded-lg p-4 text-center mb-4`}>
                  <div className="text-4xl font-bold">{match.score}%</div>
                  <div className="text-lg">{getScoreLabel(match.score)}</div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedPet.name}</h2>
                <p className="text-xl text-gray-600 mb-4">{selectedPet.breed}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-700">Age:</span>
                    <span className="text-gray-600">{selectedPet.age} years</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-700">Size:</span>
                    <span className="text-gray-600 capitalize">{selectedPet.size}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-700">Energy Level:</span>
                    <span className="text-gray-600 capitalize">{selectedPet.energy}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-700">Temperament:</span>
                    <span className="text-gray-600">{selectedPet.temperament}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-700">Shelter:</span>
                    <span className="text-gray-600">{selectedPet.shelter}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-700">Location:</span>
                    <span className="text-gray-600">{selectedPet.location} ({selectedPet.distance}km away)</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-gray-800 mb-2">About {selectedPet.name}</h3>
                  <p className="text-gray-700">{selectedPet.description}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                    <Star className="w-5 h-5 text-green-600 mr-2" />
                    Why This Match?
                  </h3>
                  <ul className="space-y-2">
                    {match.reasons.map((reason, idx) => (
                      <li key={idx} className="text-gray-700 flex items-start">
                        <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full mt-6 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center">
                  <Heart className="mr-2" /> Contact {selectedPet.shelter}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 p-4 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Your Perfect Matches</h2>
            <p className="text-gray-600 text-center mb-4">
              We found {matches.length} great {profile.petType}s for you!
            </p>
            <button
              onClick={() => setStep('questionnaire')}
              className="mx-auto block text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Adjust Your Preferences
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div
                key={match.pet.id}
                onClick={() => setSelectedPet(match.pet)}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden"
              >
                <div className="relative">
                  <div className="text-9xl text-center py-8 bg-gradient-to-br from-blue-50 to-purple-50">
                    {match.pet.image}
                  </div>
                  <div className={`absolute top-4 right-4 ${getScoreColor(match.score)} text-white px-4 py-2 rounded-full font-bold shadow-lg`}>
                    {match.score}%
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{match.pet.name}</h3>
                  <p className="text-gray-600 mb-4">{match.pet.breed}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span>{match.pet.age} years</span>
                    <span>•</span>
                    <span className="capitalize">{match.pet.size}</span>
                    <span>•</span>
                    <span className="capitalize">{match.pet.energy}</span>
                  </div>

                  <div className={`${getScoreColor(match.score)} bg-opacity-10 rounded-lg p-3 mb-4`}>
                    <div className="font-semibold text-gray-800 mb-1">{getScoreLabel(match.score)}</div>
                    {match.reasons.slice(0, 2).map((reason, idx) => (
                      <div key={idx} className="text-sm text-gray-600 flex items-start">
                        <Check className="w-4 h-4 text-green-600 mr-1 flex-shrink-0 mt-0.5" />
                        {reason}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {match.pet.location} • {match.pet.distance}km
                    </div>
                    <div>{match.pet.shelter}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {matches.length === 0 && (
            <div className="bg-white rounded-xl shadow-xl p-12 text-center">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No matches found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your preferences to see more options
              </p>
              <button
                onClick={() => setStep('questionnaire')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Update Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}