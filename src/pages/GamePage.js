import Operator from "../components/Operator"
import CardDraw from "../components/CardDraw"
import PrizeList from "../components/PrizeList"
import Title from "../components/Title"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"

const chosenCards = [    {
    value: "A",
    type: "heart",
    id: 1,
    lock: false
  },    {
    value: "A",
    type: "diamond",
    id: 14,
    lock: false
  },    {
    value: "K",
    type: "heart",
    id: 27,
    lock: false
  },    {
    value: "Q",
    type: "heart",
    id: 40,
    lock: false
  },    {
    value: "J",
    type: "heart",
    id: 28,
    lock: false
  }]

export default function GamePage () {
    const [user, setUser] = useState([])
    const [cards, setCards] = useState([])
    const [fiveCards, setFiveCards] = useState([])
    const params = useParams()
    const [buttonTexts, setButtonTexts] = useState(Array(5).fill('LOCK'));
    const [stake, setStake] = useState(0)


    useEffect(() => {
        fetch(`${process.env.REACT_APP_dataStoreUrl}/users`)
        .then(res => res.json())
        .then(data => data.find(item => item.username === params.username ? setUser(item): console.log('no matching user')))

        fetch(`${process.env.REACT_APP_dataStoreUrl}/cards`)
        .then(res => res.json())
        .then(data => setCards(data))
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
        console.log(array)
        console.log(type)
        array.map(ty => {
            if(type === ty){
                counter++;
            }
        })
        console.log(counter)
        return counter
    }
    const checkForFlush = (fiveCardsTypes) => {
        let num = countCardTypes(fiveCardsTypes, fiveCardsTypes[0])
        if(num === 5){
            setUser({...user, bank: user.bank + (stake * 5)})
        }
        
    }
    const countCards = (array, value) => {
        let counter = 0
        array.forEach(val => {
            if(val === value){
                counter++;
            }
        })
        return counter
    }
    const checkForPairsTripsQuadsFull = (fiveCardsValue, quadruple, triple, twoPairs) => {
        for(let i = 0; i < 5; i++){
                    
            let num = countCards(fiveCardsValue, fiveCardsValue[i])
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
            setUser({...user, bank: user.bank + (stake * 2)})
        }
        else if(triple.length === 3 && twoPairs.length !== 2){
            setUser({...user, bank: user.bank + (stake * 3)})
        }
        else if(triple.length === 3 && twoPairs.length === 2){
            setUser({...user, bank: user.bank + (stake * 7)})
        }
        else if(quadruple.length === 4){
            setUser({...user, bank: user.bank + (stake * 20)})
        }
    }
    const checkForPrize = (array) => {
        const fiveCardsValue = array.map(obj => obj.value)
        const fiveCardsTypes = array.map(obj => obj.type)
        const twoPairs = []
        const triple = []
        const quadruple = []
        checkForPairsTripsQuadsFull(fiveCardsValue, quadruple, triple, twoPairs)
        checkForFlush(fiveCardsTypes)
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

                setFiveCards(chosenCards)
                checkForPrize(chosenCards)

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
            <Operator stake={stake} setStake={setStake} fiveCards={fiveCards} createCard={createCard} user={user} setUser={setUser} setButtonTexts={setButtonTexts}/>
        </>
    )
}