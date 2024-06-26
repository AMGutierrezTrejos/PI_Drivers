import { useState, useEffect } from 'react';
import './FormPage.css';
import validation from './validationForm/validation.js';
import paises from '../../paises.js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeams } from '../../Redux/actions';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';

const FormPage = () => {

  const navigate = useNavigate()
  const [messageError, setMessageError] = useState('')
  const [error, setError] = useState({})
  const [driverData, setDriverData] = useState({
    name: "",
    lastName: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teamIds: []
  })

  const [searchTeam, setSearchTeam] = useState("");
  const handleSearchTeamChange = (event) => {
    setSearchTeam(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value, type, options } = event.target;

    const selectedOptions = options ? Array.from(options).filter((option) => option.selected).map((option) => option.value) : [];

    setDriverData({
      ...driverData,
      [name]: type === 'select-multiple' ? selectedOptions.map(Number) : value,
    });

    setError({
      ...error,
      [name]: validation(name, value),
    })
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validation(driverData);
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:3001/drivers', driverData)

      setDriverData({
        name: "",
        lastName: "",
        description: "",
        image: "",
        nationality: "",
        dob: ""
      })

      if (data && data.message) {
        setMessageError(data.message)
      } else {
        setMessageError(data.error)
      }
    } catch (error) {
      window.alert(`Error del servidor: ${error.message}`)
    }

  }

  const dispatch = useDispatch();
  const teamsReducer = useSelector((state) => state.allTeams);

  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

  const todosCamposLlenos = Object.values(driverData).every((valor) => valor !== '')

  const backToHome = () => {
    navigate('/home')
  }

  const deleteTeam = (teamIdToDelete) => {
    setDriverData((prevData) => ({
      ...prevData,
      teamIds: prevData.teamIds.filter((teamId) => teamId !== teamIdToDelete),
    }));
  };

  return (
    <div className='conteiner-form'>
      <div className="navbar-nav">
        <NavBar />
      </div>
      <form className='form' onSubmit={handleSubmit}>
        <div className="esc">
          <button onClick={backToHome} title='Exit' className='button-esc'>X</button>
        </div>
        <h2 className="title-create-driver">Create Driver</h2>
        {/* Nombre y Apellido */}
        <div className="name-lastName">
          <div className='FormGroup'>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={driverData.name}
              onChange={handleChange}
              autoComplete="off"
              className={error.name && 'warning'}
            />
            <p className='danger'>{error.name}</p>
          </div>
          <div className='FormGroup'>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={driverData.lastName}
              onChange={handleChange}
              autoComplete="off"
              className={error.lastName && 'warning'}
            />
            <p className='danger'>{error.lastName}</p>
          </div>
        </div>
        {/* Description AND URL */}
        <div className="description-url">
          <div className='textArea'>
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={driverData.description}
              onChange={handleChange}
              autoComplete="off"
              className={error.description && 'warning'}
            />
          </div>
          <p className='danger'>{error.description}</p>
          <div className='FormGroup'>
            <label htmlFor="image">Image (URL):</label>
            <input
              type="text"
              id="image"
              name="image"
              value={driverData.image}
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          {driverData.image && (
            <div className='image-preview'>
              <label>Image Preview:</label>
              <img src={driverData.image} alt="Preview" />
            </div>
          )}
        </div>
        {/* Nationality AND birthdate */}
        <div className="nationality-birthdate">
          <div className='FormNationality'>
            <label htmlFor="cars">Nationality:</label>
            <select
              className='optionPaises'
              id="nationality"
              name="nationality"
              value={driverData.nationality}
              onChange={handleChange}>
              <option className='option' value="" disabled>Select a country</option>
              {paises.map((pais, index) => (
                <option className='option-team' key={index} value={pais}>
                  {pais}
                </option>
              ))}
            </select>
          </div>
          <div className='FormGroup'>
            <label htmlFor="dob">Date Of Birth:</label>
            <input
              type="text"
              id="dob"
              name="dob"
              value={driverData.dob}
              onChange={handleChange}
              autoComplete="off"
              className={error.dob && 'warning'}
            />
            <p className='danger'>{error.dob}</p>
          </div>
        </div>
        {/* Teams AND selected */}
        <div className="teams-selected">
          <div className='selectGroup'>
            <label htmlFor="cars">Teams:</label>
            <input
          type="text"
          id="searchTeam"
          name="searchTeam"
          placeholder="Search teams..."
          value={searchTeam}
          onChange={handleSearchTeamChange}
        />
            <select
              id="team"
              name="teamIds"
              value={driverData.teamIds}
              onChange={handleChange}
              multiple
              className={error.teamIds && 'warning'}>
              {teamsReducer
            .filter((team) =>
              team.name.toLowerCase().includes(searchTeam.toLowerCase())
            )
            .map((team) => (
              <option className='option-team' key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
        </select>
        <p className='danger'>{error.teamIds}</p>
            <div className="selectedAndButton">
              <label>Selected Teams:</label>
              <div className='selected'>
                {driverData.teamIds?.map((select) => {
                  const selected = teamsReducer.find((element) => element.id === select);
                  if (selected) {
                    return (
                      <span className='span-selected' key={select}>
                        <button className='deleteTeam' onClick={() => deleteTeam(select)}>X</button>
                        {selected.name}
                      </span>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        <button className={`form-submit ${todosCamposLlenos ? 'enabled' : ''}`} type="submit" disabled={!todosCamposLlenos}>Create</button>
        {messageError && (
          <p className={messageError.includes('existe') ? 'danger' : 'success'}>
            {messageError}
          </p>
        )}
      </form>
    </div>
  )
}

export default FormPage 