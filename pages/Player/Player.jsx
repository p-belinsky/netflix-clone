import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjA0MWM4MGQ3YWQ2OTU1OWVhNGEyMzgxZGVkNmJlMiIsIm5iZiI6MTczNDk3NjczNS4zNTEsInN1YiI6IjY3NjlhNGRmODVkOTJmYTZhZDVjZmE2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YWg8NkL248ufDcYQue1JM9CUir2cWZ0nbjaj8W8zYIs'
    }
  };
  
useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
}, [])



  return (
    <div className="player">
      <img onClick={() => navigate("/")} src={back_arrow_icon} alt="" />
      <iframe width="90%" height="90%" 
      
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player