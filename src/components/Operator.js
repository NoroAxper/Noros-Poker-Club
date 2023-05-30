import { useState } from "react"

export default function Operator ({createCard, user, stake, setStake, setUser, setButtonTexts}) {
    const [drawOrRedraw, setDrawOrRedraw] = useState('DRAW')


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
    
    return (
        <>
            <section className="operator">
                <div className="bank">
                    <span>Bank:</span>
                    <span className="banker">£{user.bank}</span>
                </div>
                <div className="double">
                    <button>Go For Double!!</button>
                    <button>Or Just Bank</button>
                </div>
                <div className="stake">
                    <div>
                        <span>Stake:</span>
                        <span className="staker">£{stake}</span>
                    </div>
                    <div className="buttons">
                        <button name="minus" disabled={stake === 0 || drawOrRedraw === 'REDRAW' ? true : false} value={-1} onClick={handleStake} >-</button>
                        <button name="plus" disabled={stake === 200 || stake > user.bank || drawOrRedraw === 'REDRAW' ? true : false} value={1} onClick={handleStake} >+</button>
                        <button value={drawOrRedraw} disabled={(stake === 0 && drawOrRedraw === 'DRAW') || (stake > user.bank && drawOrRedraw === 'DRAW') ? true : false} id="betButton" onClick={(e) => {createCard(e); handleBet(e); handleButtonTexts();} } >{drawOrRedraw}</button>
                    </div>
                </div>
            </section>
        </>
    )
}