import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index.js';

const request = async (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  const token = localStorage.getItem(ACCESS_TOKEN);
  console.log("Inside APIUtils request", token);
  if (token) {
    headers.append('Authorization', 'Bearer ' + token);
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(config.url, config);
    console.log("Inside APIUtils try response", response);
    const data = await response.json();
    console.log("Inside APIUtils try data", data);

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  } catch (error) {
    console.error("Error in APIUtils:", error);
    return Promise.reject(error);
  }
};

export const getCurrentUser = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: `${API_BASE_URL}/user/me`,
    method: 'GET',
  });
};

export const login = (loginRequest) => {
  return request({
    url: `${API_BASE_URL}/auth/login`,
    method: 'POST',
    body: JSON.stringify(loginRequest),
  });
};

export const signup = (signupRequest) => {
  console.log("Inside APIUtils signup", signupRequest);
  return request({
    url: `${API_BASE_URL}/auth/signup`,
    method: 'POST',
    body: JSON.stringify(signupRequest),
  });
};
