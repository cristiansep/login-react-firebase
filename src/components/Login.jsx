import React,{useState, useCallback} from 'react';
import {AUTH, DB} from '../firebase';
import { withRouter } from "react-router-dom";



const Login = ({history}) => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);
    const [esRegistro, setEsRegistro] = useState(true);

    const procesarDatos = e => {
        e.preventDefault();

        if(!email.trim()){
            console.log('ingrese un email');
            setError('ingrese un email');
            return
        }

        if(!pass.trim()){
            console.log('ingrese pass');
            setError('ingrese un password');
            return
        }
        if(pass.length < 6) {
            console.log('pass mayor a 6 caracteres');
            setError('El password debe tener al menos 6 caracteres');
            return
        }
        setError(null);
        if(esRegistro) {
            registrar(); 
        } else {
            signIn();
        }
    }

    const signIn = useCallback(async () => {

        try {
           const res = await AUTH.signInWithEmailAndPassword(email, pass);
           console.log(res.user);

           setEmail('');
           setPass('');
           setError(null);
           history.push('/admin');
        } catch (error) {
            console.log(error);
            if(error.code === 'auth/invalid-email'){
                setError('Email no corresponde');
           }
           if(error.code === 'auth/user-not-found'){
            setError('Email no registrado');
           }
           if(error.code === 'auth/wrong-password') {
            setError('Contraseña incorrecta');
        } 
        }
    },[email, pass, history]);




    const registrar = useCallback( async() => {

        try {

           const res = await AUTH.createUserWithEmailAndPassword(email, pass);
           await DB.collection('usuarios').doc(res.user.uid).set({
               email: res.user.email,
               uid: res.user.uid
           });
           await DB.collection(res.user.uid).add({
                name: 'Tarea de ejemplo',
                fecha: Date.now()
           });
           setEmail('');
           setPass('');
           setError(null);
           history.push('/admin');
        } catch (error) {
            console.log(error);
            if(error.code === 'auth/invalid-email'){
                 setError('Email no válido');
            }
            if(error.code === 'auth/email-already-in-use') {
                setError('Email ya utilizado');
            }   
        }

    },[email, pass, history]);

    return (
        <div className="mt-5">
             <h3 className="text-center">
                 {
                     esRegistro ? 'Registro de usuarios' : 'Login de acceso'
                 }
             </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>

                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <input 
                            type="email" 
                            name="email"
                            className="form-control mb-2"
                            placeholder="Ingrese Email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input 
                            type="password"
                            name="pass" 
                            className="form-control mb-2"
                            placeholder="Ingrese Contraseña"
                            onChange={e => setPass(e.target.value)}
                            value={pass}
                        />
                        <button 
                            className="btn btn-lg btn-dark btn-block"
                            type="submit"
                        >
                            {
                                esRegistro ? 'Registrarse' : 'Acceder'
                            }
                        </button>
                        <button 
                            className="btn btn-sm btn-info btn-block"
                            onClick={() => setEsRegistro(!esRegistro)}
                            type="button"
                        >
                           {
                               esRegistro ? '¿Ya tienes cuenta de usuario?' : ' ¿No tienes cuenta?'
                           }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login);