import React, {  useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import validator from 'validator';
import Password from './Password';
import PropTypes from 'prop-types';



async function sendData(data) {


    return fetch(process.env.REACT_APP_URL_API+'/users/' + localStorage.getItem('id'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(data => data.json())

}



export default function Settings({ setProfile }) {


    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [name, setName] = useState(localStorage.getItem('name'));
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const [variant, setVariant] = useState('danger');


    const setData = async e => {
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
        } else {
            const data = await sendData({
                email,
                name
            });



            if (data.error) {
                setError(data.error);
                setVariant('danger');
                setShow(true);
                return false;
            } else {

                setProfile(name);
                localStorage.setItem('name', name);
                localStorage.setItem('email', email);
                setVariant('success');
                setError(data.response);
                setShow(true);
            }
        }
    }
    return (
        <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
                <h3>Configuración</h3>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="panel">
                    <div className="panel-heading">Actualizá tu información aquí:</div>
                    <div className="panel-body">
                        <form >

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
                                <p>Campos obligatorios (*)</p>
                            </div>
                            <div className="form-group">
                                <button type="button" onClick={setData} className="btn btn-success" >Actualizar datos</button>
                            </div>
                        </form>
                    </div>
                </div>

                <Password></Password>

            </div>
        </div>
    );
}
Settings.propTypes = {
    setProfile: PropTypes.func.isRequired
}