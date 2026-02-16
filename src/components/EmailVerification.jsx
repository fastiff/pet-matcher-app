import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function EmailVerification({ token, onComplete }) {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      const result = await verifyEmail(token);

      if (result.success) {
        setStatus('success');
        setMessage(result.message);
      } else {
        setStatus('error');
        setMessage(result.error);
      }
    };

    verify();
  }, [token, verifyEmail]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center">
          {status === 'verifying' && (
            <>
              <Loader className="w-20 h-20 text-blue-500 mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Your Email</h2>
              <p className="text-gray-600">Please wait...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Email Verified!</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <button
                onClick={onComplete}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Continue to Login
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Verification Failed</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Possible reasons:</strong>
                </p>
                <ul className="text-sm text-gray-600 mt-2 text-left list-disc list-inside">
                  <li>The verification link has expired (24 hours)</li>
                  <li>The link has already been used</li>
                  <li>The link is invalid</li>
                </ul>
              </div>
              <button
                onClick={onComplete}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
