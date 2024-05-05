import React, { useContext } from 'react';

import { AppContext } from '../contexts/context';
import '../styles/popups/popup.css';
import '../styles/popups/confirm.css';

function Confirm() {
	const {
		setReload,
		showConfirm, setShowConfirm,
		confirmMessage,
		confirmAction
	} = useContext(AppContext);

  const onClickConfirm = async () => {
    await confirmAction();
    setShowConfirm(false);
    setReload(true);
  }

  const onClickCancel = () => {
    setShowConfirm(false);
  }

	if (!showConfirm) {
		return null;
	}

  return (
    <>
      <div className="Popup">
				<div className="Confirm-message">{ confirmMessage }</div>
        <div className="Confirm-button-pair">
          <button type="button" className="Confirm-button Confirm-button-cancel" onClick={onClickCancel}>cancel</button>
					<button type="button" className="Confirm-button Confirm-button-ok" onClick={onClickConfirm} >confirm</button>
        </div>
      </div>
    </>
  );
}

export default Confirm;
