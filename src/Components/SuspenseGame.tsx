import React, { useMemo, useState } from 'react';
import { GameType } from '../enums/GameType';
import { SuspenseGamePartsType } from '../enums/SuspenseGamePartsType';
import FirstSuspensePart from './FirstSuspensePart';
import SuspenseGameMainPart from './SuspenseGameMainPart';
import { BirthConditionType } from '../enums/BirthConditionType';
import { SuspenseTrajectoryObjectType } from '../types/SuspenseTrajectoryObjectType';

type Props = {
    gameName: GameType,
    setNewGame: (gameName: GameType) => void,
    condition: BirthConditionType,
}

const SuspenceGame: React.FC<Props> = ({
    gameName,
    setNewGame,
    condition,
}) => {
    const [userPointsSum, setUserPointsSum] = useState(0);
    const [gameNumber, setGameNumber] = useState(1);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const winningSuspenceLowGameObject: SuspenseTrajectoryObjectType = {
        numbersArr: [-5, -4, -3, 0, 1, -1, 2, 3, 5],
        firstPair: {
            firstIndex: 1,
            secondIndex: 2,
            resultIndex: 2
        },
        secondPair: {
            firstIndex: 6,
            secondIndex: 1,
            resultIndex: 6,
        },
        thirdPair: {
            firstIndex: 3,
            secondIndex: 7,
            resultIndex: 7
        },
        fourthPair: {
            firstIndex: 3,
            secondIndex: 0,
            resultIndex: 3
        },
        fifthPair: {
            firstIndex: 1,
            secondIndex: 7,
            resultIndex: 1
        }

    }


    const losingSuspenceLowGameObject: SuspenseTrajectoryObjectType = {
        numbersArr: [1, 2, 0, 3, 5, 6, 7, 8, 9],
        firstPair: {
            firstIndex: 1,
            secondIndex: 6,
            resultIndex: 1
        },
        secondPair: {
            firstIndex: 1,
            secondIndex: 7,
            resultIndex: 1,
        },
        thirdPair: {
            firstIndex: 4,
            secondIndex: 3,
            resultIndex: 4
        },
        fourthPair: {
            firstIndex: 2,
            secondIndex: 1,
            resultIndex: 1
        },
        fifthPair: {
            firstIndex: 6,
            secondIndex: 7,
            resultIndex: 7
        }
    }
    const winningSuspenceHighGameObject: SuspenseTrajectoryObjectType = {
        numbersArr: [-5, -3, -2, 2, 4, 5, 7, 8, 9],
        firstPair: {
            firstIndex: 5,
            secondIndex: 4,
            resultIndex: 4
        },
        secondPair: {
            firstIndex: 1,
            secondIndex: 8,
            resultIndex: 1,
        },
        thirdPair: {
            firstIndex: 6,
            secondIndex: 1,
            resultIndex: 1
        },
        fourthPair: {
            firstIndex: 0,
            secondIndex: 6,
            resultIndex: 6
        },
        fifthPair: {
            firstIndex: 3,
            secondIndex: 8,
            resultIndex: 3
        }
    }

    const losingSuspenceHighGameObject: SuspenseTrajectoryObjectType = {
        numbersArr: [-5, -4, -2, -1, 0, 3, 4, 6, 9],
        firstPair: {
            firstIndex: 8,
            secondIndex: 2,
            resultIndex: 2
        },
        secondPair: {
            firstIndex: 4,
            secondIndex: 3,
            resultIndex: 3,
        },
        thirdPair: {
            firstIndex: 0,
            secondIndex: 8,
            resultIndex: 8
        },
        fourthPair: {
            firstIndex: 4,
            secondIndex: 7,
            resultIndex: 4
        },
        fifthPair: {
            firstIndex: 8,
            secondIndex: 1,
            resultIndex: 8
        }

    }

    const selectedObject: SuspenseTrajectoryObjectType = useMemo(() => {
        if (condition === BirthConditionType.low) {
            if (gameName === GameType.firstGame) {
                return winningSuspenceLowGameObject;
            } else {
                return losingSuspenceLowGameObject;
            }
        } else {
            if (gameName === GameType.firstGame) {
                return winningSuspenceHighGameObject;
            } else {
                return losingSuspenceHighGameObject;
            }
        }
    }, [gameName]);

    const suspensePartName = useMemo(() => {
        switch (gameNumber) {
            case 2:
                return SuspenseGamePartsType.second;
            case 3:
                return SuspenseGamePartsType.third;
            case 4:
                return SuspenseGamePartsType.fourth;
            default:
                return SuspenseGamePartsType.fifth;
        }
    }, [gameNumber]);

    return (
        <div className="game">
            {gameNumber === 1 && (
                <FirstSuspensePart
                    gameName={gameName}
                    numbersArr={selectedObject.numbersArr}
                    sumPointsNum={userPointsSum}
                    setNewPointsSum={setUserPointsSum}
                    firstSelectedCardNum={selectedObject.numbersArr[selectedObject.firstPair.firstIndex]}
                    firstSelectedCardNumIndex={selectedObject.firstPair.firstIndex}
                    secondSelectedCardNum={selectedObject.numbersArr[selectedObject.firstPair.secondIndex]}
                    secondSelectedCardNumIndex={selectedObject.firstPair.secondIndex}
                    resultCardNum={selectedObject.numbersArr[selectedObject.firstPair.resultIndex]}
                    setNewGameNum={setGameNumber}
                />
            )}
            {gameNumber === 2 && !isGameFinished && (
                <SuspenseGameMainPart
                    gameName={suspensePartName}
                    numbersArr={selectedObject.numbersArr}
                    sumPointsNum={userPointsSum}
                    setNewPointsSum={setUserPointsSum}
                    firstSelectedCardNum={selectedObject.numbersArr[selectedObject.secondPair.firstIndex]}
                    firstSelectedCardNumIndex={selectedObject.secondPair.firstIndex}
                    secondSelectedCardNum={selectedObject.numbersArr[selectedObject.secondPair.secondIndex]}
                    secondSelectedCardNumIndex={selectedObject.secondPair.secondIndex}
                    resultCardNum={selectedObject.numbersArr[selectedObject.secondPair.resultIndex]}
                    setNewGameNum={setGameNumber}
                    setGameFinished={setIsGameFinished}
                />
            )}
            {gameNumber === 3 && !isGameFinished && (
                <SuspenseGameMainPart
                    gameName={suspensePartName}
                    numbersArr={selectedObject.numbersArr}
                    sumPointsNum={userPointsSum}
                    setNewPointsSum={setUserPointsSum}
                    firstSelectedCardNum={selectedObject.numbersArr[selectedObject.thirdPair.firstIndex]}
                    firstSelectedCardNumIndex={selectedObject.thirdPair.firstIndex}
                    secondSelectedCardNum={selectedObject.numbersArr[selectedObject.thirdPair.secondIndex]}
                    secondSelectedCardNumIndex={selectedObject.thirdPair.secondIndex}
                    resultCardNum={selectedObject.numbersArr[selectedObject.thirdPair.resultIndex]}
                    setNewGameNum={setGameNumber}
                    setGameFinished={setIsGameFinished}
                />
            )}
            {gameNumber === 4 && !isGameFinished && (
                <SuspenseGameMainPart
                    gameName={suspensePartName}
                    numbersArr={selectedObject.numbersArr}
                    sumPointsNum={userPointsSum}
                    setNewPointsSum={setUserPointsSum}
                    firstSelectedCardNum={selectedObject.numbersArr[selectedObject.fourthPair.firstIndex]}
                    firstSelectedCardNumIndex={selectedObject.fourthPair.firstIndex}
                    secondSelectedCardNum={selectedObject.numbersArr[selectedObject.fourthPair.secondIndex]}
                    secondSelectedCardNumIndex={selectedObject.fourthPair.secondIndex}
                    resultCardNum={selectedObject.numbersArr[selectedObject.fourthPair.resultIndex]}
                    setNewGameNum={setGameNumber}
                    setGameFinished={setIsGameFinished}
                />
            )}
            {gameNumber === 5 && !isGameFinished && (
                <SuspenseGameMainPart
                    gameName={suspensePartName}
                    numbersArr={selectedObject.numbersArr}
                    sumPointsNum={userPointsSum}
                    setNewPointsSum={setUserPointsSum}
                    firstSelectedCardNum={selectedObject.numbersArr[selectedObject.fifthPair.firstIndex]}
                    firstSelectedCardNumIndex={selectedObject.fifthPair.firstIndex}
                    secondSelectedCardNum={selectedObject.numbersArr[selectedObject.fifthPair.secondIndex]}
                    secondSelectedCardNumIndex={selectedObject.fifthPair.secondIndex}
                    resultCardNum={selectedObject.numbersArr[selectedObject.fifthPair.resultIndex]}
                    setNewGameNum={setGameNumber}
                    setGameFinished={setIsGameFinished}
                />
            )}

            {isGameFinished && (
                <>
                    <h1 className='title game__result-title is-size-1'>{userPointsSum} points</h1>
                    <h1 className='title game__result-title is-uppercase is-size-1 mt-5'>{userPointsSum >= 10 ? 'Loss' : "Win"}</h1>
                    <button className="button is-success is-large mt-5" onClick={() => {
                        setNewGame(GameType.secondGame);
                    }}>Next Game</button>
                </>
            )}
        </div>
    );
}

export default SuspenceGame;