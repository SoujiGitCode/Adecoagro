import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import validator from 'validator';


async function senData(data) {
    return fetch(process.env.REACT_APP_URL_API+'/api/auth/forgot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
}

export default function ForgotPassword({ setToken }) {

    const [email, setEmail] = useState();
    const [error, setError] = useState('');
    const [variant, setVariant] = useState('danger');
    const [show, setShow] = useState(false);
    const handleSubmit = async e => {
        e.preventDefault();
        if (!email) {
            setError('Ingresá tu correo electrónico');
            setVariant('danger');
            setShow(true);
            return false;
        } else if (!validator.isEmail(email)) {
            setError('Ingresá un correo electrónico válido');
            setVariant('danger');
            setShow(true);
            return false;
        } else {
            const data = await senData({
                email
            });
            if (data.error) {
                setError(data.error);
                setVariant('danger');
                setShow(true);
                return false;
            } else {
                setVariant('success');
                setError(data.response);
                setShow(true);
            }
        }
}

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="text-center">
                    <img src="/images/logo.svg" alt="Adecoagro"></img>
                </div>
                <h3>Ingresá el correo electrónico con el que se registró</h3>

                <Alert show={show} variant={variant} onClose={() => setShow(false)} dismissible>{error}</Alert>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input type="text" className="form-control" placeholder="Ingresá tu correo electrónico" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Solicitá tu código</button>
                    </div>
                    <div className="form-group text-center">
                    ¿Tenés un código? <a href="/cambiar-clave">Si</a>
                    </div>
                    <div className="form-group text-center">
                    ¿Tenés cuenta? <a href="/">Ingresá aquí </a>
                    </div>
                </form>
            </div>
            <p className="text-center">Adecoagro © 2021</p>
        </div>
    )
}

