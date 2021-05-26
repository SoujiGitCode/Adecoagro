import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function ImageModel() {

    const [show, setShow] = useState(false);
    const [button, setButton] = useState(true);
    const [error, setError] = useState('');
    const [sampling, setSampling] = useState('no-image.png');
    const [selectedFile, setSelectedFile] = useState(null);
    const [preloader, setPreloader] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [label, setLabel] = useState('SELECCIONAR IMAGEN');


    const submitForm = () => {
        if (!selectedFile) {
            setError('Ingresá una imagen');
            setShow(true);
            return false;
        } else {
            setPreloader(true)

            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("id", localStorage.getItem('id'));
            fetch(process.env.REACT_APP_URL_API + '/audit/store', {
                method: 'POST',
                body: formData
            }).then(data => data.json()).then(data => {
                if (data.error) {

                    setError(data.error);
                    setShow(true);
                    setShowImage(false);
                    setPreloader(false);

                } else {

                    setSampling(data.image);
                    setShowImage(true);
                    setPreloader(false);
                }

                return true;


            }).catch(function () {

                setError('Ha ocurrido un error con la imagen, por favor intentá más tarde');
                setShow(true);
                setShowImage(false);
                setPreloader(false);
                return false;

            })
        }
    };

    const onImageChange = event => {
        setButton(true);
        setLabel('SELECCIONAR IMAGEN');
        if (event.target.files && event.target.files[0]) {
            let fileExtension = ["png"];
            let file = document.getElementById("file").files[0].name;
            let extesion = file.split('.').pop().toLowerCase();
            if (fileExtension.indexOf(extesion) === -1) {
                setError('El formato de la imágen no esta permitida (PNG es el formato permitido)');
                setShow(true);
                return false;
            }
            let numb = document.getElementById("file").files[0].size / 1024 / 1024;
            numb = numb.toFixed(2);
            if (numb > 2) {
                setError('La imagen es muy grande, el tamaño máximo permitido para la imagen es de 2 MB');
                setShow(true);
                return false;
            }
            setLabel(file);
            setButton(false);
            setSelectedFile(event.target.files[0]);
            document.getElementById("clear").style.display = "block";
        } else {
            document.getElementById("clear").style.display = "none";
        }
    };
    function clearAuditoria() {
        window.location = "/demo";
    }
    return (
        <div className="full-width">
            <div className="preloader col-md-11" hidden={preloader ? false : true}>
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
                <p><br></br>Analizando la imágen del terreno y generando etiquetas...</p>
            </div>
            <div className="col-md-11 col-sm-11 col-xs-12" >
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="/">Nuevo Monitoreo</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/monitoreos">Ver Monitoreos</a>
                    </li>
                </ul>
            </div>
            <div className="col-md-11 col-sm-11 col-xs-12" hidden={showImage ? true : false} >
                <br />
                <div className="alert alert-info" role="alert">
                    Ingresá una imagen y comenzá con tu proceso de monitoreo, los resultados del analisis pueden tardar algunos minutos.
      </div>
                <div className="panel">
                    <div className="panel-heading">(Tipo de Formatos permitidos: PNG)</div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-9 col-sm-9 col-xs-12">
                                <input type="file" className="inputfile inputfile-1" name="file" id="file" accept="image/png" onChange={onImageChange} />
                                <label htmlFor="file" title="Subir una imagen desde el equipo"><i className="fa-picture"></i>  {label} <i className="fa-clear" id="clear" title="Limpiar Selección"></i></label>
                                <p className="f11">El tamaño máximo permitido para la imagen es de 2 MB</p>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-12">
                                <button type="button" onClick={submitForm} disabled={button} className="btn-pp1" >Comenzar Monitoreo</button>
                            </div>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>{error}</Alert>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-11 col-sm-11 col-xs-12" hidden={showImage ? false : true}>
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-12" >
                        <br />
                        <h5>Imagen del terreno </h5>
                        <img src={process.env.REACT_APP_URL_API + '/api/images/outputs/' + sampling} className="wid-10" alt="Adecoagro" ></img>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12" >
                        <br />
                        <div className="panel">
                            <div className="panel-heading">Leyenda </div>
                            <div className="panel-body">
                            <div className="form-group">A continuación se presenta la descripición de los colores que pueden aparecer en la imagen del terreno:</div>
                                <br/>
                                <div className="form-group">
                                    <div className="label-txt label-yellow"></div>Seco / Falta Irrigación
                                </div>
                                <div className="form-group">
                                    <div className="label-txt label-green"></div>Óptimo
                                </div>
                                <div className="form-group">
                                    <div className="label-txt label-blue"></div>Exceso de Agua
                                </div>
                                <div className="form-group">
                                    <div className="label-txt label-red"></div>No clasificable
                                </div>
                                <div className="form-group">
                                    <div className="label-txt label-black"></div> Fondo de la imagen
                                </div>
                                <div className="form-group">
                                    <div className="label-txt label-white"></div> Fondo de la imagen
                                </div>
                            </div>
                        </div>
                        <br />
                        <a className="btn btn-success" href='# ' onClick={clearAuditoria}>Nuevo monitoreo</a>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}