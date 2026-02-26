import React, { useState } from 'react';
import { Home, Users, Dog, MapPin, Clock, Shield, CheckCircle } from 'lucide-react';

export default function PetMatchingUserJourney() {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const journey = {
    phases: [
      {
        id: 'discover',
        title: 'Discovery',
        color: 'bg-blue-100 border-blue-400',
        icon: Home,
        description: 'User finds the application and begins their journey'
      },
      {
        id: 'profile',
        title: 'Household Profile',
        color: 'bg-purple-100 border-purple-400',
        icon: Users,
        description: 'Collect information about the household and lifestyle',
        questions: [
          { category: 'Family', items: ['Number of people in household', 'Ages of any children'] },
          { category: 'Property', items: ['Type of property (house, flat, etc.)', 'Property secured? (for dogs)', 'Indoor/outdoor space available'] },
          { category: 'Availability', items: ['Time available daily for pet care', 'Time available for dog walks', 'Frequency and duration of trips away from home'] }
        ]
      },
      {
        id: 'preferences',
        title: 'Pet Preferences',
        color: 'bg-green-100 border-green-400',
        icon: Dog,
        description: 'Define the ideal pet characteristics',
        questions: [
          { category: 'Animal Type', items: ['Cat or Dog'] },
          { category: 'Size Preference', items: ['Small, Medium, or Large'] },
          { category: 'Temperament', items: ['Trainability requirements', 'Activity level'] },
          { category: 'Environment', items: ['Indoor only, Outdoor access, or Both'] },
          { category: 'Dogs Only', items: ['Walking distance willing to cover', 'Walking time available daily'] }
        ]
      },
      {
        id: 'matching',
        title: 'Matching Algorithm',
        color: 'bg-yellow-100 border-yellow-400',
        icon: MapPin,
        description: 'System searches and ranks available pets',
        components: [
          'Query partner organizations',
          'Filter by basic criteria (species, size)',
          'Score based on lifestyle compatibility',
          'Consider special needs & restrictions',
          'Rank results by match quality'
        ],
        partners: ['RSPCA', 'Dogs Trust', 'R.A.T.S.', 'Rescue Remedies Dog Rescue', 'Blue Cross', 'ADCH.org.uk']
      },
      {
        id: 'results',
        title: 'View Results',
        color: 'bg-orange-100 border-orange-400',
        icon: CheckCircle,
        description: 'Present matched pets to user',
        features: [
          'Display top matches with photos',
          'Show compatibility score & reasoning',
          'Include pet profile (age, temperament, needs)',
          'Link to shelter/rescue contact info',
          'Save favorites for later review'
        ]
      },
      {
        id: 'connect',
        title: 'Connect & Adopt',
        color: 'bg-pink-100 border-pink-400',
        icon: Shield,
        description: 'Facilitate connection with shelters',
        actions: [
          'Direct contact with shelter',
          'Schedule visit/meeting',
          'Application assistance',
          'Follow-up support'
        ]
      }
    ]
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pet Matching Application</h1>
          <p className="text-xl text-gray-600">User Journey Concept Map</p>
        </div>

        {/* Journey Flow */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gray-300 hidden md:block" style={{ zIndex: 0 }} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative" style={{ zIndex: 1 }}>
            {journey.phases.map((phase, index) => {
              const Icon = phase.icon;
              const isSelected = selectedPhase === phase.id;
              
              return (
                <div key={phase.id} className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedPhase(isSelected ? null : phase.id)}
                    className={`w-full ${phase.color} border-2 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${isSelected ? 'ring-4 ring-blue-300' : ''}`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-white rounded-full p-3 mb-2">
                        <Icon className="w-8 h-8 text-gray-700" />
                      </div>
                      <h3 className="font-bold text-sm text-center text-gray-800">{phase.title}</h3>
                      <div className="mt-2 bg-white rounded-full px-3 py-1 text-xs font-semibold text-gray-600">
                        Step {index + 1}
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed View */}
        {selectedPhase && (
          <div className="mt-8 bg-white rounded-xl shadow-2xl p-6 border-2 border-gray-200">
            {journey.phases.find(p => p.id === selectedPhase) && (() => {
              const phase = journey.phases.find(p => p.id === selectedPhase);
              return (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{phase.title}</h2>
                  <p className="text-gray-600 mb-6">{phase.description}</p>

                  {/* Questions */}
                  {phase.questions && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Key Questions:</h3>
                      {phase.questions.map((section, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="font-semibold text-gray-800 mb-2">{section.category}</h4>
                          <ul className="space-y-1">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-gray-600 text-sm flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Components */}
                  {phase.components && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Algorithm Components:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                        {phase.components.map((comp, idx) => (
                          <div key={idx} className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                            <p className="text-sm text-gray-700 flex items-start">
                              <span className="text-yellow-600 font-bold mr-2">{idx + 1}.</span>
                              {comp}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-700 mb-3 mt-6">Partner Organizations:</h3>
                      <div className="flex flex-wrap gap-2">
                        {phase.partners.map((partner, idx) => (
                          <div key={idx} className="bg-blue-50 rounded-full px-4 py-2 border border-blue-200">
                            <p className="text-sm font-medium text-gray-700">{partner}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {phase.features && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">Features:</h3>
                      <div className="space-y-2">
                        {phase.features.map((feature, idx) => (
                          <div key={idx} className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                            <p className="text-sm text-gray-700 flex items-start">
                              <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {phase.actions && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3">User Actions:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {phase.actions.map((action, idx) => (
                          <div key={idx} className="bg-pink-50 rounded-lg p-3 border border-pink-200">
                            <p className="text-sm text-gray-700">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold">Click on any step</span> to view detailed information about that phase of the user journey
          </p>
        </div>
      </div>
    </div>
  );
}