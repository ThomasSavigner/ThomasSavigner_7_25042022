export default function authHeader() {
    
  const token = JSON.parse(localStorage.getItem('Bearer token'));
  
    if (token) {
      return {"Authorization": 'Bearer ' + token}         
    } else {                                              
      return {};
    }
  
}