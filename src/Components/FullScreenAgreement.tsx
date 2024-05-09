import React from 'react';

type Props = {
    setFullScreen: (value: boolean) => void
}

const FullScreenAgreement: React.FC<Props> = ({
    setFullScreen
}) => {

  const handleAgree = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
        setFullScreen(true);
    }
  };

  return (
    <div className='fullscreen-agreement'>
      <p className='fullscreen-agreement__title'>Please press Continue to enter the full-screen mode.</p>
      <button className="fullscreen-agreement__button" onClick={handleAgree}>Continue</button>
    </div>
  );
}

export default FullScreenAgreement;