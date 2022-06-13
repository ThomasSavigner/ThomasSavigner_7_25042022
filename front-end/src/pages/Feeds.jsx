import * as React from "react";
import { Link } from "react-router-dom";

import '../styles/App.css';

function Feeds() {

  return (

    <div className="App">
      <nav>
        <Link to="/"> Logout </Link>
        <Link to="/app/post"> Type post </Link>
        <Link to="/app/:postID"> Read post </Link>
        <Link to="/app/mypublications"> My publications </Link>
        <Link to="/app/profile"> Profile </Link>
      </nav>
    </div>
  );
}

export default Feeds;
