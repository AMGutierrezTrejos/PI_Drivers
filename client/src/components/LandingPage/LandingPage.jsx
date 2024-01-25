import './LandingPage.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
const banner = "../public/bannerf1.png";
const gif = "../public/explosion.gif";

const LandingPage = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const navigateToHome = () => {
    setLoading(true);

    navigate('/spinner')

    setTimeout(() => {
      setLoading(false);
      navigate('/home');
    }, 2000);
  }


  return (
    <div className='Landing_page'>

      <div className='conteiner-title'>
      <h2>
            <img src={gif} style={{width:"50px", height:"50px", marginRight:"10px"}} alt=""/>
                welcome to document yourself about F1 
            <img src={gif} style={{width:"50px", height:"50px", marginRight:"10px"}} alt=""/>
            </h2>
        <img src={banner} className='img_title' alt="" />
        
      </div>
        <button className='button-landing-page' onClick={navigateToHome}>E N T E R</button>
    </div>
  )
}

export default LandingPage