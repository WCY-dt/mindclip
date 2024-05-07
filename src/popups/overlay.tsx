import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "../contexts/context";
import { useShowConfirm } from "../hooks/confirmContext";
import { useShowEdit } from "../hooks/editContext";
import "../styles/popups/overlay.css";


function Overlay() {
  const {
    showLogin, setShowLogin,
    showMobileMenu, setShowMobileMenu
  } = useContext(AppContext);

  const [showConfirm, setShowConfirm] = useShowConfirm();
  const [showEdit, setShowEdit] = useShowEdit();

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
