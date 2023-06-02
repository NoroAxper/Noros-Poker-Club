import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Operator ({prize, prizes, fiveCards, setPrize, createCard, user, stake, setStake, setUser, setButtonTexts}) {
    const [drawOrRedraw, setDrawOrRedraw] = useState('DRAW')
    const navigate = useNavigate()
    const bankDosh = (dosh) => {
        fetch(`${process.env.REACT_APP_dataStoreUrl}/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bank: dosh })
            })
    }
    const handleStake = (e) => {
        const { value, name } = e.target
        if(stake >= 0 && name === 'plus' && stake < 2){
            setStake(stake + (1 * value))
        }
        else if(stake <= 2 && name === 'minus'){
            setStake(stake + (1 * value))
        }
        else if (stake < 9 && stake >= 2){
            setStake(stake + (2 * value))
        }
        else if (stake === 10 && name === 'minus'){
            setStake(stake + (2 * value))
        }
        else if (stake === 10 && name === 'plus'){
            setStake(stake + (5 * value))
        }
        else if (stake > 10 && stake < 49) {
            setStake(stake + (5 * value))
        }
        else if (stake > 50 && stake < 99) {
            setStake(stake + (10 * value))
        }
        else if (stake === 50 && name === 'minus'){
            setStake(stake + (5 * value))
        }
        else if (stake === 50 && name === 'plus'){
            setStake(stake + (10 * value))
        }
        else if (stake > 100) {
            setStake(stake + (20 * value))
        }
        else if (stake === 100 && name === 'minus'){
            setStake(stake + (10 * value))
        }
        else if (stake === 100 && name === 'plus'){
            setStake(stake + (20 * value))
        }
    }
    const handleButtonTexts = () => {
        setButtonTexts(Array(5).fill('LOCK'))
    }
    const handleBet = (e) => {
        const { value } = e.target
        if(value === 'DRAW'){
            setUser({...user, bank: user.bank - stake})
        }
        if(drawOrRedraw === 'DRAW'){
            setDrawOrRedraw('REDRAW')
        }
        if(drawOrRedraw === 'REDRAW'){
            setDrawOrRedraw('DRAW')
        }
    }
    const bankWinnings = () => {
        if(prize.twoPair === true){
            setUser({...user, bank: user.bank + (stake * 2)})
            bankDosh(user.bank + (stake * 2))
        }
        else if(prize.threeOfaKind === true){
            setUser({...user, bank: user.bank + (stake * 3)})
            bankDosh(user.bank + (stake * 3))
        }
        else if(prize.straight === true && prize.flush === false){
            setUser({...user, bank: user.bank + (stake * 4)})
            bankDosh(user.bank + (stake * 4))
        }
        else if(prize.flush === true && prize.straight === false){
            setUser({...user, bank: user.bank + (stake * 5)})
            bankDosh(user.bank + (stake * 5))
        }
        else if(prize.fullHouse === true){
            setUser({...user, bank: user.bank + (stake * 7)})
            bankDosh(user.bank + (stake * 7))
        }
        else if(prize.fourOfaKind === true){
            setUser({...user, bank: user.bank + (stake * 20)})
            bankDosh(user.bank + (stake * 20))
        }
        else if(prize.straightFlush === true){
            setUser({...user, bank: user.bank + (stake * 50)})
            bankDosh(user.bank + (stake * 50))
        }
        else if(prize.royalFlush === true){
            setUser({...user, bank: user.bank + (stake * 100)})
            bankDosh(user.bank + (stake * 100))
        }
        setPrize(prizes)

    }
    const goToDoubler = () => {
        navigate('DoublerPage', {state: {reward: prize.reward}})
    }
    return (
        <>
            <section className="operator">
                <div className="bank">
                    <span>Bank:</span>
                    <span className="banker">£{user.bank}</span>
                </div>
                <div className="double">
                    <button onClick={goToDoubler} disabled={prize.winner === false ? true : false} >Go For Double!!</button>
                    <button disabled={prize.winner === false ? true : false} onClick={bankWinnings}>Or Just Bank</button>
                </div>
                <div className="stake">
                    <div>
                        <span>{prize.winner === true ? 'You Win:' : 'Stake:'}</span>
                        <span className="staker">£{prize.winner === true ? prize.reward : stake}</span>
                    </div>
                    <div className="buttons">
                        <button name="minus" disabled={stake === 0 || drawOrRedraw === 'REDRAW' ? true : false} value={-1} onClick={handleStake} >-</button>
                        <button name="plus" disabled={stake === 200 || stake > user.bank || drawOrRedraw === 'REDRAW' ? true : false} value={1} onClick={handleStake} >+</button>
                        <button value={drawOrRedraw} disabled={(stake === 0 && drawOrRedraw === 'DRAW') || (stake > user.bank && drawOrRedraw === 'DRAW') || prize.winner ? true : false} id="betButton" onClick={(e) => {createCard(e); handleBet(e); handleButtonTexts();} } >{drawOrRedraw}</button>
                    </div>
                </div>
            </section>
        </>
    )
}