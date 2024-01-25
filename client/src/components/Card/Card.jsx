import './Card.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';


const Card = ({ id, image, name, surname, team, number, nationality, code, dob }) => {
    const noimage = '../public/noimage.png';
    const navigate = useNavigate()

    const navigateToDetail = () => {
        navigate(`/detailPage/${id}`)
    }
    const dispatch = useDispatch();

    //Funcion para eliminar el driver 
    // const handleDelete = () => {
    //     dispatch(delete_driver(id))
    // }



    return (
        <div className='card' key={id}>
            <div className='conteiner-img'>
                <div className='degradado-div' onClick={navigateToDetail}></div>
                <img className='imgCard' src={image || noimage} alt={name} />
            </div>
            <div className='info-card'>
                <h3>{name.toUpperCase()} <br />{surname.toUpperCase()}</h3>
                <h4 style={{ color: 'brown' }}></h4>
                <p className='teams'>{team}</p>
            </div>

            <div className='nationality-iconF'>
                <div>
                    <span className='Title_nationality'>Nationality</span>
                    <br />
                    <p className='valor-nationality'>{nationality}</p>
                </div>
                <div>
                    <span className='Title_nationality'>birth</span>
                    <br />
                    <p className='valor-nationality'>{dob}</p>
                </div>
            </div>
        </div>
    )
}

export default Card