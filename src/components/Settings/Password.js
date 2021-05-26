import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';




async function sendData(data) {

    const {token} = JSON.parse(sessionStorage.getItem('token'))

    return fetch(process.env.REACT_APP_URL_API+'/jwt/auth/updateProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + {token},
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
}



export default function Password() {

    const [password, setPassword] = useState();
    const [confpassword, setConfPassword] = useState();
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const [variant, setVariant] = useState('danger');


    const setData = async e => {
        e.preventDefault();
        if (!password) {
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
            const data = await sendData({
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


    return(
            <div className="panel">
                    <div className="panel-heading">Actualizá tu contraseña información aquí:</div>
                    <div className="panel-body">
                        <form >
  
                            <Alert show={show} variant={variant} onClose={() => setShow(false)} dismissible>{error}</Alert>
  
                            <div className="form-group">
                                <label>Contraseña *</label>
                                <input type="password" className="form-control" placeholder="Ingresá tu contraseña" onChange={e => setPassword(e.target.value)} />
                            </div>
  
                            <div className="form-group">
                                <label>Confirmar Contraseña *</label>
                                <input type="password" className="form-control" placeholder="Ingresá tu contraseña" onChange={e => setConfPassword(e.target.value)} />
                            </div>
  
                            <div className="form-group">
                                <p>Campos obligatorios (*)</p>
                            </div>
                            <div className="form-group">
                                <button type="button" onClick={setData} className="btn btn-success" >Actualizar datos</button>
                            </div>
                        </form>
                    </div>
            </div>
    );



}