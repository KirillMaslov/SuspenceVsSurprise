import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import videoSrc from "../images/shuffle_vid.mp4"
import secondVideoSrc from "../images/second_shuffle.mp4";
import { MainSuspenceGamePartType } from '../enums/MainSuspenceGamePartType';
import { SuspenseGamePartsType } from '../enums/SuspenseGamePartsType';

type Props = {
    gameName: string,
    numbersArr: number[],
    sumPointsNum: number,
    setNewPointsSum: (points: number) => void,
    firstSelectedCardNum: number,
    firstSelectedCardNumIndex: number,
    secondSelectedCardNum: number,
    secondSelectedCardNumIndex: number,
    resultCardNum: number,
    setNewGameNum: React.Dispatch<React.SetStateAction<number>>,
    setGameFinished: React.Dispatch<React.SetStateAction<boolean>>
}

const SuspenseGameMainPart: React.FC<Props> = ({
    gameName,
    numbersArr,
    sumPointsNum,
    setNewPointsSum,
    firstSelectedCardNum,
    firstSelectedCardNumIndex,
    secondSelectedCardNum,
    secondSelectedCardNumIndex,
    resultCardNum,
    setNewGameNum,
    setGameFinished
}) => {
    console.log('I am rendered');
    const [part, setPart] = useState(MainSuspenceGamePartType.cardsShuffle);
    const [selectedCardIndexes, setSelectedCardIndexes] = useState<number[]>([]);
    const [isWheelSpinning, setIsWheelSpinning] = useState(false);
    const [isWheelSpinned, setIsWheelSpinned] = useState(false);
    console.log(part);


    useEffect(() => {
        switch (part) {
            case MainSuspenceGamePartType.cardsShuffle:
                setTimeout(() => {
                    if (gameName === SuspenseGamePartsType.fifth) {
                        setPart(MainSuspenceGamePartType.suspenceQuiz);
                    } else {
                        setPart(MainSuspenceGamePartType.cardsDrawing);
                    }
                }, 3000);
                break;
            default:
                return;
        }
    }, [part])



    const pointsArr = useMemo(() => {
        const arr: number[] = [];

        for (let i = -10; i <= 15; i++) {
            arr.push(i);
        }

        return arr;
    }, []);

    return (
        <>
            {part === MainSuspenceGamePartType.cardsShuffle && (
                <>
                    <h1 className='game__text has-text-centered is-size-1 has-text-black'>Let's shuffle the deck again</h1>
                    <div className="game__video-container">
                        <video autoPlay={true} muted={true} playsInline={true}>
                            <source src={gameName === 'Fifth' ? videoSrc : secondVideoSrc} type="video/mp4" />
                        </video>

                    </div>
                </>
            )}
            {part === MainSuspenceGamePartType.cardsDrawing && (
                <>
                    {selectedCardIndexes.length !== 2 && (
                        <>
                            <h3 className='game__text has-text-centered is-size-2 has-text-black'>
                                Please draw 2 cards for your <span className='has-text-weight-bold is-capitalized'>{gameName} trial</span>
                            </h3>
                            <p className='game__text has-text-centered is-size-4 has-text-grey-dark'>
                                Press on the card to flip it
                            </p>
                        </>
                    )}
                    <div className="game__cards-box">
                        {numbersArr.map((number, index) => {
                            const frontCardClassName = `game__card-front is-size-1 game__card-front--${!selectedCardIndexes?.includes(index) ? '' : selectedCardIndexes[0] === index ? firstSelectedCardNumIndex : secondSelectedCardNumIndex}`
                            return (
                                <div key={index} className={classNames("game__card", {
                                    'game__card--fliped': !selectedCardIndexes?.includes(index)
                                })}>
                                    <div className={frontCardClassName}>
                                        {!selectedCardIndexes?.includes(index) ? '' : selectedCardIndexes[0] === index ? firstSelectedCardNum : secondSelectedCardNum}
                                    </div>
                                    <div
                                        className="game__card-back"
                                        onClick={() => {
                                            if (selectedCardIndexes.length < 2)
                                                setSelectedCardIndexes(prevArr => [...prevArr, index]);
                                        }}
                                    ></div>
                                </div>
                            )
                        })}
                    </div>
                    {selectedCardIndexes.length === 2 && (
                        <button className='button is-light mt-6 has-text-black is-medium' onClick={() => {
                            setPart(MainSuspenceGamePartType.fortuneWheelPage);
                        }}> Continue</button>
                    )}
                </>
            )}
            {part === MainSuspenceGamePartType.fortuneWheelPage && (
                <>
                    <h3 className="title is-size-3 has-text-black">Your total sum {sumPointsNum} out of 10</h3>
                    <div className="game__points-scale">
                        {pointsArr.map((point, pointIndex) => (
                            <div className={classNames('game__points-scale_point is-size-7 has-text-black', {
                                'game__points-scale_point--actual': point === sumPointsNum,
                                'has-background-danger': point >= 10,
                                'has-background-success': point < 10
                            })} key={pointIndex}>{point}</div>
                        ))}
                    </div>
                    <div className="game__container">
                        <div className="game__container-box">
                            <div className='wheel_box'>
                                <div className={classNames("wheel", {
                                    'wheel--selectFirstNum': isWheelSpinning && resultCardNum === firstSelectedCardNum,
                                    'wheel--selectSecondNum': isWheelSpinning && resultCardNum === secondSelectedCardNum,
                                })}>
                                </div>
                                <div className="arrow"></div>
                            </div>
                            <button className="button" disabled={isWheelSpinning} onClick={() => {
                                setIsWheelSpinning(true);

                                setTimeout(() => {
                                    setIsWheelSpinned(true);

                                    let i = sumPointsNum;
                                    const duration = 500; // Milliseconds

                                    const intervalId = setInterval(() => {
                                        if (resultCardNum > 0 ? i <= resultCardNum + sumPointsNum : i >= resultCardNum + sumPointsNum) {
                                            setNewPointsSum(i);
                                            i += resultCardNum > 0 ? 1 : -1;
                                        } else {
                                            clearInterval(intervalId);
                                        }
                                    }, duration);
                                }, 4900);

                            }}>
                                Spin the wheel
                            </button>
                            <div className="game__info-box">
                                <div className="game__card">
                                    <div className={`game__card-front game__card--yellow-border is-size-1 game__card-front--${firstSelectedCardNumIndex}`}>
                                        {firstSelectedCardNum}
                                    </div>
                                </div>
                                <div className="game__card">
                                    {!isWheelSpinned ? (
                                        <div className="game__card">
                                            <div className='game__card-waited is-size-6 has-text-black has-text-centered'>
                                                Your card
                                            </div>
                                        </div>
                                    ) : resultCardNum === firstSelectedCardNum ? (
                                        <div className="game__card">
                                            <div className={`game__card-front game__card--yellow-border is-size-1 game__card-front--${firstSelectedCardNumIndex}`}>
                                                {firstSelectedCardNum}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="game__card">
                                            <div className={`game__card-front game__card--gray-border is-size-1 game__card-front--${secondSelectedCardNumIndex}`}>
                                                {secondSelectedCardNum}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="game__card">
                                    <div className={`game__card-front game__card--gray-border is-size-1 game__card-front--${secondSelectedCardNumIndex}`}>
                                        {secondSelectedCardNum}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="game__cards-box">
                            {numbersArr.map((number, index) => {
                                const className = `game__card-front is-size-1 game__card-front--${index}`;
                                if (number === firstSelectedCardNum || number === secondSelectedCardNum) {
                                    return (
                                        <div key={index} className="game__card">
                                            <div className="game__card-empty"></div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={index} className="game__card">
                                        <div className={className}>{number}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {isWheelSpinned && (
                        <button className="button is-success is-light is-large mt-5" onClick={() => {                            
                            if (sumPointsNum >= 10 || gameName === SuspenseGamePartsType.fifth) {
                                setGameFinished(true);
                            } else if (gameName === SuspenseGamePartsType.second) {
                                setPart(MainSuspenceGamePartType.suspenceQuiz);
                            } else {
                                setNewGameNum((prevGameNum) => prevGameNum + 1);
                            }
                        }}>
                            Continue
                        </button>
                    )}
                </>
            )}
            {part === MainSuspenceGamePartType.suspenceQuiz && (
                <>
                    <h2 className="title has-text-centered has-text-black">We will continue the game, but firstly, please answer the question</h2>
                    <h3 className="title has-text-centered has-text-black">How much suspense do you feel now?</h3>
                    <p className="text has-text-centered has-text-black mt-3">Press button 1-5 to response.</p>
                    <p className='text has-text-centered has-text-grey-light mt-3'>1 = no suspense, 3 = moderate suspense, 5 = extreme suspense</p>

                    <div className="suspence-question__button-box mt-6">
                        {[1, 2, 3, 4, 5].map((num, numId) => (
                            <button 
                                key={numId}
                                value={num}
                                className={`button suspence-question__button suspence-question__button--${num}`}
                                onClick={() => {
                                    // You should push suspense quiz result to jatos here
                                    console.log(gameName);
                                    if (gameName === SuspenseGamePartsType.second) {
                                        setNewGameNum((prevGameNum) => prevGameNum + 1);
                                    }
                                    if (gameName === SuspenseGamePartsType.fifth) {
                                        setPart(MainSuspenceGamePartType.cardsDrawing);
                                    }
                                }}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default SuspenseGameMainPart;