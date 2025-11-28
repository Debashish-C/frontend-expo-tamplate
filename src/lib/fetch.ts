import * as SecureStore from 'expo-secure-store';

// Use environment variable for API URL, with fallback to local IP for mobile testing
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.100:8000';

export interface FetchAPI {
  method: string;
  body?: string;
}

export const fetchAPI = async (url: string, options: FetchAPI) => {
  try {
    const token = await SecureStore.getItemAsync('auth_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${url}`, {
      method: options.method,
      headers,
      body: options.body,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        errorData.detail || 
        `HTTP Error: ${response.status}`
      );
    }

    return await response.json();
  } catch (error: any) {
    console.error('Fetch error:', error);
    throw error;
  }
};
