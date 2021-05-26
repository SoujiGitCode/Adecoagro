import React from 'react';
import Training from './Training';



export default function Dashboard() {
   return (
      <div className="row">
         <div className="col-md-10 col-sm-10 col-xs-12">
            <h3>Escritorio</h3>
            <p>Herramienta de auditoría de imágenes impulsada por IA {process.env.REACT_APP_TRAIN ? '(Fase de entrenamiento)' : null} </p>
         </div>
         <Training></Training>

      </div>
   );
}