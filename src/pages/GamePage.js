import Operator from "../components/Operator"
import CardDraw from "../components/CardDraw"
import PrizeList from "../components/PrizeList"
import Title from "../components/Title"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import UserContext from "../components/UserContext"

const chosenCards = [    {
    value: "A",
    type: "diamond",
    id: 1,
    lock: false,
    strength: 14
  },    {
    value: "K",
    type: "diamond",
    id: 14,
    lock: false,
    strength: 13
  },    {
    value: "Q",
    type: "diamond",
    id: 27,
    lock: false,
    strength: 12
  },    {
    value: "J",
    type: "diamond",
    id: 40,
    lock: false,
    strength: 11
  },    {
    value: "10",
    type: "diamond",
    id: 28,
    lock: false,
    strength: 10
  }]
const prizes =  {
    winner: false,
    reward: 0,
    twoPair: false,
    threeOfaKind: false,
    straight: false,
    flush: false,
    fullHouse: false,
    fourOfaKind: false,
    straightFlush: false,
    royalFlush: false}

export default function GamePage () {
    const [fiveCards, setFiveCards] = useState([])
    const params = useParams()
    const [buttonTexts, setButtonTexts] = useState(Array(5).fill('LOCK'));
    const [stake, setStake] = useState(0)
    const [prize, setPrize] = useState(prizes)
    const { user, setUser } = useContext(UserContext)


    useEffect(() => {
        fetch(`${process.env.REACT_APP_dataStoreUrl}/users`)
        .then(res => res.json())
        .then(data => data.find(item => item.username === params.username ? setUser(item): console.log('no matching user')))
    }, []) 
    
    const numGenerator = () => {
        let array = []
        for(let i = array.length; i < 5; i++){
            let num = Math.floor(Math.random() * 52) + 1
            while(array.includes(num)){
                num = Math.floor(Math.random() * 52) + 1
            }
            if(array.includes(num) === false){
                array.push(num)
            }
        }
        return array
    }
    const countCardTypes = (array, type) => {
        let counter = 0
        array.forEach(ty => {
            if(type === ty){
                counter++;
            }
        })
        return counter
    }
    const checkForStraightsOrFlushes = (fiveCardsStrength, fiveCardsTypes) => {
        const fiveCardsInOrder = fiveCardsStrength.sort((a, b) => a - b)
        let num = countCardTypes(fiveCardsTypes, fiveCardsTypes[0])
        let num0 = fiveCardsInOrder[0]
        let num1 = fiveCardsInOrder[1]
        let num2 = fiveCardsInOrder[2]
        let num3 = fiveCardsInOrder[3]
        let num4 = fiveCardsInOrder[4]
        if((num0 + 1) === num1 && (num1 + 1) === num2 && (num2 + 1) === num3 && (num3 + 1) === num4 && num !== 5){
            setPrize({...prize, straight: true, winner: true, reward: stake * 4})
        }
        else if(num === 5 && num0 !== 10){
            setPrize({...prize, flush: true, winner: true, reward: stake * 5})
        }
        else if((num0 - 9) === num1 && (num1 + 1) === num2 && (num2 + 1) === num3 && (num3 + 1) === num4 && num === 5){
            setPrize({...prize, straightFlush: true, winner: true, reward: stake * 50})
        }
        else if((num0 + 1) === num1 && (num1 + 1) === num2 && (num2 + 1) === num3 && (num3 + 1) === num4 && num === 5 && num0 === 10){
            setPrize({...prize, royalFlush: true, winner: true, reward: stake * 100})
        }
    }
    const checkForPairsTripsQuads = (fiveCardsValue, quadruple, triple, twoPairs) => {
        for(let i = 0; i < 5; i++){
                    
            let num = countCardTypes(fiveCardsValue, fiveCardsValue[i])
            if(num === 2){
                twoPairs.push(num)
            }
            else if(num === 3){
                triple.push(num)
            }
            else if(num === 4){
                quadruple.push(num)
            }

        }
        if(twoPairs.length === 4){
            setPrize({...prize, twoPair: true, winner: true, reward: stake * 2})
        }
        else if(triple.length === 3 && twoPairs.length !== 2){
            setPrize({...prize, threeOfaKind: true, winner: true, reward: stake * 3})
        }
        else if(triple.length === 3 && twoPairs.length === 2){
            setPrize({...prize, fullHouse: true, winner: true, reward: stake * 7})
        }
        else if(quadruple.length === 4){
            setPrize({...prize, fourOfaKind: true, winner: true, reward: stake * 20})
        }
    }
    const checkForPrize = (array) => {
        const fiveCardsValue = array.map(obj => obj.value)
        const fiveCardsTypes = array.map(obj => obj.type)
        const fiveCardsStrength = array.map(obj => obj.strength)
        const twoPairs = []
        const triple = []
        const quadruple = []
        checkForPairsTripsQuads(fiveCardsValue, quadruple, triple, twoPairs)
        checkForStraightsOrFlushes(fiveCardsStrength, fiveCardsTypes)
    }
    const fetchData = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_dataStoreUrl}/cards/${id}`);
        const data = await response.json();
        return data;
    };
    
    const createCard = (e) => {
        const { value } = e.target
        if(value === 'DRAW'){
            const array = numGenerator()
            const newArray = []
            const fetchAllData = async () => {
                const promises = array.map(id => fetchData(id));
                const results = await Promise.all(promises);
    
                results.forEach(result => {
                  newArray.push(result)
                });
                
                setFiveCards(newArray)
            };
            fetchAllData()
        }
        else if(value === 'REDRAW') {
            const array = numGenerator()
            const newArray = []
            const fetchAllData = async () => {
                const promises = array.map(id => fetchData(id));
                const results = await Promise.all(promises);
                
                results.forEach((result, index) => {
                    if(fiveCards[index].lock === false){
                        newArray.push(result)
                    }
                    else newArray.push(fiveCards[index])
                });

                setFiveCards(newArray)
                checkForPrize(newArray)

            };
            fetchAllData()
        }
    }
    
    return (
        <>
            <div className="titleContainer">
            <Title/>
            <div className="userIconGrid">
                <div className="Icon">
                    {params.username}
                </div>
                <Link to="/">Log out</Link>
            </div>
            </div>
            <PrizeList/>
            <CardDraw fiveCards={fiveCards} setFiveCards={setFiveCards} setButtonTexts={setButtonTexts} buttonTexts={buttonTexts} />

            <Operator prize={prize} setPrize={setPrize} prizes={prizes} stake={stake} setStake={setStake} fiveCards={fiveCards} createCard={createCard} user={user} setUser={setUser} setButtonTexts={setButtonTexts}/>
        </>
    )
}