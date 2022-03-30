import React, { Fragment, useState } from "react";
import "./styles.css";
import Navbar from '../../Home/Navbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MaskedInputApp() {

  const [data, setData] = useState({
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    fechaNacimiento: '',
    fechaNacimientoFormated: '',
    email: '',
    direccion: '',
    codigosPais: '', //(+502, +503, etc)
    numeroTelefono: '',
    numeroTelefonoCasa: '', //Opcional
    numeroIdentificacionPersonal: '',
    numeroPasaporte: '',
    numeroTarjetaCredito: '',
    fechaVencimientoTarjeta: '',
    CVC: ''
  })

  const handleInputChange = (event) => {
    setData({
        ...data,
        [event.target.name]: event.target.value
    });
  }

  const handleDatePicker = (date) => {
    setData({
        ...data,
        fechaNacimiento: date,
        fechaNacimientoFormated: formatDate(date)
    });
  }

  function formatDate(d){
    const date = new Date(d)
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
    const month = (date.getMonth()+1) < 10 ? `0${(date.getMonth()+1)}` : `${(date.getMonth()+1)}`
    const year = date.getFullYear()
    return [day,month,year].join('/');
  }

  const save = (event) => {
    event.preventDefault(); 
    console.log('TODO SAVE INTO LOCALSTORAGE')
  }

  return (
    <>
      <Navbar></Navbar>
      <br></br>
      <div className="d-flex justify-content-center">
        <div className="row">
          <main className="container">
            <h1>MaskedInput App</h1>
            <form onSubmit={save}>
              <div className="row g-3 align-items-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="nombres">Nombres</label>
                            <input type="text" name="nombres" id="nombres" onChange={handleInputChange} className="form-control" value={data.nombres}></input>
                        </div>

                        <div className="form-group col-md-3">
                            <label htmlFor="primerApellido">Primer apellido</label>
                            <input type="text" name="primerApellido" id="primerApellido" onChange={handleInputChange} className="form-control" value={data.primerApellido}></input>
                        </div>

                        <div className="form-group col-md-3">
                            <label htmlFor="segundoApellido">Segundo apellido</label>
                            <input type="text" name="segundoApellido" id="segundoApellido" onChange={handleInputChange} className="form-control" value={data.segundoApellido}></input>
                        </div>
              </div>
              <br></br>

              <div className="row g-3 align-items-center">
                        <div className="form-group col-md-6">
                          <label htmlFor="numeroIdentificacionPersonal">Número de identificación</label>
                          <input type="number" name="numeroIdentificacionPersonal" id="numeroIdentificacionPersonal" onChange={handleInputChange} className="form-control" value={data.numeroIdentificacionPersonal} placeholder="0000 00000 0000"></input>
                        </div>

                        <div className="form-group col-md-6">
                          <label htmlFor="numeroPasaporte">Número de pasaporte</label>
                          <input type="number" name="numeroPasaporte" id="numeroPasaporte" onChange={handleInputChange} className="form-control" value={data.numeroPasaporte} placeholder="0000 00000 0000"></input>
                        </div>
              </div>
              <br></br>

              <div className="row g-3 align-items-center">

                      <div className="form-group col-md-4">
                        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                        <DatePicker className="form-control" selected={data.fechaNacimiento} onChange={(date) => handleDatePicker(date) } />
                      </div>

                      <div className="form-group col-md-4">
                          <label htmlFor="numeroTelefono">Teléfono</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group">
                                  <select name="codigosPais" id="codigosPais" onChange={handleInputChange} className="form-control" value={data.codigosPais}>
                                    <option key="502" value="502">502</option>
                                    <option key="503" value="503">503</option>
                                    <option key="504" value="504">504</option>
                                  </select>
                                </div>
                            </div>
                            <input type="number" name="numeroTelefono" id="numeroTelefono" onChange={handleInputChange} className="form-control" value={data.numeroTelefono}></input>
                            <div className="invalid-feedback">
                              Your phone is required.
                            </div>
                          </div>
                      </div>

                        <div className="form-group col-md-4">
                          <label htmlFor="numeroTelefonoCasa">Teléfono de casa <span class="text-muted">(Opcional)</span></label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group">
                                  <select name="codigosPais" id="codigosPais" onChange={handleInputChange} className="form-control" value={data.codigosPais}>
                                    <option key="502" value="502">502</option>
                                    <option key="503" value="503">503</option>
                                    <option key="504" value="504">504</option>
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
                      <input type="text" name="email" id="email" onChange={handleInputChange} className="form-control" placeholder="you@example.com" value={data.email}></input>
              </div>
              <br></br>

              <div className="form-group col-md-12">
                      <label htmlFor="direccion">Dirección</label>
                      <input type="text" name="direccion" id="direccion" onChange={handleInputChange} className="form-control" placeholder="5ta avenida 3-64 " value={data.direccion}></input>
              </div>

              <hr className="mb-4"/>
              <h4 className="mb-3">Payment</h4>
              <div className="row">
               
                <div className="col-md-6 mb-3">
                  <label for="cc-number">Número de tarjeta de crédito</label>
                  <input type="text" className="form-control" id="cc-number" placeholder="0000 0000 0000 0000" required/>
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label for="cc-expiration">Vencimiento de la tarjeta</label>
                  <input type="text" className="form-control" id="cc-expiration" placeholder="MM/YY" required/>
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label for="cc-expiration">CVV</label>
                  <input type="text" className="form-control" id="cc-cvv" placeholder="000" required/>
                  <div className="invalid-feedback">
                    Security code required
                  </div>
                </div>
              
              
              </div>
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
