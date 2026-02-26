import React, { useState } from 'react';
import { Database, Cloud, Smartphone, Globe, Lock, Zap, RefreshCw, Search, Link } from 'lucide-react';

export default function PetMatchingArchitecture() {
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const architecture = {
    layers: [
      {
        id: 'frontend',
        title: 'Presentation Layer',
        color: 'bg-blue-100 border-blue-400',
        icon: Smartphone,
        description: 'User-facing interfaces and client applications',
        components: [
          {
            name: 'Web Application',
            tech: 'React/Next.js',
            features: ['Responsive design', 'Progressive Web App', 'Offline capability', 'Interactive questionnaire', 'Results gallery'],
            responsibilities: ['User input collection', 'Display matched pets', 'Profile management', 'Favorites & saved searches']
          },
          {
            name: 'Mobile Apps',
            tech: 'React Native / Flutter',
            features: ['iOS & Android', 'Push notifications', 'Location services', 'Camera for profile photos'],
            responsibilities: ['Native mobile experience', 'On-the-go access', 'Quick updates on new matches']
          }
        ]
      },
      {
        id: 'api',
        title: 'API Gateway Layer',
        color: 'bg-green-100 border-green-400',
        icon: Cloud,
        description: 'Central routing and security hub',
        components: [
          {
            name: 'API Gateway',
            tech: 'Kong / AWS API Gateway',
            features: ['Rate limiting', 'Authentication', 'Request routing', 'Load balancing', 'API versioning'],
            responsibilities: ['Route requests to services', 'Enforce security policies', 'Monitor traffic', 'Cache responses']
          },
          {
            name: 'Authentication Service',
            tech: 'OAuth 2.0 / Auth0',
            features: ['User registration', 'Login/logout', 'Password reset', 'Social login', 'Session management'],
            responsibilities: ['Verify user identity', 'Manage access tokens', 'Secure user data']
          }
        ]
      },
      {
        id: 'business',
        title: 'Business Logic Layer',
        color: 'bg-purple-100 border-purple-400',
        icon: Zap,
        description: 'Core application services and matching logic',
        components: [
          {
            name: 'Profile Service',
            tech: 'Node.js / Python',
            features: ['User profile CRUD', 'Preference storage', 'Profile validation', 'History tracking'],
            responsibilities: ['Manage user profiles', 'Store household data', 'Track user preferences', 'Update search history']
          },
          {
            name: 'Matching Engine',
            tech: 'Python / ML Framework',
            features: ['Scoring algorithm', 'Compatibility calculation', 'Filtering logic', 'Ranking system', 'Special needs matching'],
            responsibilities: ['Calculate match scores', 'Apply filters (size, species)', 'Rank results by compatibility', 'Handle complex requirements']
          },
          {
            name: 'Search Service',
            tech: 'Elasticsearch / Algolia',
            features: ['Full-text search', 'Faceted filtering', 'Geolocation search', 'Auto-suggest', 'Real-time indexing'],
            responsibilities: ['Index pet data', 'Execute search queries', 'Return filtered results', 'Support location-based search']
          },
          {
            name: 'Notification Service',
            tech: 'Node.js / Firebase',
            features: ['Email notifications', 'Push notifications', 'SMS alerts', 'New match alerts'],
            responsibilities: ['Notify users of new matches', 'Send adoption updates', 'Reminder notifications']
          }
        ]
      },
      {
        id: 'integration',
        title: 'Integration Layer',
        color: 'bg-yellow-100 border-yellow-400',
        icon: Link,
        description: 'External partner connections and data synchronization',
        components: [
          {
            name: 'Shelter API Integrations',
            tech: 'REST APIs / GraphQL',
            features: ['RSPCA connector', 'Dogs Trust connector', 'R.A.T.S. connector', 'Rescue Remedies connector', 'Blue Cross connector', 'ADCH connector'],
            responsibilities: ['Fetch pet listings', 'Sync availability data', 'Handle different API formats', 'Error handling & retries', 'Rate limit management']
          },
          {
            name: 'Data Sync Service',
            tech: 'Apache Kafka / RabbitMQ',
            features: ['Scheduled syncs', 'Real-time updates', 'Data transformation', 'Deduplication', 'Change detection'],
            responsibilities: ['Poll partner APIs regularly', 'Transform data to standard format', 'Update pet database', 'Track data freshness']
          },
          {
            name: 'Geocoding Service',
            tech: 'Google Maps API / Mapbox',
            features: ['Address validation', 'Distance calculation', 'Location mapping', 'Shelter proximity'],
            responsibilities: ['Convert addresses to coordinates', 'Calculate distances', 'Find nearby shelters']
          }
        ]
      },
      {
        id: 'data',
        title: 'Data Layer',
        color: 'bg-orange-100 border-orange-400',
        icon: Database,
        description: 'Data storage and persistence',
        components: [
          {
            name: 'Primary Database',
            tech: 'PostgreSQL',
            features: ['User profiles', 'Search history', 'Favorites', 'Application data', 'ACID compliance'],
            responsibilities: ['Store user data', 'Maintain data integrity', 'Support complex queries']
          },
          {
            name: 'Pet Catalog Database',
            tech: 'MongoDB / PostgreSQL',
            features: ['Pet listings', 'Shelter information', 'Pet photos & media', 'Flexible schema'],
            responsibilities: ['Store pet data from partners', 'Handle varying data structures', 'Fast read operations']
          },
          {
            name: 'Cache Layer',
            tech: 'Redis / Memcached',
            features: ['Session storage', 'Search results cache', 'API response cache', 'Real-time data'],
            responsibilities: ['Speed up frequent queries', 'Reduce database load', 'Store temporary data']
          },
          {
            name: 'File Storage',
            tech: 'AWS S3 / Azure Blob',
            features: ['Pet photos', 'User uploads', 'Document storage', 'CDN integration'],
            responsibilities: ['Store images and files', 'Serve media efficiently', 'Backup and redundancy']
          }
        ]
      },
      {
        id: 'infrastructure',
        title: 'Infrastructure Layer',
        color: 'bg-red-100 border-red-400',
        icon: Globe,
        description: 'Hosting, monitoring, and DevOps',
        components: [
          {
            name: 'Cloud Platform',
            tech: 'AWS / Azure / GCP',
            features: ['Scalable compute', 'Container orchestration', 'Auto-scaling', 'Load balancing'],
            responsibilities: ['Host applications', 'Manage resources', 'Scale based on demand']
          },
          {
            name: 'Monitoring & Logging',
            tech: 'Datadog / ELK Stack',
            features: ['Application monitoring', 'Error tracking', 'Performance metrics', 'Log aggregation', 'Alerting'],
            responsibilities: ['Track system health', 'Alert on issues', 'Debug problems', 'Performance optimization']
          },
          {
            name: 'CI/CD Pipeline',
            tech: 'GitHub Actions / Jenkins',
            features: ['Automated testing', 'Deployment automation', 'Code quality checks', 'Security scanning'],
            responsibilities: ['Build and test code', 'Deploy updates', 'Ensure code quality']
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 p-8 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Pet Matching Application</h1>
          <p className="text-xl text-gray-600">System Architecture Concept Map</p>
        </div>

        {/* Architecture Layers */}
        <div className="space-y-6">
          {architecture.layers.map((layer, index) => {
            const Icon = layer.icon;
            const isSelected = selectedLayer === layer.id;
            
            return (
              <div key={layer.id} className="relative">
                {/* Layer Header */}
                <button
                  onClick={() => setSelectedLayer(isSelected ? null : layer.id)}
                  className={`w-full ${layer.color} border-2 rounded-lg p-4 shadow-lg hover:shadow-xl transition-all ${isSelected ? 'ring-4 ring-blue-300' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-white rounded-full p-3 mr-4">
                        <Icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-lg text-gray-800">{layer.title}</h3>
                        <p className="text-sm text-gray-600">{layer.description}</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-full px-4 py-2 text-sm font-semibold text-gray-600">
                      Layer {index + 1}
                    </div>
                  </div>
                </button>

                {/* Layer Components */}
                {isSelected && (
                  <div className="mt-4 ml-8 space-y-4">
                    {layer.components.map((component) => (
                      <div
                        key={component.name}
                        className="bg-white rounded-lg shadow-md border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                      >
                        <button
                          onClick={() => setSelectedComponent(
                            selectedComponent === component.name ? null : component.name
                          )}
                          className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-gray-800 text-lg">{component.name}</h4>
                              <p className="text-sm text-gray-500 mt-1">
                                <span className="font-semibold">Technology:</span> {component.tech}
                              </p>
                            </div>
                            <div className="text-gray-400">
                              {selectedComponent === component.name ? '▼' : '▶'}
                            </div>
                          </div>
                        </button>

                        {selectedComponent === component.name && (
                          <div className="p-4 bg-gray-50 border-t-2 border-gray-200">
                            <div className="grid md:grid-cols-2 gap-4">
                              {/* Features */}
                              <div>
                                <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
                                  <Zap className="w-4 h-4 mr-2 text-blue-500" />
                                  Key Features
                                </h5>
                                <ul className="space-y-1">
                                  {component.features.map((feature, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                                      <span className="text-blue-500 mr-2">•</span>
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Responsibilities */}
                              <div>
                                <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
                                  <Lock className="w-4 h-4 mr-2 text-green-500" />
                                  Responsibilities
                                </h5>
                                <ul className="space-y-1">
                                  {component.responsibilities.map((resp, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                                      <span className="text-green-500 mr-2">→</span>
                                      {resp}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Connection Line to Next Layer */}
                {index < architecture.layers.length - 1 && (
                  <div className="flex justify-center my-2">
                    <div className="w-1 h-6 bg-gray-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Data Flow Legend */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4">System Data Flow</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">User Request Flow</h4>
              <p className="text-xs text-gray-600">Frontend → API Gateway → Business Logic → Data Layer</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Pet Data Sync</h4>
              <p className="text-xs text-gray-600">Partner APIs → Integration Layer → Data Sync → Pet Database</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Match Generation</h4>
              <p className="text-xs text-gray-600">User Profile → Matching Engine → Search Service → Ranked Results</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4 bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold">Click on any layer</span> to expand and view its components. 
            <span className="font-semibold ml-2">Click on components</span> to see detailed features and responsibilities.
          </p>
        </div>
      </div>
    </div>
  );
}