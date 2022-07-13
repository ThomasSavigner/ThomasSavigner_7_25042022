import * as React from 'react';
import { Dropdown} from "react-bootstrap";
import { NavLink } from "react-router-dom"

export default function UserMenu() {

    return (
        <>
            <Dropdown className="d-flex flex-column justify-content-center button-usermenu-position">
                 <Dropdown.Toggle className="btn btn-sm text-light color-1 d-flex flex-column justify-content-center 
                            align-items-center rounded-circle"
                         id="settingsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="rounded-circle mt-1 avatar-navbar-container ">
                        <img alt="user account icon" src="/icons/round_account_circle_black_24dp.png" className="w-100"/>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="color-1 rounded font-aside" aria-labelledby="settingsDropdown">
                    <Dropdown.Item  href="profile"  className="text-light">
                        <div className="d-flex justify-content-start">
                            <span className="material-icons">manage_accounts</span>
                            <NavLink to="profile" className="mx-3 text-decoration-none text-light">Profil</NavLink>
                        </div>     
                    </Dropdown.Item>
                    <Dropdown.Item href="mypublications" className="text-light">
                        <div className="d-flex justify-content-start">
                            <span className="material-icons">publish</span>
                            <NavLink to="mypublications" className="mx-3 text-decoration-none text-light">Mes posts</NavLink>
                        </div>     
                    </Dropdown.Item>
                    <Dropdown.Item href="/" className="text-light">
                        <div className="d-flex justify-content-start">
                            <span className="material-icons">logout</span>
                            <NavLink to="/" className="mx-3 text-decoration-none text-light">Se déconnecter</NavLink>
                        </div>     
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );

}