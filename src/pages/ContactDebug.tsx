import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { config } from '@/config/env';
import { Send } from 'lucide-react';

// Hardcoded API URLs for testing - try both
const LOCAL_API_URL = 'http://localhost:5000';
const DEPLOYED_API_URL = window.location.origin;
const MOCK_API_URL = window.location.origin + '/api/mock-contact';

const ContactDebugPage = () => {
  const [formData, setFormData] = useState({
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    company: 'Test Company',
    message: 'This is a test message.',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedApiUrl, setSelectedApiUrl] = useState(DEPLOYED_API_URL);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const testConnection = async (url: string) => {
    setError(null);
    setResult(null);
    try {
      const response = await fetch(`${url}/api/health`);
      const data = await response.json();
      setResult({ 
        message: `Connection successful: ${JSON.stringify(data)}`,
        type: 'success' 
      });
      return true;
    } catch (err) {
      console.error("Connection test failed:", err);
      setError(`Connection test failed: ${err instanceof Error ? err.message : String(err)}`);
      return false;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setResult(null);
    
    try {
      console.log(`Submitting to: ${selectedApiUrl}/api/contacts`);
      console.log('Form data:', JSON.stringify(formData));
      
      // Test connection first
      const isConnected = await testConnection(selectedApiUrl);
      if (!isConnected) {
        setError(`Cannot connect to API at ${selectedApiUrl}`);
        setIsSubmitting(false);
        return;
      }
      
      // Make the actual form submission
      const response = await fetch(`${selectedApiUrl}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonErr) {
        throw new Error(`Failed to parse response: ${response.statusText}`);
      }
      
      if (response.ok) {
        setResult({
          message: 'Message sent successfully',
          data: responseData,
          type: 'success'
        });
      } else {
        throw new Error(responseData.error || `Server returned ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error instanceof Error ? error.message : String(error));
      setResult({
        message: 'Failed to send message',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Try mock endpoint to verify CORS is working
  const testMockEndpoint = async () => {
    setIsSubmitting(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await fetch(MOCK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      setResult({
        message: 'Mock endpoint test successful',
        data,
        type: 'success'
      });
    } catch (error) {
      console.error('Mock endpoint test failed:', error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Contact Form Debugging</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">API URL Selection</h2>
        <div className="space-y-2">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={selectedApiUrl === DEPLOYED_API_URL}
                onChange={() => setSelectedApiUrl(DEPLOYED_API_URL)}
                className="form-radio"
              />
              <span>Deployed API ({DEPLOYED_API_URL})</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={selectedApiUrl === LOCAL_API_URL}
                onChange={() => setSelectedApiUrl(LOCAL_API_URL)}
                className="form-radio"
              />
              <span>Local API ({LOCAL_API_URL})</span>
            </label>
          </div>
          <div className="mt-4">
            <Button
              onClick={() => testConnection(selectedApiUrl)}
              variant="outline"
              className="mr-2"
            >
              Test Connection
            </Button>
            <Button
              onClick={testMockEndpoint}
              variant="outline"
            >
              Test Mock Endpoint
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-xl font-semibold mb-2">Contact Form</h2>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'} 
              {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">Debug Information</h2>
          
          <div>
            <h3 className="font-medium">Environment</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {JSON.stringify({
                origin: window.location.origin,
                apiUrl: config.apiUrl,
                selectedApiUrl,
              }, null, 2)}
            </pre>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded">
              <h3 className="font-medium">Error</h3>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {result && (
            <div className={`${result.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'} border p-3 rounded`}>
              <h3 className="font-medium">{result.message}</h3>
              {result.data && (
                <pre className="bg-gray-100 p-2 rounded text-sm mt-2 overflow-auto">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              )}
            </div>
          )}
          
          <div>
            <h3 className="font-medium">Request Payload</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDebugPage; 