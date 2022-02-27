import React, {useState, useEffect} from "react";
import HighScoreList from "../Components/Highscore";
import Player1Hand from "../Components/Player1Hand";
import Player2Hand from "../Components/Player2Hand";
import SnapPool from "../Components/SnapPool";
import { postHighScore as dbpostHighScore } from "../HighScoreService";
import NameForm1 from "../Components/NameForm";
import { getHighScores as dbGetHighScores, deleteHighScore as dbDeleteHighScore } from "../HighScoreService";



const SnapContainer = () => {

    const [pool, setPool] = useState([])
    const [hand1, setHand1] = useState([])
    const [hand2, setHand2] = useState([])
    const [highScores, setHighScores] = useState([])
    const [descendingHighScores, setDescendingHighScores] = useState([])

    // document.addEventListener('keydown', logKey);

    useEffect(() => {
        getPool();
    }, [])



    useEffect(() => {
        getHighScores();
    }, [])


    const getPool = function(){
        fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
        .then(res => res.json())
        .then(data => setPool(data.cards))
    }

    const dealPool = function(){
        let newPool = []
        let newHand1 = pool.slice(0, 26)
        let newHand2 = pool.slice(26, 52)
        setPool(newPool)
        setHand1(newHand1)
        setHand2(newHand2)
    }

    // function logKey(a) {
    //     hand1.shift()
    //     setHand1(hand1)
    //     console.log(hand1)

    // }

    const playCard1 = function(){
    if (hand1.length > 0){
        let card = hand1.pop()
        let newPool = [...pool, card]
        setHand1(hand1)
        setPool(newPool)
        }
    }


    const postHighScore = newHighScore => {
        dbpostHighScore(newHighScore)
          .then(savedHighScore => setHighScores([ ...highScores, savedHighScore ]));
      };

    const getHighScores = function(){
        dbGetHighScores()
        .then((data) => {
            console.log(data);
            setHighScores(data)
        })
    }

    const getDescendingHighScores = function(highScores){
        let desHighScores = highScores.sort((a, b) => b.score-a.score);
        setDescendingHighScores(desHighScores);

    }

    const deleteHighScore = (id) => {
        dbDeleteHighScore(id).then(()=>{
            let temp = highScores.map(g=>g);
            const toDel = highScores.map(g =>g._id).indexOf(id);
            temp.splice(toDel, 1);
            setHighScores(temp);
            })
        }

    

    return(
        <div id="container">

            <button onClick={dealPool}>Deal</button>
            <button onClick={playCard1}>Play card 1</button>

            <NameForm1 postHighScore={postHighScore}/>
        

            <Player1Hand hand1={hand1}/>
            <Player2Hand hand2={hand2}/>
            <SnapPool pool={pool}/>
            <HighScoreList highScores={highScores} deleteHighScore={deleteHighScore} getDescendingHighScores={getDescendingHighScores} desHighScores={descendingHighScores}/>
        </div>
        )

}

export default SnapContainer;