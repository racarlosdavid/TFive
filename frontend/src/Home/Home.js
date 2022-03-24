import React from 'react'
import Navbar from './Navbar';
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  const goToApp = (app) => {
    history.push(app)
  }
  
  return (
    <>
      <Navbar></Navbar>
      <br></br>

      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="form-group col-md-4">
            <div className="card" >
                <button type="button" onClick={()=>goToApp("/pomodoro")} className="btn btn-outline-primary btn-lg"><br></br><h5>Pomodoro</h5><br></br></button>
            </div>
            <br></br>
            <div className="card" >
              <button type="button" className="btn btn-outline-secondary btn-lg"><br></br><h5>Masked Input</h5><br></br></button>
            </div>
            <br></br>
            <div className="card" >
            <button type="button" className="btn btn-outline-success btn-lg"><br></br><h5>JSON to CSV</h5><br></br></button>
            </div>
            <br></br>
            <div className="card" >
              <button type="button" className="btn btn-outline-warning btn-lg"><br></br><h5>URLShortener</h5><br></br></button>
            </div>
            <br></br>
            <div className="card" >
                <button type="button" onClick={()=>goToApp("/one-time-secret")} className="btn btn-outline-info btn-lg"><br></br><h5>One time Secret</h5><br></br></button>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <nav>
          <div className="color_base" style={{height: 50}}>
          </div>
        </nav>
      </footer>
      <footer className="section footer-classic context-dark bg-image mt-4">
      <div className="container">
        <div className="row row-30">
          <div className="col-md-4 col-xl-5">
          
            <div className="pr-xl-4">
              
              <p className="rights"><span>©  </span><span className="copyright-year">2022</span><span> </span><span>COMPANY</span><span>. </span><span>All Rights Reserved.</span></p>
            </div>
          </div>
          <div className="col-md-4">
            <h5>Contacto</h5>
            <dl className="contact-list">
              <dt>Github:</dt>
              <dd><a href="https://github.com/racarlosdavid">https://github.com/racarlosdavid</a></dd>
            </dl>
            <dl className="contact-list">
              <dt>email:</dt>
              <dd><a href="mailto:#">racarlosdavid@gmail.com</a></dd>
            </dl>
          </div>
        </div>
      </div>
      </footer>

    </>
  );
}

export default Home;
