import React, { useState } from 'react';
import validator from 'validator';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';



async function createUser(data) {
  return fetch(process.env.REACT_APP_URL_API+'/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  }).then(data => data.json())
}
async function updateUser(data) {
  return fetch(process.env.REACT_APP_URL_API+'/users/' + data.id, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  }).then(data => data.json())
}

export default function FormUsers({ name, setName, id, setId, email, setEmail, password, setPassword, title, setTitle, button, setButton, results, setResults, preloader, setPreloader }) {

    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const [variant, setVariant] = useState('danger');
    


    const sendData = async e => {
        e.preventDefault();
        if (!name) {
            setError('Ingresá tu nombre y apellido');
            setVariant('danger');
            setShow(true);
            return false;
        } else if (!email) {
            setError('Ingresá tu correo electrónico');
            setVariant('danger');
            setShow(true);
            return false;
        } else if (!validator.isEmail(email)) {
            setError('Ingresá un correo electrónico válido');
            setVariant('danger');
            setShow(true);
            return false;
        } else if (!id && !password) {
            setError('Ingresá tu contraseña');
            setVariant('danger');
            setShow(true);
            return false;
        } else if (!id && password.length < 6) {
            setError('Las contraseñas deben tener por lo menos seis caracteres');
            setVariant('danger');
            setShow(true);
            return false;
        } else {
            setPreloader(false);
            if (!id) {
                const data = await createUser({
                    email,
                    name,
                    password
                });
                if (data.error) {
                    setError(data.error);
                    setVariant('danger');
                    setShow(true);
                    setPreloader(true);
                    return false;
                } else {
                    setName('');
                    setEmail('');
                    setPassword('');
                    setVariant('success');
                    setError(data.response);
                    setShow(true);
                    setPreloader(true);
                    setResults(data.users)
                }
            } else {
                const data = await updateUser({
                    email,
                    name,
                    password,
                    id
                });
                if (data.error) {
                    setError(data.error);
                    setVariant('danger');
                    setShow(true);
                    setPreloader(true);
                    return false;
                } else {
                    setName('');
                    setEmail('');
                    setPassword('');
                    setId('');
                    setVariant('success');
                    setError(data.response);
                    setShow(true);
                    setPreloader(true);
                    setResults(data.users)
                }
            }
        }
        setTitle('Ingresá la información de tu usuario aquí:')
        setButton('Guardar Registro')
    }




    return (
        <div className="panel">
            <div className="panel-heading">{title}</div>
            <div className="panel-body">
                <form >
                    <input type="hidden" value={id} onChange={e => setId(e.target.value)} />
                    <Alert show={show} variant={variant} onClose={() => setShow(false)} dismissible>{error}</Alert>
                    <div className="form-group">
                        <label>Nombre y Apellido *</label>
                        <input type="text" value={name} className="form-control" placeholder="Ingresá tu nombre" onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Correo electrónico *</label>
                        <input type="text" value={email} className="form-control" placeholder="Ingresá tu correo electrónico" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Contraseña *</label>
                        <input type="password" value={password} className="form-control" placeholder="Ingresá tu contraseña" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <p>Campos obligatorios (*)</p>
                    </div>
                    <div className="form-group">
                        <button type="button" onClick={sendData} className="btn btn-success" >{button}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

FormUsers.propTypes = {
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    setId: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
    button: PropTypes.string.isRequired,
    setButton: PropTypes.func.isRequired,
    results: PropTypes.array.isRequired,
    setResults: PropTypes.func.isRequired,
    preloader: PropTypes.bool.isRequired,
    setPreloader: PropTypes.func.isRequired,
}