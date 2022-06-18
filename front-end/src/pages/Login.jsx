import * as React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Row, Tab } from 'react-bootstrap';

import SignInTabPane from '../components/SignInTabPane/index'
import SignUpTabPane from '../components/SignUpTabPane/index'
import '../styles/sign-up_style.css';


function Login() {  

  return (

    <>

    <Tab.Container id="signInTab" defaultActiveKey="SignIn" className="">
      
<Row className='flex-column align-items-center'>
          <Nav className="w-50 px-0" variant="tabs">
            <Nav.Item className="color-1 w-50 d-flex justify-content-center">
              <Nav.Link eventKey="SignIn" className='text-light font-title'>Connexion</Nav.Link>
            </Nav.Item>
            <Nav.Item className="color-1 w-50 d-flex justify-content-center">
              <Nav.Link eventKey="SignUp" className='text-light font-title'>Inscription</Nav.Link>
            </Nav.Item>
          </Nav>

        

          <Tab.Content  className="w-50 px-0">
            <Tab.Pane eventKey="SignIn" >
              <SignInTabPane />
            </Tab.Pane>
            <Tab.Pane eventKey="SignUp">
              <SignUpTabPane />
            </Tab.Pane>
          </Tab.Content>
</Row>
      
    </Tab.Container>
  



   
    <Link to="/app/feeds" className="m-4 p-3 bg-secondary" >
      <img src="logos-brand/icon-left-font-monochrome-white.png" alt="logo & brand" 
          className="logo-brand"/>
    </Link>
  
  </>

    
  );
}

export default Login;
