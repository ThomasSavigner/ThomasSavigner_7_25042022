import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import '../styles/sign-up_style.css';

function Login() {

  return (

    <>
    
    <Button variant="primary">Primary</Button>{' '}
    <Button variant="secondary">Secondary</Button>{' '}
    <Link to="/app/feeds" className="m-4 p-3 bg-secondary" >
      <img src="logos-brand/icon-left-font-monochrome-white.png" alt="logo & brand" 
          className="logo-brand"/>
    </Link>
  
  </>

    
  );
}

export default Login;
