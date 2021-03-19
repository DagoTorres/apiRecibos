import React, { useState,useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';
import {DatePickerComponent} from '@syncfusion/ej2-react-calendars';


function App(props) {
const url="https://localhost:44303/api/recibos";
const [data,setData]=useState([]);
const [modalIns,setModalIns]=useState(false);
const [modalUpd,setModalUpd]=useState(false);
const [modalDel,setModalDel]=useState(false);
const [selRecibo,setSelRecibo]=useState({
  id_recibo:'',
  proveedor:'',
  monto: '',
  fecha:'',
  comentario: ''
})


const dateValue: Date= new Date();


const handleChange=e=>{
  const{name, value}=e.target;
  setSelRecibo({
    ...selRecibo,
    [name]: value
  });
  console.log(selRecibo);
}

const OCModal=()=>{
  setModalIns(!modalIns);
}

const OCModalUpd=()=>{
  setModalUpd(!modalUpd);
}

const OCModalDel=()=>{
  setModalDel(!modalDel);
}




const petGet=async()=>{
  await axios.get(url).then(response=>{
    setData(response.data);
  }).catch(error=>{
    console.log(error);
  })
}

const petPost=async()=>{
  delete selRecibo.id_recibo;
  selRecibo.monto=parseInt(selRecibo.monto);
  await axios.post(url,selRecibo).then(response=>{
    setData(data.concat(response.data));
    OCModal();
  }).catch(error=>{
    console.log(error);
  })
}

const petPut=async()=>{
  selRecibo.monto=parseInt(selRecibo.monto);
  await axios.put(url+ "/" +selRecibo.id_recibo,selRecibo)
  .then(response=>{
    var respuesta = response.data;
    var dataAuxiliar=data;
    dataAuxiliar.map(recibo=>{
      if(recibo.id_recibo===selRecibo.id_recibo){
        recibo.proveedor=respuesta.proveedor;
        recibo.monto=respuesta.monto;
        recibo.fecha=respuesta.fecha;
        recibo.comentario=respuesta.comentario;
      }
    });
    OCModalUpd();
  }).catch(error=>{
    console.log(error);
  })
}


const petDel=async()=>{
  await axios.delete(url+ "/" +selRecibo.id_recibo)
  .then(response=>{
    setData(data.filter(recibo=>recibo.id_recibo!==response.data));
    OCModalDel();
  }).catch(error=>{
    console.log(error);
  })
}



const seleccionaRecibo = (recibo,caso)=>{
  setSelRecibo(recibo);
  (caso === "Editar") ?
  OCModalUpd():OCModalDel();
}



useEffect(()=>{
  petGet();
},[])

  return (
    <div className="App">
      <br></br>
      <td>
      <button onClick={()=>OCModal()} className="btn btn-success">Insertar Recibos</button>
      <button className="btn btn-primary" onClick={() => { props.history.push('/menu') }} >Regresar</button>
      </td>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th># Recibo</th>
            <th>Proveedor</th>
            <th>Monto</th>
            <th>Moneda</th>
            <th>Fecha</th>
            <th>Comentario</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(recibo=>(
            <tr key= {recibo.id_recibo}>
              <td>{recibo.id_recibo}</td>
              <td>{recibo.proveedor}</td>
              <td>{recibo.monto}</td>
              <td>{recibo.moneda}</td>
              <td>{recibo.fecha}</td>
              <td>{recibo.comentario}</td>
              <td>
                <button className= "btn btn-primary " onClick={()=>seleccionaRecibo(recibo,"Editar")}>Editar</button>{"  "}
                <button className= "btn btn-danger"onClick={()=>seleccionaRecibo(recibo,"Eliminar")}>Eliminar</button>{"  "}
              </td>
          </tr>
          ))}
        </tbody>
        </table>

            <Modal isOpen={modalIns}>
              <ModalHeader>Insertar Recibos</ModalHeader>
              <ModalBody>
                <div className="form-group">
                <label>Proveedor:</label>
                <br/>
                <input type ="text" className="form-control" name="proveedor" onChange={handleChange}/>
                <br/>
                <label>Monto:</label>
                <br/>
                <input type ="text" className="form-control" name="monto" onChange={handleChange}/>
                <br/>
                <label>Moneda:</label>
                <br/>
                <input type ="text" className="form-control" name="moneda" onChange={handleChange}/>
                <br/>
                <label>Fecha:</label>
                <br/>
                <DatePickerComponent format ="dd-MMM-yyyy" step={60} name="fecha" onChange={handleChange} ></DatePickerComponent>
                <br/>
                <label>Comentario:</label>
                <input type ="text" className="form-control" name="comentario" onChange={handleChange}/>
                <br/>
                </div>
              </ModalBody>
              <ModalFooter>
              <button className= "btn btn-primary" onClick={()=>petPost()} >Insertar</button>{"  "}
                <button className= "btn btn-danger" onClick={()=> OCModal()}>Cancelar</button>
              </ModalFooter>
            </Modal>


            <Modal isOpen={modalUpd}>
              <ModalHeader>Editar Recibos</ModalHeader>
              <ModalBody>
                <div className="form-group">
                <label>Id_Recibo:</label>
                <br/>
                <input type ="text" className="form-control" value={selRecibo && selRecibo.id_recibo} readOnly/>
                <br/>
                <label>Proveedor:</label>
                <br/>
                <input type ="text" className="form-control" name="proveedor" onChange={handleChange} value={selRecibo && selRecibo.proveedor} />
                <br/>
                <label>Monto:</label>
                <br/>
                <input type ="text" className="form-control" name="monto" onChange={handleChange} value={selRecibo && selRecibo.monto}/>
                <br/>
                <label>Moneda:</label>
                <br/>
                <input type ="text" className="form-control" name="moneda" onChange={handleChange} value={selRecibo && selRecibo.moneda}/>
                <br/>
                <label>Fecha:</label>
                <br/>
                <DatePickerComponent format ="dd-MMM-yyyy" step={60} name="fecha" onChange={handleChange} value={selRecibo && selRecibo.fecha}></DatePickerComponent>
                <br/>
                <label>Comentario:</label>
                <input type ="text" className="form-control" name="comentario" onChange={handleChange} value={selRecibo && selRecibo.comentario}/>
                <br/>
                </div>
              </ModalBody>
              <ModalFooter>
              <button className= "btn btn-primary" onClick={()=>petPut()} >Editar</button>{"  "}
                <button className= "btn btn-danger" onClick={()=> OCModalUpd()}>Cancelar</button>
              </ModalFooter>
            </Modal>



            <Modal isOpen={modalDel}>
             
              <ModalBody>
                    Estas seguro de eliminar el recibo del proveedor {selRecibo && selRecibo.proveedor}?
              </ModalBody>
              <ModalFooter>
              <button className= "btn btn-danger" onClick={()=> petDel()}  >Si</button>
                <button className= "btn btn-secundary" onClick={()=> OCModalDel()}>No</button>
              </ModalFooter>
            </Modal>

    </div>
  );
}

export default App;
