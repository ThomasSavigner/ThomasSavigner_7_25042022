import { Navigate, useOutlet } from "react-router-dom";
//import { useAuth } from "../../utils/useAuth";


 const ProtectedLayout = () => {
  //  const { token } = useAuth();
    const outlet = useOutlet();

    if (!localStorage.getItem("Bearer token")) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <h1>cette route est protégée </h1>
        {outlet}
        </div>
    );
};

export default ProtectedLayout