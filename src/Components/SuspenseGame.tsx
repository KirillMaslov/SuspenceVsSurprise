import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { GameMessageType } from '../enums/GameMessageType';
import { FirstSuspenceGamePartType } from '../enums/FirstSuspenceGamePartType';
import FirstSuspensePart from './FirstSuspensePart';

type Props = {
    gameName: GameMessageType
}

const SuspenceGame: React.FC<Props> = ({
    gameName
}) => {
    const trajectory = gameName === GameMessageType.firstGame ? 'Win' : 'Lose';
    const [userPointsSum, setUserPointsSum] = useState(0);
    const [gameNumber, setGameNumber] = useState(1);

    const numbersArr: number[] = [-5, -3, -2, 2, 4, 5, 7, 9, 9];

    return (
        <div className="game">
            {gameNumber === 1 && (
                <FirstSuspensePart 
                gameName={gameName} 
                numbersArr={numbersArr} 
                sumPointsNum={userPointsSum}
                setNewPointsSum={setUserPointsSum} 
                firstSelectedCardNum={numbersArr[2]} 
                firstSelectedCardNumIndex={2}
                secondSelectedCardNum={numbersArr[4]} 
                secondSelectedCardNumIndex={4}
                resultCardNum={numbersArr[2]}
                setNewGameNum={setGameNumber}
            />
            )}
        </div>
    );
}

export default SuspenceGame;