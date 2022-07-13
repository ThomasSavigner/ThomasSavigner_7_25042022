import * as React from "react";
import { Link } from "react-router-dom";


function NotFound() {

  return (

    <div>
      <nav>
        <Link to="/app/feeds">Page not found</Link>
      </nav>
    </div>
  );
}

export default NotFound;