import './DetailPage.css';
import axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const noImage = '../public/noimage.png'

const DetailPage = () => {

  const params = useParams();
  const [driverDetail, SetDriverDetail] = useState('')

  useEffect(() => {
    const detailId = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/drivers/${params.id}`)
        if (data.name) {
          SetDriverDetail(data)
        }
      } catch (error) {
        window.alert('No hay personajes con ese ID');
      }
    }
    detailId()
  }, [params.id])

  const navigate = useNavigate()

  const backToHome = () => {
    navigate('/home')
  }



  return (
    <div className='Conteiner-detail'>
      {typeof driverDetail.name === 'object' ? (
        <div className='conteiner-card'>
          <img style={{ width: '290px', height: '280px' }} src={driverDetail.image.url} alt={`imagen de ${driverDetail.name.forename}`} />
          <section className='section-1'>
            <h2 className='h2-detail'>{driverDetail.name.forename}<br /> {driverDetail.name.surname}</h2>
            <span className='span-detail'>{driverDetail.teams}</span>
          </section>
          <section className='section-2'>
            <span className='p-detail'>Nationality</span>
            <p className='p-detail-section-2'>{driverDetail.nationality}</p>
          </section>
          <section className='section-3'>
            <span className='p-detail'>birthdate</span>
            <p className='p-detail-section-2'>{driverDetail.dob}</p>
          </section>
          
          <section className='section-5'>
            <h5>Description</h5>
          </section>
          <section className='section-6'>
          <p className='description'>{driverDetail.description && driverDetail.description.length > 50 ? driverDetail.description.substring(0, 50) + '...' : driverDetail.description || 'No description...'}</p>          </section>
          <section className='section-7'>
         
            <button onClick={backToHome} className='backToHome'>Return</button>
          </section>
        </div>
      ) : (
        <div className='conteiner-card'>
          <img style={{ width: '290px', height: '280px' }} src={driverDetail.image || noImage} alt={`imagen de ${driverDetail.name}`} />
          <section className='section-1'>
            <h2 className='h2-detail'>{driverDetail.name}<br /> {driverDetail.lastName}</h2>
            <span className='span-detail'>{driverDetail.teams && driverDetail.teams.length > 0 ? driverDetail.teams.map(team => team.name).join(', ') : ''}</span>
            <p className='p-detail'>driverRef: "{driverDetail.lastName}"</p>

          </section>
          <section className='section-2'>
            <span className='p-detail'>Nationality</span>
            <p className='p-detail-section-2'>{driverDetail.nationality}</p>
          </section>
          <section className='section-3'>
            <span className='p-detail'>birthdate</span>
            <p className='p-detail-section-2'>{driverDetail.dob}</p>
          </section>

          <section className='section-5'>
            <h5>Description</h5>
          </section>
          <section className='section-6'>
            <p>{driverDetail.description}</p>
          </section>
          <section className='section-7'>
            <button onClick={backToHome} className='backToHome'>BACK TO HOME</button>
          </section>
        </div>
      )}
    </div>
  );
}

export default DetailPage