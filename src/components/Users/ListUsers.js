import React, {  useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


async function removeUser(user) {
  return fetch(process.env.REACT_APP_URL_API+'/users/' + user, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      }
  }).then(data => data.json())
}



export default function ListUsers({ name, setName, id, setId, email, setEmail, password, setPassword, title, setTitle, button, setButton, results, setResults, preloader, setPreloader }) {


    const [alert, setAlert] = useState(false);
    const [idRm, setIdRm] = useState('');
    
    function hideAlert() {
        setAlert(false);
        setIdRm('');
    }

    const removeUsuario = async e => {
        const data = await removeUser(idRm);

        if(!data.error){

            setResults(data.users)
            setName('');
            setEmail('');
            setId('');
            setAlert(false)
            setIdRm('');
            setTitle('Ingresá la información de tu usuario aquí:');
            setButton('Guardar Registro');
            toast.error("El registro ha sido eliminado con éxito");

        }
        
    }


    const editClick = async user => {
        setTitle('Actualizá la información de tu aquí:')
        setButton('Actualizá Registro')
        setName(user.name);
        setEmail(user.email);
        setPassword('');
        setId(String(user.id));
    };

    const showAlert = async user => {
        setIdRm(String(user.id));
        setAlert(true);
    };


    function search(e){
        
        if(e===''){
            fetch(process.env.REACT_APP_URL_API+'/users/lists', {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
            })
            .then(data => data.json()).then(data => {
                setResults(data);
            })
        }else{
            fetch(process.env.REACT_APP_URL_API+'/users/search/'+e, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
            })
            .then(data => data.json()).then(data => {
                setResults(data);
            })
        }
    }


    return (

        
        <div className="panel">
            <div className="panel-heading">Listado de Usuarios</div>
            <div className="panel-body">
                <div className="row">
                    <div className="col-md-6 col-sm-4 col-xs-12"></div>
                    <div className="col-md-6 col-sm-8 col-xs-12">
                        <div className="search-admin ng-pristine ng-valid">
                        <input type="text" placeholder="Buscar...."  onChange={e => search(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((user, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button type="button" title="Editar Usuario" className="btn btn-info btn-sm" onClick={e => editClick(user)} >Editar</button>
                                            <button type="button" title="Eliminar Usuario" className="btn btn-danger btn-sm" onClick={e => showAlert(user)}>Eliminar</button>
                                        </td>
                                    </tr>
                                )
                            })}
                            { results.length<=0?
                            <tr>
                                <td>No hay resultados disponibles</td>
                            </tr>
                            : null}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
            <SweetAlert show={alert} title={"¿Desea eliminar el registro?"} type={"warning"}  onConfirm={removeUsuario}  onCancel={hideAlert} showCancel={true} closeOnClickOutside={true} cancelBtnText={"No"} confirmBtnText={"Si"} confirmBtnCssClass="boton-alert" cancelBtnCssClass="boton-alert"></SweetAlert>
        </div>
    );
}

ListUsers.propTypes = {
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


