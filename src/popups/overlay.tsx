import React from "react";

import "../styles/popups/overlay.css";

interface OverlayProps {
	showOverlay: boolean;
	setShowOverlay: (value: boolean) => void;
}

function Overlay({ showOverlay, setShowOverlay }: OverlayProps) {
	return (
		<>
			<div className={`overlay ${showOverlay ? 'open' : ''}`} onClick={() => {
				if (showOverlay) {
					setShowOverlay(false);
				}
			}}></div>
		</>
	);
}

export default Overlay;
