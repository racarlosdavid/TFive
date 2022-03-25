import React, { useState }  from "react";
import "./styles.css";
import config from '../../config/config';
import Navbar from '../../Home/Navbar';
import { toast } from 'react-toastify'
import Logs from './Logs'

function URLShortenerApp() {

  const [original, setOriginal] = useState('')
  const [shortener, setShortener] = useState('')

  const handleInputChange = (event) => {
    setOriginal(event.target.value);
  }
  
  const save = (event) => {
    event.preventDefault()
    if (original !== '') {
      fetch(`${config.BACKEND}/shortener/create`, {
          method: "POST",
          body: JSON.stringify({
            original_url: original
          }),
          headers: {
              "content-type": "application/json"
          }
      })
      .then(response => {
          return response.json()
      })
      .then(data => {
        //console.log(data)
        if (data.error == null) {
          setShortener(data.msj.shortener_url)
        }else{
          toast.error(data.msj)
        }
      })
      .catch(error => {
        //console.log(error)
        toast.error(error)
      })
    }else{
      toast.error('You have to input a url')
    }
  }
  return (
    <>
      <Navbar></Navbar>
      <br></br>
      <div className="d-flex justify-content-center">
      <div className="form-group col-md-6">
    
          <h1>URL Shortener</h1>
          <form onSubmit={save}>
              
              <div className="form-group col-md-8">
                  <label htmlFor="original" className="form-label">Original Link</label>
                  <input type="text" name="original" id="original" onChange={handleInputChange} className="form-control" value={original}></input>
              </div>
              <br></br>
              <div className="form-group col-md-8">
                  <label htmlFor="shortener" className="form-label">Shortener Link</label>
                  <input type="text" readOnly name="shortener" id="shortener" className="form-control" value={shortener}></input>
              </div>

            <br></br>
              <div className="mb-3">
                  
                  

                  <div className="container">
                    <div className="d-flex">
                      <div className="p-2">
                        <button type="submit" className="btn btn-primary">Create</button>
                      </div>
                      <div className="p-2" >
                        <Logs></Logs>
                      </div>
                    </div>
                  </div>
              </div>
              
          </form>
      
      </div>
      </div>
  </>
  );
}

export default URLShortenerApp;
