import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PetMatchingApp from './components/PetMatchingApp';
import Login from './components/Login';
import Register from './components/Register';
import EmailVerification from './components/EmailVerification';
import { LogOut, User } from 'lucide-react';

function AppContent() {
  const [authView, setAuthView] = useState('login');
  const [verificationToken, setVerificationToken] = useState(null);

  const { user, isAuthenticated, loading, logout } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      setVerificationToken(token);
      setAuthView('verify');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (authView === 'verify') {
    return (
      <EmailVerification
        token={verificationToken}
        onComplete={() => {
          setAuthView('login');
          setVerificationToken(null);
        }}
      />
    );
  }

  if (!isAuthenticated) {
    if (authView === 'register') {
      return (
        <Register
          onSwitchToLogin={() => setAuthView('login')}
        />
      );
    }

    return (
      <Login
        onSwitchToRegister={() => setAuthView('register')}
        onLoginSuccess={() => {}}
      />
    );
  }

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🐾</div>
            <div>
              <h1 className="font-bold text-gray-800">Best Fit Pets</h1>
              <p className="text-xs text-gray-500">Find your perfect companion</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-blue-50 rounded-lg px-4 py-2">
              <User className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-gray-700">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-full pt-16">
        <PetMatchingApp />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
