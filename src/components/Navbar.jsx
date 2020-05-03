import React from 'react';
import {AUTH} from '../firebase';
import {Link, NavLink} from 'react-router-dom';
import { withRouter } from "react-router-dom";


const Navbar = ({firebaseUser, history}) => {

    const cerrarSesion = () => {
        AUTH.signOut().then(() => {
            history.push('/login');
        });
    }

    return (
        <div className="navbar navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">React Admin</Link>
        <div>
            <div className="d-flex">
                <NavLink 
                    className="btn btn-dark mr-2" 
                    to="/"
                    exact
                >
                    Inicio
                </NavLink>
                {
                     firebaseUser !== null ? (
                        <NavLink 
                            className="btn btn-dark mr-2" 
                            to="/admin"
                        >
                            Admin
                        </NavLink>
                       
                    ) : null
                }
                {
                    firebaseUser !== null ? (
                        <button 
                        className="btn btn-dark"
                        onClick={cerrarSesion}
                        >Cerrar sesion</button>
                    ) : (
                        <NavLink 
                            className="btn btn-dark" to="/login">
                            Login
                        </NavLink>
                    )
                }
            </div>
        </div>
    </div>

    );
}


export default withRouter(Navbar);