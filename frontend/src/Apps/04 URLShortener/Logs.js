import React, {  useState } from "react";
import Modal from 'react-bootstrap/Modal'
import config from '../../config/config';

function Logs() {
    const [show, setShow] = useState(false);
    const [logs, setLogs] = useState([])
  
    const handleClose = () => setShow(false);
    const handleShow = () => {
      getLogs();
    };

    const getLogs = () => {
      fetch(`${config.BACKEND}/shortener/getAll`, {
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
             
              setLogs(data.msj)
              
              //setOriginal('')
              /*
              toast.success(`Welcome ${data.msj.name}`, {
                  onClose: () => {
                      history.replace("/profile")
                  }
              })*/
          }else{
              //toast.error(data.msj)
          }
          return 'x';
      }).then(data => {
        setShow(true)
      })
      .catch(error => {
          console.log(error)
      })
    }
  
    return (
      <>
                         
        <button type="button" className="btn btn-outline-primary" onClick={handleShow}>
          Logs
        </button>
  
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{} Logs</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Hash</th>
                      <th scope="col">Shortener URL</th>
                      <th scope="col">Usage counter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log,index) => (   
                    <tr key={index}>
                        <td>
                            {log.hash}
                        </td>
                        <td>
                            {log.url.shortener_url}  
                        </td>
                        <td>
                            {log.url.counter}
                        </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-outline-primary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
    
      </>
    );
  }
  
export default Logs;
