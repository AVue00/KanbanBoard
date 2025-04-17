import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // Return the decoded token
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  loggedIn() {
    // Return a value that indicates if the user is logged in
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string | null) {
    // Return a value that indicates if the token is expired
    if (!token) {
    return true;
    } else {
      const decodeToken = jwtDecode<JwtPayload>(token);
      if (decodeToken.exp && decodeToken.exp * 1000 < Date.now()) {
        return true;
      }
      return false;
    }
  }

  getToken(): string | null {
    // Return the token
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    // Set the token to localStorage
    // Redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Remove the token from localStorage
    // Redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
