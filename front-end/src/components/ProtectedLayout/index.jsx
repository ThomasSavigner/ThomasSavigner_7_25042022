import { Link, Navigate, useOutlet } from "react-router-dom";
//import { useAuth } from "../hooks/useAuth";


 const ProtectedLayout = () => {
//    const { user } = useAuth();
    const outlet = useOutlet();

 //   if (!user) {
 //       return <Navigate to="/login" />;
 //   }

    return (
        <div>
            <h1>cette route est protégée </h1>
        {outlet}
        </div>
    );
};

export default ProtectedLayout