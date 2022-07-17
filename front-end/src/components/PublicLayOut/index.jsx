import { useOutlet } from "react-router-dom";

 const PublicLayout = () => {
    const outlet = useOutlet();

    return (
    
        <div>
            {outlet}
        
            <div className="rounded lockbrand-position m-1 p-2 bg-secondary">
                <img src="../logos-brand/icon-left-font-monochrome-white.png" alt="logo & brand"
                    className="logo-brand mx-2" />
            </div>
        </div>
    
    );
};

export default PublicLayout