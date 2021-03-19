import React from 'react';
import Cookies from 'universal-cookie';
import '../css/Menu.css'

function Menu(props) {

    const cookies = new Cookies();

    const cerrarSesion=()=>{
        cookies.remove('id_usuario',{path:'/'});
        cookies.remove('nombre',{path:'/'});
        cookies.remove('ap_paterno',{path:'/'});
        cookies.remove('ap_materno',{path:'/'});
        cookies.remove('email',{path:'/'});
        cookies.remove('pass',{path:'/'});
        props.history.push('./');

    }

    return(



        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Recibos</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">

    <li class="nav-item active">
        <a class="nav-link"  href="/recibos">Captura </a>
      </li>

      <li class="nav-item active">
        <a class="nav-link"  onClick={() => cerrarSesion()}>Salir </a>
      </li>      
    </ul>
  </div>
  <div class ="nombreS"  >Bienvenido: {cookies.get('nombre') + ' ' + cookies.get('ap_paterno') } </div>
</nav>

    );
}

export default Menu;