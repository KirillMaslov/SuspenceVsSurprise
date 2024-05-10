import React from 'react';
import { BirthConditionType } from '../enums/BirthConditionType';

type Props = {
    setBirthOption: (value: BirthConditionType) => void
}

const BirthSelector: React.FC<Props> = ({
    setBirthOption
}) => {

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const selectedOption = e.currentTarget.value;
        // @ts-expect-error: Let's ignore a compile error like this unreachable code
        setBirthOption(selectedOption);
    };

    return (
        <div className='birth_selector'>
            <h3 className='subtitle is-size-2 has-text-black has-text-centered'>Is your birthday before or after the 1st of July?</h3>
            <p className='is-size-4 has-text-black'>
                <span className='has-text-danger'>*</span> In the case you were born on the 1st of July were you born before or after 1 am?
            </p>

            <div className='birth_selector__box'>
                <button
                    value={BirthConditionType.high}
                    className='birth_selector__button'
                    onClick={handleButtonClick}
                >
                    Before
                </button>
                <button
                    value={BirthConditionType.low}
                    className='birth_selector__button'
                    onClick={handleButtonClick}
                >
                    After
                </button>
            </div>
        </div >
    );
}

export default BirthSelector;