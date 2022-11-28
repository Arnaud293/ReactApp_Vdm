import React, { useRef } from 'react';

const Login = () => {

    const loginEmail = useRef();
    const loginPassword = useRef();

    return (
        <div className="login-container">
            <div className="login">
                <h3>Se connecter</h3>
                <form>
                    <input type="email" placeholder='Email' required ref={loginEmail}/>
                    <input type="password" placeholder='Mot de passe' required ref={loginPassword}/>
                    <input type="submit" value="Connexion" />
                </form>
            </div>
        </div>
    );
};

export default Login;