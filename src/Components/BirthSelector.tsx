import React from 'react';

type Props = {
    setBirthOption: (value: string) => void
}

const BirthSelector: React.FC<Props> = ({
    setBirthOption
}) => {

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const selectedOption = e.currentTarget.value;
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
                    value='before'
                    className='birth_selector__button'
                    onClick={handleButtonClick}
                >
                    Before
                </button>
                <button
                    value='after'
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