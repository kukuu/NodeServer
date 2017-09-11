import axios from 'axios';

export function userSignupRequest(userData) {

//returns a function with dispatch as argument
  return dispatch => {
  	//which returns a function with axios as promise
    return axios.post('/api/user', userData)
  }
}
