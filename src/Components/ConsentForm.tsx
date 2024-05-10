import React from 'react';

type Props = {
    setConsentFormAgreed: (value: boolean) => void
}

const ConsentForm: React.FC<Props> = ({
    setConsentFormAgreed
}) => {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setConsentFormAgreed(true)
    }
    return (
        <div className='consent'>
            <h1 className='has-text-centered title is-size-2'>We need your consent to proceed</h1>
            <hr />
            <div className='consent__info'>
                <div>
                    <h3 className='title is-size-5 has-text-centered'>Information sheet for participants</h3>
                    Study title : <h3 className='is-size-5 title'>Suspense vs Surprise</h3>
                    <p className='consent__info-text'>
                        We would like to invite you to participate in this research project which focuses on the evaluation of humans
                        states such as suspense and surprise in the gaming experience.<br />
                        The experience will last approximately 20 minutes. We will ask you to do some or all of the following tasks
                        during the experience:
                    </p>

                    <ol className='consent__info-list'>
                        <li>Answer questionnaire</li>
                        <li>Read game messages that are displayed on the screen</li>
                        <li>Evaluate your feelings</li>
                        <li>Make free choice about playing extra game</li>
                    </ol>
                </div>

                <div>
                    <h3 className='is-size-5 title'>Researchers</h3>
                    <p className='consent__info-text'>
                        Anna Rodnina, student in Dual Master Economics and Psychology, Paris, Panthéon-Sorbonne University,MAIL?<br />
                        Dr. Bastien Blain, Sorbonne Economics Center, Panthéon-Sorbonne University, MAIL?
                    </p>
                </div>

                <div>
                    <h3 className='is-size-5 title'>Participant remuneration / Subject payment</h3>
                    <p className='consent__info-text'>Participation in this research project is voluntary.</p>

                </div>
                <div>
                    <h3 className="is-size-5 title">
                        Subject Rights and Withdrawal from the Study
                    </h3>
                    <p className='consent__info-text'>
                        You should only participate in this study if you wish to; choosing not to participate will not disadvantage
                        you in any way and you will not incur any penalty. Before you decide whether you would like to participate,
                        please read this information sheet carefully. Feel free to discuss this with others if you wish. Ask us if
                        there is anything unclear or if you would like more information. If you agree to participate, please
                        complete the consent form below. After signing this consent form and agreeing to participate, you can still
                        withdraw at any time without giving reasons.
                    </p>
                </div>

                <div>

                    <h3 className="is-size-5 title">
                        Data protection and privacy notice
                    </h3>
                    <p className='consent__info-text'>
                        Your data is anonymous and stored securely on a CNRS server. If we are able to anonymize or pseudonymize
                        your personal data, we will do so and we will endeavor to minimize the processing of your personal data
                        wherever possible.
                    </p>
                </div>

                <div>

                    <h3 className="is-size-5 title">
                        Confidentiality
                    </h3>
                    <p className='consent__info-text'>
                        It is anticipated that the proposed research will not generate commercially exploitable results. The
                        following information could also be obtained: gender, age, level of education.
                        To keep your data anonymous, a code will be attached to it. Therefore, you will not be identifiable in the
                        writing or any other publication/presentation that may result from this study.
                    </p>

                </div>

                <hr />


                {/* Stop Here! */}
                <form
                    className='consent__form'
                    action="GET"
                    onSubmit={handleFormSubmit}
                >
                    <h3 className="is-size-5 title">
                        Consent form
                    </h3>
                    <p className='consent__form-text'>
                        We thank you for considering potential participation in this research.
                    </p>
                    <ol className='consent__form-list'>
                        <li>
                            I confirm that I have read and understood the study information sheet. I have had the opportunity to
                            consider the information and what is expected of me.
                        </li>
                        <li>
                            I agree to participate in the study. I understand that my personal information will be used for the
                            purposes explained to me.
                        </li>
                        <li>
                            I understand that the information I provide may be published in a report.
                        </li>
                        <li>
                            I know who I should contact if I wish to file a complaint.
                        </li>
                        <li>
                            I agree that my data is archived. I understand that other authenticated researchers at
                            Panthéon-Sorbonne University will have access to my anonymized data.
                        </li>
                    </ol>

                    <button className="consent__form-button">I agree</button>
                </form>
            </div>
        </div>
    );
}

export default ConsentForm;