import React from 'react';

import '../styles/popups/popup.css';
import '../styles/popups/confirm.css';

interface ConfirmProps {
  message: string | null;
  setShowConfirm: (value: boolean) => void;
  actionHandler: () => void;
}

function Confirm({ message, setShowConfirm, actionHandler }: ConfirmProps) {
  return (
    <>
      <div className="Popup">
        <div className="Confirm-message">{ message }</div>
        <div className="Confirm-button-pair">
          <button type="button" className="Confirm-button Confirm-button-cancel" onClick={() => {setShowConfirm(false);}}>cancel</button>
					<button type="button" className="Confirm-button Confirm-button-ok" onClick={() => {
            actionHandler();
            setShowConfirm(false);
          }} >confirm</button>
        </div>
      </div>
    </>
  );
}

export default Confirm;
