import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { GameMessageType } from '../enums/GameMessageType';
import { FirstSuspenceGamePartType } from '../enums/FirstSuspenceGamePartType';
import videoSrc from "../images/shuffle_vid.mp4"

type Props = {
    gameName: GameMessageType,
    numbersArr: number[],
    sumPointsNum: number,
    setNewPointsSum: (points: number) => void,
    firstSelectedCardNum: number,
    firstSelectedCardNumIndex: number,
    secondSelectedCardNum: number,
    secondSelectedCardNumIndex: number,
    resultCardNum: number,
    setNewGameNum: (number: number) => void
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
    setNewGameNum
}) => {
    const [part, setPart] = useState(FirstSuspenceGamePartType.previewText);
    const [selectedCardIndexes, setSelectedCardIndexes] = useState<number[]>([]);
    const [isWheelSpinning, setIsWheelSpinning] = useState(false);
    const [isWheelSpinned, setIsWheelSpinned] = useState(false);


    useEffect(() => {
        switch (part) {
            case FirstSuspenceGamePartType.previewText:
                setTimeout(() => {
                    setPart(FirstSuspenceGamePartType.cardsDeck)
                }, 3000);
                break;
            case FirstSuspenceGamePartType.cardsDeck:
                setTimeout(() => {
                    setPart(FirstSuspenceGamePartType.cardsFlip)
                }, 4000);
                break;
            case FirstSuspenceGamePartType.cardsFlip:
                setTimeout(() => {
                    setPart(FirstSuspenceGamePartType.cardsShuffle)
                }, 5000);
                break;
            case FirstSuspenceGamePartType.cardsShuffle:
                setTimeout(() => {
                    setPart(FirstSuspenceGamePartType.cardsDrawing)
                }, 3100);
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

    console.log(pointsArr);

    return (
        <>
            {part === FirstSuspenceGamePartType.previewText && (<h1 className='game__start-text subtitle is-uppercase has-text-centered is-size-1 has-text-black'>{gameName}</h1>)}
            {(part === FirstSuspenceGamePartType.cardsDeck || part === FirstSuspenceGamePartType.cardsFlip) && (
                <>
                    <p className={classNames('game__text has-text-centered has-text-black', {
                        'is-size-2': part === FirstSuspenceGamePartType.cardsDeck,
                        'is-size-1': part === FirstSuspenceGamePartType.cardsFlip,
                    })}>
                        {part === FirstSuspenceGamePartType.cardsDeck ? 'Game 1. This is your deck of cards' : 'Ready for shuffling?'}
                    </p>
                    <div className="game__cards-box">
                        {numbersArr.map((number, index) => {
                            const className = `game__card-front is-size-1 game__card-front--${index}`;
                            return (
                                <div key={index} className={classNames("game__card", {
                                    "game__card--fliped": part === FirstSuspenceGamePartType.cardsFlip
                                })}>
                                    <div className={className}>{number}</div>
                                    <div className="game__card-back"></div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
            {part === FirstSuspenceGamePartType.cardsShuffle && (
                <>
                    <h1 className='game__text has-text-centered is-size-1 has-text-black'>Shuffling...</h1>
                    <div className="game__video-container">
                        <video autoPlay={true} muted={true} playsInline={true}>
                            <source src={videoSrc} type="video/mp4" />
                        </video>

                    </div>
                </>
            )}
            {part === FirstSuspenceGamePartType.cardsDrawing && (
                <>
                    {selectedCardIndexes.length !== 2 && (
                        <>
                            <h3 className='game__text has-text-centered is-size-2 has-text-black'>
                                Please draw 2 cards for your <span className='has-text-weight-bold is-capitalized'>first trial</span>
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
                            setPart(FirstSuspenceGamePartType.infoPage);
                        }}> Continue</button>
                    )}
                </>
            )}
            {part === FirstSuspenceGamePartType.infoPage && (
                <>
                    <h3 className='game__text has-text-weight-bold has-text-centered is-size-4 has-text-black'>
                        Your drawn cards for the <span className='is-capitalized'>wheel of fortune</span>
                    </h3>
                    <div className="game__info-box">
                        {selectedCardIndexes.map((cardIndex, index) => {
                            const frontCardClassName = `game__card-front is-size-1 game__card-front--${selectedCardIndexes[0] === cardIndex ? firstSelectedCardNumIndex : secondSelectedCardNumIndex}`
                            return (
                                <div key={index} className="game__card">
                                    <div className={frontCardClassName}>
                                        {selectedCardIndexes[0] === cardIndex ? firstSelectedCardNum : secondSelectedCardNum}
                                    </div>
                                    <div className="game__card-back"></div>
                                </div>
                            )
                        })}
                    </div>
                    <button className='button is-light mt-6 has-text-black is-medium' onClick={() => {
                        setPart(FirstSuspenceGamePartType.fortuneWheelPage);
                    }}>Next</button>
                </>
            )}

            {part === FirstSuspenceGamePartType.fortuneWheelPage && (
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
                            setNewGameNum(2);
                        }}>
                            Continue
                        </button>
                    )}
                </>
            )}
        </>
    );
}

export default SuspenseGameMainPart;