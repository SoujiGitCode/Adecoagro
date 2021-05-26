import React from 'react';
import ImageModel from './ImageModel';



export default function Demo() {
   return (
      <div className="row">
         <div className="col-md-10 col-sm-10 col-xs-12">
            <h3>Escritorio</h3>
            <p>Herramienta de auditoría de imágenes impulsada por IA  </p>
         </div>
         <ImageModel /> 
      </div>
   );
}