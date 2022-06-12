import * as React from "react";
import { Link } from "react-router-dom";

import '../styles/App.css';

function Profile() {

  return (

    <div className="">
      <nav>
        
        <Link to="/app/feeds">Mosaïque</Link>
      </nav>
    </div>
  );
}

export default Profile;
