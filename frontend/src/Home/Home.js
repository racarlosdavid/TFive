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

      <div className="container-fluid">
  <div className="row justify-content-around">
    <div className="col-4">
      <div className="card" >
        <img className="img-fluid" 
          src={`${process.env.PUBLIC_URL}/Cards/Pomodoro.png`} 
          alt="Pomodoro" onClick={()=>goToApp("/pomodoro")}
        />
      </div>
    </div>
    <div className="col-4">
      <div className="card" >
        <img className="img-fluid" 
          src={`${process.env.PUBLIC_URL}/Cards/MaskedInput.png`} 
          alt="MaskedInput" onClick={()=>goToApp("/masked-input")}
        />
      </div>
    </div>
    <div className="col-4">
      <div className="card" >
        <img className="img-fluid" 
          src={`${process.env.PUBLIC_URL}/Cards/JSONtoCSV.png`} 
          alt="MaskedInput" onClick={()=>goToApp("/json-to-csv")}
        />
      </div>
    </div>
  </div>
<br/>
  <div className="row justify-content-around">
    <div className="col-4">
      <div className="card" >
        <img className="img-fluid" 
          src={`${process.env.PUBLIC_URL}/Cards/URLShortener.png`} 
          alt="URLShortener" onClick={()=>goToApp("/url-shortener")}
        />
      </div>
    </div>
    <div className="col-4">
      <div className="card" >
        <img className="img-fluid" 
          src={`${process.env.PUBLIC_URL}/Cards/OnetimeSecret.png`} 
          alt="OnetimeSecret" onClick={()=>goToApp("/one-time-secret")}
        />
      </div>
    </div>
    <div className="col-4">
      <div className="card" >
        <a href="https://github.com/racarlosdavid/TFive">
          <img className="img-fluid" 
            src={`${process.env.PUBLIC_URL}/Cards/Github.png`} 
            alt="Github" 
          />
        </a>
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
