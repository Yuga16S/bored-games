import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index.js';

const request = async (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  const token = localStorage.getItem(ACCESS_TOKEN);
  console.log("4 - Inside APIUtils request", token);
  if (token) {
    headers.append('Authorization', 'Bearer ' + token);
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(config.url, config);
    console.log("5 - Inside APIUtils try response", response);
    const data = await response.json();
    console.log("6 - Inside APIUtils try data", data);

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  } catch (error) {
    console.error("7 - Error in APIUtils:", error);
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

export const addFeedback = (feedbackRequest) => {
  //console.log("Inside APIUtils feedback request ", feedbackRequest);
  return request({
    url: `${API_BASE_URL}/auth/review`,
    method: 'POST',
    body: JSON.stringify(feedbackRequest)
  });
};


export const fetchValidatedReviews = () => {
  console.log("3 - Inside APIUTil fetchValidatedReviews");
  return request({
    url: `${API_BASE_URL}/auth/fetchReviews`,
    method: 'POST',
  });
};
