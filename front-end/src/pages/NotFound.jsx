import * as React from "react";
import { Link } from "react-router-dom";

import '../styles/App.css';

function NotFound() {

  return (

    <div className="App">
      <nav>
        <Link to="/app/feeds">Page not found</Link>
      </nav>
    </div>
  );
}

export default NotFound;