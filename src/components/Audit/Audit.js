import React, { useEffect, useState } from 'react';
import Pagination from '../App/Pagination'
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';


async function rmImage(image) {
    return fetch(process.env.REACT_APP_URL_API+'/api/audit/' + image, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(data => data.json())
  }
  


export default function Audit() {


    const [preloader, setPreloader] = useState(false);
    const [smShow, setSmShow] = useState(false);
    const [sampling, setSampling] = useState('no-image.png');
    const [results, setResults] = useState([]);
    const [alert, setAlert] = useState(false);
    const [id, setId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);

    


    useEffect(() => {
        const getData = async () => {
            fetch(process.env.REACT_APP_URL_API+'/api/audit/lists/'+ localStorage.getItem('id'), {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                })
                .then(data => data.json()).then(data => {
                    setResults(data);
                    setPreloader(true);
                })
        }
        getData().catch(null);
    }, []);


    const showAlert = async audit => {
        setId(String(audit.id));
        setAlert(true);
    };

    function hideAlert() {
        setAlert(false);
        setId('');
    };

    const removeImage = async e => {
        const data = await rmImage(id);
        setResults(data.images)
        setAlert(false)
        setId('');
        toast.error("El registro ha sido eliminado con éxito");
    };


    function showResult(row){
      setSmShow(true);
      setSampling(row.image);
    }


    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);


    // Change page
    const paginate = pageNumber =>{
    setCurrentPage(pageNumber);
    } 


    return (
      <div className="row">
      <Modal show={smShow}  size="lg" onHide={() =>
         setSmShow(false)}>
         <Modal.Header closeButton>
            <Modal.Title>Resultado del monitoreo</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div className="row">
               <div className="col-md-6 col-sm-6 col-xs-12" >
                  <h5>Imagen del terreno </h5>
                  <img src={process.env.REACT_APP_URL_API + '/api/images/outputs/' + sampling} className="wid-10" alt="Adecoagro" ></img>
               </div>
               <div className="col-md-6 col-sm-6 col-xs-12" >
                  <p>Leyenda</p>
                  <p>A continuación se presenta la descripición de los colores que pueden aparecer en la imagen del terreno:</p>
                  <br/>
                  <div className="form-group">
                     <div className="label-txt label-yellow"></div>
                     Seco / Falta Irrigación
                  </div>
                  <div className="form-group">
                     <div className="label-txt label-green"></div>
                     Óptimo
                  </div>
                  <div className="form-group">
                     <div className="label-txt label-blue"></div>
                     Exceso de Agua
                  </div>
                  <div className="form-group">
                     <div className="label-txt label-red"></div>
                     No clasificable
                  </div>
                  <div className="form-group">
                     <div className="label-txt label-black"></div>
                     Fondo de la imagen
                  </div>
                  <div className="form-group">
                     <div className="label-txt label-white"></div>
                     Fondo de la imagen
                  </div>
               </div>
            </div>
         </Modal.Body>
      </Modal>
      <div className="col-md-12 col-sm-12 col-xs-12">
         <h3>Monitoreos</h3>
         <p>Administre todo lo referente a los monitoreos de sus terrenos</p>
      </div>
      <div className="col-md-11 col-sm-11 col-xs-12" >
         <ul className="nav nav-tabs">
            <li className="nav-item">
               <a className="nav-link" href="/demo">Nuevo Monitoreo</a>
            </li>
            <li className="nav-item">
               <a className="nav-link active" href="/monitoreos">Ver Monitoreos</a>
            </li>
         </ul>
         <br />
      </div>
      <div className="col-md-12 col-sm-12 col-xs-12" hidden={preloader ? true : false} >
         <div className="maskloader">
            <div className="spinner">
               <div className="double-bounce1"></div>
               <div className="double-bounce2"></div>
            </div>
         </div>
      </div>
      <div className="col-md-8 col-sm-8 col-xs-10" hidden={preloader ? false : true}>
         <div className="panel">
            <div className="panel-heading">Listado de imagenes auditadas:</div>
            <div className="panel-body">
               <div className="table-responsive">
                  <table className="table">
                     <thead>
                        <tr>
                           <th scope="col">Nombre</th>
                           <th scope="col">Fecha</th>
                           <th scope="col">Opciones</th>
                        </tr>
                     </thead>
                     <tbody>
                        {currentPosts.map((row, key) => {
                        return (
                        <tr key={key}>
                           <td>{row.image}</td>
                           <td>{moment(row.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                           <td>
                              <button type="button" title="Ver Resultados" className="btn btn-info btn-sm" onClick={e => showResult(row)} >Ver Resultados</button>
                              <button type="button" title="Eliminar monitoreo" className="btn btn-danger btn-sm" onClick={e => showAlert(row)}>Eliminar</button>
                           </td>
                        </tr>
                        )
                        })}
                        { currentPosts.length<=0?
                        <tr>
                           <td>No hay resultados disponibles</td>
                        </tr>
                        : null}
                     </tbody>
                  </table>
               </div>
            </div>
            <SweetAlert show={alert} title={"¿Desea eliminar el registro?"} type={"warning"}  onConfirm={removeImage}  onCancel={hideAlert} showCancel={true} closeOnClickOutside={true} cancelBtnText={"No"} confirmBtnText={"Si"} confirmBtnCssClass="boton-alert" cancelBtnCssClass="boton-alert"></SweetAlert>
         </div>
         <ToastContainer />
         <Pagination
            postsPerPage={postsPerPage}
            totalPosts={results.length}
            paginate={paginate}
            />
      </div>
   </div>
 );
}
