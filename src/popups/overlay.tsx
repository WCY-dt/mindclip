import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "../contexts/context";
import "../styles/popups/overlay.css";


function Overlay() {
  const {
    showLogin, setShowLogin,
    showMobileMenu, setShowMobileMenu,
    showConfirm, setShowConfirm,
    showEdit, setShowEdit
  } = useContext(AppContext);

  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  useEffect(() => {
    if (showLogin || showConfirm || showEdit || showMobileMenu) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [setShowOverlay, showLogin, showConfirm, showEdit, showMobileMenu]);

  const onClickOverlay = () => {
    setShowOverlay(false);

    setShowLogin(false);
    setShowConfirm(false);
    setShowEdit(false);
    setShowMobileMenu(false);
  };

  if (!showOverlay) {
    return null;
  } else {
    return (
      <div className="overlay" onClick={onClickOverlay}>
      </div>
    );
  }
}

export default Overlay;
