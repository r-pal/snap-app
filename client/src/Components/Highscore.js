import React from 'react';
import ListItem from './ListItem';

const HighScoreList = ({highScores, deleteHighScore, descendingHighScores, getDescendingHighScores}) => {

    

    let desHighScores = highScores.sort((a, b) => b.score - a.score);
    let topTenScores = desHighScores.slice(0, 10);
    let highScoreListItem = topTenScores.map((highScore, index) => { 
        return <ListItem highScore={highScore} key={highScore._id} deleteHighScore={deleteHighScore} index={index}/>
    })

    return (
        <div className='highScoreBoard'>
            <h3>High Scores: {highScoreListItem}</h3>
        
            <marquee>{highScoreListItem}</marquee>
        </div>
    )
}

// GET ALL from DB of winners 

// array of players[name, score]

// arranged in order of score


export default HighScoreList;