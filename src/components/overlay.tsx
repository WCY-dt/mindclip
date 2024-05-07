import React, { useState, useContext, useEffect } from "react";

import { AppContext } from "../hooks/appContext";
import { useShowConfirm } from "../hooks/confirmContext";
import { useShowLogin } from "../hooks/loginContext";
import { useShowEdit } from "../hooks/editContext";
import "./styles/overlay.css";


function Overlay() {
  const {
    showMobileMenu, setShowMobileMenu
  } = useContext(AppContext);

  const [showConfirm, setShowConfirm] = useShowConfirm();
  const [showLogin, setShowLogin] = useShowLogin();
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
