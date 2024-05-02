import React, { useContext } from "react";

import { AppContext } from "../contexts/context";
import "../styles/popups/overlay.css";


function Overlay() {
	const {
		showOverlay, setShowOverlay,
    overlayAction
	} = useContext(AppContext);

	return (
		<>
			<div className={`overlay ${showOverlay ? 'open' : ''}`} onClick={() => {
				if (showOverlay) {
          overlayAction();
					setShowOverlay(false);
				}
			}}></div>
		</>
	);
}

export default Overlay;
