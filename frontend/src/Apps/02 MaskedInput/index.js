import React, {useState } from "react";
import "./styles.css";
import Navbar from '../../Home/Navbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import codes from 'country-calling-code';

function MaskedInputApp() {

  const dataObject = {
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    fechaNacimiento: '',
    fechaNacimientoFormated: '',
    email: '',
    direccion: '',
    codigosPaisTelefono: '', //(+502, +503, etc)
    codigosPaisCasa: '', //(+502, +503, etc)
    numeroTelefono: '',
    numeroTelefonoCasa: '', //Opcional
    numeroIdentificacionPersonal: '',
    numeroPasaporte: '',
    numeroTarjetaCredito: '',
    fechaVencimientoTarjeta: '',
    CVV: ''
  }

  const dataEmergenciaObject = {
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    fechaNacimiento: '',
    email: '',
    direccion: '',
    codigosPais: '', //(+502, +503, etc)
    numeroTelefono: '',
  }

  const [data, setData] = useState(dataObject)
  const [dataEmergencia, setDataEmergencia] = useState(dataEmergenciaObject)  
  const [emailerror, setemailerror] = useState('')
  const [emailerrorEmergencia, setemailerrorEmergencia] = useState('')
  const [numeroTarjetaCreditoerror, setnumeroTarjetaCreditoerror] = useState('')
  const [fechaVencimientoTarjetaerror, setfechaVencimientoTarjetaerror] = useState('')
  const [CVVerror, setCVVerror] = useState('')

  const handleInputChange = (event) => {
    setData({
        ...data,
        [event.target.name]: event.target.value
    });
  }

  const handleInputChangeEmergency = (event) => {
    setDataEmergencia({
        ...dataEmergencia,
        [event.target.name]: event.target.value
    });
  }

  const handleDatePicker = (date,opcional) => {
    if (opcional===true) {
      setDataEmergencia({
        ...dataEmergencia,
        fechaNacimiento: date,
        fechaNacimientoFormated: formatDate(date)
      });
    } else {
      setData({
        ...data,
        fechaNacimiento: date,
        fechaNacimientoFormated: formatDate(date)
      });
    }
  }

  function formatDate(d){
    const date = new Date(d)
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
    const month = (date.getMonth()+1) < 10 ? `0${(date.getMonth()+1)}` : `${(date.getMonth()+1)}`
    const year = date.getFullYear()
    return [day,month,year].join('/');
  }

 
  function emailValidation(){
    const regex = /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    if(!data.email || regex.test(data.email) === false){
      setemailerror('Email is not valid');
      return false;
    }else{
      setemailerror('');
    }
    return true;
  }

  function emailEmergenciaValidation(){
    const regex = /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    if(!dataEmergencia.email || regex.test(dataEmergencia.email) === false){
      setemailerrorEmergencia('Email is not valid');
      return false;
    }else{
      setemailerrorEmergencia('');
    }
    return true;
  }

  function cardNumberValidation(){
    if(!data.numeroTarjetaCredito || (data.numeroTarjetaCredito.length !== 16 && data.numeroTarjetaCredito.length > 0)){
      setnumeroTarjetaCreditoerror('Card number is not valid');
      return false;
    }else{
      setnumeroTarjetaCreditoerror('');
    }
    return true;
  }

  function fechaVencimientoTarjetaValidation(){
    
    const regex = /^[0-9]+\/[0-9 ]+$/;
    if(!data.fechaVencimientoTarjeta || regex.test(data.fechaVencimientoTarjeta) === false){
      setfechaVencimientoTarjetaerror('Expiration date is not valid');
      return false;
    }else{
      setfechaVencimientoTarjetaerror('');
    }
    return true;
  }

  function cvvValidation(){
    if(!data.CVV || (data.CVV.length !== 3 && data.CVV.length > 0)){
      setCVVerror('CVV is not valid')
      return false;
    }else{
      setCVVerror('')
    }
    return true;
  
  }

  const save = (event) => {
    event.preventDefault(); 
    const validation = emailValidation() &&
    emailEmergenciaValidation() &&
    cardNumberValidation() && 
    cvvValidation() &&
    fechaVencimientoTarjetaValidation();

    if (validation) {
      localStorage.setItem(data.email,JSON.stringify({...data,DatosEmergencia: dataEmergencia}));
      setData(dataObject)
      setDataEmergencia(dataEmergenciaObject)
    }
    
    
    //console.log(data)
    //console.log('TODO SAVE INTO LOCALSTORAGE')
  }

  return (
    <>
      <Navbar></Navbar>
      <br></br>
      <div className="d-flex justify-content-center">
        <div className="row">
          <main className="container">
          
            <form onSubmit={save}>
              <div className="row g-3 align-items-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="nombres">Nombres</label>
                            <input type="text" name="nombres" id="nombres" onChange={handleInputChange} className="form-control" value={data.nombres} required></input>
                        </div>

                        <div className="form-group col-md-3">
                            <label htmlFor="primerApellido">Primer apellido</label>
                            <input type="text" name="primerApellido" id="primerApellido" onChange={handleInputChange} className="form-control" value={data.primerApellido} required></input>
                        </div>

                        <div className="form-group col-md-3">
                            <label htmlFor="segundoApellido">Segundo apellido</label>
                            <input type="text" name="segundoApellido" id="segundoApellido" onChange={handleInputChange} className="form-control" value={data.segundoApellido} required></input>
                        </div>
              </div>
              <br></br>

              <div className="row g-3 align-items-center">
                        <div className="form-group col-md-6">
                          <label htmlFor="numeroIdentificacionPersonal">Número de identificación</label>
                          <input type="number" name="numeroIdentificacionPersonal" id="numeroIdentificacionPersonal" onChange={handleInputChange} className="form-control" value={data.numeroIdentificacionPersonal} placeholder="0000 00000 0000" required></input>
                        </div>

                        <div className="form-group col-md-6">
                          <label htmlFor="numeroPasaporte">Número de pasaporte</label>
                          <input type="number" name="numeroPasaporte" id="numeroPasaporte" onChange={handleInputChange} className="form-control" value={data.numeroPasaporte} placeholder="0000 00000 0000" required></input>
                        </div>
              </div>
              <br></br>

              <div className="row g-3 align-items-center">

                      <div className="form-group col-md-4">
                        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                        <DatePicker className="form-control" selected={data.fechaNacimiento} onChange={(date) => handleDatePicker(date,false) } required/>
                      </div>

                      <div className="form-group col-md-4">
                          <label htmlFor="numeroTelefono">Teléfono</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group">
                                  <select name="codigosPaisTelefono" id="codigosPaisTelefono" onChange={handleInputChange} className="form-control" value={data.codigosPaisTelefono}>
                                    {
                                      codes.map((country,index)=>(
                                          country.countryCodes.length === 1 ? <option key={index} value={country.countryCodes}>{country.isoCode2} {country.countryCodes}</option> : null
                                      ))
                                    }
                                  </select>
                                </div>
                            </div>
                            <input type="number" name="numeroTelefono" id="numeroTelefono" onChange={handleInputChange} className="form-control" value={data.numeroTelefono} required></input>
                           
                          </div>
                      </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="numeroTelefonoCasa">Teléfono de casa <span className="text-muted">(Opcional)</span></label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group">
                                  <select name="codigosPaisCasa" id="codigosPaisCasa" onChange={handleInputChange} className="form-control" value={data.codigosPaisCasa}>
                                    {
                                      codes.map((country,index)=>(
                                        country.countryCodes.length === 1 ? <option key={index} value={country.countryCodes}>{country.isoCode2} {country.countryCodes}</option> : null
                                    ))
                                    }
                                  </select>
                                </div>
                            </div>
                            <input type="number" name="numeroTelefonoCasa" id="numeroTelefonoCasa" onChange={handleInputChange} className="form-control" value={data.numeroTelefonoCasa}></input>
                          </div>
                        </div>
              </div> 
              <br></br>

              <div className="form-group col-md-12">
                      <label htmlFor="email">Email</label>
                      <input type="text" name="email" id="email" onChange={handleInputChange} className="form-control" placeholder="you@example.com" value={data.email} required></input>
                      <span className="text-danger">{emailerror}</span>
              </div>
              <br></br>

              <div className="form-group col-md-12">
                      <label htmlFor="direccion">Dirección</label>
                      <input type="text" name="direccion" id="direccion" onChange={handleInputChange} className="form-control" placeholder="5ta avenida 3-64 " value={data.direccion} required></input>
              </div>

              <hr className="mb-4"/>
              <h4 className="mb-3">Payment</h4>
              <div className="row">
               
                <div className="col-md-6 mb-3">
                  <label htmlFor="numeroTarjetaCredito">Número de tarjeta de crédito</label>
                  <input type="number" className="form-control" name="numeroTarjetaCredito" id="numeroTarjetaCredito" placeholder="0000 0000 0000 0000" required onChange={handleInputChange} value={data.numeroTarjetaCredito}/>
                  <span className="text-danger">{numeroTarjetaCreditoerror}</span>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="fechaVencimientoTarjeta">Vencimiento de la tarjeta</label>
                  <input type="text" className="form-control" name="fechaVencimientoTarjeta" id="fechaVencimientoTarjeta" placeholder="MM/YY" required onChange={handleInputChange} value={data.fechaVencimientoTarjeta}/>
                  <span className="text-danger">{fechaVencimientoTarjetaerror}</span>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="CVV">CVV</label>
                  <input type="number" className="form-control" name="CVV" id="CVV" placeholder="000" required onChange={handleInputChange} value={data.CVV}/>
                  <span className="text-danger">{CVVerror}</span>
                </div>
              
              
              </div>


              <hr className="mb-4"/>
              <h1> Datos de emergencia (Opcional) </h1>
              <div className="row g-3 align-items-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="nombres">Nombres</label>
                            <input type="text" name="nombres" id="nombres" onChange={handleInputChangeEmergency} className="form-control" value={dataEmergencia.nombres}></input>
                        </div>

                        <div className="form-group col-md-3">
                            <label htmlFor="primerApellido">Primer apellido</label>
                            <input type="text" name="primerApellido" id="primerApellido" onChange={handleInputChangeEmergency} className="form-control" value={dataEmergencia.primerApellido}></input>
                        </div>

                        <div className="form-group col-md-3">
                            <label htmlFor="segundoApellido">Segundo apellido</label>
                            <input type="text" name="segundoApellido" id="segundoApellido" onChange={handleInputChangeEmergency} className="form-control" value={dataEmergencia.segundoApellido}></input>
                        </div>
              </div>
              <br></br>

              <div className="row g-3 align-items-center">

                      <div className="form-group col-md-4">
                        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                        <DatePicker className="form-control" selected={dataEmergencia.fechaNacimiento} onChange={(date) => handleDatePicker(date,true) } />
                      </div>

                      <div className="form-group col-md-4">
                          <label htmlFor="numeroTelefono">Teléfono</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group">
                                  <select name="codigosPais" id="codigosPais" onChange={handleInputChangeEmergency} className="form-control" value={dataEmergencia.codigosPais}>
                                    {
                                      codes.map((country,index)=>(
                                        country.countryCodes.length === 1 ? <option key={index} value={country.countryCodes}>{country.isoCode2} {country.countryCodes}</option> : null
                                    ))
                                    }
                                  </select>
                                </div>
                            </div>
                            <input type="number" name="numeroTelefono" id="numeroTelefono" onChange={handleInputChangeEmergency} className="form-control" value={dataEmergencia.numeroTelefono}></input>
                            <div className="invalid-feedback">
                              Your phone is required.
                            </div>
                          </div>
                      </div>

                    
              </div> 
              <br></br>

              <div className="form-group col-md-12">
                      <label htmlFor="email">Email</label>
                      <input type="text" name="email" id="email" onChange={handleInputChangeEmergency} className="form-control" placeholder="you@example.com" value={dataEmergencia.email}></input>
                      <span className="text-danger">{emailerrorEmergencia}</span>
              </div>
              <br></br>

              <div className="form-group col-md-12">
                      <label htmlFor="direccion">Dirección</label>
                      <input type="text" name="direccion" id="direccion" onChange={handleInputChangeEmergency} className="form-control" placeholder="5ta avenida 3-64 " value={dataEmergencia.direccion}></input>
              </div>

              <br></br>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
           
              
            
              
             
            
            
          </main>
        </div>
      </div>
    
    </>
    
  );
}

export default MaskedInputApp;
