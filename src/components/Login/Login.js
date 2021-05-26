import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import validator from 'validator';
import PropTypes from 'prop-types';


async function senData(credentials) {
    return fetch(process.env.REACT_APP_URL_API+'/api/auth/login', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken, setProfile }) {



    const [email, setEmail] = useState();
    const [error, setError] = useState('');
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);



    const handleSubmit = async e => {
        e.preventDefault();
        if (!email) {
            setError('Ingresá tu correo electrónico');
            setShow(true);
            return false;
        } else if (!validator.isEmail(email)) {
            setError('Ingresá un correo electrónico válido');
            setShow(true);
            return false;
        } else if (!password) {
            setError('Ingresá tu contraseña');
            setShow(true);
            return false;
        } else {
            const data = await senData({
                email,
                password
            });

            if(data.error){

                setError(data.error);
                setShow(true);
                return false;
            }
            
            setToken(data);
            setProfile(data.name);
        }
    }

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="text-center">
                    <img src="/images/logo.svg" alt="Adecoagro"></img>
                </div>
                <h3>Por favor ingresá tu correo y contraseña</h3>

                <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>{error}</Alert>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input type="text" className="form-control" placeholder="Ingresá tu correo electrónico" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" className="form-control" placeholder="Ingresá tu contraseña" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group text-right">
                        <a href="/enviar-codigo">¿Olvidó su contraseña?</a>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Iniciá Sesión</button>
                    </div>
                </form>
            </div>
            <p className="text-center">Adecoagro © 2021</p>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
    setProfile: PropTypes.func.isRequired

}