import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { createStar, createShootingStar } from '../utils/constellationUtils'; 
import Button from '../components/Button/Button'; 
import Layout from '../components/Layouts/Layout';
import '../components/Constellation/constellation.css'
import axios from 'axios';

const Home = () => {  
  const navigate = useNavigate();
  const [enteredText, setEnteredText] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleInputChange = (e) => {
    setEnteredText(e.target.value.toLowerCase()); // Convert entered text to lowercase
  };

  const handleCheckText = () => {
    const targetText = 'and the stars no longer burn';
    const secretText = 'i love you';

    if (enteredText === targetText.toLowerCase()) {
      setDisplayText('Username: ILoveYouJo\nPassword: 23032022UntilForever');
    } else if (enteredText === secretText.toLowerCase()) {
      setDisplayText('I LOVE YOU TOOO <333');
    } else  {
      setDisplayText('Not quite amor <3');
    }
  };

  useEffect(() => {
    const skyContainer = document.getElementById('skyContainer');
    
    initializeStars(skyContainer);
    setTimeout(() => createShootingStar(skyContainer), Math.random() * 20000);


    
}, [navigate]);


const initializeStars = (skyContainer) => {
  for (let i = 0; i < 100; i++) {
  createStar(skyContainer);
  }
};

return (
  <div className='constellation-container' id='skyContainer'>
    {/* information Section */}
    <div className='constellation-info'>
      <div>
        <h2 className="constellation-title"> {'* THE FUTURE IS NOW'} </h2>
        <br/>
      </div>
      <label>
        32 - 46 17 34 63 - 12 41 14 - 38 52 - 56 59 4 55 - 37 13A 24 27 50 6, - 61 54 20 58 30 - 
        15 53 - 7 57 35 43 48 - 29 10 - 23 28 8D 44 31 51 - 42 33 2 9 3 ....
        <br/>
        <br/>
        <br/>
      </label>
      
      
      <div className='constellation-puzzle'>
        <input
            className='puzzle-input'
            type="text"
            value={enteredText}
            onChange={handleInputChange}
            placeholder="22 45 40 - 5 19 64 - 1 18 21 49 16 - 47 26 - 36 13D 8A 25 63 65 - 39 11 60 62"
          />
        <Button onClick={handleCheckText}>
          CHECK
        </Button>
      </div>

      <div className='puzzle-answer'>
        {displayText && <p>{displayText}</p>}
      </div>
    </div>
  </div>
);
};

export default Home;