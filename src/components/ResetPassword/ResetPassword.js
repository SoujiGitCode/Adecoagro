import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';


async function senData(data) {
    return fetch(process.env.REACT_APP_URL_API+'/api/auth/recovery', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
}

export default function ResetPassword({ setToken }) {

    const [code, setCode] = useState();
    const [password, setPassword] = useState();
    const [confpassword, setConfPassword] = useState();
    const [variant, setVariant] = useState('danger');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const handleSubmit = async e => {
        e.preventDefault();
        if (!code) {
            setError('Ingresá tu código');
            setVariant('danger');
            setShow(true);
            return false;
        } else if (!password) {
            setError('Ingresá tu contraseña');
            setVariant('danger');
            setShow(true);
            return false;
        } else if (!confpassword) {
            setError('Confirmá tu contraseña');
            setVariant('danger');
            setShow(true);
            return false;
        } else if (password.length < 6) {
            setError('Las contraseñas deben tener por lo menos seis caracteres');
            setVariant('danger');
            setShow(true);
            return false;
        } else if (confpassword !== password) {
            setError('Las contraseñas no coinciden');
            setVariant('danger');
            setShow(true);
            return false;
        } else {
            const data = await senData({
                code,
                password
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
                <h3>Ingresá el código de reinicio que recibió en el correo electrónico</h3>

                <Alert show={show} variant={variant} onClose={() => setShow(false)} dismissible>{error}</Alert>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Código</label>
                        <input type="text" className="form-control" placeholder="Ingresá tu código" onChange={e => setCode(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" className="form-control" placeholder="Ingresá tu contraseña" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <input type="password" className="form-control" placeholder="Ingresá tu contraseña" onChange={e => setConfPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Solicitá tu código</button>
                    </div>
                    <div className="form-group text-center">
                    ¿No tienes el código? <a href="/enviar-codigo">Solicitá tu código</a>
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

