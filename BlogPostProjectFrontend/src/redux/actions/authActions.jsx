import axios from 'axios';

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const FORMSUBMITTED = 'FORM_SUBMIT_SUCCESS';
// Login action
export const login = (loginData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/blogs/login', loginData);

    if (response.status === 200) {
      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem('userToken', token);

      // Dispatch login success action
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};


export const getData = (loginData) => async (dispatch) => {
  try {
    // console.log("Token is ", loginData);
    const response = await axios.get('http://localhost:5000/api/blogs/verifyToken', {
      headers: {
        'Authorization': `Bearer ${loginData}`,  // Bearer token in the Authorization header

      }
    });

    if (response.status === 200) {
      const { token, user } = response.data;
      // console.log("Data is ", response);
      // Store token in localStorage
      // localStorage.setItem('userToken', token);

      // Dispatch login success action
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};



// Logout action
export const logout = () => (dispatch) => {
  localStorage.removeItem('userToken');
  dispatch({ type: LOGOUT });
};

export const ContactForm = (formData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/blogs/contactForm', formData);
    // console.log("Response for contact form", response);
    if (response.status === 200) {
      dispatch({
        type: FORMSUBMITTED
      });
    }

  } catch (error) {
    console.log("error is ", error);
  }
}

