import { useOutlet } from "react-router-dom";
//import { useAuth } from "../hooks/useAuth";


 const PublicLayout = () => {
//    const { user } = useAuth();
    const outlet = useOutlet();

 //   if (!user) {
 //       return <Navigate to="/login" />;
 //   }

    return (
        <div>
            <h1>cette route est publique </h1>
        {outlet}
        </div>
    );
};

export default PublicLayout