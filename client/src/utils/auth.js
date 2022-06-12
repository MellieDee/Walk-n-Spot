import decode from 'jwt-decode';

class AuthService {
  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if user still logged in
  loggedIn() {
    //check is there a valid saved token
    const token = this.getToken();

    // use type coersion to check if token is NOT undefined && call function below to check if token NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  // function to check if token has expired:
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  }

  // retrieve token from localStorage
  getToken() {

    //retrieve token
    return localStorage.getItem('id_token');
  }

  // SET token to localStorage
  login(idToken) {
    // Saves token to localStorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  // CLEAR token from localStorage & force logout with reload
  logout() {
    //clear token & profile data from localStorage
    localStorage.removeItem('id_token');
    // reload pg & reset state of app
    window.location.assign('/');
  }
}


//instantiate a new version of AuthService of for every component that imports it
export default new AuthService();