import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function DoublerOperator ({setHiddenCard, createCard, hidden, hiding, setHidden, username, setUser, user, reward, trumpCard, setTrumpCard, fiveCards}) {
    const [stake, setStake] = useState(reward)
    const navigate = useNavigate()
    const handleClick = () => {
        setTrumpCard({})
        setHidden(hiding)
        setHiddenCard(["card", "cardHidden", "cardHidden", "cardHidden", "cardHidden"])
        fetch(`${process.env.REACT_APP_dataStoreUrl}/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bank: user.bank + stake})
            })
        navigate(`/${username}/Noro's_Poker_Club`)
    }
    const returnToGame = () => {
        setTrumpCard({})
        setHidden(hiding)
        setHiddenCard(["card", "cardHidden", "cardHidden", "cardHidden", "cardHidden"])
        fetch(`${process.env.REACT_APP_dataStoreUrl}/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bank: user.bank})
            })
        navigate(`/${username}/Noro's_Poker_Club`)
    }
    const doubleReward = () => {
        setStake(stake * 2)
        setHidden(hiding)
        setHiddenCard(["card", "cardHidden", "cardHidden", "cardHidden", "cardHidden"])
        setTrumpCard({})
        createCard()
    }
    return (
        <>
            <section className="operator">
            <div className="bank">
                    <span>Bank:</span>
                    <span className="banker">£{user.bank}</span>
                </div>
                <div className="double">
                    <button disabled={hidden.clicked === false && trumpCard.strength >= fiveCards[0].strength ? false : true} onClick={doubleReward}>Go For Double!!</button>
                    <button disabled={hidden.clicked === true ? true : false} onClick={trumpCard.strength > fiveCards[0].strength ? handleClick : returnToGame}>{trumpCard.strength > fiveCards[0].strength ? "Or just Bank" : "Go Back And Try Again"}</button>
                </div>
                <div className="stake">
                <div>
                        <span>Currently:</span>
                        <span className="staker">£{stake}</span>
                    </div>
                </div>
            </section>
        </>
    )
}