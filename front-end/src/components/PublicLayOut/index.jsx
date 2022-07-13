import { useOutlet } from "react-router-dom";

 const PublicLayout = () => {
    const outlet = useOutlet();

    return (
        <div>
          
        {outlet}
        




<div to="/app/feeds" className="lockbrand-position d-flex justify-content-center m-2 p-2 bg-secondary">
        <span className="material-icons w-25 mt-1 text-light">lock_open</span>
        <img src="../logos-brand/icon-left-font-monochrome-white.png" alt="logo & brand"
            className="logo-brand mx-2" />
    </div>
</div>
    );
};

export default PublicLayout