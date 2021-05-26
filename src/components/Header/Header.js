import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';



export default function Header({ profile }) {

    const [alert, setAlert] = useState(false);
    const [headerMovil, setHeaderMovil]=useState(false);

    function logout() {

        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('total');
        localStorage.removeItem('id');
        window.location = '/';

    }

    function hideAlert() {
        setAlert(false);
    }

    return(

     
        <div>
             <SweetAlert show={alert} title={"¿Desea cerrar la sesión?"} type={"warning"}  onConfirm={logout}  onCancel={hideAlert} showCancel={true} closeOnClickOutside={true} cancelBtnText={"No"} confirmBtnText={"Si"} confirmBtnCssClass="boton-alert" cancelBtnCssClass="boton-alert"></SweetAlert>
            <div className="header">
                <div className="header-content">
                    <ul className="navbar-nav header-right">
                        <li className="hidden-xs"><img className="logo-abbr" src="images/profile-user.png" alt={profile}></img> {profile}</li>
                        <li  onClick={e => setAlert (true)} title="Cerrar Sesión" >
                            <img className="logo-abbr hidden-xs" src="images/logout.png" alt="Cerrar Sesión"></img>
                            <img className="logo-abbr show-xs" src="images/profile-user.png" alt={profile}></img>
                             Cerrar Sesión
                            </li>
                        <li className="show-xs"  onClick={e => setHeaderMovil (!headerMovil)} title="Menu" ><img className="logo-abbr" src="images/logout.png" alt="Cerrar Sesión"></img> Menú</li>
                    </ul>
                </div>
            </div>
            <div className="deznav hidden-xs">
                <div className="deznav-scroll ps ps--active-y">
                    <a href="/escritorio" className="brand-logo">
                        <img className="logo-abbr" src="images/logo_min.png" alt="Adecoagro"></img>
                    </a>
                    <ul className="menu-tabs">
                        <li><a title="Escritorio" href="/escritorio"><i className="nav-icon home"></i> Escritorio</a></li>
                        {localStorage.getItem('id')==='2'?
                        <li><a title="Monitoreos" href="/demo"><i className="nav-icon images"></i> Monitoreos</a></li>
                        : null}
                        <li><a title="Usuarios" href="/usuarios"><i className="nav-icon user"></i> Usuarios</a></li>
                        <li><a title="Configuración" href="/configuracion"><i className="nav-icon settings"></i> Cuenta</a></li>
                    </ul>
                </div>
            </div>


            <div className="deznav-movil hidden-md" hidden={headerMovil  ?  false : true}>
                <div className="deznav-scroll ps ps--active-y">
                    <a href="/escritorio" className="brand-logo">
                        <img className="logo-abbr" src="images/logo_min.png" alt="Adecoagro"></img>
                    </a>
                    <ul className="menu-tabs">
                        <li><a title="Escritorio" href="/escritorio"><i className="nav-icon home"></i> Escritorio</a></li>
                        
                        
                        {localStorage.getItem('id')==='2'?
                        <li><a title="Monitoreos" href="/demo"><i className="nav-icon images"></i> Monitoreos</a></li>
                        : null}
                        <li><a title="Usuarios" href="/usuarios"><i className="nav-icon user"></i> Usuarios</a></li>
                        <li><a title="Configuración" href="/configuracion"><i className="nav-icon settings"></i> Cuenta</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
