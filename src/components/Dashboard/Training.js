import React, { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Alert from 'react-bootstrap/Alert';


async function setData(data) {
   return fetch(process.env.REACT_APP_URL_API + '/api/sampling/store', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(data)
       })
       .then(data => data.json())
}
export default function Training() {

   const [error, setError] = useState('');
   const [tags, setTags] = useState([]);
   const [total, setTotal] = useState(localStorage.getItem('total'));
   const [preloader, setPreloader] = useState(false);
   const [label, setLabel] = useState('');
   const [id, setId] = useState('');
   const [styles, setStyles] = useState({
       top: 0,
       left: 0
   });
   const [route, setRoute] = useState('/test/');
   const [sampling, setSampling] = useState('no-image.png');
   const [show, setShow] = useState(false);
   const [carga, setCarga] = useState(false);
   const [showPanel, setShowPanel] = useState(false);
   const [original, setOriginal] = useState('no-image.png');
   useEffect(() => {
       const getData = async () => {
           fetch(process.env.REACT_APP_URL_API + '/api/sampling/' + localStorage.getItem('id'), {
                   headers: {
                       'Access-Control-Allow-Origin': '*'
                   },
               })
               .then(data => data.json()).then(data => {
                   setPreloader(true);
                   setCarga(true);
                   if (data.length > 0) {
                       const images = data[0].total;
                       localStorage.setItem('total', images);
                       setTotal(images);
                       if (parseInt(images) < 200) {
                           setRoute(data[0].route);
                           setOriginal(data[0].original);
                           setSampling(data[0].sampling);
                           setId(data[0].id);
                           setShowPanel(true);
                           setStyles({
                               top: parseInt(data[0].fila)  * 20,
                               left: parseInt(data[0].columna)  * 20
                           });
                           setTimeout(
                               () => {
                                   setCarga(false);
                                   document.getElementById('contentImg').scrollLeft = (parseInt(data[0].columna)  * 20) - 40;
                                   document.getElementById('contentImg').scrollTop = (parseInt(data[0].fila)  * 20) - 50;
                               },
                               100
                           );
                       } else {
                           setCarga(false);
                           setShowPanel(false);
                       }
                   } else {
                       setCarga(false);
                       setShowPanel(false);
                   }
               });
       }
       getData().catch(null);
   }, []);

useEffect(() => {
   const getData = async () => {
       fetch(process.env.REACT_APP_URL_API+'/api/tags', {
               headers: {
                   'Access-Control-Allow-Origin': '*'
               },
           })
           .then(data => data.json()).then(data => {
               setTags(data);
           })
   }
   getData().catch(null);
}, []);




useEffect(() => {
   const getOriginal = async () => {
       fetch(process.env.REACT_APP_URL_API + '/api/original/' + localStorage.getItem('id'), {
               headers: {
                   'Access-Control-Allow-Origin': '*'
               },
           })
           .then(data => data.json()).then(data => {
               const imgs = [];
               for (var i in data) {
                   imgs.push(process.env.REACT_APP_URL_IMG_API + '/api/images/test/' + data[i].original)
               }
               cacheImages(imgs);
           });
   }
   getOriginal().catch(null);
}, []);
const cacheImages = async (srcArray) => {
   const promises = await srcArray.map((src) => {

       return new Promise(function(resolve, reject) {
           const img = new Image();
           img.src = src;
           img.onload = resolve();
           img.onerror = reject();
       });
   });
   await Promise.all(promises);
}
const sendData = async e => {
   e.preventDefault();
   setShow(false);
   if (!label) {
       setError('Seleccioná una etiqueta para la imagen');
       setShow(true);
       return false;
   } else {
       setCarga(true);
       const data = await setData({
           label,
           id
       });
       setLabel('');
       if (data.data.length > 0) {
           setCarga(false)
           setRoute(data.data[0].route);
           setOriginal(data.data[0].original);
           setId(data.data[0].id);
           setSampling(data.data[0].sampling);
           setStyles({
               top: parseInt(data.data[0].fila)  * 20,
               left: parseInt(data.data[0].columna)  * 20
           });

           setTotal(data.total);
           localStorage.setItem('total', data.total);


           if (parseInt(total) < 200) {
               
               setTimeout(
                   () => {
                       document.getElementById('contentImg').scrollLeft = (parseInt(data.data[0].columna)  * 20) - 40;
                       document.getElementById('contentImg').scrollTop = (parseInt(data.data[0].fila)  * 20) - 50;
                   },
                   100
               );
               document.getElementById("reset").click();
               setShowPanel(true);
           } else {
               resetPanel()
           }
       } else {
           resetPanel()
       }
   }
}
const resetPanel = async e => {
   setCarga(false);
   setRoute('');
   setStyles({
       top: 0,
       left: 0
   });
   setOriginal('');
   setSampling('');
   setShowPanel(false);
}

function reloadPage(){

   window.location="/";
}


  return(
   <div className="full-width">
   <div hidden={preloader ? true : false} className="maskloader">
      <div className="spinner">
         <div className="double-bounce1"></div>
         <div className="double-bounce2"></div>
      </div>
   </div>
   <div className="p-100" hidden={preloader  ?  false: true}>
      <div className="col-md-11 col-sm-11 col-xs-12" hidden={showPanel  ?  true : false}>
         <div className="alert alert-success" role="alert">
            ¡El entrenamiento ha finalizado con éxito!
         </div>
      </div>
      <div className="col-md-11 col-sm-11 col-xs-12" hidden={showPanel  ?  false : true}>
         <div className="alert alert-warning" role="alert">
            Durante la fase de entrenamiento el programa busca imágenes de muestra y las utiliza para ajustar los pesos de la red; finalizado el proceso, guarda los pesos generados y será la guía que el programa utilizará durante su ejecución.
         </div>
         <div className="row">
            <div className="preloader col-md-12" hidden={carga  ?  false : true}>
               <div className="spinner">
                  <div className="double-bounce1"></div>
                  <div className="double-bounce2"></div>
               </div>
               <p><br></br>Cargando datos y buscando nuevas imágenes...</p>
            </div>
            <div className="col-md-8 col-sm-8 col-xs-12">
               <h5>Imagen del terreno ({original.substr(0,3)})</h5>
               <div className="alert alert-primary" role="alert">
                  El marcador rojo en la imagen del terreno indica la zona seleccionada por la herramienta para generar la cuadrícula
               </div>
               <p>Hacé doble click en el marcador rojo para agrandar la cuadrícula seleccionada</p>
               <TransformWrapper
                  animationTime={0}
                  defaultScale={1}
                  transformEnabled={false}
                  centerContent={true}
                  >
                  {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <React.Fragment>
                     <div className="contentImg" id="contentImg" title="Arrastrá el cursor para mover la imagen">
                        <TransformComponent>
                           <div className="point" id="point" style={styles} title="Hacé doble click en la imágen para agrandar la cuadrícula seleccionada">
                              <i className="icon-market"></i>
                           </div>
                           <img title="Hace doble click en la imágen para agrandar la cuadrícula seleccionada" src={process.env.REACT_APP_URL_IMG_API+'/api/images/test/' + original} className="wid-100" alt="Adecoagro" id="imgOriginal"></img>
                        </TransformComponent>
                     </div>
                     <div className="tools">
                        <button onClick={zoomIn} className="op0">+</button>
                        <button onClick={zoomOut} className="op0">-</button>
                        <button className="btn btn-danger btn-sm" onClick={reloadPage} id="reset">¿No podés ver el marcador? recargá la página aquí</button>
                        <button className="btn btn-info btn-sm" onClick={resetTransform} id="reset">Mostrar imágen en tamaño original</button>
                     </div>
                  </React.Fragment>
                  )}
               </TransformWrapper>
               <br/><br/>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
               <h6 className="text-center">Cant. imágenes etiquetadas: {total} / 200</h6>
               <div className="panel">
                  <div className="panel-heading">Cuadrícula</div>
                  <div className="panel-body">
                     <div className="form-group text-center">
                        <img src={process.env.REACT_APP_URL_IMG_API+'/api/images'+route+sampling} className="wid-150" alt="Adecoagro"></img>
                     </div>
                     <div className="form-group">
                        <p>Seleccioná la etiqueta que creas correspondiente para la imágen mostrada en pantalla:</p> 
                        <select className="form-control" value={label} onChange={e =>
                           setLabel(e.target.value)}>
                           <option value="">Seleccioná</option>
                           {tags.map((tag, key) => {
                           return (
                           <option value={String(tag.id)} key={key}>{tag.name}</option>
                           )
                           })}
                        </select>
                        <br/>   
                        <div className="alert alert-danger" role="alert">
                           <strong>Nota:</strong> Asigná la imagen como no clasificable solo cuando sea imposible asignarle una de las primeras tres  etiquetas
                        </div>
                     </div>
                     <div className="form-group">
                        <button type="button" className="btn btn-success btn-block l-h3" onClick={sendData} >Enviar</button>
                     </div>
                     <div className="form-group">
                        <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>{error}</Alert>
                     </div>
                  </div>
               </div>
              
            </div>
         </div>
      </div>
   </div>
</div>
  );
}