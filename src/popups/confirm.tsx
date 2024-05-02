import React, { useContext } from 'react';

import { AppContext } from '../contexts/context';
import '../styles/popups/popup.css';
import '../styles/popups/confirm.css';

function Confirm() {
	const {
		setNeedReload,
		showConfirm, setShowConfirm,
		confirmMessage,
		confirmAction,
    setShowOverlay
	} = useContext(AppContext);

	async function confirmHandler() {
		await confirmAction();
		setShowConfirm(false);
    setShowOverlay(false);
		setNeedReload(true);
	}

	if (!showConfirm) {
		return null;
	}

  return (
    <>
      <div className="Popup">
				<div className="Confirm-message">{ confirmMessage }</div>
        <div className="Confirm-button-pair">
          <button type="button" className="Confirm-button Confirm-button-cancel" onClick={() => {
						setShowConfirm(false);
            setShowOverlay(false);
					}}>cancel</button>
					<button type="button" className="Confirm-button Confirm-button-ok" onClick={confirmHandler} >confirm</button>
        </div>
      </div>
    </>
  );
}

export default Confirm;
