import Spade from "./cardSymbols/Spade"
import Diamond from "./cardSymbols/Diamond"
import Heart from "./cardSymbols/Heart"
import Club from "./cardSymbols/Club"
export default function CardDraw ({fiveCards, setFiveCards, setButtonTexts, buttonTexts}) {

    const bet = document.querySelector('#betButton')
    const changeText = (index) => {
      setButtonTexts((prevButtonTexts) => {
        const updatedButtonTexts = [...prevButtonTexts];
        if( updatedButtonTexts[index] === 'LOCK'){
            updatedButtonTexts[index] = 'UNLOCK';
        }
        else updatedButtonTexts[index] = 'LOCK'
        return updatedButtonTexts;
      });
    };
    // USE THIS TO REPLICATE FOR THE HIDDEN CARDS
    const changeLock = (index) => {
        setFiveCards((prevFiveCards) => {
            const updatedFiveCards = [...prevFiveCards];
            if(buttonTexts[index] === 'UNLOCK'){
                updatedFiveCards[index].lock = false;
            }
            else if(buttonTexts[index] === 'LOCK'){
                updatedFiveCards[index].lock = true;
            }
            return updatedFiveCards;
        });
    }

    return (
        <>
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
                        return <div key={index} style={buttonTexts[index] === 'LOCK' ? {backgroundColor: 'white'} : {backgroundColor: 'lightgrey'}} className="card">
                                        <h2>{item.value}</h2>
                                        <div>{symbol}</div>
                                        <h2>{item.value}</h2>
                                        <button disabled={bet.value === 'DRAW' ? true : false}  onClick={() => {changeText(index); changeLock(index);}}>{buttonTexts[index]}</button>
                            </div>
                        
                    })
                }
            </section>
        </>
    )
}