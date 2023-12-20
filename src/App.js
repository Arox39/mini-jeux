import { useEffect, useState } from 'react'
import './app.scss'
const App = () => {
    const [score, setScore] = useState(0)
    const [start, setStart] = useState(false)
    const [difficulter, setDifficulter] = useState(1)
    const [vie, setVie] = useState(3)
    
    const handleClick = (e) => {
        setStart(true)
        e.target.classList.add('hide')
    }
    
    useEffect(() => {


        const handleActif = (e) => {

            e.target.classList.remove('actif') 
            setScore(prevScore => {
                return prevScore + 10;
            });
        }
        if (start) {
            let verfication_vie = 3
            setVie(verfication_vie);
        
            setScore(0);
            setStart(false);
            let ancien_actif = 0;
            let intervalDuration = 900
            let verification_difficulter = document.getElementById('difficulter').classList[0]
            console.log(verification_difficulter);
            if (verification_difficulter == 2) {intervalDuration = 550}
            if (verification_difficulter == 3) {intervalDuration = 450}
            console.log(intervalDuration);
            console.log(intervalDuration);
            const startNewInterval = () => {
                let intervalId = setInterval(() => {
                    if (verfication_vie === 0) 
                    {
                        clearInterval(intervalId)
                        document.querySelector('.game-over').classList.remove('hide')
                        document.querySelector('.start').classList.remove('hide')
                    }
                    else
                    {
                        let nbAleatoire = Math.floor(Math.random() * 9) + 1;
                        let verification_score = document.getElementById('score').classList[0]
                        if ( verification_score % 50 === 0) {
                            console.log(verification_difficulter);
                            if (verification_difficulter === 1 && intervalDuration - 75 > 550)
                            {
                                intervalDuration = intervalDuration - 75; 
                            }
                            else if (verification_difficulter === 2 && intervalDuration - 50 > 350)
                            {
                                intervalDuration = intervalDuration - 50
                            }
                            else if (verification_difficulter === 3 && intervalDuration - 50 > 150)
                            {
                                intervalDuration = intervalDuration - 25
                            }
                            clearInterval(intervalId);
                            startNewInterval();
                        }
                        while (nbAleatoire === ancien_actif) {
                            nbAleatoire = Math.floor(Math.random() * 9) + 1;
                        }
                        ancien_actif = nbAleatoire;
                        
                        const carre_actif = document.querySelector(`.carre_${nbAleatoire}`);
                        carre_actif.classList.add('actif');
                        carre_actif.addEventListener('click', handleActif);
                        
                        setTimeout(() => {
                            setVie(prevVie => {
                                if (carre_actif.classList.contains('actif') && verfication_vie !== 0) {
                                    verfication_vie-- 
                                    return prevVie - 1;
                                }
                                return prevVie;
                            });
                            carre_actif.classList.remove('actif');
                            carre_actif.removeEventListener('click', handleActif);
                        }, intervalDuration - 10);
                    }
                }, intervalDuration);
            };

        startNewInterval(); // Démarre le premier intervalle
    }

}, [start]);

const handleChoixChange = (e) => {
    setDifficulter(e.target.value)
}
    return (
        <div className="mini-game">
            <button className='start' onClick={handleClick}>Commencer le jeu !</button>
            <p className='result'>Résultats en cours de chargement ...</p>
            <div className='data'>
                <div className={score} id='score'> Score : {score}</div>
                <div className='vie'>Vies restantes : {vie}</div>
                <div className='difficulter'>
                    <label className={difficulter} id='difficulter'>Difficulté :</label>
                    <select value={difficulter} onChange={handleChoixChange}>
                        <option value="1">Normal</option>
                        <option value="2">Moyen</option>
                        <option value="3">Extreme</option>
                    </select>
                </div>
            </div>
            <div className='game-over hide'>
                <p className='title'>Vous avez perdu !</p>
                <p className='score'>Votre score : {score}</p>
                <p className='difficulter'>En difficulté :
                {difficulter == 1 ? (<span> Normal</span>)
                : difficulter == 2 ? (<span> Moyen</span>)
                :(<span> Extreme</span>)}</p>
                <button className="close" onClick={(e) => {e.target.parentNode.classList.add('hide')}}>Fermer</button>
            </div>
        <div className='container'>

                <div className='carre carre_1'></div>
                <div className='carre carre_2'></div>
                <div className='carre carre_3'></div>

                <div className='carre carre_4'></div>
                <div className='carre carre_5'></div>
                <div className='carre carre_6'></div>

                <div className='carre carre_7'></div>
                <div className='carre carre_8'></div>
                <div className='carre carre_9'></div>

            </div>
        </div>
    )
}
export default App