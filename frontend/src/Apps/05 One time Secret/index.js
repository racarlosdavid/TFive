import React, { useState } from "react";
import "./styles.css";
//import { toast } from 'react-toastify'
//import { useHistory } from "react-router-dom";
import config from '../../config/config';
//import { useUserUpdate } from "../context/UserContext"; 
import Navbar from '../../Home/Navbar';


function OneTimeSecret() {

  const [data, setData] = useState({
    secret: '',
    available: ''
  })

  const [urls, setUrls] = useState([])
/*
  useEffect(()=>{

  fetch(`${config.ONE_TIME_SECRET}/secret/getAllLinks`, {
      headers: {
          "content-type": "application/json"
      }
  })
  .then(response => {
      return response.json()
  })
  .then(data => {
    console.log(data)
    
      if (data.error == null) {
          //context_userUpdate(data.msj)
         
          setUrls(data.msj)
          
          //setOriginal('')
    
      }else{
          //toast.error(data.msj)
      }
      return 'x';
  })

  },[])
*/
  const handleInputChange = (event) => {
    setData({
        ...data,
        [event.target.name]: event.target.value
    });
  }
  
  const save = (event) => {
    event.preventDefault()
    fetch(`${config.ONE_TIME_SECRET}/secret/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
      console.log(data)
      setUrls([...urls,data.msj])
        if (data.error == null) {
            //context_userUpdate(data.msj)
            setData({
                secret: '',
                available: '',
            })/*
            toast.success(`Welcome ${data.msj.name}`, {
                onClose: () => {
                    history.replace("/profile")
                }
            })*/
        }else{
            //toast.error(data.msj)
        }
    })
    .catch(error => {
        console.log(error)
    })
  }

  return (
    <>{/*
      <div className="App">
        <h1>One time Secret App</h1>
      </div>
      <Navbar></Navbar>
      */}
      <Navbar></Navbar>
      <br></br>
      <div className="d-flex justify-content-center">
      <div className="form-group col-md-6">
    
          <h1>One time Secret</h1>
          <form onSubmit={save}>
              
              <div className="form-group col-md-8">
                  <label htmlFor="secret" className="form-label">Secret</label>
                  <input type="text" name="secret" id="secret" onChange={handleInputChange} className="form-control" value={data.secret}></input>
              </div>

              <div className="form-group col-md-8">
                  <label htmlFor="available" className="form-label">How many times it can be visited</label>
                  <input type="number" name="available" id="available" onChange={handleInputChange} className="form-control" value={data.available}></input>
              </div>
            <br></br>
              <div className="mb-3">
                  <button type="submit" className="btn btn-primary">Create</button>
              </div>
          
          </form>
          {urls.length > 0 ?
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Secret URL</th>
              </tr>
            </thead>
            <tbody>
              { urls.map((url,index) => (   
                <tr key={index+1}>
                  <th scope="row">{index+1}</th>
                  <td>{url}</td>
                </tr>
              ))}
            </tbody>
          </table>
            : null 
          }
      </div>
      </div>
    </>
  );
}

export default OneTimeSecret;
