import * as React from "react";
import { Link } from "react-router-dom";

import '../styles/App.css';

function MyPublications() {

  return (

    <div className="App">
      <nav>
        <Link to="/app/feeds">Mosaïque</Link>
      </nav>
     
    </div>
  );
}

export default MyPublications;
