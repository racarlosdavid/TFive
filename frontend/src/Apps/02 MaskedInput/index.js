import React, { Fragment, useState } from "react";
import "./styles.css";
import Navbar from '../../Home/Navbar';

function MaskedInputApp() {

  const [data, setData] = useState({
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    fechaNacimiento: '',
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

  const save = (event) => {
    event.preventDefault(); 
    console.log('TODO SAVE INTO LOCALSTORAGE')
  }

  return (
    <>
      <Navbar></Navbar>
      <br></br>
      <div className="d-flex justify-content-center">
          <div className="card w-75">
            <main className="container">
                <h1>MaskedInput App</h1>
                <form onSubmit={save}>
                    <div className="row g-3 align-items-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="nombres" className="form-label">Nombres</label>
                            <input type="text" name="nombres" id="nombres" onChange={handleInputChange} className="form-control" value={data.nombres}></input>
                        </div>

                        <div className="form-group col-md-3">
                            <label htmlFor="primerApellido" className="form-label">Primer apellido</label>
                            <input type="text" name="primerApellido" id="primerApellido" onChange={handleInputChange} className="form-control" value={data.primerApellido}></input>
                        </div>

                        <div className="form-group col-md-3">
                            <label htmlFor="segundoApellido" className="form-label">Segundo apellido</label>
                            <input type="text" name="segundoApellido" id="segundoApellido" onChange={handleInputChange} className="form-control" value={data.segundoApellido}></input>
                        </div>
                    </div>
                    <br></br>
                    <div className="row g-3 align-items-center">
                        <div className="form-group col-md-3">
                            <label htmlFor="fechaNacimiento" className="form-label">Fecha de nacimiento</label>
                            <input type="text" name="fechaNacimiento" id="fechaNacimiento" onChange={handleInputChange} className="form-control" value={data.fechaNacimiento}></input>
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" name="email" id="email" onChange={handleInputChange} className="form-control" value={data.email}></input>
                        </div>

                        <div className="form-group col-md-5">
                            <label htmlFor="direccion" className="form-label">Dirección</label>
                            <input type="text" name="direccion" id="direccion" onChange={handleInputChange} className="form-control" value={data.direccion}></input>
                        </div>
                    </div>
                    <br></br>
                    


                    <div className="row g-3 align-items-center">
                        <div className="form-group col-md-3">
                          <label htmlFor="numeroTelefono" className="form-label">Número de teléfono</label>
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

                        <div className="form-group col-md-3">
                          <label htmlFor="numeroTelefonoCasa" className="form-label">Número de teléfono de casa</label>
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

                        <div className="form-group col-md-6">
                          <label htmlFor="numeroIdentificacionPersonal" className="form-label">Número de identificación personal</label>
                          <input type="number" name="numeroIdentificacionPersonal" id="numeroIdentificacionPersonal" onChange={handleInputChange} className="form-control" value={data.numeroIdentificacionPersonal}></input>
                        </div>
                    </div> 


                    <br></br><br></br><br></br><br></br><br></br><br></br>
                    <div className="form-group col-md-12">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" name="email" id="email" onChange={handleInputChange} className="form-control" value={data.email}></input>
                    </div>

                    <div className="row g-3 align-items-center">
                        
                        <div className="form-group col-md-9">
                            <label htmlFor="photo" className="form-label">Photo</label>
                            <br></br> 
                           
                        </div>    
                    </div>
                    
                    <div className="row g-3 align-items-center">
                        <div className="form-group col-md-6">
                            <label htmlFor="pokemon_trainer_nickname" className="form-label">Pokemon trainer nickname</label>
                            <input type="text" name="pokemon_trainer_nickname" id="pokemon_trainer_nickname" onChange={handleInputChange} className="form-control" value={data.pokemon_trainer_nickname}></input>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="region_of_origin" className="form-label">Region of origin</label>
                            <input type="text" name="region_of_origin" id="region_of_origin" onChange={handleInputChange} className="form-control" value={data.region_of_origin}></input>
                        </div>
                    </div> 
                    


                    <br></br>      
                             
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
