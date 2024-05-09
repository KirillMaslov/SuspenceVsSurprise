import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
    setQuizFormCompleted: (value: boolean) => void,
    setGlobalUserName: (name: string) => void,
    setGlobalUserAge: (age: number) => void,
    setGlobalUserGender: (gender: string) => void
}

const QuizForm: React.FC<Props> = ({
    setQuizFormCompleted,
    setGlobalUserName,
    setGlobalUserAge,
    setGlobalUserGender,
}) => {
    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState(false);
    const [userAge, setUserAge] = useState<number | null>(null);
    const [ageError, setAgeError] = useState(false);
    const [userGender, setUserGender] = useState('');
    const [userGenderError, setUserGenderError] = useState(false);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setUserNameError(!userName.trim());
        setAgeError(!userAge);
        setUserGenderError(!userGender);

        if (!userName.trim() || !userAge || !userGender) {
            return 0;
        }

        setGlobalUserAge(userAge);
        setGlobalUserGender(userGender);
        setGlobalUserName(userName);
        setQuizFormCompleted(true);

        setUserName('');
        setUserAge(null);
        setUserGender('');
    }
    return (
        <form className='quiz' onSubmit={handleFormSubmit}>
            <h3 className='subtitle is-3 has-text-black'>Several questions for the beginning...</h3>
            <div className="field">
                <label className='is-size-5 quiz__label  label' htmlFor="user_name">Game name</label>
                <input
                    className={classNames('input', {
                        'is-danger': userNameError,
                        'is-success': userName
                    })}
                    type="text"
                    value={userName}
                    placeholder='Game name'
                    name='user_name'
                    id='user_name'
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setUserNameError(true);
                        }
                    }}
                    onChange={(e) => {
                        setUserName(e.target.value);
                        setUserNameError(false);
                    }}
                />
                {userNameError && (<p className="help is-danger">You must enter your game name!</p>)}
            </div>

            <div className="field">
                <label className='is-size-5 quiz__label label' htmlFor="user_age">Age</label>
                <input
                    className={classNames('input', {
                        'is-danger': ageError,
                        'is-success': userAge
                    })}
                    type="number"
                    value={userAge !== null ? userAge : ''}
                    placeholder='Age'
                    name='user_age'
                    id='user_age'
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setAgeError(true);
                        }
                    }}
                    onChange={(e) => {
                        setUserAge(+e.target.value);
                            setAgeError(false);
                    }}
                />
                {ageError && (<p className="help is-danger">You must enter your age!</p>)}
            </div>

            <div className="field">
                <label className="is-size-5 quiz__label label">Gender</label>
                <div className="control">
                    <div className="select">
                        <select
                            onChange={(e) => {
                                setUserGender(e.currentTarget.value);
                                setUserGenderError(false);
                            }}
                            defaultValue=""
                            value={userGender}
                        >
                            <option value="" disabled>Select your gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {userGenderError && (<p className="help is-danger">You must select your gender!</p>)}
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input 
                        className="button" 
                        type='submit' 
                        value="Continue" 
                        disabled={userNameError || userGenderError || ageError}
                    />
                </div>
            </div>
        </form >
    );
}

export default QuizForm;