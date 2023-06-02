import Title from "../components/Title"
import DoublerOperator from "../components/DoublerOperator"
import { useParams, Link, useLocation } from "react-router-dom"
import UserContext from "../components/UserContext"
import { useContext, useEffect, useState } from "react"
import Spade from "../components/cardSymbols/Spade"
import Heart from "../components/cardSymbols/Heart"
import Club from "../components/cardSymbols/Club"
import Diamond from "../components/cardSymbols/Diamond"

export default function DoublerPage () {
    const { user, setUser } = useContext(UserContext)
    const params = useParams()
    const location = useLocation()
    const [fiveCards, setFiveCards] = useState([{strength: 1}])
    const [trumpCard, setTrumpCard] = useState({strength: 0})
    const [hiddenCard, setHiddenCard] = useState(["card", "cardHidden", "cardHidden", "cardHidden", "cardHidden"]);

    const hiding = {
        clicked: true
    }
    const [hidden, setHidden] = useState(hiding)

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
    const fetchData = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_dataStoreUrl}/cards/${id}`);
        const data = await response.json();
        return data;
    };
    useEffect(() => {
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
    }, [])
    const createCard = () => {
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
    const changeHidden = (index) => {
        setTrumpCard(fiveCards[index])
        setHidden({clicked: false})
        setHiddenCard((prevButtonTexts) => {
          const updatedHidden = [...prevButtonTexts];
          if(index > 0 && updatedHidden[index] === 'cardHidden'){
              updatedHidden[index] = 'card';
          }
          return updatedHidden
        });
      };
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
            <h2 className="doubleTitle" style={{textAlign: "center", paddingLeft: "100px"}}>Find the Higher card!</h2>
            </div>
            <section className="cardsList">
            {
                    fiveCards.map((item, index) => {
                        let symbol
                        if(item.type === 'spade'){
                            symbol = <Spade svg="svg"/>
                        }
                        else if(item.type === 'diamond'){
                            symbol = <Diamond svg="svg"/>
                        }
                        else if(item.type === 'club'){
                            symbol = <Club svg="svg"/>
                        }
                        else if(item.type === 'heart'){
                            symbol = <Heart svg="svg"/>
                        }
                        return <div key={index} className="white-card">
                            <div onClick={hidden.clicked ? () => changeHidden(index): null} className={hiddenCard[index]}>
                                        <h2>{item.value}</h2>
                                        <div>{symbol}</div>
                                        <h2>{item.value}</h2>
                            </div>
                            </div>
                    })
                }
            </section>
            <DoublerOperator setHiddenCard={setHiddenCard} createCard={createCard} hiding={hiding} hidden={hidden} setHidden={setHidden} fiveCards={fiveCards} trumpCard={trumpCard} setTrumpCard={setTrumpCard} username={params.username} setUser={setUser} reward={location.state.reward} user={user}/>
        </>

    )
}