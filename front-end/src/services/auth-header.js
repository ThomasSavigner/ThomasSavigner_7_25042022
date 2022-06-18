export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('Bearer token'));
  
    if (token) {
      return { 'x-access-token': token };       // for Node.js Express back-end
    } else {
      return {};
    }
  }