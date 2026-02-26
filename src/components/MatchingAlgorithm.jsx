import React, { useState } from 'react';
import { Brain, Filter, Star, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function PetMatchingAlgorithm() {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedCriteria, setSelectedCriteria] = useState(null);

  const algorithm = {
    stages: [
      {
        id: 'input',
        title: 'Input Processing',
        color: 'bg-blue-100 border-blue-400',
        icon: Brain,
        description: 'Process and structure user questionnaire data',
        steps: [
          {
            name: 'Data Collection',
            details: ['Receive completed questionnaire', 'Validate all required fields', 'Normalize data formats', 'Extract key preferences']
          },
          {
            name: 'Profile Creation',
            details: ['Create structured user profile', 'Assign weights to preferences', 'Flag critical requirements', 'Store for future matches']
          },
          {
            name: 'Constraint Identification',
            details: ['Identify hard constraints (must-haves)', 'Identify soft preferences (nice-to-haves)', 'Flag deal-breakers', 'Set priority levels']
          }
        ]
      },
      {
        id: 'filtering',
        title: 'Initial Filtering',
        color: 'bg-purple-100 border-purple-400',
        icon: Filter,
        description: 'Apply hard constraints to eliminate incompatible pets',
        filters: [
          {
            category: 'Species Filter',
            type: 'Hard Constraint',
            logic: 'Include only cats OR dogs based on user preference',
            weight: 'Eliminates ~50% of database'
          },
          {
            category: 'Size Filter',
            type: 'Hard Constraint',
            logic: 'Match pet size to user preference (Small/Medium/Large)',
            weight: 'Critical for property type compatibility'
          },
          {
            category: 'Property Compatibility',
            type: 'Hard Constraint',
            logic: 'For flats: exclude high-energy dogs. For secured property check: exclude escape-prone dogs if property unsecured',
            weight: 'Safety critical'
          },
          {
            category: 'Children Safety',
            type: 'Hard Constraint',
            logic: 'If young children present: exclude pets marked as "not suitable for young children"',
            weight: 'Safety critical'
          },
          {
            category: 'Indoor/Outdoor',
            type: 'Hard Constraint',
            logic: 'Match environment preference. Indoor-only users cannot have outdoor-dependent pets',
            weight: 'Essential compatibility'
          }
        ]
      },
      {
        id: 'scoring',
        title: 'Compatibility Scoring',
        color: 'bg-green-100 border-green-400',
        icon: Star,
        description: 'Calculate match scores for remaining pets',
        scoringCriteria: [
          {
            factor: 'Time Availability',
            weight: '25%',
            description: 'Match pet needs with user availability',
            calculation: [
              'High-maintenance pets: Requires 4+ hours daily',
              'Medium-maintenance: Requires 2-3 hours daily',
              'Low-maintenance: Requires <2 hours daily',
              'Score = 100 * (1 - |user_time - required_time| / max_time)',
              'Bonus points if user time exceeds requirements'
            ]
          },
          {
            factor: 'Activity Level Match',
            weight: '20%',
            description: 'Match pet energy to lifestyle',
            calculation: [
              'Dogs: Compare walking distance/time willing vs required',
              'High energy pets need 2+ hours exercise',
              'Medium energy: 1-2 hours',
              'Low energy: <1 hour',
              'Perfect match = 100 points',
              'Undersupply reduces score more than oversupply'
            ]
          },
          {
            factor: 'Trainability Match',
            weight: '15%',
            description: 'Match training needs with user capacity',
            calculation: [
              'First-time owners: Prioritize easy-to-train pets',
              'Experienced owners: Can handle challenging pets',
              'Training time available factors in',
              'Score based on experience level match'
            ]
          },
          {
            factor: 'Space Compatibility',
            weight: '15%',
            description: 'Property size vs pet needs',
            calculation: [
              'Large dogs in small flats: Lower score',
              'Indoor/outdoor space alignment',
              'Garden access bonus for active dogs',
              'Perfect space match = 100 points'
            ]
          },
          {
            factor: 'Travel Frequency Impact',
            weight: '10%',
            description: 'Pet independence vs owner travel',
            calculation: [
              'Frequent travelers (>10 days/month): Prefer independent pets',
              'Rare travelers (<5 days/month): All pets suitable',
              'Separation anxiety pets penalized for frequent travelers',
              'Score inversely related to travel frequency for dependent pets'
            ]
          },
          {
            factor: 'Age Compatibility',
            weight: '10%',
            description: 'Pet age vs household dynamics',
            calculation: [
              'Young children + puppies/kittens: Lower score (high energy both)',
              'Young children + senior pets: Medium score',
              'Young children + adult pets: Higher score (stable temperament)',
              'Teens/adults: All ages suitable',
              'Senior owners + senior pets: Bonus points (low energy match)'
            ]
          },
          {
            factor: 'Special Needs Alignment',
            weight: '5%',
            description: 'Medical/behavioral needs match',
            calculation: [
              'Check if user can handle medications',
              'Check if user can accommodate disabilities',
              'Behavioral issues vs experience level',
              'Perfect capability match = bonus points'
            ]
          }
        ],
        totalScore: 'Sum of weighted factors = Final Compatibility Score (0-100)'
      },
      {
        id: 'ranking',
        title: 'Result Ranking',
        color: 'bg-yellow-100 border-yellow-400',
        icon: TrendingUp,
        description: 'Sort and prioritize results for presentation',
        rankingFactors: [
          {
            factor: 'Primary Sort',
            logic: 'Compatibility Score (highest to lowest)',
            weight: 'Primary'
          },
          {
            factor: 'Availability Status',
            logic: 'Prioritize currently available over "pending adoption"',
            weight: 'Secondary'
          },
          {
            factor: 'Location Proximity',
            logic: 'Closer shelters rank higher if scores are similar (within 5 points)',
            weight: 'Tie-breaker'
          },
          {
            factor: 'Recent Additions',
            logic: 'Newly listed pets get slight boost (within 7 days)',
            weight: 'Tie-breaker'
          },
          {
            factor: 'Urgent Cases',
            logic: 'Pets marked "urgent adoption needed" get visibility boost',
            weight: 'Ethical consideration'
          }
        ],
        output: [
          'Top 20 matches displayed initially',
          'Grouped by score ranges: Excellent (90-100), Great (75-89), Good (60-74)',
          'Each result shows score breakdown',
          'Option to view more results',
          '"Why this match?" explanation provided'
        ]
      },
      {
        id: 'refinement',
        title: 'Continuous Learning',
        color: 'bg-pink-100 border-pink-400',
        icon: CheckCircle,
        description: 'Learn from user behavior to improve matches',
        learningMechanisms: [
          {
            mechanism: 'Feedback Collection',
            actions: ['Track which matches users view', 'Track which pets are favorited', 'Track which shelters are contacted', 'Collect explicit feedback on match quality']
          },
          {
            mechanism: 'Pattern Recognition',
            actions: ['Identify commonly rejected pets despite high scores', 'Find hidden preferences from viewing patterns', 'Detect overlooked factors', 'Adjust weights based on outcomes']
          },
          {
            mechanism: 'Algorithm Tuning',
            actions: ['A/B test different weighting schemes', 'Adjust scoring based on successful adoptions', 'Refine filters based on rejection patterns', 'Update criteria priorities']
          },
          {
            mechanism: 'User Profile Evolution',
            actions: ['Update user preferences from behavior', 'Suggest profile refinements', 'Learn implicit preferences', 'Personalize future searches']
          }
        ]
      }
    ],
    exampleScenario: {
      user: {
        family: '2 adults, 2 children (ages 5, 8)',
        property: 'House with fenced garden',
        timeAvailable: '2-3 hours daily',
        walkingWilling: '1 hour daily, 3km',
        experience: 'First-time dog owner',
        travelFrequency: '2-3 times per year, 5-7 days each'
      },
      pet: {
        name: 'Bella',
        species: 'Dog',
        breed: 'Labrador Mix',
        age: '3 years',
        size: 'Large',
        energy: 'Medium',
        training: 'Good with children, house-trained, basic commands',
        needs: '1.5 hours exercise daily',
        special: 'None',
        temperament: 'Gentle, friendly, patient'
      },
      scoreBreakdown: [
        { factor: 'Time Availability', score: 90, reason: 'User has sufficient time (2-3hrs) for medium-need dog (1.5hrs)' },
        { factor: 'Activity Level', score: 85, reason: 'User willing to walk 1hr daily matches dog needs (1.5hrs exercise)' },
        { factor: 'Trainability', score: 95, reason: 'Already trained, perfect for first-time owners' },
        { factor: 'Space', score: 100, reason: 'Large dog + house with garden = perfect match' },
        { factor: 'Travel Impact', score: 95, reason: 'Rare travel, dog can board or stay with friends' },
        { factor: 'Age Compatibility', score: 95, reason: 'Adult dog excellent with young children' },
        { factor: 'Special Needs', score: 100, reason: 'No special needs, easy care' }
      ],
      finalScore: 94,
      matchLevel: 'Excellent Match'
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pet Matching Algorithm</h1>
          <p className="text-xl text-gray-600">Intelligent Compatibility Engine</p>
        </div>

        {/* Algorithm Stages */}
        <div className="space-y-6 mb-8">
          {algorithm.stages.map((stage, index) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === stage.id;
            
            return (
              <div key={stage.id} className="relative">
                <button
                  onClick={() => setSelectedStage(isSelected ? null : stage.id)}
                  className={`w-full ${stage.color} border-2 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all ${isSelected ? 'ring-4 ring-purple-300' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-white rounded-full p-3 mr-4">
                        <Icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-lg text-gray-800">{stage.title}</h3>
                        <p className="text-sm text-gray-600">{stage.description}</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-full px-4 py-2 text-sm font-semibold text-gray-600">
                      Stage {index + 1}
                    </div>
                  </div>
                </button>

                {isSelected && (
                  <div className="mt-4 bg-white rounded-lg shadow-md border-2 border-gray-200 p-6">
                    {/* Steps */}
                    {stage.steps && (
                      <div className="space-y-4">
                        {stage.steps.map((step, idx) => (
                          <div key={idx} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <h4 className="font-bold text-gray-800 mb-2">{step.name}</h4>
                            <ul className="space-y-1">
                              {step.details.map((detail, dIdx) => (
                                <li key={dIdx} className="text-sm text-gray-600 flex items-start">
                                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Filters */}
                    {stage.filters && (
                      <div className="space-y-3">
                        {stage.filters.map((filter, idx) => (
                          <div key={idx} className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-bold text-gray-800">{filter.category}</h4>
                              <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">
                                {filter.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{filter.logic}</p>
                            <p className="text-xs text-gray-500 italic">{filter.weight}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Scoring Criteria */}
                    {stage.scoringCriteria && (
                      <div>
                        <div className="space-y-4 mb-6">
                          {stage.scoringCriteria.map((criteria, idx) => (
                            <div key={idx} className="bg-green-50 rounded-lg p-4 border border-green-300">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-bold text-gray-800">{criteria.factor}</h4>
                                  <p className="text-sm text-gray-600">{criteria.description}</p>
                                </div>
                                <span className="bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                                  {criteria.weight}
                                </span>
                              </div>
                              <div className="mt-3 bg-white rounded p-3 border border-green-200">
                                <p className="text-xs font-semibold text-gray-700 mb-2">Calculation Logic:</p>
                                <ul className="space-y-1">
                                  {criteria.calculation.map((calc, cIdx) => (
                                    <li key={cIdx} className="text-xs text-gray-600 flex items-start">
                                      <span className="text-green-500 mr-2">→</span>
                                      {calc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-4 border-2 border-green-400">
                          <p className="font-bold text-gray-800 text-center">{stage.totalScore}</p>
                        </div>
                      </div>
                    )}

                    {/* Ranking Factors */}
                    {stage.rankingFactors && (
                      <div>
                        <div className="space-y-3 mb-6">
                          {stage.rankingFactors.map((factor, idx) => (
                            <div key={idx} className="bg-yellow-50 rounded-lg p-3 border border-yellow-300">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-gray-800">{factor.factor}</h4>
                                  <p className="text-sm text-gray-600">{factor.logic}</p>
                                </div>
                                <span className="bg-yellow-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                  {factor.weight}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-yellow-100 rounded-lg p-4 border border-yellow-300">
                          <h4 className="font-bold text-gray-800 mb-2">Output Format:</h4>
                          <ul className="space-y-1">
                            {stage.output.map((item, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start">
                                <Star className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Learning Mechanisms */}
                    {stage.learningMechanisms && (
                      <div className="space-y-4">
                        {stage.learningMechanisms.map((mech, idx) => (
                          <div key={idx} className="bg-pink-50 rounded-lg p-4 border border-pink-300">
                            <h4 className="font-bold text-gray-800 mb-2">{mech.mechanism}</h4>
                            <ul className="space-y-1">
                              {mech.actions.map((action, aIdx) => (
                                <li key={aIdx} className="text-sm text-gray-600 flex items-start">
                                  <Brain className="w-4 h-4 text-pink-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {index < algorithm.stages.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="w-1 h-6 bg-gray-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Example Scenario */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-xl border-2 border-purple-300 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Example Match Calculation</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* User Profile */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                <Brain className="w-5 h-5 text-blue-500 mr-2" />
                User Profile
              </h3>
              <div className="space-y-2 text-sm">
                {Object.entries(algorithm.exampleScenario.user).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="font-semibold text-gray-700 w-32">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pet Profile */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Pet: {algorithm.exampleScenario.pet.name}
              </h3>
              <div className="space-y-2 text-sm">
                {Object.entries(algorithm.exampleScenario.pet).filter(([key]) => key !== 'name').map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="font-semibold text-gray-700 w-32">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="font-bold text-lg text-gray-800 mb-3">Score Breakdown</h3>
            <div className="space-y-3">
              {algorithm.exampleScenario.scoreBreakdown.map((item, idx) => (
                <div key={idx} className="border-l-4 border-green-500 bg-green-50 p-3 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-800">{item.factor}</span>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold text-sm">
                      {item.score}/100
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{item.reason}</p>
                </div>
              ))}
            </div>

            {/* Final Score */}
            <div className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 text-center">
              <p className="text-white text-sm font-semibold mb-2">FINAL COMPATIBILITY SCORE</p>
              <p className="text-white text-5xl font-bold mb-2">{algorithm.exampleScenario.finalScore}</p>
              <p className="text-white text-xl font-semibold">{algorithm.exampleScenario.matchLevel}</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold">Click on any stage</span> to explore the detailed logic and calculations
          </p>
        </div>
      </div>
    </div>
  );
}