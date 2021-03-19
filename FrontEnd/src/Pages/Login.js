import React , {useState} from 'react';
import md5 from 'md5';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css'

function Login (props){


    const loginUrl="https://localhost:44303/api/usuarios";
    const cookies = new Cookies();

const [form, setForm] =useState({
    email:'',
    pass:''
});
    const handleChange=e=>{
        const {name,value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
        console.log(form);
    }

    const inSesion=async()=>{
        await axios.get(loginUrl + `/${form.email}/${md5(form.pass)}`)
        .then(response=>{
            return response.data;
        }).then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set('id_usuario',respuesta.id_usuario,{path:'/'});
                cookies.set('nombre',respuesta.nombre,{path:'/'});
                cookies.set('ap_paterno',respuesta.ap_paterno,{path:'/'});
                cookies.set('ap_materno',respuesta.ap_materno,{path:'/'});
                cookies.set('email',respuesta.email,{path:'/'});
                cookies.set('pass',respuesta.pass,{path:'/'});
                alert("Bienvenido:" + respuesta.nombre+ " " + respuesta.ap_paterno);
                props.history.push('/Menu');
            }else {
                alert('El usuario o contraseña no son validos');
            }
        })

        .catch(error=>{
            console.log(error);
        })
    }



    return(
        <div className="containerPrincipal">
            <div className="containerLogin">
            <div className="form-group">
            <h3>Login</h3>
            <label>Usuario:</label>
            <br/>
            <input type = "text" className="form-control" name="email" onChange={handleChange}/>
            <br/>
            <label>Password:</label>
            <br/>
            <input type = "password" class="form-control" name="pass" onChange={handleChange}/>
            <br/>
            <button className="btn btn-primary" onClick={() =>inSesion()}>Iniciar Sesion</button>
            </div>
            </div>

        </div>
    );
}

export default Login;