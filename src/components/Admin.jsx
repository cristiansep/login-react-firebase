import React, {useEffect, useState} from 'react';
import { withRouter } from "react-router-dom";
import {AUTH} from '../firebase';

const Admin = ({history}) => {

    const [user, setUser] = useState(null);


    useEffect(() => {
        if(AUTH.currentUser){
            console.log('existe')
            setUser(AUTH.currentUser)
        }else{
            console.log('no existe')
            history.push('/login')
        }
    },[history]);

    return (
        <div className="mt-5">
        <h3 className="text-center">Ruta protegida</h3>
        {
            user && (
                <h3 className="text-center">{user.email}</h3>
            )
        }
    </div>
    );
};

export default withRouter(Admin);