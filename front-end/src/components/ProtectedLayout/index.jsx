import { Navigate, useOutlet } from "react-router-dom";
import React from 'react';


 const ProtectedLayout = () => {
    const outlet = useOutlet();

    if (!localStorage.getItem("Bearer token")) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            {outlet}
            <div to="/app/feeds" className="w-25 d-flex justify-content-center m-2 p-2 bg-secondary">
                <span className="material-icons w-25 mt-1 text-light">lock</span>
                <img src="../logos-brand/icon-left-font-monochrome-white.png" alt="logo & brand"
                    className="logo-brand w-50 mx-2" />
            </div>
        
                
        </div>
    );
};

export default ProtectedLayout